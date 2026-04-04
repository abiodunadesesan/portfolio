import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Avoid Next.js inferring the workspace root from other lockfiles
   * (e.g. `~/package-lock.json`) which can break tracing and spam warnings.
   */
  outputFileTracingRoot: new URL(".", import.meta.url).pathname,
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
