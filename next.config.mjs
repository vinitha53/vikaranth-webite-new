/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  output: "export",
  distDir: process.env.NODE_ENV === "production" ? "dist" : ".next",
  trailingSlash: true
};

export default nextConfig;
