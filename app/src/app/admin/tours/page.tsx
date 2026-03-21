import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice, formatDuration } from "@/lib/utils";

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Ture</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {tours.length > 0 ? (
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
        ) : (
          <div className="py-16 text-center text-slate-400 text-sm">
            <p>Nema tura. Pokrenite seed komandu: <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-xs">npm run db:seed</code></p>
          </div>
        )}
      </div>
    </div>
  );
}
