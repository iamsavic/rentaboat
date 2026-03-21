import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/availability";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const vesselId = searchParams.get("vesselId");
  const date = searchParams.get("date");
  const duration = searchParams.get("duration");

  if (!vesselId || !date || !duration) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const slots = await getAvailableSlots(vesselId, date, parseFloat(duration));
    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json({ slots: [] });
  }
}
