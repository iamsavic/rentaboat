"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { format, parse } from "date-fns";
import AvailabilityCalendar from "../tours/AvailabilityCalendar";
import { Users, AlertCircle, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Step1Props {
  tour: {
    vessel: { id: string; capacity: number };
    durationHours: number;
    priceEur: number;
    requiresDeposit: boolean;
    depositAmount: number | null;
  };
  data: Record<string, unknown>;
  locale: string;
  onNext: (data: { date: string; startTime: string; persons: number }) => void;
}

export default function Step1Time({ tour, data, locale, onNext }: Step1Props) {
  const t = useTranslations("booking");
  const tA = useTranslations("availability");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() =>
    data.date
      ? parse(data.date as string, "yyyy-MM-dd", new Date())
      : undefined
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(data.startTime as string);
  const [persons, setPersons] = useState<number>((data.persons as number) || 2);

  const canContinue = !!selectedDate && !!selectedTime;

  const handleSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-4">{t("step1")}</h2>

        {/* Persons */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Users className="h-4 w-4 text-sky-500" />
            {tA("persons")}
          </label>
          <div className="flex items-center gap-4 border border-slate-200 rounded-xl px-4 py-3 w-fit">
            <button
              type="button"
              onClick={() => setPersons((p) => Math.max(1, p - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 font-bold text-lg transition-colors"
            >
              −
            </button>
            <span className="text-slate-900 font-bold text-xl w-8 text-center">{persons}</span>
            <button
              type="button"
              onClick={() => setPersons((p) => Math.min(tour.vessel.capacity, p + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 font-bold text-lg transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {tA("maxCapacity", { count: tour.vessel.capacity })}
          </p>
        </div>

        {/* Calendar */}
        <AvailabilityCalendar
          vesselId={tour.vessel.id}
          tourDuration={tour.durationHours}
          onSelect={handleSelect}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />

        {/* Deposit notice */}
        {tour.requiresDeposit && tour.depositAmount && (
          <div className="flex gap-2 mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              {t("depositNote", { amount: formatPrice(tour.depositAmount) })}
            </p>
          </div>
        )}
      </div>

      {/* Price summary */}
      {canContinue && (
        <div className="bg-slate-50 rounded-xl p-4 text-sm flex items-center justify-between">
          <div className="text-slate-600">
            <p>{selectedDate && format(selectedDate, "EEEE, MMM d")} at {selectedTime}</p>
            <p className="text-xs text-slate-400">{persons} {persons === 1 ? "passenger" : "passengers"}</p>
          </div>
          <div className="font-bold text-sky-600 text-xl">{formatPrice(tour.priceEur)}</div>
        </div>
      )}

      <button
        type="button"
        disabled={!canContinue}
        onClick={() => canContinue && onNext({
          date: format(selectedDate!, "yyyy-MM-dd"),
          startTime: selectedTime!,
          persons,
        })}
        className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors text-base"
      >
        {t("continue")}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
