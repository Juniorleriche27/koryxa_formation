/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.koryxa.fr https://clerk.koryxa.fr https://challenges.cloudflare.com https://*.protect.clerk.com",
      "style-src 'self' 'unsafe-inline' https://accounts.koryxa.fr https://clerk.koryxa.fr",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-src 'self' https://challenges.cloudflare.com https://*.protect.clerk.com",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://accounts.koryxa.fr",
    ].join("; "),
  },
];

const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  async headers() {
    return [
      {
        source: "/pyodide/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
