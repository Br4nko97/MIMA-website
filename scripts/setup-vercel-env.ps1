# =============================================================
# scripts/setup-vercel-env.ps1
# After `vercel login` and `vercel link`, run this to push all
# env vars to the Vercel project (production + preview + dev).
# Usage: powershell ./scripts/setup-vercel-env.ps1
# =============================================================

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".env.local")) {
  Write-Error ".env.local not found in current directory. Run from project root."
  exit 1
}

Write-Output "Reading .env.local..."
$envLines = Get-Content ".env.local" | Where-Object { $_ -match "^[A-Z_]+=" -and -not ($_ -match "^\s*#") }

foreach ($line in $envLines) {
  $idx = $line.IndexOf("=")
  if ($idx -lt 0) { continue }
  $key = $line.Substring(0, $idx).Trim()
  $value = $line.Substring($idx + 1).Trim()
  if (-not $value) {
    Write-Output "skipping $key (empty)"
    continue
  }
  Write-Output "Setting $key on production + preview + development..."
  # Remove existing (if any) so we can re-add
  vercel env rm $key production --yes 2>$null | Out-Null
  vercel env rm $key preview --yes 2>$null | Out-Null
  vercel env rm $key development --yes 2>$null | Out-Null
  # Add for all three targets
  $value | vercel env add $key production
  $value | vercel env add $key preview
  $value | vercel env add $key development
}

Write-Output "`nDone. All env vars synced to Vercel."
Write-Output "Now run: vercel deploy --prod"
