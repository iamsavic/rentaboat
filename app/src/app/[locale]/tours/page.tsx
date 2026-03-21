import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import TourCard from "@/components/tours/TourCard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ToursPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });

  type TourWithVessel = Awaited<ReturnType<typeof prisma.tour.findMany<{ include: { vessel: { select: { capacity: true } } } }>>>;
  let tours: TourWithVessel = [];
  try {
    tours = await prisma.tour.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      include: { vessel: { select: { capacity: true } } },
    });
  } catch {
    // DB not connected yet
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{t("title")}</h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
          <p className="mt-4 text-sm text-sky-600 font-medium">
            ✓ {t("allInclusive")}
          </p>
        </div>
      </div>

      {/* Tours grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {tours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {tours.map((tour: typeof tours[number], index: number) => (
              <TourCard
                key={tour.id}
                tour={{
                  ...tour,
                  durationHours: Number(tour.durationHours),
                  priceEur: Number(tour.priceEur),
                  depositAmount: tour.depositAmount ? Number(tour.depositAmount) : null,
                }}
                featured={index === 2}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">Tours will appear here once the database is connected.</p>
          </div>
        )}
      </div>
    </div>
  );
}
