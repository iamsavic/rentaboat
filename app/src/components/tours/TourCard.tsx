import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Clock, Users, MapPin, ArrowRight } from "lucide-react";
import { formatPrice, formatDuration, getTourSlug } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tour = {
  id: string;
  nameSr: string;
  nameEn: string;
  slugSr: string;
  slugEn: string;
  durationHours: number | string;
  priceEur: number | string;
  fixedPrice: boolean;
  requiresDeposit?: boolean;
  depositAmount?: number | null;
  destinationsSr: string[];
  destinationsEn: string[];
  coverImage: string | null;
  gallery?: string[];
  vessel: { capacity: number };
};

interface TourCardProps {
  tour: Tour;
  featured?: boolean;
}

export default function TourCard({ tour, featured = false }: TourCardProps) {
  const locale = useLocale();
  const t = useTranslations("tours");

  const name = locale === "sr" ? tour.nameSr : tour.nameEn;
  const destinations = locale === "sr" ? tour.destinationsSr : tour.destinationsEn;
  const slug = getTourSlug(tour, locale);
  const price = Number(tour.priceEur);
  const duration = Number(tour.durationHours);

  return (
    <div
      className={cn(
        "bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all group",
        featured && "ring-2 ring-sky-500"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
        {tour.coverImage ? (
          <Image
            src={tour.coverImage}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
            <span className="text-white/60 text-sm">No image yet</span>
          </div>
        )}
        {featured && (
          <div className="absolute top-3 left-3 bg-sky-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Most Popular
          </div>
        )}
        {tour.fixedPrice && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Special Tour
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{name}</h3>
          <div className="text-right flex-shrink-0">
            <span className="text-2xl font-bold text-sky-600">{formatPrice(price)}</span>
            {!tour.fixedPrice && (
              <p className="text-xs text-slate-400">{t("perTrip")}</p>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatDuration(duration, locale)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {t("capacity", { count: tour.vessel.capacity })}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            Budva
          </span>
        </div>

        {/* Destinations */}
        <div className="mb-5">
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">
            {t("destinations")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {destinations.slice(0, 4).map((dest) => (
              <span
                key={dest}
                className="text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-100"
              >
                {dest}
              </span>
            ))}
            {destinations.length > 4 && (
              <span className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full">
                +{destinations.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-2">
          <Link
            href={`/${locale}/tours/${slug}`}
            className="flex-1 text-center text-sm font-semibold text-slate-600 hover:text-sky-600 border border-slate-200 hover:border-sky-200 py-2.5 rounded-lg transition-colors"
          >
            {t("viewDetails")}
          </Link>
          <Link
            href={`/${locale}/booking?tour=${tour.slugEn}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold bg-sky-600 hover:bg-sky-700 text-white py-2.5 rounded-lg transition-colors"
          >
            {t("bookNow")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
