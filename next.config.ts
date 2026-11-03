import type { NextConfig } from "next";

// Server-only env (no NEXT_PUBLIC_ prefix): only the Next server needs to know
// where the backend lives. Falls back to the old variable during migration.
const backendUrl = (
  process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL
)?.replace(/\/+$/, "");

if (!backendUrl) {
  throw new Error("BACKEND_URL is not defined");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  async rewrites() {
    return [
      // better-auth routes (login, session, OAuth callbacks)
      {
        source: "/api/auth/:path*",
        destination: `${backendUrl}/api/auth/:path*`,
      },
      // Everything else the app calls on the backend: /backend/follows -> {backend}/follows
      {
        source: "/backend/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;