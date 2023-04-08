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
      value: [
        "default-src 'self'",
        "img-src 'self' data: authjs.dev cdn.discordapp.com",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
      ].join("; "),
    },
  ],
};
