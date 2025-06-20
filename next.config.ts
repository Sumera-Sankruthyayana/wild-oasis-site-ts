import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msnsylrplvaeumnytobr.supabase.co",
        pathname: "/storage/v1/object/sign/cabin-images/**",
      },
    ],
  },
};

export default nextConfig;
