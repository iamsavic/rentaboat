"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import AvailabilityCalendar from "./AvailabilityCalendar";
import { formatPrice, formatDuration } from "@/lib/utils";
import { Users, ArrowRight, AlertCircle } from "lucide-react";

interface TourBookingBoxProps {
  tour: {
    id: string;
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
        whatsappNumber: string;
        contactPhone: string;
      };
    };
  };
  locale: string;
}

export default function TourBookingBox({ tour, locale }: TourBookingBoxProps) {
  const t = useTranslations("booking");
  const tA = useTranslations("availability");
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [persons, setPersons] = useState(2);

  const handleSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const canBook = !!selectedDate && !!selectedTime;

  const handleBook = () => {
    if (!canBook) return;
    const params = new URLSearchParams({
      tour: tour.slugEn,
      date: format(selectedDate!, "yyyy-MM-dd"),
      time: selectedTime!,
      persons: String(persons),
    });
    router.push(`/${locale}/booking?${params.toString()}`);
  };

  return (
    <div className="sticky top-20 space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Price header */}
        <div className="bg-sky-600 px-5 py-4 text-white">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{formatPrice(tour.priceEur)}</span>
            <span className="text-sky-200 text-sm">/ {formatDuration(tour.durationHours, locale)}</span>
          </div>
          <p className="text-sky-100 text-xs mt-1">Skipper · Fuel · Welcome drink</p>
        </div>

        <div className="p-5 space-y-4">
          {/* Persons */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <Users className="h-4 w-4 text-sky-500" />
              {tA("persons")}
            </label>
            <div className="flex items-center gap-3 border border-slate-200 rounded-lg px-3 py-2 w-fit">
              <button
                onClick={() => setPersons((p) => Math.max(1, p - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 font-bold transition-colors"
              >
                −
              </button>
              <span className="text-slate-900 font-semibold w-5 text-center">{persons}</span>
              <button
                onClick={() => setPersons((p) => Math.min(tour.vessel.capacity, p + 1))}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 font-bold transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {tA("maxCapacity", { count: tour.vessel.capacity })}
            </p>
          </div>

          {/* Calendar */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">{tA("selectDate")}</p>
            <AvailabilityCalendar
              vesselId={tour.vessel.id}
              tourDuration={tour.durationHours}
              onSelect={handleSelect}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </div>

          {/* Deposit notice */}
          {tour.requiresDeposit && tour.depositAmount && (
            <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                {t("depositNote", { amount: formatPrice(tour.depositAmount) })}
              </p>
            </div>
          )}

          {/* Summary */}
          {canBook && (
            <div className="bg-slate-50 rounded-xl p-3 text-sm space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>{t("date")}</span>
                <span className="font-medium text-slate-900">
                  {format(selectedDate!, "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t("time")}</span>
                <span className="font-medium text-slate-900">{selectedTime}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t("persons")}</span>
                <span className="font-medium text-slate-900">{persons}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold text-slate-900">
                <span>{t("totalPrice")}</span>
                <span className="text-sky-600">{formatPrice(tour.priceEur)}</span>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleBook}
            disabled={!canBook}
            className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            {t("sendRequest")}
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Payment note */}
          <p className="text-center text-xs text-slate-400">{t("paymentNote")}</p>
        </div>
      </div>
    </div>
  );
}
