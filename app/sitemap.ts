import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://porto-bagas-app.vercel.app";
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          id: `${baseUrl}?lang=id`,
          en: `${baseUrl}?lang=en`,
          "x-default": baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/cv.pdf`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

