// ensure all environment variables are defined at build time
require("./src/env");

const { headers } = require("./headers.config");

/** @type {import("next").NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // type checking is done in CI
  typescript: { ignoreBuildErrors: true },
  // linting is done in CI
  eslint: { ignoreDuringBuilds: true },
  images: { domains: ["authjs.dev", "cdn.discordapp.com"] },
  headers() {
    return Promise.resolve([{ source: "/:path*", headers }]);
  },
  experimental: { serverComponentsExternalPackages: ["pino"] },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.devtool = "source-map";
    }
    return config;
  },
};

nextConfig = require("next-intl/plugin")()(nextConfig);

nextConfig = require("@next/bundle-analyzer")({
  enabled: process.env["ANALYZE"] === "true",
})(nextConfig);

module.exports = nextConfig;
