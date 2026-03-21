import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section className="py-20 bg-sky-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent_60%)]" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {t("title")}
        </h2>
        <p className="text-sky-100 text-lg mb-8">{t("subtitle")}</p>
        <Link
          href={`/${locale}/tours`}
          className="inline-flex items-center gap-2 bg-white text-sky-700 hover:bg-sky-50 font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
        >
          {t("button")}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
