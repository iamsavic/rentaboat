import { prisma } from "./prisma";
import { format, parse, addMinutes } from "date-fns";

const WORKING_START = "08:00";
const WORKING_END = "20:00";
const BUFFER_MINUTES = 30;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export async function getAvailableSlots(
  vesselId: string,
  dateStr: string,
  durationHours: number
): Promise<Array<{ time: string; available: boolean }>> {
  const durationMinutes = durationHours * 60;
  const startMinutes = timeToMinutes(WORKING_START);
  const endMinutes = timeToMinutes(WORKING_END);

  // Get all confirmed/pending bookings for this vessel on this date
  const date = new Date(dateStr + "T00:00:00.000Z");
  const bookings = await prisma.booking.findMany({
    where: {
      vesselId,
      date,
      bookingStatus: { in: ["NEW", "PENDING", "CONFIRMED"] },
    },
    select: { startTime: true },
  });

  // Get admin blocks
  const blocks = await prisma.availability.findMany({
    where: { vesselId, date },
  });

  // Generate all possible start times (every 30 min)
  const slots: Array<{ time: string; available: boolean }> = [];

  for (
    let t = startMinutes;
    t + durationMinutes <= endMinutes;
    t += BUFFER_MINUTES
  ) {
    const slotStart = t;
    const slotEnd = t + durationMinutes;
    let available = true;

    // Check existing bookings
    for (const booking of bookings) {
      const bookedStart = timeToMinutes(booking.startTime);
      const bookedEnd = bookedStart + durationMinutes + BUFFER_MINUTES;
      // Overlap check with buffer
      if (slotStart < bookedEnd && slotEnd + BUFFER_MINUTES > bookedStart) {
        available = false;
        break;
      }
    }

    // Check admin blocks
    if (available) {
      for (const block of blocks) {
        if (!block.blockedFrom && !block.blockedTo) {
          // Full day block
          available = false;
          break;
        }
        if (block.blockedFrom && block.blockedTo) {
          const blockStart = timeToMinutes(block.blockedFrom);
          const blockEnd = timeToMinutes(block.blockedTo);
          if (slotStart < blockEnd && slotEnd > blockStart) {
            available = false;
            break;
          }
        }
      }
    }

    slots.push({ time: minutesToTime(slotStart), available });
  }

  return slots;
}

export async function isSlotAvailable(
  vesselId: string,
  dateStr: string,
  startTime: string,
  durationHours: number,
  excludeBookingId?: string
): Promise<boolean> {
  const slots = await getAvailableSlots(vesselId, dateStr, durationHours);
  const slot = slots.find((s) => s.time === startTime);
  return slot?.available ?? false;
}
