import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isSlotAvailable } from "@/lib/availability";
import { generateBookingReference } from "@/lib/utils";
import {
  sendBookingConfirmationEmail,
  sendAdminNotificationEmail,
  sendTelegramNotification,
} from "@/lib/notifications";
import { z } from "zod";

const schema = z.object({
  tourId: z.string(),
  vesselId: z.string(),
  date: z.string(),
  startTime: z.string(),
  persons: z.number().min(1).max(7),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  country: z.string().min(1),
  notes: z.string().optional(),
  language: z.enum(["EN", "SR"]).default("EN"),
  acceptTerms: z.boolean(),
  acceptPrivacy: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Fetch tour for validation
    const tour = await prisma.tour.findUnique({
      where: { id: data.tourId },
      include: {
        vessel: {
          include: { location: true },
        },
      },
    });

    if (!tour || !tour.active) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // Check slot availability
    const available = await isSlotAvailable(
      data.vesselId,
      data.date,
      data.startTime,
      Number(tour.durationHours)
    );

    if (!available) {
      return NextResponse.json(
        { error: "This time slot is no longer available. Please choose another time." },
        { status: 409 }
      );
    }

    // Generate unique reference
    const bookingReference = generateBookingReference();

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingReference,
        tourId: data.tourId,
        vesselId: data.vesselId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        date: new Date(data.date + "T00:00:00.000Z"),
        startTime: data.startTime,
        persons: data.persons,
        totalPrice: tour.priceEur,
        requiresDeposit: tour.requiresDeposit,
        depositAmount: tour.depositAmount,
        language: data.language,
        bookingStatus: "NEW",
        notes: data.notes || null,
        lockExpiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min soft lock
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const tourName = data.language === "SR" ? tour.nameSr : tour.nameEn;
    const adminUrl = `${appUrl}/admin/reservations/${booking.id}`;

    // Send notifications (non-blocking, fire-and-forget)
    const notifData = {
      bookingReference,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      tourName,
      date: data.date,
      startTime: data.startTime,
      persons: data.persons,
      totalPrice: Number(tour.priceEur),
      language: data.language,
      locationAddress: tour.vessel.location.address,
      locationGoogleMaps: tour.vessel.location.googleMapsUrl,
      locationPhone: tour.vessel.location.contactPhone,
      locationWhatsapp: tour.vessel.location.whatsappNumber,
      depositAmount: tour.depositAmount ? Number(tour.depositAmount) : null,
      requiresDeposit: tour.requiresDeposit,
      notes: data.notes,
      adminUrl,
    };

    Promise.allSettled([
      sendBookingConfirmationEmail(notifData),
      sendAdminNotificationEmail(notifData),
      sendTelegramNotification({ ...notifData, adminUrl }),
    ]).catch(console.error);

    return NextResponse.json({
      success: true,
      bookingReference: booking.bookingReference,
      bookingId: booking.id,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 }
    );
  }
}
