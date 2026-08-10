import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
export default function nextConfig(phase) {
  return {
    images: { unoptimized: true },
    output: "export",
    // Keep the live preview isolated from production build output.
    // A process-specific directory also prevents concurrent local previews
    // from corrupting one another's compiled layout and paint layers.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? `.next-dev-${process.pid}` : "dist",
    trailingSlash: true
  };
}
