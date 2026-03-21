import { useTranslations } from "next-intl";
import { User, Fuel, Droplets, Waves } from "lucide-react";

const features = [
  { icon: User, key: "skipper" },
  { icon: Fuel, key: "fuel" },
  { icon: Droplets, key: "water" },
  { icon: Waves, key: "swimming" },
] as const;

export default function IncludedFeatures() {
  const t = useTranslations("included");

  return (
    <section className="py-14 bg-sky-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sky-100 text-sm font-semibold uppercase tracking-widest mb-8">
          {t("title")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <span className="text-white font-semibold text-sm sm:text-base">
                {t(key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
