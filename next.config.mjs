import withNextBundleAnalyzer from "@next/bundle-analyzer";
import createJiti from "jiti";
import withNextIntl from "next-intl/plugin";
import { headers } from "./headers.config.mjs";

const jiti = createJiti(new URL(import.meta.url).pathname);
// ensure all environment variables are defined at build time
jiti("./src/env");

/** @type {import("next").NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // type checking is done in CI
  typescript: { ignoreBuildErrors: true },
  // linting is done in CI
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.discordapp.com", port: "", pathname: "/avatars/**" },
    ],
  },
  headers() {
    return Promise.resolve([{ source: "/:path*", headers }]);
  },
  /** @param {import("webpack").Configuration} config */
  webpack(config) {
    config.experiments ??= {};
    config.experiments.asyncWebAssembly = true;
    return config;
  },
  experimental: { serverComponentsExternalPackages: ["docx", "pdfkit"] },
};

nextConfig = withNextIntl()(nextConfig);

nextConfig = withNextBundleAnalyzer({
  enabled: process.env["ANALYZE"] === "true",
})(nextConfig);

export default nextConfig;
