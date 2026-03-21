import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import StatusUpdater from "@/components/admin/StatusUpdater";

type Props = { params: Promise<{ id: string }> };

export default async function ReservationDetailPage({ params }: Props) {
  const { id } = await params;
  let booking = null;

  try {
    booking = await prisma.booking.findUnique({
      where: { id },
      include: { tour: true },
    });
  } catch { /* db not connected */ }

  if (!booking) notFound();

  const rows = [
    { label: "Broj rezervacije", value: booking.bookingReference },
    { label: "Tura", value: booking.tour.nameSr },
    { label: "Datum", value: booking.date.toISOString().split("T")[0] },
    { label: "Vreme polaska", value: booking.startTime },
    { label: "Broj osoba", value: String(booking.persons) },
    { label: "Ukupna cena", value: `€${Number(booking.totalPrice)}` },
    { label: "Depozit", value: booking.requiresDeposit ? `€${Number(booking.depositAmount)} ${booking.depositPaid ? "(plaćen)" : "(nije plaćen)"}` : "Nije potreban" },
    { label: "Način plaćanja", value: "Keš na marini" },
    { label: "Ime", value: `${booking.firstName} ${booking.lastName}` },
    { label: "Email", value: booking.email },
    { label: "Telefon", value: booking.phone },
    { label: "Država", value: booking.country },
    { label: "Jezik", value: booking.language },
    { label: "Kreirana", value: booking.createdAt.toLocaleString("sr") },
  ];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/reservations"
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Rezervacije
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-700 font-mono">{booking.bookingReference}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h1 className="font-bold text-slate-800 text-lg">{booking.firstName} {booking.lastName}</h1>
          <StatusUpdater bookingId={booking.id} currentStatus={booking.bookingStatus} />
        </div>

        <div className="divide-y divide-slate-50">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between px-5 py-3 text-sm">
              <span className="text-slate-500 w-40 flex-shrink-0">{row.label}</span>
              <span className="font-medium text-slate-800 text-right">{row.value}</span>
            </div>
          ))}
          {booking.notes && (
            <div className="px-5 py-3 text-sm">
              <span className="text-slate-500 block mb-1">Napomene gosta</span>
              <span className="text-slate-700">{booking.notes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Admin notes */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h2 className="font-semibold text-slate-700 text-sm mb-3">Interne napomene</h2>
        <p className="text-slate-400 text-sm italic">
          {booking.adminNotes || "Nema internih napomena."}
        </p>
      </div>
    </div>
  );
}
