import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_FORMATION_PUBLIC_URL || process.env.NEXT_PUBLIC_APP_URL || "https://formation.koryxa.fr").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/formations/python-data-analyst`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
