import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.pexels.com", "res.cloudinary.com"],
  },
  /* config options here */
};

export default nextConfig;
