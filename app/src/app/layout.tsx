import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rent-a-Boat Budva — Speedboat Tours",
  description:
    "Speedboat tours in Budva, Montenegro. Skipper, fuel and welcome drink always included. Book online in 2 minutes.",
};

/** Pass-through root: each route segment that renders a full page supplies its own <html>/<body> (see [locale]/layout and admin/layout). */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
