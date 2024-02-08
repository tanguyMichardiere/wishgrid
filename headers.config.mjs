const self = "'self'";
const data = "data:";
const unsafeEval = "'unsafe-eval'";
const unsafeInline = "'unsafe-inline'";

/** @type {Record<string, string[]>} */
const contentSecurityPolicy = {
  "default-src": [self],
  "connect-src": [self, "*.wishgrid.app", "vitals.vercel-insights.com"],
  "img-src": [self, data, "cdn.discordapp.com"],
  "script-src": [self, unsafeEval, unsafeInline, "*.wishgrid.app"],
  "style-src": [self, unsafeInline],
};

/**
 * @param {string} key
 * @param {string} value
 */
function addSrc(key, value) {
  if (key in contentSecurityPolicy) {
    // @ts-expect-error checked the line above
    contentSecurityPolicy[key].push(value);
  } else {
    contentSecurityPolicy[key] = [self, value];
  }
}

if (process.env.NODE_ENV === "development") {
  // fonts are fetched in development but replaced by static files in production
  addSrc("font-src", "fonts.gstatic.com");
  // mock script used only in development
  addSrc("script-src", "va.vercel-scripts.com");
}

/** @type {import("next/dist/lib/load-custom-routes").Header["headers"]} */
export const headers = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "DENY" },
  // https://www.w3.org/TR/permissions-policy-1/
  { key: "Permissions-Policy", value: "web-share=self" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  {
    key:
      process.env.NODE_ENV === "production"
        ? "Content-Security-Policy"
        : "Content-Security-Policy-Report-Only",
    value: Object.entries(contentSecurityPolicy)
      .map(([key, value]) => `${key} ${value.join(" ")}`)
      .join("; "),
  },
];
