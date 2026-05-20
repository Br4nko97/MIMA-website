import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // First-deploy safety: don't let TS/ESLint errors block the build.
  // Re-enable strict typecheck locally with `pnpm typecheck`.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ndhhfvddcikswvvdrofr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
