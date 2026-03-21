export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristGuideAgency",
    name: "Rent-a-Boat Budva",
    url: "https://rentaboat-budva.com",
    logo: "https://rentaboat-budva.com/images/logo.png",
    description:
      "Speedboat tours in Budva, Montenegro. Skipper, fuel and welcome drink always included.",
    telephone: "+382XXXXXXXX",
    email: "info@rentaboat-budva.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Budva Marina",
      addressLocality: "Budva",
      addressCountry: "ME",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.288,
      longitude: 18.837,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash",
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function TourJsonLd({
  name,
  description,
  price,
  duration,
  url,
}: {
  name: string;
  description: string;
  price: number;
  duration: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name,
    description,
    url,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "TouristGuideAgency",
      name: "Rent-a-Boat Budva",
      url: "https://rentaboat-budva.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
