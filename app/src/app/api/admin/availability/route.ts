import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { vesselId, date, blockedFrom, blockedTo, reason } = await request.json();
  try {
    const block = await prisma.availability.create({
      data: { vesselId, date: new Date(date + "T00:00:00Z"), blockedFrom, blockedTo, reason },
    });
    return NextResponse.json({ success: true, block });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
