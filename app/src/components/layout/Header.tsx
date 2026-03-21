"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}/tours`, label: t("tours") },
    { href: `/${locale}/destinations`, label: t("destinations") },
    { href: `/${locale}/faq`, label: "FAQ" },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const otherLocale = locale === "en" ? "sr" : "en";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold text-sky-600 text-xl"
          >
            <Anchor className="h-6 w-6" />
            <span>Rent-a-Boat</span>
            <span className="hidden sm:inline text-slate-400 font-normal text-sm">
              Budva
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-sky-600 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <Link
              href={otherLocalePath}
              className="hidden sm:flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-sky-600 border border-slate-200 rounded px-2 py-1 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>

            {/* Book CTA */}
            <Link
              href={`/${locale}/tours`}
              className="hidden sm:inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {t("bookNow")}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-600 hover:text-sky-600"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-slate-700 hover:text-sky-600 font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex items-center gap-3 border-t border-slate-100">
            <Link
              href={`/${locale}/tours`}
              className="flex-1 text-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t("bookNow")}
            </Link>
            <Link
              href={otherLocalePath}
              className="text-sm font-medium text-slate-500 border border-slate-200 rounded px-3 py-2.5"
              onClick={() => setMenuOpen(false)}
            >
              {otherLocale.toUpperCase()}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
