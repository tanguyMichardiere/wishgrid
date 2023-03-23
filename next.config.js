// ensure all environment variables are defined at build time
require("./src/env");

const { headers } = require("./headers.config");

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  headers() {
    return Promise.resolve([
      {
        source: "/:path*",
        headers,
      },
    ]);
  },
};

nextConfig = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
})(nextConfig);

nextConfig = require("next-axiom").withAxiom(nextConfig);

nextConfig = require("@next/bundle-analyzer")({
  enabled: process.env["ANALYZE"] === "true",
})(nextConfig);

module.exports = nextConfig;
