"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format, startOfToday } from "date-fns";
import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AvailabilityCalendarProps {
  vesselId: string;
  tourDuration: number;
  onSelect: (date: Date, time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

export default function AvailabilityCalendar({
  vesselId,
  tourDuration,
  onSelect,
  selectedDate,
  selectedTime,
}: AvailabilityCalendarProps) {
  const t = useTranslations("availability");
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  /** Avoid SSR/client TZ mismatch in DayPicker (e.g. Docker UTC vs browser local). */
  const [calendarReady, setCalendarReady] = useState(false);
  useEffect(() => {
    setCalendarReady(true);
  }, []);

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    fetch(`/api/availability?vesselId=${vesselId}&date=${format(date, "yyyy-MM-dd")}&duration=${tourDuration}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots || []))
      .catch(() => setSlots([]))
      .finally(() => setLoading(false));
  }, [date, vesselId, tourDuration]);

  const handleDaySelect = (day: Date | undefined) => {
    if (!day) return;
    setDate(day);
    setSlots([]);
  };

  return (
    <div className="space-y-4">
      {/* Calendar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 overflow-x-auto min-h-[320px]">
        {calendarReady ? (
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleDaySelect}
            disabled={[{ before: startOfToday() }]}
            className="mx-auto w-full max-w-[340px] text-slate-700"
            modifiersClassNames={{
              selected:
                "[&_.rdp-day_button]:!bg-sky-600 [&_.rdp-day_button]:!text-white [&_.rdp-day_button]:!border-sky-600",
              today: "[&_.rdp-day_button]:!text-sky-600 [&_.rdp-day_button]:font-bold",
            }}
            classNames={{
              caption_label: cn(
                "rdp-caption_label",
                "text-sm font-semibold text-slate-800"
              ),
              weekday: cn(
                "rdp-weekday",
                "text-slate-400 text-[0.8rem] font-normal normal-case"
              ),
              day_button: cn(
                "rdp-day_button",
                "rounded-lg text-slate-700 transition-colors",
                "hover:bg-sky-50 hover:text-sky-700",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              ),
              disabled: cn("rdp-disabled", "opacity-50"),
            }}
          />
        ) : (
          <div className="h-[280px] rounded-lg bg-slate-50 animate-pulse" aria-hidden />
        )}
      </div>

      {/* Time slots */}
      {date && (
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-sky-600" />
            {t("selectTime")} — {format(date, "MMM d, yyyy")}
          </p>

          {loading ? (
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : slots.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => slot.available && date && onSelect(date, slot.time)}
                  className={cn(
                    "py-2.5 px-2 rounded-lg text-sm font-medium border transition-all",
                    slot.available
                      ? selectedTime === slot.time && selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                        ? "bg-sky-600 border-sky-600 text-white"
                        : "border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50"
                      : "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed line-through"
                  )}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm py-4 text-center">{t("noSlots")}</p>
          )}
        </div>
      )}
    </div>
  );
}
