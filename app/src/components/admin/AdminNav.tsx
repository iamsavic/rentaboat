"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Ship, ListChecks, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Pregled", icon: LayoutDashboard, exact: true },
  { href: "/admin/reservations", label: "Rezervacije", icon: ListChecks },
  { href: "/admin/calendar", label: "Kalendar", icon: CalendarDays },
  { href: "/admin/tours", label: "Ture", icon: Ship },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-slate-900 text-white flex-col min-h-screen flex-shrink-0">
        <div className="px-4 py-5 border-b border-slate-700">
          <Link href="/admin" className="flex items-center gap-2 text-sky-400 font-bold">
            <Anchor className="h-5 w-5" />
            <span>Admin Panel</span>
          </Link>
          <p className="text-xs text-slate-500 mt-1">Rent-a-Boat Budva</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-sky-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-slate-700">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← View website
          </Link>
        </div>
      </aside>

      {/* Mobile top header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 text-white flex items-center px-4 h-12 border-b border-slate-700">
        <Link href="/admin" className="flex items-center gap-2 text-sky-400 font-bold text-sm">
          <Anchor className="h-4 w-4" />
          <span>Admin Panel</span>
        </Link>
        <Link href="/" target="_blank" className="ml-auto text-xs text-slate-400 hover:text-slate-200">
          ← Sajt
        </Link>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-700 flex safe-area-inset-bottom">
        {navItems.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2.5 gap-1 text-xs font-medium transition-colors",
                active ? "text-sky-400" : "text-slate-500 active:text-slate-300"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] leading-none">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
