import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import IncludedFeatures from "@/components/home/IncludedFeatures";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";
import TourCard from "@/components/tours/TourCard";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: "Rent-a-Boat Budva — Speedboat Tours",
    description: t("subtitle"),
  };
}

async function getTours() {
  try {
    return await prisma.tour.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      include: { vessel: { select: { capacity: true } } },
    });
  } catch {
    return [];
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const tours = await getTours();
  const t = await getTranslations({ locale, namespace: "tours" });

  return (
    <>
      <HeroSection />
      <IncludedFeatures />

      {/* Tours section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t("title")}</h2>
            <p className="text-slate-500 text-lg">{t("subtitle")}</p>
          </div>
          {tours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <div className="text-center py-12 text-slate-400">
              <p>Tours coming soon. Connect your database to see them here.</p>
            </div>
          )}
        </div>
      </section>

      <HowItWorks />
      <Testimonials />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}
