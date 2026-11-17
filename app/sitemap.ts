import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://luxoravilla.com";
  const now = new Date();

  return [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // {
    //   url: `${baseUrl}/3d`,
    //   lastModified: now,
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    {
      url: `${baseUrl}/book`,
      lastModified: now,
      changeFrequency: "always",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
