import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol:"https",
        hostname: "*"
      }
    ]
  },

  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_KEY}/:path*`, // Update this port/path to match your NestJS server
      },
    ];
  },
  
};

export default nextConfig;
