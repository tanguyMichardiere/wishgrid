// HACK: next-pwa doesn't provide type definitions

declare module "next-pwa" {
  declare function withPWA(pluginOptions: Record<string, unknown>): <T>(nextConfig: T) => T;

  export = withPWA;
}
