import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-speedboat.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
          Budva Marina, Montenegro
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
          {t("title")}
        </h1>

        <p className="text-lg sm:text-xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
          >
            {t("ctaTours")}
          </Link>
          <Link
            href={`/${locale}/tours`}
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all backdrop-blur-sm"
          >
            {t("ctaBook")}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>
    </section>
  );
}
