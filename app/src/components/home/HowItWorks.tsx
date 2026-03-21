import { useTranslations } from "next-intl";
import { Search, Send, Anchor } from "lucide-react";

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    { icon: Search, title: t("step1Title"), desc: t("step1Desc"), num: "01" },
    { icon: Send, title: t("step2Title"), desc: t("step2Desc"), num: "02" },
    { icon: Anchor, title: t("step3Title"), desc: t("step3Desc"), num: "03" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-px bg-slate-200 -z-0" />

          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center relative z-10">
              <div className="w-20 h-20 bg-sky-50 border-2 border-sky-100 rounded-2xl flex items-center justify-center mb-4 relative">
                <step.icon className="h-8 w-8 text-sky-600" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-sky-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {step.num.slice(-1)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
