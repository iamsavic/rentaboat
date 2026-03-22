import { prisma } from "@/lib/prisma";
import CalendarBlocker from "@/components/admin/CalendarBlocker";

export const dynamic = "force-dynamic";

async function getVessels() {
  try {
    return await prisma.vessel.findMany({ where: { active: true } });
  } catch {
    return [];
  }
}

async function getBlocks(vesselId?: string) {
  try {
    return await prisma.availability.findMany({
      where: vesselId ? { vesselId } : {},
      orderBy: { date: "asc" },
      include: { vessel: { select: { name: true } } },
      take: 50,
    });
  } catch {
    return [];
  }
}

type Props = { searchParams: Promise<{ vessel?: string }> };

export default async function CalendarPage({ searchParams }: Props) {
  const sp = await searchParams;
  const vessels = await getVessels();
  const blocks = await getBlocks(sp.vessel);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Upravljanje kalendarom</h1>
      <CalendarBlocker vessels={vessels} existingBlocks={(blocks as Array<{ id: string; vesselId: string; vessel: { name: string }; date: Date; blockedFrom: string | null; blockedTo: string | null; reason: string | null }>).map((b) => ({
        id: b.id,
        vesselId: b.vesselId,
        vesselName: b.vessel.name,
        date: b.date.toISOString().split("T")[0],
        blockedFrom: b.blockedFrom,
        blockedTo: b.blockedTo,
        reason: b.reason,
      }))} />
    </div>
  );
}
