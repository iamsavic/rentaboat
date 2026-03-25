import { prisma } from "./prisma";

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

function currentTimeMinutes(): number {
  const now = new Date();
  return now.getUTCHours() * 60 + now.getUTCMinutes();
}

export async function getAvailableSlots(
  vesselId: string,
  dateStr: string,
  durationHours: number
): Promise<Array<{ time: string; available: boolean; concurrentCount: number; maxConcurrent: number }>> {
  const durationMinutes = durationHours * 60;
  const startMinutes = timeToMinutes(WORKING_START);
  const endMinutes = timeToMinutes(WORKING_END);

  // Get vessel to know the concurrent booking limit
  const vessel = await prisma.vessel.findUnique({
    where: { id: vesselId },
    select: { maxConcurrentBookings: true },
  });
  const maxConcurrent = vessel?.maxConcurrentBookings ?? 2;

  // Determine if we're checking today's date (to skip already-finished tours)
  const todayStr = new Date().toISOString().split("T")[0];
  const isToday = dateStr === todayStr;
  const nowMinutes = isToday ? currentTimeMinutes() : 0;

  // Get all active bookings for this vessel on this date (with each booking's own duration)
  const date = new Date(dateStr + "T00:00:00.000Z");
  const bookings = await prisma.booking.findMany({
    where: {
      vesselId,
      date,
      bookingStatus: { in: ["NEW", "PENDING", "CONFIRMED"] },
    },
    select: {
      startTime: true,
      tour: { select: { durationHours: true } },
    },
  });

  // Get admin blocks
  const blocks = await prisma.availability.findMany({
    where: { vesselId, date },
  });

  const slots: Array<{ time: string; available: boolean; concurrentCount: number; maxConcurrent: number }> = [];

  for (
    let t = startMinutes;
    t + durationMinutes <= endMinutes;
    t += BUFFER_MINUTES
  ) {
    const slotStart = t;
    const slotEnd = t + durationMinutes;

    // Count how many active bookings overlap with this slot
    let concurrentCount = 0;
    for (const booking of bookings) {
      const bookedStart = timeToMinutes(booking.startTime);
      const bookedDuration = Number(booking.tour.durationHours) * 60;
      const bookedEnd = bookedStart + bookedDuration;

      // Skip bookings whose tour has already physically ended (tour end + buffer <= now)
      // This handles cases where admin hasn't yet updated status to COMPLETED
      if (isToday && bookedEnd + BUFFER_MINUTES <= nowMinutes) {
        continue;
      }

      if (slotStart < bookedEnd + BUFFER_MINUTES && slotEnd + BUFFER_MINUTES > bookedStart) {
        concurrentCount++;
      }
    }

    // Slot is available only if concurrent count is below the vessel's limit
    let available = concurrentCount < maxConcurrent;

    // Check admin blocks (full day or time range)
    if (available) {
      for (const block of blocks) {
        if (!block.blockedFrom && !block.blockedTo) {
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

    slots.push({ time: minutesToTime(slotStart), available, concurrentCount, maxConcurrent });
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
