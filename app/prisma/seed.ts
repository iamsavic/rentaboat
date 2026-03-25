import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Location
  const location = await prisma.location.upsert({
    where: { id: "location-budva-marina" },
    update: {},
    create: {
      id: "location-budva-marina",
      name: "Budva Marina",
      address: "Budva Marina, Budva, Montenegro",
      googleMapsUrl: "https://maps.google.com/?q=Budva+Marina",
      whatsappNumber: "+382XXXXXXXX",
      contactPhone: "+382XXXXXXXX",
      workingHours: {
        monday: "08:00-20:00",
        tuesday: "08:00-20:00",
        wednesday: "08:00-20:00",
        thursday: "08:00-20:00",
        friday: "08:00-20:00",
        saturday: "08:00-20:00",
        sunday: "08:00-20:00",
      },
    },
  });

  // Owner
  const owner = await prisma.owner.upsert({
    where: { id: "owner-main" },
    update: {},
    create: {
      id: "owner-main",
      name: "Rent-a-Boat Budva",
      contactEmail: "info@rentaboat-budva.com",
      contactPhone: "+382XXXXXXXX",
      commissionPercent: 0,
      active: true,
    },
  });

  // Vessel
  const vessel = await prisma.vessel.upsert({
    where: { slug: "speedboat-budva" },
    update: { maxConcurrentBookings: 2 },
    create: {
      name: "Speedboat Budva",
      slug: "speedboat-budva",
      vesselType: "SPEEDBOAT",
      capacity: 7,
      description: "Modern speedboat for up to 7 passengers",
      locationId: location.id,
      ownerId: owner.id,
      ownerType: "OWN",
      active: true,
      maxConcurrentBookings: 2,
    },
  });

  // Tours
  const tours = [
    {
      nameSr: "Panoramska tura",
      nameEn: "Panoramic Tour",
      slugSr: "panoramska-tura",
      slugEn: "panoramic-tour",
      durationHours: 1,
      priceEur: 80,
      fixedPrice: false,
      requiresDeposit: false,
      descriptionSr:
        "Uživajte u lepotama budvanskog primorja na jednočasovnoj vožnji brzim čamcem. Tura uključuje najlepše tačke blizu Budve.",
      descriptionEn:
        "Enjoy the beauty of the Budva Riviera on a one-hour speedboat ride. The tour includes the most beautiful spots near Budva.",
      destinationsSr: [
        "Stari grad Budva",
        "Plava laguna",
        "Kalijpso pećina",
        "Ostrvo Sv. Nikole",
      ],
      destinationsEn: [
        "Budva Old Town",
        "Blue Lagoon",
        "Calypso Cave",
        "St. Nicholas Island",
      ],
      sortOrder: 1,
    },
    {
      nameSr: "Sveti Stefan tura",
      nameEn: "Sveti Stefan Tour",
      slugSr: "sveti-stefan-tura",
      slugEn: "sveti-stefan-tour",
      durationHours: 2,
      priceEur: 160,
      fixedPrice: false,
      requiresDeposit: false,
      descriptionSr:
        "Dvočasovna tura koja uključuje sve destinacije panoramske ture, plus ikonični Sveti Stefan — jedan od najfotografisanijih prizora na Jadranu.",
      descriptionEn:
        "A two-hour tour that includes all Panoramic Tour destinations, plus the iconic Sveti Stefan — one of the most photographed sights on the Adriatic.",
      destinationsSr: [
        "Stari grad Budva",
        "Plava laguna",
        "Kalijpso pećina",
        "Ostrvo Sv. Nikole",
        "Sveti Stefan",
      ],
      destinationsEn: [
        "Budva Old Town",
        "Blue Lagoon",
        "Calypso Cave",
        "St. Nicholas Island",
        "Sveti Stefan",
      ],
      sortOrder: 2,
    },
    {
      nameSr: "Petrovac tura",
      nameEn: "Petrovac Tour",
      slugSr: "petrovac-tura",
      slugEn: "petrovac-tour",
      durationHours: 3,
      priceEur: 240,
      fixedPrice: false,
      requiresDeposit: false,
      descriptionSr:
        "Tročasovna tura — naša najpopularnija! Pored svih destinacija Sveti Stefan ture, doplovite do prelepe plaže i starog venetskog utvrđenja u Petrovcu.",
      descriptionEn:
        "Three-hour tour — our most popular! In addition to all Sveti Stefan Tour destinations, sail to the beautiful beach and old Venetian fort in Petrovac.",
      destinationsSr: [
        "Stari grad Budva",
        "Plava laguna",
        "Kalijpso pećina",
        "Ostrvo Sv. Nikole",
        "Sveti Stefan",
        "Petrovac",
      ],
      destinationsEn: [
        "Budva Old Town",
        "Blue Lagoon",
        "Calypso Cave",
        "St. Nicholas Island",
        "Sveti Stefan",
        "Petrovac",
      ],
      sortOrder: 3,
    },
    {
      nameSr: "Blue Cave tura",
      nameEn: "Blue Cave Tour",
      slugSr: "blue-cave-tura",
      slugEn: "blue-cave-tour",
      durationHours: 3,
      priceEur: 300,
      fixedPrice: true,
      requiresDeposit: false,
      descriptionSr:
        "Posebna tura do misteriozne Plave pećine, jedne od najljepših prirodnih atrakcija crnogorskog primorja. Turu dopunjuje panoramska vožnja duž budvanske rivijere.",
      descriptionEn:
        "A special tour to the mysterious Blue Cave, one of the most beautiful natural attractions on the Montenegrin coast. The tour is complemented by a panoramic ride along the Budva Riviera.",
      destinationsSr: ["Plava pećina (Blue Cave)", "Panorama rivijere"],
      destinationsEn: ["Blue Cave", "Riviera panorama"],
      sortOrder: 4,
    },
  ];

  for (const tourData of tours) {
    await prisma.tour.upsert({
      where: { slugEn: tourData.slugEn },
      update: {},
      create: {
        ...tourData,
        durationHours: tourData.durationHours,
        priceEur: tourData.priceEur,
        vesselId: vessel.id,
      },
    });
  }

  console.log("✅ Seed complete");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
