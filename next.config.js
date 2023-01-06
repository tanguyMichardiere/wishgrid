// ensure all environment variables are defined at build time
require("./src/env/server");

// HACK: @trivago/prettier-plugin-sort-imports locks the @babel/parser version
// we have to override the version in package.json
// https://github.com/trivago/prettier-plugin-sort-imports/issues/156

const { headers } = require("./headers.config");

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  /** @param {import('webpack').Configuration} config */
  // webpack(config) {
  //   return config;
  // },
  // TODO: remove when no more experimental features
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
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

nextConfig = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
})(nextConfig);

nextConfig = require("next-axiom").withAxiom(nextConfig);

nextConfig = require("@next/bundle-analyzer")({
  enabled: process.env["ANALYZE"] === "true",
})(nextConfig);

module.exports = nextConfig;
