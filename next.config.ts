import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Hosts other than localhost that may load dev-server scripts. 127.0.0.1 is
  // the fallback when a browser has cached an https redirect for localhost.
  allowedDevOrigins: ["127.0.0.1", "192.168.1.111"],
};

export default nextConfig;
