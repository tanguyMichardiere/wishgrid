const headers = [
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
];

if (process.env.NODE_ENV === "production") {
  const contentSecurityPolicy = {
    // Fetch directives
    "child-src": ["'none'"],
    "connect-src": ["'self'"],
    "default-src": ["'none'"],
    "font-src": ["'self'"],
    "frame-src": ["'none'"],
    "img-src": ["'self'"],
    "manifest-src": ["'self'"],
    "media-src": ["'none'"],
    "object-src": ["'none'"],
    "prefetch-src": ["'self'"],
    // TODO: only needed because some browsers don't support script-src-elem
    // when it's more widely supported: "script-src": ["'none'"]
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src-elem#browser_compatibility
    "script-src": ["'self'"],
    "script-src-elem": [
      "'self'",
      // next-themes
      "'sha256-eMuh8xiwcX72rRYNAGENurQBAcH7kLlAUQcoOri3BIo='",
    ],
    "script-src-attr": ["'none'"],
    // TODO: only needed because some browsers don't support style-src-elem
    // when it's more widely supported: "style-src": ["'none'"]
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src-elem#browser_compatibility
    "style-src": ["'self'"],
    "style-src-elem": [
      "'self'",
      // next-route-announcer
      "'sha256-GNF74DLkXb0fH3ILHgILFjk1ozCF3SNXQ5mQb7WLu/Y='",
      // next/image
      "'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk='",
      // next-auth
      "'sha256-KkLBTP2id6c7TuTX4KBzGRSZ1GQyIsiVeQF9yWOfUR0='",
    ],
    "style-src-attr": ["'none'"],
    "worker-src": ["'self'"],
    // Document directives
    "base-uri": ["'none'"],
    // "sandbox": [],
    // Navigation directives
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "navigate-to": ["'none'"],
    // Other directives
    // TODO: wait until next.js supports trusted types
    // https://github.com/vercel/next.js/discussions/32241
    // "require-trusted-types-for": ["'script'"],
    // "trusted-types": [],
  };

  headers.push({
    key: "Content-Security-Policy",
    value: Object.entries(contentSecurityPolicy)
      .map(([directive, sources]) => `${directive} ${sources.join(" ")};`)
      .join(" "),
  });
}

module.exports = { headers };
