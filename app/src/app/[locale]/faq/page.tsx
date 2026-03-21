"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = {
  en: {
    tours: {
      label: "About Tours",
      items: [
        { q: "What is included in the price?", a: "The skipper, fuel, and a welcome drink are always included in every tour. You can also stop for swimming wherever you like." },
        { q: "Do I need a boat license?", a: "No license is needed. An experienced skipper is always on board. You just enjoy the ride." },
        { q: "How many people can fit on the boat?", a: "Each tour accommodates up to 7 people. Private groups only — no shared tours." },
        { q: "Is the skipper included in all tours?", a: "Yes, always. No tour is available without a skipper." },
        { q: "Can I make swimming stops?", a: "Yes! You can stop wherever you like during the tour. The skipper knows all the best spots." },
      ],
    },
    booking: {
      label: "Booking & Payment",
      items: [
        { q: "How do I book?", a: "Choose a tour, select a date and time, fill in your details and send the request. We'll confirm by email." },
        { q: "When do I receive confirmation?", a: "We'll confirm your booking as soon as possible, usually within a few hours." },
        { q: "How do I pay?", a: "Payment is made in cash at Budva Marina before departure. No online payment is required." },
        { q: "Is a deposit required?", a: "No deposit is required for our current tour packages (max 3h). A deposit is required only for custom tours longer than 4 hours." },
      ],
    },
    arrival: {
      label: "On the Day",
      items: [
        { q: "Where is the departure point?", a: "All tours depart from Budva Marina. You'll receive the exact meeting point in your confirmation email." },
        { q: "When should I arrive?", a: "Please arrive at least 10 minutes before your scheduled departure time." },
        { q: "What should I bring?", a: "Bring a valid ID or passport, cash for payment, swimwear and a towel, and sunscreen." },
        { q: "Can I bring children?", a: "Yes, children are welcome! Please mention any children when booking." },
        { q: "Can I bring food and drinks?", a: "Yes, you're welcome to bring snacks and drinks. A welcome drink is already included." },
      ],
    },
    weather: {
      label: "Weather",
      items: [
        { q: "What if the weather is bad?", a: "Your safety is our top priority. If conditions are unsafe for sailing, we'll contact you to reschedule or discuss options. Decisions are made on the day of the tour." },
      ],
    },
  },
  sr: {
    tours: {
      label: "O turama",
      items: [
        { q: "Šta je uključeno u cenu?", a: "Skipper, gorivo i voda dobrodošlice su uvek uključeni u svaku turu. Možete se zaustaviti za plivanje gde god želite." },
        { q: "Da li mi je potrebna dozvola za plovidbu?", a: "Dozvola nije potrebna. Iskusni skipper je uvek na brodu. Vi se samo uživate u vožnji." },
        { q: "Koliko osoba može biti na brodu?", a: "Svaka tura prima do 7 osoba. Isključivo privatne grupe — bez deljenih tura." },
        { q: "Da li je skipper uključen u svim turama?", a: "Da, uvek. Nijedna tura nije dostupna bez skipera." },
        { q: "Mogu li se zaustaviti za plivanje?", a: "Da! Možete se zaustaviti gde god želite tokom ture. Skipper zna sva najlepša mesta." },
      ],
    },
    booking: {
      label: "Rezervacija i plaćanje",
      items: [
        { q: "Kako da rezervišem?", a: "Izaberite turu, datum i vreme, unesite svoje podatke i pošaljite zahtev. Potvrda stiže emailom." },
        { q: "Kada dobijam potvrdu?", a: "Potvrđujemo rezervaciju što je pre moguće, obično u roku od nekoliko sati." },
        { q: "Kako se plaća?", a: "Plaćanje se vrši keš na Budva Marini pre polaska. Online plaćanje nije potrebno." },
        { q: "Da li je potreban depozit?", a: "Depozit nije potreban za naše trenutne pakete tura (maks. 3h). Depozit se traži samo za custom ture duže od 4 sata." },
      ],
    },
    arrival: {
      label: "Na dan ture",
      items: [
        { q: "Gde je polazna tačka?", a: "Sve ture polaze sa Budva Marine. Tačno mesto susreta dobijate u email potvrdi." },
        { q: "Kada da dođem?", a: "Molimo budite na lokaciji najmanje 10 minuta pre planiranog polaska." },
        { q: "Šta da ponesem?", a: "Ponesite ličnu kartu ili pasoš, novac za plaćanje, kupaći kostim i peškir, kremu za sunce." },
        { q: "Mogu li povesti decu?", a: "Da, deca su dobrodošla! Navedite broj dece pri rezervaciji." },
        { q: "Mogu li poneti hranu i piće?", a: "Da, možete poneti grickalice i pića. Voda dobrodošlice je već uključena u cenu." },
      ],
    },
    weather: {
      label: "Vremenski uslovi",
      items: [
        { q: "Šta ako su vremenski uslovi loši?", a: "Vaša bezbednost je naš prioritet. Ako uslovi nisu bezbedni za plovidbu, kontaktiraćemo vas da preselimo termin ili razgovaramo o opcijama. Odluka se donosi na dan ture." },
      ],
    },
  },
};

export default function FAQPage() {
  const locale = useLocale() as "en" | "sr";
  const t = useTranslations("faq");
  const data = faqData[locale];
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 text-center">{t("title")}</h1>
        <p className="text-slate-500 text-center mb-10">Budva Marina Speedboat Tours</p>

        <div className="space-y-8">
          {Object.entries(data).map(([catKey, category]) => (
            <div key={catKey}>
              <h2 className="text-lg font-bold text-slate-700 mb-3 pb-2 border-b border-slate-200">
                {category.label}
              </h2>
              <div className="space-y-2">
                {category.items.map((item, i) => {
                  const key = `${catKey}-${i}`;
                  const open = openKey === key;
                  return (
                    <div key={key} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                      <button
                        onClick={() => setOpenKey(open ? null : key)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-semibold text-slate-800 text-sm sm:text-base">{item.q}</span>
                        {open ? <ChevronUp className="h-4 w-4 text-sky-600 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />}
                      </button>
                      {open && (
                        <div className="px-5 pb-4 pt-1 text-slate-600 text-sm leading-relaxed bg-slate-50 border-t border-slate-100">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
