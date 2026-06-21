import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_FORMATION_PUBLIC_URL || process.env.NEXT_PUBLIC_APP_URL || "https://formation.koryxa.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/formations/python-data-analyst"],
        disallow: ["/access", "/login", "/register", "/dashboard", "/modules", "/certificate", "/admin", "/api"],
      },
    ],
    sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
