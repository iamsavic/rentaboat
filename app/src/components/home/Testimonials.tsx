import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    country: "🇬🇧 United Kingdom",
    text: "Absolutely amazing experience! The skipper was friendly and knowledgeable. The Blue Cave tour was breathtaking. Will definitely book again next summer!",
    stars: 5,
  },
  {
    name: "Marco R.",
    country: "🇮🇹 Italy",
    text: "Best way to see the Montenegrin coast. The 3-hour tour to Petrovac was perfect. Great value, everything included, no hidden costs.",
    stars: 5,
  },
  {
    name: "Jelena P.",
    country: "🇷🇸 Serbia",
    text: "Rezervacija je bila super jednostavna. Skipper je bio odličan, znao je sve o destinacijama. Panoramska tura — idealna za popodne!",
    stars: 5,
  },
  {
    name: "Thomas K.",
    country: "🇩🇪 Germany",
    text: "The Sveti Stefan tour exceeded all expectations. Crystal clear water, stunning scenery. The welcome drink was a nice touch!",
    stars: 5,
  },
];

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-slate-900 text-sm">{review.name}</p>
                <p className="text-slate-400 text-xs">{review.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
