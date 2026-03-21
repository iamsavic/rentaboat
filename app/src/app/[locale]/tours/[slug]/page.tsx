import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDuration } from "@/lib/utils";
import TourGallery from "@/components/tours/TourGallery";
import TourBookingBox from "@/components/tours/TourBookingBox";
import { Clock, Users, MapPin, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = { params: Promise<{ locale: string; slug: string }> };

async function getTour(locale: string, slug: string) {
  try {
    const tour = await prisma.tour.findFirst({
      where: {
        active: true,
        OR: [{ slugEn: slug }, { slugSr: slug }],
      },
      include: {
        vessel: {
          include: { location: true },
        },
      },
    });
    return tour;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const tour = await getTour(locale, slug);
  if (!tour) return { title: "Tour not found" };
  const name = locale === "sr" ? tour.nameSr : tour.nameEn;
  const desc = locale === "sr" ? tour.descriptionSr : tour.descriptionEn;
  return { title: name, description: desc };
}

export default async function TourDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const tour = await getTour(locale, slug);

  if (!tour) notFound();

  const t = await getTranslations({ locale, namespace: "tours" });
  const tBook = await getTranslations({ locale, namespace: "booking" });

  const name = locale === "sr" ? tour.nameSr : tour.nameEn;
  const description = locale === "sr" ? tour.descriptionSr : tour.descriptionEn;
  const destinations = locale === "sr" ? tour.destinationsSr : tour.destinationsEn;
  const toursPath = locale === "sr" ? `/${locale}/ture` : `/${locale}/tours`;
  const duration = Number(tour.durationHours);
  const price = Number(tour.priceEur);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <Link
            href={toursPath}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("title")}
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <TourGallery images={tour.gallery} tourName={name} />

            {/* Tour header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{name}</h1>
                  <p className="text-sky-600 font-medium text-sm">{t("allInclusive")}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-sky-600">{formatPrice(price)}</div>
                  <div className="text-xs text-slate-400">{t("perTrip")}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-500 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-sky-500" />
                  {formatDuration(duration, locale)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-sky-500" />
                  {t("capacity", { count: tour.vessel.capacity })}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-sky-500" />
                  {t("departure")}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <p className="text-slate-600 leading-relaxed">{description}</p>
            </div>

            {/* Destinations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-4">{t("destinations")}</h2>
              <div className="space-y-2">
                {destinations.map((dest: string, i: number) => (
                  <div key={dest} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                    <span className="w-6 h-6 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-slate-700 font-medium">{dest}</span>
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
              <h2 className="text-lg font-bold text-slate-900 mb-3">{t("included")}</h2>
              <div className="grid grid-cols-2 gap-2">
                {["Skipper", locale === "sr" ? "Gorivo" : "Fuel", locale === "sr" ? "Voda dobrodošlice" : "Welcome drink", locale === "sr" ? "Zaustavljanja za plivanje" : "Swimming stops"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-sky-800">
                    <CheckCircle className="h-4 w-4 text-sky-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <TourBookingBox
              tour={{
                id: tour.id,
                slugEn: tour.slugEn,
                priceEur: price,
                durationHours: duration,
                requiresDeposit: tour.requiresDeposit,
                depositAmount: tour.depositAmount ? Number(tour.depositAmount) : null,
                vessel: {
                  id: tour.vessel.id,
                  capacity: tour.vessel.capacity,
                  location: tour.vessel.location,
                },
              }}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
