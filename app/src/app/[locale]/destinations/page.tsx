import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const destinations = [
  {
    id: "blue-lagoon",
    nameEn: "Blue Lagoon",
    nameSr: "Plava laguna",
    descEn: "A hidden paradise just minutes from Budva. Crystal-clear turquoise water sheltered by pine trees — perfect for swimming and snorkeling.",
    descSr: "Skriveni raj samo nekoliko minuta od Budve. Kristalno bistre tirkizne vode zaštićene borovim stablima — savršeno za plivanje i ronjenje.",
    toursEn: ["Panoramic Tour", "Sveti Stefan Tour", "Petrovac Tour"],
    toursSr: ["Panoramska tura", "Sveti Stefan tura", "Petrovac tura"],
    tourSlugEn: "panoramic-tour",
    emoji: "🏖️",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: "calypso-cave",
    nameEn: "Calypso Cave (Jaz Beach Cave)",
    nameSr: "Kalijpso pećina (pećina kod plaže Jaz)",
    descEn: "A mysterious sea cave near Jaz Beach, accessible only by boat. The play of light inside the cave is truly magical.",
    descSr: "Misteriozna morska pećina kod plaže Jaz, dostupna samo čamcem. Igra svetlosti unutar pećine je zaista čarobna.",
    toursEn: ["Panoramic Tour", "Sveti Stefan Tour", "Petrovac Tour"],
    toursSr: ["Panoramska tura", "Sveti Stefan tura", "Petrovac tura"],
    tourSlugEn: "panoramic-tour",
    emoji: "🌊",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "st-nicholas-island",
    nameEn: "St. Nicholas Island",
    nameSr: "Ostrvo Sv. Nikole",
    descEn: "The largest island in Montenegro, located just off the coast of Budva. Known for its pristine beaches and clear waters. Locally called 'Hawaii'.",
    descSr: "Najveće ostrvo u Crnoj Gori, smešteno odmah uz obalu Budve. Poznato po neokrnjenim plažama i bistrim vodama. Lokalno zvano 'Havaji'.",
    toursEn: ["Panoramic Tour", "Sveti Stefan Tour", "Petrovac Tour"],
    toursSr: ["Panoramska tura", "Sveti Stefan tura", "Petrovac tura"],
    tourSlugEn: "panoramic-tour",
    emoji: "🏝️",
    color: "from-emerald-400 to-teal-600",
  },
  {
    id: "sveti-stefan",
    nameEn: "Sveti Stefan",
    nameSr: "Sveti Stefan",
    descEn: "One of the most photographed sights on the Adriatic — a 15th-century fortified village on a tiny island, connected to the mainland by a narrow causeway.",
    descSr: "Jedan od najfotografisanijih prizora na Jadranu — utvrđeno selo iz 15. veka na malom ostrvu, spojeno s kopnom uskim putem.",
    toursEn: ["Sveti Stefan Tour", "Petrovac Tour"],
    toursSr: ["Sveti Stefan tura", "Petrovac tura"],
    tourSlugEn: "sveti-stefan-tour",
    emoji: "🏰",
    color: "from-orange-400 to-rose-500",
  },
  {
    id: "petrovac",
    nameEn: "Petrovac",
    nameSr: "Petrovac",
    descEn: "A charming coastal town with a beautiful sandy beach and a historic Venetian fortress. The bay is a perfect swimming spot accessible only from the sea.",
    descSr: "Šarmantni priobalni grad sa lepom peščanom plažom i istorijskim mletačkim utvrđenjem. Zaliv je savršeno mesto za kupanje, dostupno samo s mora.",
    toursEn: ["Petrovac Tour"],
    toursSr: ["Petrovac tura"],
    tourSlugEn: "petrovac-tour",
    emoji: "⚓",
    color: "from-violet-400 to-purple-600",
  },
  {
    id: "blue-cave",
    nameEn: "Blue Cave",
    nameSr: "Plava pećina (Blue Cave)",
    descEn: "A stunning natural sea cave where sunlight refracts through the water creating an ethereal blue glow. One of the most magical natural wonders on the Montenegrin coast.",
    descSr: "Zadivljujuća prirodna morska pećina u kojoj sunčeva svetlost prelamanjem kroz vodu stvara eterično plavo sijanje. Jedno od najčarobnijih prirodnih čuda crnogorskog primorja.",
    toursEn: ["Blue Cave Tour"],
    toursSr: ["Blue Cave tura"],
    tourSlugEn: "blue-cave-tour",
    emoji: "💙",
    color: "from-sky-400 to-blue-700",
  },
];

export default function DestinationsPage() {
  return (
    <DestinationsContent />
  );
}

function DestinationsContent() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Destinations</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Every tour includes stops at some of the most beautiful spots on the Montenegrin coast.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
              <div className={`h-32 bg-gradient-to-br ${dest.color} flex items-center justify-center`}>
                <span className="text-5xl">{dest.emoji}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-bold text-slate-900 mb-2">{dest.nameEn}</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{dest.descEn}</p>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">Included in</p>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.toursEn.map((t) => (
                      <span key={t} className="text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
