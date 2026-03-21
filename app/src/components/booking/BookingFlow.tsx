"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Step1Time from "./Step1Time";
import Step2Details from "./Step2Details";
import Step3Review from "./Step3Review";
import { formatPrice, formatDuration } from "@/lib/utils";

type Tour = {
  id: string;
  nameSr: string;
  nameEn: string;
  slugEn: string;
  priceEur: number;
  durationHours: number;
  requiresDeposit: boolean;
  depositAmount: number | null;
  vessel: {
    id: string;
    capacity: number;
    location: {
      name: string;
      address: string;
      googleMapsUrl: string;
      whatsappNumber: string;
      contactPhone: string;
    };
  };
};

type BookingData = {
  tourId: string;
  vesselId: string;
  date: string;
  startTime: string;
  persons: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
};

interface BookingFlowProps {
  tour: Tour | null;
  initialData: {
    tourSlug: string;
    date: string;
    time: string;
    persons: number;
  };
  locale: string;
}

export default function BookingFlow({ tour, initialData, locale }: BookingFlowProps) {
  const t = useTranslations("booking");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const [data, setData] = useState<Partial<BookingData>>({
    tourId: tour?.id || "",
    vesselId: tour?.vessel.id || "",
    date: initialData.date,
    startTime: initialData.time,
    persons: initialData.persons,
  });

  const tourName = tour ? (locale === "sr" ? tour.nameSr : tour.nameEn) : "";

  const steps = [
    t("step1"),
    t("step2"),
    t("step3"),
  ];

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language: locale.toUpperCase() }),
      });
      const result = await res.json();
      if (res.ok) {
        setBookingRef(result.bookingReference);
      } else {
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (bookingRef) {
    return (
      <ConfirmationInline
        bookingRef={bookingRef}
        firstName={data.firstName || ""}
        email={data.email || ""}
        tour={tour}
        data={data}
        locale={locale}
      />
    );
  }

  if (!tour) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p>Please select a tour first.</p>
        <a href={`/${locale}/tours`} className="mt-4 inline-block text-sky-600 font-medium">
          View Tours →
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((label, i) => (
            <div
              key={i}
              className={`flex items-center gap-1.5 ${i + 1 === step ? "text-sky-600" : i + 1 < step ? "text-green-600" : "text-slate-300"}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                i + 1 < step ? "bg-green-500 border-green-500 text-white" :
                i + 1 === step ? "bg-sky-600 border-sky-600 text-white" :
                "border-slate-200 text-slate-300"
              }`}>
                {i + 1 < step ? "✓" : i + 1}
              </div>
              <span className="hidden sm:block text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full">
          <div
            className="h-full bg-sky-600 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* Tour summary bar */}
      <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-800 text-sm">{tourName}</p>
          <p className="text-xs text-slate-500">{formatDuration(tour.durationHours, locale)}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-sky-600 text-lg">{formatPrice(tour.priceEur)}</p>
          <p className="text-xs text-slate-400">{t("paymentNote")}</p>
        </div>
      </div>

      {step === 1 && (
        <Step1Time
          tour={tour}
          data={data}
          locale={locale}
          onNext={(stepData) => {
            setData((d) => ({ ...d, ...stepData }));
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <Step2Details
          data={data}
          locale={locale}
          onNext={(stepData) => {
            setData((d) => ({ ...d, ...stepData }));
            setStep(3);
          }}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <Step3Review
          tour={tour}
          data={data}
          locale={locale}
          submitting={submitting}
          onSubmit={handleSubmit}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}

function ConfirmationInline({
  bookingRef,
  firstName,
  email,
  tour,
  data,
  locale,
}: {
  bookingRef: string;
  firstName: string;
  email: string;
  tour: Tour | null;
  data: Partial<BookingData>;
  locale: string;
}) {
  const t = useTranslations("confirmation");

  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🚤</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t("title")}</h1>
      <p className="text-slate-500 mb-6">{t("subtitle", { name: firstName })}</p>

      <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 mb-6 text-left space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">{t("reference")}</span>
          <span className="font-bold text-sky-700 font-mono">{bookingRef}</span>
        </div>
        {tour && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Tour</span>
            <span className="font-medium text-slate-800">
              {locale === "sr" ? tour.nameSr : tour.nameEn}
            </span>
          </div>
        )}
        {data.date && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Date</span>
            <span className="font-medium text-slate-800">{data.date} {data.startTime}</span>
          </div>
        )}
      </div>

      <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-left">
        <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">{t("preArrival")}</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>📍 <a href={tour?.vessel.location.googleMapsUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-sky-600 underline">Budva Marina</a></li>
          <li>⏰ {t("timing")}</li>
          <li>🎒 {t("bringItems")}: {t("bringList")}</li>
          <li>📞 {t("contact")}: <a href={`tel:${tour?.vessel.location.contactPhone}`} className="text-sky-600">{tour?.vessel.location.contactPhone}</a></li>
        </ul>
      </div>

      <p className="text-sm text-slate-500 mb-6">{t("emailSent", { email })}</p>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`/${locale}`}
          className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors"
        >
          {t("backHome")}
        </a>
        <a
          href={`/${locale}/tours`}
          className="flex-1 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm transition-colors"
        >
          {t("viewTours")}
        </a>
      </div>
    </div>
  );
}
