import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://rentaboat-budva.com";

const tourSlugs = {
  en: ["panoramic-tour", "sveti-stefan-tour", "petrovac-tour", "blue-cave-tour"],
  sr: ["panoramska-tura", "sveti-stefan-tura", "petrovac-tura", "blue-cave-tura"],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const staticPages = [
    { en: "", sr: "" },
    { en: "tours", sr: "ture" },
    { en: "destinations", sr: "destinacije" },
    { en: "faq", sr: "faq" },
    { en: "contact", sr: "kontakt" },
    { en: "about", sr: "o-nama" },
    { en: "legal/terms", sr: "pravno/uslovi-koriscenja" },
    { en: "legal/privacy", sr: "pravno/politika-privatnosti" },
  ];

  for (const page of staticPages) {
    entries.push({
      url: `${BASE_URL}/en/${page.en}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${BASE_URL}/en/${page.en}`,
          sr: `${BASE_URL}/sr/${page.sr}`,
        },
      },
    });
  }

  // Tour detail pages
  for (let i = 0; i < tourSlugs.en.length; i++) {
    entries.push({
      url: `${BASE_URL}/en/tours/${tourSlugs.en[i]}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${BASE_URL}/en/tours/${tourSlugs.en[i]}`,
          sr: `${BASE_URL}/sr/ture/${tourSlugs.sr[i]}`,
        },
      },
    });
  }

  return entries;
}
