// HACK: @next/bundle-analyzer provides type definitions, but its exported function returns any

declare module "@next/bundle-analyzer" {
  declare function withBundleAnalyzer(pluginOptions: {
    enabled?: boolean;
    openAnalyzer?: boolean;
  }): <T>(nextConfig: T) => T;

  export = withBundleAnalyzer;
}
