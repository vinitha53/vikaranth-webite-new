import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
export default function nextConfig(phase) {
  return {
    images: { unoptimized: true },
    output: "export",
    // Keep the live preview isolated from production build output.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : "dist",
    trailingSlash: true
  };
}
