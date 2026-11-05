import os from "node:os";
import type { NextConfig } from "next";

// node_modules and .next are junctions to a folder outside OneDrive
// (~/dev-cache/lingerai), so the build root must include both locations.
const buildRoot = os.homedir();

// cacheComponents is intentionally off: the site is fully static (local data),
// and Activity-preserved routes would keep modal <dialog>s mounted while hidden.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: buildRoot },
  outputFileTracingRoot: buildRoot,
};

export default nextConfig;
