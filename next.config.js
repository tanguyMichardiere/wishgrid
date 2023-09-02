// ensure all environment variables are defined at build time
require("./src/env");

const { headers } = require("./headers.config");

/** @type {import("next").NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ["img.clerk.com", "www.gravatar.com"],
  },
  headers() {
    return Promise.resolve([
      {
        source: "/:path*",
        headers,
      },
    ]);
  },
};

nextConfig = require("next-axiom").withAxiom(nextConfig);

nextConfig = require("@next/bundle-analyzer")({
  enabled: process.env["ANALYZE"] === "true",
})(nextConfig);

module.exports = nextConfig;
