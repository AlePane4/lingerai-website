import os from "node:os";
import type { NextConfig } from "next";

// node_modules and .next are junctions to a folder outside OneDrive
// (~/dev-cache/lingerai), so the build root must include both locations.
const buildRoot = os.homedir();

const ONE_YEAR = 31536000;

// cacheComponents is intentionally off: the site is fully static (local data),
// and Activity-preserved routes would keep modal <dialog>s mounted while hidden.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: buildRoot },
  outputFileTracingRoot: buildRoot,
  // Editorial photos: AVIF first, WebP fallback (visual-guidelines §6).
  // Source photos are at most 1500x2000 / 2000x1125, so larger variants add nothing.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: ONE_YEAR,
    deviceSizes: [640, 828, 1080, 1280, 1600],
    imageSizes: [256, 384],
  },
  // Static images: long cache (rename a file when its content changes).
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` }],
      },
    ];
  },
};

export default nextConfig;
