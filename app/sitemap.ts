import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio-bagas.vercel.app";
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          id: `${baseUrl}?lang=id`,
          en: `${baseUrl}?lang=en`,
        },
      },
    },
  ];
}
