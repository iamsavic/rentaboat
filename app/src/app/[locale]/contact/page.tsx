"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "tour", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setSending(false);
  };

  const subjects = {
    en: ["Question about a tour", "Booking enquiry", "Cancellation", "Other"],
    sr: ["Pitanje o turi", "Rezervacija", "Otkazivanje", "Ostalo"],
  };
  const subjectList = subjects[locale as "en" | "sr"] || subjects.en;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-10 text-center">{t("title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
              <a href="tel:+382XXXXXXXX" className="flex items-center gap-4 group">
                <div className="w-11 h-11 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">{t("phone")}</p>
                  <p className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">+382 XX XXX XXX</p>
                </div>
              </a>

              <a href="https://wa.me/382XXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">{t("whatsapp")}</p>
                  <p className="font-semibold text-slate-800 group-hover:text-green-600 transition-colors">+382 XX XXX XXX</p>
                </div>
              </a>

              <a href="mailto:info@rentaboat-budva.com" className="flex items-center gap-4 group">
                <div className="w-11 h-11 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">{t("email")}</p>
                  <p className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">info@rentaboat-budva.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">{t("address")}</p>
                  <p className="font-semibold text-slate-800">Budva Marina, Budva</p>
                  <p className="text-sm text-slate-500">Montenegro</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">{t("hours")}</p>
                  <p className="font-semibold text-slate-800">08:00 – 20:00</p>
                  <p className="text-sm text-slate-500">{locale === "sr" ? "Svaki dan" : "Every day"}</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-slate-200 rounded-2xl h-48 flex items-center justify-center text-slate-400 text-sm">
              <a
                href="https://maps.google.com/?q=Budva+Marina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 hover:text-sky-600 transition-colors"
              >
                <MapPin className="h-8 w-8" />
                <span>Budva Marina — Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-800 mb-5">{t("formTitle")}</h2>
            {sent ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-semibold text-slate-800 mb-1">{t("success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t("name")} *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t("subject")}</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400"
                  >
                    {subjectList.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{t("message")} *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 text-white font-bold py-3.5 rounded-xl transition-colors"
                >
                  {sending ? "Sending..." : t("send")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
