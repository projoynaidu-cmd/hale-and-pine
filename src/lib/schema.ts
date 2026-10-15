import { areas, averageRating, business, reviews, services, type Area, type Service } from "@/lib/business";

export function pageMeta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
    ],
  };
}

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: business.street,
    addressLocality: business.city,
    addressRegion: business.region,
    postalCode: business.postal,
    addressCountry: "US",
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Plumber", "HVACBusiness"],
    name: business.name,
    image: "/photos/shop.jpg",
    telephone: business.phoneTel,
    email: business.email,
    priceRange: "$$",
    foundingDate: String(business.founded),
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.lat,
      longitude: business.lng,
    },
    areaServed: areas.map((area) => ({ "@type": "City", name: `${area.name}, Maine` })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating().toFixed(1),
      reviewCount: String(reviews.length),
      bestRating: "5",
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(review.stars),
        bestRating: "5",
      },
      reviewBody: review.text,
      name: `${review.service} in ${review.town}`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing and heating",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.name },
      })),
    },
    description:
      "Family plumbing and heating shop on Fore Street in Portland, Maine, serving eight towns from the peninsula to Freeport.",
  };
}

export function serviceLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.lede,
    provider: {
      "@type": "Plumber",
      name: business.name,
      telephone: business.phoneTel,
      address: postalAddress(),
    },
    areaServed: areas.map((area) => ({ "@type": "City", name: `${area.name}, Maine` })),
    image: service.image,
  };
}

export function areaLd(area: Area) {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: business.name,
    telephone: business.phoneTel,
    address: postalAddress(),
    areaServed: { "@type": "City", name: `${area.name}, Maine` },
    description: area.lede,
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  };
}
