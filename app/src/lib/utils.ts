import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return `€${num.toFixed(0)}`;
}

export function formatDuration(hours: number | string, locale: string): string {
  const h = typeof hours === "string" ? parseFloat(hours) : hours;
  if (locale === "sr") {
    if (h === 1) return "1 sat";
    if (h === 2) return "2 sata";
    if (h === 3) return "3 sata";
    return `${h}h`;
  }
  if (h === 1) return "1 hour";
  if (h === 2) return "2 hours";
  if (h === 3) return "3 hours";
  return `${h}h`;
}

export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `RB-${year}-${random}`;
}

export function getTourSlug(tour: { slugEn: string; slugSr: string }, locale: string): string {
  return locale === "sr" ? tour.slugSr : tour.slugEn;
}
