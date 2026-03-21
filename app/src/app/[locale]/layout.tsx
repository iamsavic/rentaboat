import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

const geist = Geist({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title: {
      default: "Rent-a-Boat Budva",
      template: "%s | Rent-a-Boat Budva",
    },
    description: t("subtitle"),
    alternates: {
      languages: {
        en: "/en",
        sr: "/sr",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "sr")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <OrganizationJsonLd />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="sr" href="/sr" />
        <link rel="alternate" hrefLang="x-default" href="/en" />
      </head>
      <body className={geist.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
