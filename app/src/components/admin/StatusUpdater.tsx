"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = ["NEW", "PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"];

const statusColors: Record<string, string> = {
  NEW: "bg-sky-100 text-sky-700 border-sky-200",
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CONFIRMED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  COMPLETED: "bg-slate-100 text-slate-600 border-slate-200",
  NO_SHOW: "bg-orange-100 text-orange-700 border-orange-200",
};

export default function StatusUpdater({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleChange = async (newStatus: string) => {
    if (newStatus === status) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/reservations/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingStatus: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[status] || ""}`}>
        {status}
      </span>
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={saving}
        className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none focus:border-sky-400 disabled:opacity-50"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      {saving && <span className="text-xs text-slate-400">Čuvanje...</span>}
    </div>
  );
}
