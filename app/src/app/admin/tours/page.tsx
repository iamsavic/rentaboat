import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice, formatDuration } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getTours() {
  try {
    return await prisma.tour.findMany({
      orderBy: { sortOrder: "asc" },
      include: { vessel: { select: { name: true } } },
    });
  } catch {
    return [];
  }
}

export default async function AdminToursPage() {
  const tours = await getTours();

  return (
    <div>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Ture</h1>
      </div>

      {tours.length > 0 ? (
        <>
          {/* Mobile card list */}
          <div className="md:hidden space-y-3">
            {tours.map((tour: typeof tours[number]) => (
              <div key={tour.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{tour.nameSr}</p>
                    <p className="text-xs text-slate-400">{tour.nameEn}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${tour.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {tour.active ? "Aktivna" : "Neaktivna"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                  <span>{formatDuration(Number(tour.durationHours), "sr")}</span>
                  <span className="font-semibold text-slate-700">{formatPrice(Number(tour.priceEur))}</span>
                  {tour.fixedPrice && <span className="text-green-600">Fiksna cena</span>}
                  <span>{tour.vessel.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Naziv</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Trajanje</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Cena</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Fiksna</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Plovilo</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {tours.map((tour: typeof tours[number]) => (
                    <tr key={tour.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-800 text-sm">{tour.nameSr}</p>
                        <p className="text-xs text-slate-400">{tour.nameEn}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatDuration(Number(tour.durationHours), "sr")}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                        {formatPrice(Number(tour.priceEur))}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {tour.fixedPrice ? "✅ Da" : "—"}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{tour.vessel.name}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${tour.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                          {tour.active ? "Aktivna" : "Neaktivna"}
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
          <p>Nema tura. Pokrenite seed komandu: <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-xs">npm run db:seed</code></p>
        </div>
      )}
    </div>
  );
}
