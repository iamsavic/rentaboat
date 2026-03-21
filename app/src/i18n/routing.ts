import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "sr"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/tours": {
      en: "/tours",
      sr: "/ture",
    },
    "/tours/[slug]": {
      en: "/tours/[slug]",
      sr: "/ture/[slug]",
    },
    "/booking": {
      en: "/booking",
      sr: "/rezervacija",
    },
    "/booking/confirmation": {
      en: "/booking/confirmation",
      sr: "/rezervacija/potvrda",
    },
    "/destinations": {
      en: "/destinations",
      sr: "/destinacije",
    },
    "/faq": "/faq",
    "/contact": {
      en: "/contact",
      sr: "/kontakt",
    },
    "/about": {
      en: "/about",
      sr: "/o-nama",
    },
    "/legal/terms": {
      en: "/legal/terms",
      sr: "/pravno/uslovi-koriscenja",
    },
    "/legal/privacy": {
      en: "/legal/privacy",
      sr: "/pravno/politika-privatnosti",
    },
    "/legal/cookies": {
      en: "/legal/cookies",
      sr: "/pravno/politika-kolacica",
    },
  },
});
