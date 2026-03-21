"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, PlusCircle } from "lucide-react";

interface Block {
  id: string;
  vesselId: string;
  vesselName: string;
  date: string;
  blockedFrom: string | null;
  blockedTo: string | null;
  reason: string | null;
}

interface Vessel { id: string; name: string }

export default function CalendarBlocker({
  vessels,
  existingBlocks,
}: {
  vessels: Vessel[];
  existingBlocks: Block[];
}) {
  const router = useRouter();
  const [blocks, setBlocks] = useState(existingBlocks);
  const [form, setForm] = useState({
    vesselId: vessels[0]?.id || "",
    date: "",
    blockedFrom: "",
    blockedTo: "",
    reason: "",
    fullDay: true,
  });
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!form.vesselId || !form.date) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vesselId: form.vesselId,
          date: form.date,
          blockedFrom: form.fullDay ? null : form.blockedFrom,
          blockedTo: form.fullDay ? null : form.blockedTo,
          reason: form.reason,
        }),
      });
      if (res.ok) {
        router.refresh();
        setForm((f) => ({ ...f, date: "", reason: "", blockedFrom: "", blockedTo: "" }));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Obrisati blokadu?")) return;
    await fetch(`/api/admin/availability/${id}`, { method: "DELETE" });
    setBlocks((b) => b.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Add block form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
        <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
          <PlusCircle className="h-4 w-4 text-sky-600" />
          Dodaj blokadu termina
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Plovilo</label>
            <select
              value={form.vesselId}
              onChange={(e) => setForm((f) => ({ ...f, vesselId: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-400"
            >
              {vessels.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Datum</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.fullDay}
                onChange={(e) => setForm((f) => ({ ...f, fullDay: e.target.checked }))}
                className="accent-sky-600"
              />
              <span className="text-sm text-slate-600">Blokirati ceo dan</span>
            </label>
          </div>

          {!form.fullDay && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Od</label>
                <input
                  type="time"
                  value={form.blockedFrom}
                  onChange={(e) => setForm((f) => ({ ...f, blockedFrom: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Do</label>
                <input
                  type="time"
                  value={form.blockedTo}
                  onChange={(e) => setForm((f) => ({ ...f, blockedTo: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </>
          )}

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Razlog (opciono)</label>
            <input
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
              placeholder="npr. loše vreme, servis..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={saving || !form.date}
          className="mt-4 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          {saving ? "Čuvanje..." : "Dodaj blokadu"}
        </button>
      </div>

      {/* Existing blocks */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-700">Aktivne blokade</h2>
        </div>
        {blocks.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {blocks.map((block) => (
              <div key={block.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {block.date} {!block.blockedFrom ? "(ceo dan)" : `${block.blockedFrom}–${block.blockedTo}`}
                  </p>
                  <p className="text-xs text-slate-400">
                    {block.vesselName} {block.reason && `· ${block.reason}`}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(block.id)}
                  className="text-red-400 hover:text-red-600 transition-colors p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-10 text-slate-400 text-sm">Nema aktivnih blokada.</p>
        )}
      </div>
    </div>
  );
}
