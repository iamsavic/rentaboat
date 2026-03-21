"use client";

import { useTranslations } from "next-intl";
import { formatPrice, formatDuration } from "@/lib/utils";
import { ArrowLeft, Send, AlertCircle } from "lucide-react";

interface Step3Props {
  tour: {
    nameSr: string;
    nameEn: string;
    priceEur: number;
    durationHours: number;
    requiresDeposit: boolean;
    depositAmount: number | null;
  };
  data: Record<string, unknown>;
  locale: string;
  submitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step3Review({ tour, data, locale, submitting, onSubmit, onBack }: Step3Props) {
  const t = useTranslations("booking");

  const tourName = locale === "sr" ? tour.nameSr : tour.nameEn;

  const rows = [
    { label: t("tour"), value: tourName },
    { label: t("date"), value: `${data.date}` },
    { label: t("time"), value: `${data.startTime}` },
    { label: t("duration"), value: formatDuration(tour.durationHours, locale) },
    { label: t("persons"), value: `${data.persons}` },
    { label: "Name", value: `${data.firstName} ${data.lastName}` },
    { label: t("email"), value: `${data.email}` },
    { label: t("phone"), value: `${data.phone}` },
    { label: "Country", value: `${data.country}` },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-4">{t("step3")}</h2>

        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between py-2 border-b border-slate-50 last:border-0 text-sm">
              <span className="text-slate-500">{row.label}</span>
              <span className="font-medium text-slate-800 text-right">{row.value}</span>
            </div>
          ))}
          {!!data.notes && (
            <div className="py-2 text-sm">
              <span className="text-slate-500 block mb-1">Notes</span>
              <span className="text-slate-700">{String(data.notes)}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="mt-4 bg-sky-50 border border-sky-100 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">{t("totalPrice")}</span>
            <span className="text-2xl font-bold text-sky-600">{formatPrice(tour.priceEur)}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">{t("paymentNote")}</p>
        </div>

        {/* Deposit notice */}
        {tour.requiresDeposit && tour.depositAmount && (
          <div className="flex gap-2 mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              {t("depositNote", { amount: formatPrice(tour.depositAmount) })}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="flex items-center gap-1.5 px-5 py-4 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="flex-1 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-400 text-white font-bold py-4 rounded-xl transition-colors text-base"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </span>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t("sendRequest")}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
