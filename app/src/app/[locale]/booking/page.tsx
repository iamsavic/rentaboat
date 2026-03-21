import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import BookingFlow from "@/components/booking/BookingFlow";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tour?: string; date?: string; time?: string; persons?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });
  return { title: t("title") };
}

export default async function BookingPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;

  let tour = null;
  if (sp.tour) {
    try {
      tour = await prisma.tour.findFirst({
        where: { active: true, OR: [{ slugEn: sp.tour }, { slugSr: sp.tour }] },
        include: { vessel: { include: { location: true } } },
      });
    } catch { /* db not connected */ }
  }

  const initialData = {
    tourSlug: sp.tour || "",
    date: sp.date || "",
    time: sp.time || "",
    persons: parseInt(sp.persons || "2"),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading...</div>}>
          <BookingFlow
            tour={tour ? {
              id: tour.id,
              nameSr: tour.nameSr,
              nameEn: tour.nameEn,
              slugEn: tour.slugEn,
              priceEur: Number(tour.priceEur),
              durationHours: Number(tour.durationHours),
              requiresDeposit: tour.requiresDeposit,
              depositAmount: tour.depositAmount ? Number(tour.depositAmount) : null,
              vessel: {
                id: tour.vessel.id,
                capacity: tour.vessel.capacity,
                location: tour.vessel.location,
              },
            } : null}
            initialData={initialData}
            locale={locale}
          />
        </Suspense>
      </div>
    </div>
  );
}
