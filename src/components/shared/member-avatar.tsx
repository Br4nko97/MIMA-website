import { cn } from "@/lib/utils/cn";

/**
 * Member avatar with always-available SVG gradient placeholder.
 * If `src` is provided AND loadable, an <img> overlays the placeholder.
 * Otherwise the gradient + monogram remain visible.
 *
 * Uses ImgWithFallback pattern to avoid Next.js Image 404 hard-errors:
 * we render a bare <img> so missing files quietly fall back to the SVG.
 */

interface MemberAvatarProps {
  nickname: string;
  src?: string | null;
  className?: string;
  rounded?: "full" | "lg" | "xl" | "card";
  showMonogram?: boolean;
}

function hashHue(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % 360;
}

export function MemberAvatar({
  nickname,
  src,
  className,
  rounded = "card",
  showMonogram = true,
}: MemberAvatarProps) {
  const monogram = nickname.charAt(0).toUpperCase();
  const hue = hashHue(nickname);
  const hue2 = (hue + 60) % 360;
  const radius =
    rounded === "full"
      ? "rounded-full"
      : rounded === "lg"
        ? "rounded-2xl"
        : rounded === "xl"
          ? "rounded-3xl"
          : "rounded-[var(--radius)]";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[var(--color-bg-2)]",
        radius,
        className,
      )}
      aria-label={`${nickname} avatar`}
    >
      {/* Gradient background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, hsl(${hue} 65% 55% / 0.9), transparent 55%),
            radial-gradient(ellipse at 75% 80%, hsl(${hue2} 70% 45% / 0.85), transparent 55%),
            linear-gradient(135deg, #0c0c11 0%, #1c1c26 100%)`,
        }}
      />

      {/* Light noise */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Monogram */}
      {showMonogram ? (
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center font-display text-[28vw] font-black tracking-tighter text-white/[0.08] sm:text-[12rem]"
        >
          {monogram}
        </span>
      ) : null}

      {/* Optional real image overlay */}
      {src ? (
        <img
          src={src}
          alt={`${nickname}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : null}

      {/* Subtle inner border + aura glow */}
      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.05]" />
    </div>
  );
}
