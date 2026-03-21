"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqItems = {
  en: [
    {
      q: "What is included in the price?",
      a: "The skipper, fuel, and a welcome drink are always included. You just pay the listed price — no hidden fees.",
    },
    {
      q: "Do I need a boat license?",
      a: "No license needed! An experienced skipper is always on board. You just sit back and enjoy the ride.",
    },
    {
      q: "How do I pay?",
      a: "Payment is made in cash at Budva Marina before departure. No online payment is required.",
    },
    {
      q: "Can I choose my departure time?",
      a: "Yes! You choose the date and starting time during booking. Available slots are shown in real time.",
    },
    {
      q: "What happens if the weather is bad?",
      a: "Your safety is our priority. If conditions are unsafe, we will reschedule or cancel the tour. We will contact you as soon as possible.",
    },
  ],
  sr: [
    {
      q: "Šta je uključeno u cenu?",
      a: "Skipper, gorivo i voda dobrodošlice su uvek uključeni. Plaćate samo navedenu cenu — bez skrivenih troškova.",
    },
    {
      q: "Da li mi je potrebna dozvola za plovidbu?",
      a: "Nije potrebna nikakva dozvola! Iskusni skipper je uvek na brodu. Vi se samo opustite i uživajte.",
    },
    {
      q: "Kako se plaća?",
      a: "Plaćanje se vrši keš na Budva Marini pre polaska. Online plaćanje nije potrebno.",
    },
    {
      q: "Mogu li da izaberem vreme polaska?",
      a: "Da! Birate datum i vreme polaska tokom rezervacije. Slobodni termini su prikazani u realnom vremenu.",
    },
    {
      q: "Šta se dešava ako su vremenski uslovi loši?",
      a: "Vaša bezbednost je naš prioritet. Ako uslovi nisu bezbedni, promenićemo termin ili otkazati turu. Kontaktiraćemo vas što je pre moguće.",
    },
  ],
};

export default function FAQPreview() {
  const t = useTranslations("faqPreview");
  const locale = useLocale() as "en" | "sr";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = faqItems[locale];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">
          {t("title")}
        </h2>

        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-800 text-sm sm:text-base">
                  {item.q}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-4 w-4 text-sky-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3 bg-slate-50">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={`/${locale}/faq`}
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm"
          >
            {t("viewAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
