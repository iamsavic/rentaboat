"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  country: z.string().min(1),
  notes: z.string().optional(),
  acceptTerms: z.boolean().refine((v) => v === true),
  acceptPrivacy: z.boolean().refine((v) => v === true),
  acceptMarketing: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface Step2Props {
  data: Record<string, unknown>;
  locale: string;
  onNext: (data: FormData) => void;
  onBack: () => void;
}

export default function Step2Details({ data, locale, onNext, onBack }: Step2Props) {
  const t = useTranslations("booking");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: (data.firstName as string) || "",
      lastName: (data.lastName as string) || "",
      email: (data.email as string) || "",
      phone: (data.phone as string) || "",
      country: (data.country as string) || "",
      notes: (data.notes as string) || "",
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full border rounded-xl px-4 py-3 text-slate-800 text-sm outline-none transition-colors",
      hasError
        ? "border-red-300 bg-red-50 focus:border-red-500"
        : "border-slate-200 bg-white focus:border-sky-400"
    );

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-5">{t("step2")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t("firstName")} *
            </label>
            <input {...register("firstName")} className={inputClass(!!errors.firstName)} />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{t("required")}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t("lastName")} *
            </label>
            <input {...register("lastName")} className={inputClass(!!errors.lastName)} />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{t("required")}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t("email")} *
            </label>
            <input
              {...register("email")}
              type="email"
              inputMode="email"
              className={inputClass(!!errors.email)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{t("invalidEmail")}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t("phone")} *
            </label>
            <input
              {...register("phone")}
              type="tel"
              inputMode="tel"
              placeholder="+1 234 567 8900"
              className={inputClass(!!errors.phone)}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{t("invalidPhone")}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t("country")} *
            </label>
            <input {...register("country")} className={inputClass(!!errors.country)} />
            {errors.country && <p className="text-red-500 text-xs mt-1">{t("required")}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              {t("notes")}
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              className={cn(inputClass(false), "resize-none")}
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
          <label className={cn("flex gap-3 cursor-pointer", errors.acceptTerms && "text-red-600")}>
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className="mt-0.5 h-4 w-4 accent-sky-600"
            />
            <span className="text-sm text-slate-600">
              {t("acceptTerms")}{" "}
              <a href={`/${locale}/legal/terms`} target="_blank" className="text-sky-600 underline">
                Terms
              </a>{" "}*
            </span>
          </label>

          <label className={cn("flex gap-3 cursor-pointer", errors.acceptPrivacy && "text-red-600")}>
            <input
              type="checkbox"
              {...register("acceptPrivacy")}
              className="mt-0.5 h-4 w-4 accent-sky-600"
            />
            <span className="text-sm text-slate-600">
              {t("acceptPrivacy")}{" "}
              <a href={`/${locale}/legal/privacy`} target="_blank" className="text-sky-600 underline">
                Privacy Policy
              </a>{" "}*
            </span>
          </label>

          <label className="flex gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("acceptMarketing")}
              className="mt-0.5 h-4 w-4 accent-sky-600"
            />
            <span className="text-sm text-slate-500">{t("acceptMarketing")}</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-4 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </button>
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-xl transition-colors"
        >
          {t("continue")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
