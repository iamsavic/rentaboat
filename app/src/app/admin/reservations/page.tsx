import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

const statusColors: Record<string, string> = {
  NEW: "bg-sky-100 text-sky-700",
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-slate-100 text-slate-600",
  NO_SHOW: "bg-orange-100 text-orange-700",
};

type Props = {
  searchParams: Promise<{ status?: string; q?: string }>;
};

export default async function ReservationsPage({ searchParams }: Props) {
  const sp = await searchParams;

  type BookingWithTour = Awaited<ReturnType<typeof prisma.booking.findMany<{ include: { tour: { select: { nameSr: true; nameEn: true } } } }>>>;
  let bookings: BookingWithTour = [];
  try {
    bookings = await prisma.booking.findMany({
      where: {
        ...(sp.status ? { bookingStatus: sp.status as never } : {}),
        ...(sp.q
          ? {
              OR: [
                { firstName: { contains: sp.q, mode: "insensitive" } },
                { lastName: { contains: sp.q, mode: "insensitive" } },
                { email: { contains: sp.q, mode: "insensitive" } },
                { bookingReference: { contains: sp.q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      include: { tour: { select: { nameSr: true, nameEn: true } } },
      take: 100,
    });
  } catch { /* db not connected */ }

  const statuses = ["NEW", "PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"];

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">Rezervacije</h1>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-slate-100 mb-4 md:mb-5 flex flex-col gap-3">
        <form>
          <input
            name="q"
            defaultValue={sp.q}
            placeholder="Pretraži po imenu, emailu, ref..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-400"
          />
        </form>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/reservations"
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${!sp.status ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Sve
          </Link>
          {statuses.map((s) => (
            <Link
              key={s}
              href={`/admin/reservations?status=${s}`}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                sp.status === s ? "bg-slate-800 text-white" : statusColors[s] + " hover:opacity-80"
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      {bookings.length > 0 ? (
        <>
          {/* Mobile card list */}
          <div className="md:hidden space-y-3">
            {bookings.map((b: typeof bookings[number]) => (
              <Link
                key={b.id}
                href={`/admin/reservations/${b.id}`}
                className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{b.firstName} {b.lastName}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{b.bookingReference}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${statusColors[b.bookingStatus] || ""}`}>
                    {b.bookingStatus}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{b.tour.nameSr}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{b.date.toISOString().split("T")[0]} u {b.startTime} · {b.persons} os.</span>
                  <span className="font-semibold text-slate-700 text-sm">€{Number(b.totalPrice)}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Ref</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Gost</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tura</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Datum</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Osobe</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Cena</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings.map((b: typeof bookings[number]) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/admin/reservations/${b.id}`} className="font-mono text-xs text-sky-600 hover:underline">
                          {b.bookingReference}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-slate-800">{b.firstName} {b.lastName}</p>
                        <p className="text-xs text-slate-400">{b.email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{b.tour.nameSr}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {b.date.toISOString().split("T")[0]} {b.startTime}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-slate-600">{b.persons}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-700">€{Number(b.totalPrice)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[b.bookingStatus] || ""}`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 py-16 text-center text-slate-400 text-sm">
          Nema rezervacija.
        </div>
      )}
    </div>
  );
}
