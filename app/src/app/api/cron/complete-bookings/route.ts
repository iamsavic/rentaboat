import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Called by Vercel Cron every 30 minutes.
// Marks bookings as COMPLETED when tour end time has passed.
// Only transitions from NEW / PENDING / CONFIRMED — never touches CANCELLED or NO_SHOW.
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const nowMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

    // Fetch active bookings from today and all past dates
    const candidates = await prisma.booking.findMany({
      where: {
        bookingStatus: { in: ["NEW", "PENDING", "CONFIRMED"] },
        date: { lte: new Date(todayStr + "T00:00:00.000Z") },
      },
      select: {
        id: true,
        date: true,
        startTime: true,
        tour: { select: { durationHours: true } },
      },
    });

    const toComplete: string[] = [];

    for (const booking of candidates) {
      const bookingDateStr = booking.date.toISOString().split("T")[0];
      const isPastDay = bookingDateStr < todayStr;
      const isToday = bookingDateStr === todayStr;

      if (isPastDay) {
        // Any active booking from a past day → complete
        toComplete.push(booking.id);
      } else if (isToday) {
        // Today: complete only if tour has already ended
        const startMinutes =
          parseInt(booking.startTime.split(":")[0]) * 60 +
          parseInt(booking.startTime.split(":")[1]);
        const durationMinutes = Number(booking.tour.durationHours) * 60;
        const endMinutes = startMinutes + durationMinutes;

        if (endMinutes <= nowMinutes) {
          toComplete.push(booking.id);
        }
      }
    }

    if (toComplete.length === 0) {
      return NextResponse.json({ completed: 0, message: "Nothing to complete" });
    }

    const result = await prisma.booking.updateMany({
      where: {
        id: { in: toComplete },
        // Double-check: never overwrite CANCELLED or NO_SHOW
        bookingStatus: { in: ["NEW", "PENDING", "CONFIRMED"] },
      },
      data: { bookingStatus: "COMPLETED" },
    });

    return NextResponse.json({
      completed: result.count,
      ids: toComplete,
    });
  } catch (error) {
    console.error("Cron complete-bookings error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
