import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: {
        bookingStatus: body.bookingStatus,
        adminNotes: body.adminNotes,
        depositPaid: body.depositPaid,
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
