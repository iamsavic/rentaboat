import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ListChecks, Clock, CheckCircle2, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [total, newCount, confirmed, cancelled] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { bookingStatus: "NEW" } }),
      prisma.booking.count({ where: { bookingStatus: "CONFIRMED" } }),
      prisma.booking.count({ where: { bookingStatus: "CANCELLED" } }),
    ]);

    const recent = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { tour: { select: { nameSr: true } } },
    });

    return { total, newCount, confirmed, cancelled, recent };
  } catch {
    return { total: 0, newCount: 0, confirmed: 0, cancelled: 0, recent: [] };
  }
}

const statusColors: Record<string, string> = {
  NEW: "bg-sky-100 text-sky-700",
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-slate-100 text-slate-600",
  NO_SHOW: "bg-orange-100 text-orange-700",
};

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Ukupno", value: stats.total, icon: ListChecks, color: "text-sky-600" },
    { label: "Nove", value: stats.newCount, icon: Clock, color: "text-amber-600" },
    { label: "Potvrđene", value: stats.confirmed, icon: CheckCircle2, color: "text-green-600" },
    { label: "Otkazane", value: stats.cancelled, icon: XCircle, color: "text-red-600" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Pregled</h1>
        <Link href="/admin/reservations" className="text-sm text-sky-600 hover:text-sky-700 font-medium">
          Sve rezervacije →
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100">
            <card.icon className={`h-5 w-5 md:h-6 md:w-6 ${card.color} mb-2 md:mb-3`} />
            <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-0.5">{card.value}</div>
            <div className="text-xs md:text-sm text-slate-500">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="px-4 md:px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Poslednje rezervacije</h2>
          <Link href="/admin/reservations" className="text-sm text-sky-600">Vidi sve</Link>
        </div>
        {stats.recent.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {stats.recent.map((booking: typeof stats.recent[number]) => (
              <Link
                key={booking.id}
                href={`/admin/reservations/${booking.id}`}
                className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 hover:bg-slate-50 transition-colors gap-2"
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 text-sm truncate">
                    {booking.firstName} {booking.lastName}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {booking.tour.nameSr} · {booking.date.toISOString().split("T")[0]} u {booking.startTime}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="font-semibold text-slate-700 text-sm">€{Number(booking.totalPrice)}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full hidden sm:inline ${statusColors[booking.bookingStatus] || ""}`}>
                    {booking.bookingStatus}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center text-slate-400 text-sm">
            Nema rezervacija. Povežite bazu podataka i dodajte ture.
          </div>
        )}
      </div>
    </div>
  );
}
