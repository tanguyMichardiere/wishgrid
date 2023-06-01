/** @type {{ headers: import('next/dist/lib/load-custom-routes').Header["headers"] }} */
module.exports = {
  headers: [
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "X-XSS-Protection",
      value: "1; mode=block",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      // https://www.w3.org/TR/permissions-policy-1/
      key: "Permissions-Policy",
      value: "",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "Referrer-Policy",
      value: "origin-when-cross-origin",
    },
    {
      key:
        process.env.NODE_ENV === "production"
          ? "Content-Security-Policy"
          : "Content-Security-Policy-Report-Only",
      value: Object.entries({
        "default-src": ["'self'"],
        "connect-src": ["'self'", "*.clerk.accounts.dev"],
        "img-src": ["'self'", "img.clerk.com"],
        "script-src": ["'self'", "'unsafe-eval'", "'unsafe-inline'", "*.clerk.accounts.dev"],
        "worker-src": ["'self'", "blob:"],
        "style-src": ["'self'", "'unsafe-inline'"],
      })
        .map(([key, value]) => `${key} ${value.join(" ")}`)
        .join("; "),
    },
  ],
};
