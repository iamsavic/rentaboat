import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Anchor, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 text-white font-bold text-lg mb-3"
            >
              <Anchor className="h-5 w-5 text-sky-400" />
              Rent-a-Boat Budva
            </Link>
            <p className="text-sm text-slate-400 mb-4">{t("tagline")}</p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors text-sm"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("navigation")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/tours`, label: tNav("tours") },
                { href: `/${locale}/destinations`, label: tNav("destinations") },
                { href: `/${locale}/faq`, label: "FAQ" },
                { href: `/${locale}/about`, label: tNav("about") },
                { href: `/${locale}/contact`, label: tNav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("legal")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/legal/terms`, label: t("terms") },
                { href: `/${locale}/legal/privacy`, label: t("privacy") },
                { href: `/${locale}/legal/cookies`, label: t("cookies") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+382XXXXXXXX"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  +382 XX XXX XXX
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/382XXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@rentaboat-budva.com"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  info@rentaboat-budva.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                Budva Marina, Budva, Montenegro
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">
            © {currentYear} Rent-a-Boat Budva. {t("rights")}
          </p>
          <div className="flex gap-4">
            <Link
              href="/en"
              className="text-xs text-slate-500 hover:text-sky-400 transition-colors"
            >
              English
            </Link>
            <Link
              href="/sr"
              className="text-xs text-slate-500 hover:text-sky-400 transition-colors"
            >
              Srpski
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
