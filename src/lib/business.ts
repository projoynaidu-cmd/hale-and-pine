export const business = {
  name: "Hale & Pine Mechanical",
  shortName: "Hale & Pine",
  street: "48 Fore Street, Suite 2",
  city: "Portland",
  region: "ME",
  postal: "04101",
  phoneDisplay: "(207) 555-0148",
  phoneTel: "+12075550148",
  email: "hello@haleandpine.example",
  lat: 43.6564,
  lng: -70.2509,
  founded: 1978,
  license: "Maine Master Plumber MP-4418",
  epa: "EPA 608 Universal",
  diagnostic: 89,
  afterHours: 189,
} as const;

export const phoneHref = `tel:${business.phoneTel}`;

export function addressLine() {
  return `${business.street}, ${business.city}, ${business.region} ${business.postal}`;
}

export function mapsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine())}`;
}

export function osmEmbed() {
  const { lat, lng } = business;
  const bbox = [lng - 0.02, lat - 0.012, lng + 0.02, lat + 0.012].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`;
}

export function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export const hourRows = [
  { label: "Monday – Friday", time: "7:00am – 5:00pm" },
  { label: "Saturday", time: "8:00am – 1:00pm" },
  { label: "Sunday", time: "Emergency only" },
] as const;

const WEEK: Record<string, [number, number] | null> = {
  Mon: [7 * 60, 17 * 60],
  Tue: [7 * 60, 17 * 60],
  Wed: [7 * 60, 17 * 60],
  Thu: [7 * 60, 17 * 60],
  Fri: [7 * 60, 17 * 60],
  Sat: [8 * 60, 13 * 60],
  Sun: null,
};

export function shopStatus(date: Date): { open: boolean; label: string } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const window = WEEK[get("weekday")];
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  if (!window || Number.isNaN(hour) || Number.isNaN(minute)) {
    return { open: false, label: "Closed · emergency line is on" };
  }
  const mins = hour * 60 + minute;
  if (mins >= window[0] && mins < window[1]) {
    const closeH = Math.floor(window[1] / 60);
    const closeLabel = closeH > 12 ? `${closeH - 12}pm` : `${closeH}am`;
    return { open: true, label: `Open now · until ${closeLabel}` };
  }
  return { open: false, label: "Closed · emergency line is on" };
}

export type ServiceSlug = "plumbing" | "heating" | "water-heaters" | "boilers" | "emergency";

export type Job = {
  id: string;
  name: string;
  low: number;
  high: number;
  note: string;
};

export type Service = {
  slug: ServiceSlug;
  name: string;
  meta: string;
  lede: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  problems: string[];
  includes: string[];
  jobs: Job[];
};

export const services: Service[] = [
  {
    slug: "plumbing",
    name: "Plumbing",
    meta: "Leak repair, repipes, and fixtures for Portland homes. Hale & Pine Mechanical, licensed master plumber MP-4418.",
    lede: "Leaks, tired valves, and supply lines that have been galvanized since the building went up. We repair what should be repaired and replace what is quietly rotting in the wall.",
    image: "/photos/plumbing.jpg",
    imageAlt: "Hands sweating a copper joint under a bright kitchen sink.",
    width: 1600,
    height: 1200,
    problems: [
      "A shutoff that spins and does not stop the water",
      "Galvanized risers staining the water brown",
      "A faucet that was fine until the handle came off in your hand",
      "Supply lines you cannot find because someone painted over them",
    ],
    includes: [
      "Diagnose before we open a wall",
      "Copper or PEX, chosen for the house, not a preference",
      "New shutoffs labeled so the next leak is a shorter story",
      "One-year labor warranty on the work we did",
    ],
    jobs: [
      {
        id: "plumb-leak",
        name: "Leak or fixture repair",
        low: 180,
        high: 650,
        note: "Most single-fixture jobs land here, including the shutoff.",
      },
      {
        id: "plumb-faucet",
        name: "Faucet and supply replacement",
        low: 320,
        high: 780,
        note: "Fixture by you or by us. We do not install a faucet onto rotten stops.",
      },
      {
        id: "plumb-repipe",
        name: "Repipe a bath group",
        low: 2200,
        high: 4800,
        note: "Access decides the number. Plaster walls cost more than a basement ceiling.",
      },
    ],
  },
  {
    slug: "heating",
    name: "Heating",
    meta: "Furnace and heat pump repair and replacement in Greater Portland. Tune-ups from $129. Hale & Pine Mechanical.",
    lede: "Furnaces, heat pumps, and the ductwork between them. We service what you have before we talk about what you could buy.",
    image: "/photos/heating.jpg",
    imageAlt: "A technician servicing a high-efficiency furnace in a tidy basement.",
    width: 1600,
    height: 1200,
    problems: [
      "Heat that reaches the first floor and gives up",
      "A furnace that short-cycles every few minutes",
      "An outdoor unit iced into a sculpture in January",
      "A quote from last year that assumed a bigger house",
    ],
    includes: [
      "Combustion and airflow check, not just a filter swap",
      "A plain answer if a heat pump is the wrong tool here",
      "Electrical capacity called out before you buy equipment",
      "Manufacturer parts warranty, one year of our labor",
    ],
    jobs: [
      {
        id: "heat-tune",
        name: "Season tune-up",
        low: 129,
        high: 189,
        note: "Book in September if you want October. February is for things that already failed.",
      },
      {
        id: "heat-repair",
        name: "Furnace or heat pump repair",
        low: 220,
        high: 900,
        note: "Boards and blower motors sit at the top of that range.",
      },
      {
        id: "heat-replace",
        name: "Furnace or heat pump replacement",
        low: 6800,
        high: 14000,
        note: "Duct changes and an electrical panel upgrade are extra, and we say so up front.",
      },
    ],
  },
  {
    slug: "water-heaters",
    name: "Water heaters",
    meta: "Tank and tankless water heater replacement in Portland, Maine. Same-day installs when the old tank has already failed.",
    lede: "Tank and tankless, sized for the house you live in — not a catalog photo of a family of six.",
    image: "/photos/water.jpg",
    imageAlt: "A new water heater with neat copper lines in a utility closet.",
    width: 1600,
    height: 1200,
    problems: [
      "A puddle that is not the washer",
      "Hot water that lasts one shower",
      "Popping from the tank at night",
      "A rental contract that costs more than owning by year four",
    ],
    includes: [
      "Pan, expansion, and a proper vent check",
      "Anode and flush if the tank still has years",
      "Haul-away of the old unit",
      "No rental contracts. You own what we install.",
    ],
    jobs: [
      {
        id: "wh-flush",
        name: "Flush and anode",
        low: 180,
        high: 260,
        note: "Worth it on a tank under eight years. After that we talk replacement.",
      },
      {
        id: "wh-tank",
        name: "Tank replacement, 40–50 gallon",
        low: 1450,
        high: 2300,
        note: "Includes haul-away. A pan and expansion tank are in the number when the code wants them.",
      },
      {
        id: "wh-tankless",
        name: "Tankless install",
        low: 2900,
        high: 4600,
        note: "Gas line size and venting move this more than the brand does.",
      },
    ],
  },
  {
    slug: "boilers",
    name: "Boilers",
    meta: "Steam and hot-water boiler repair and replacement for Portland triple-deckers and village houses. Hale & Pine Mechanical.",
    lede: "Steam and hot water, including the cast-iron units still heating triple-deckers on the peninsula. We repair them. We replace them when repair is a story you will hear again in February.",
    image: "/photos/boiler.jpg",
    imageAlt: "An older cast-iron boiler beside a newer compact boiler with copper piping.",
    width: 1600,
    height: 1200,
    problems: [
      "Radiators hot in the front room, cold in the back",
      "A boiler that needs water every week",
      "Steam that hammers the pipes at 5am",
      "A replacement quote that ignored the chimney",
    ],
    includes: [
      "Zone-by-zone check before we condemn the boiler",
      "Near-boiler piping done so the new unit can actually heat",
      "Steam systems left as steam when that is the right call",
      "COI sent to your building manager the same day",
    ],
    jobs: [
      {
        id: "boil-service",
        name: "Annual boiler service",
        low: 189,
        high: 260,
        note: "Controls, pressure, and the vents that make a floor go cold.",
      },
      {
        id: "boil-repair",
        name: "Circulator, zone, or control repair",
        low: 280,
        high: 1100,
        note: "A dead circulator is often not a dead boiler. We check that first.",
      },
      {
        id: "boil-replace",
        name: "Boiler replacement",
        low: 8200,
        high: 15500,
        note: "Chimney liner and indirect water heater are the usual add-ons.",
      },
    ],
  },
  {
    slug: "emergency",
    name: "Emergency calls",
    meta: "Overnight no-heat and burst-pipe service in Greater Portland. Call Hale & Pine at (207) 555-0148. A person answers.",
    lede: "No heat, a burst pipe, a water heater emptying into the basement. Call the shop number. A person answers, including overnight.",
    image: "/photos/emergency.jpg",
    imageAlt: "A service van in the driveway of a shingle house on a frosty morning.",
    width: 1728,
    height: 1152,
    problems: [
      "Water where water should not be, right now",
      "The house is dropping toward freezing",
      "A tank that let go while you were out",
      "A shutoff you cannot find",
    ],
    includes: [
      "We make it safe first, then we schedule the pretty repair",
      "After-hours diagnostic is $189, not a surprise multiplier",
      "Photos of what we found, sent to you",
      "If it can wait until morning, we will tell you",
    ],
    jobs: [
      {
        id: "em-dispatch",
        name: "After-hours dispatch",
        low: 189,
        high: 189,
        note: "The diagnostic. Waived if you approve the repair on that visit.",
      },
      {
        id: "em-pipe",
        name: "Burst pipe, make-safe and repair",
        low: 350,
        high: 900,
        note: "Open walls and drywall are a separate trade. We stop the water and fix the pipe.",
      },
      {
        id: "em-heat",
        name: "No-heat overnight",
        low: 189,
        high: 900,
        note: "Diagnostic plus the repair if we carry the part. A failed heat exchanger waits for morning and a quote.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export type Area = {
  slug: string;
  name: string;
  zips: string[];
  aliases: string[];
  drive: string;
  meta: string;
  lede: string;
  housing: string;
  common: string[];
};

export const areas: Area[] = [
  {
    slug: "portland",
    name: "Portland",
    zips: ["04101", "04102", "04103"],
    aliases: ["old port", "munjoy", "munjoy hill", "west end", "east end", "deering", "peninsula"],
    drive: "On the peninsula in about 15 minutes from Fore Street.",
    meta: "Plumber and heating company serving Portland, Maine — Munjoy Hill, the West End, Deering, and the Old Port. Hale & Pine Mechanical.",
    lede: "Triple-deckers, brick condos, and houses that have been replumbed in chapters. We work the peninsula every day.",
    housing: "Galvanized risers are still common off Munjoy and in parts of the West End. Waterfront condos usually want a certificate of insurance before we step into the basement — we send it the same day. Frozen hose bibs on the Eastern Prom are a January tradition we would like to retire.",
    common: [
      "Galvanized supply lines and painted-over shutoffs",
      "Steam heat in triple-deckers",
      "Condo boards that need a COI first",
    ],
  },
  {
    slug: "south-portland",
    name: "South Portland",
    zips: ["04106"],
    aliases: ["sopo", "south portland", "willard", "willard beach"],
    drive: "Twelve to twenty minutes over the bridge.",
    meta: "Plumbing and heating in South Portland, Maine. Willard, Loveitt's Field, and the capes near the mall. Hale & Pine Mechanical.",
    lede: "Cottages by Willard, capes from the nineties, and newer heat pumps near the mall. We are over the bridge most afternoons.",
    housing: "Loveitt's Field and Willard still have original bath groups that were fine until the mixing valve wasn't. Tank water heaters in the nineties capes are hitting the age where they puddle on a Sunday. We carry the common sizes on the truck.",
    common: [
      "Aging tank water heaters",
      "Mixing valves that drift hot",
      "Heat pumps that ice up when the filter is packed",
    ],
  },
  {
    slug: "westbrook",
    name: "Westbrook",
    zips: ["04092"],
    aliases: ["westbrook"],
    drive: "About twenty minutes from the shop.",
    meta: "Westbrook plumber and boiler repair. Mill blocks and postwar ranches. Hale & Pine Mechanical.",
    lede: "Mill buildings and postwar ranches. The boilers near the river are older than the kitchens above them.",
    housing: "Galvanized supply is still common off Main. The mill conversions have beautiful floors and mechanical rooms that were an afterthought — we bring drop cloths and we do not lean pipe on a finished stair. Postwar ranches usually need a water heater and a furnace conversation in the same decade.",
    common: [
      "Galvanized lines off Main Street",
      "Boilers in older blocks near the river",
      "Furnaces original to postwar ranches",
    ],
  },
  {
    slug: "falmouth",
    name: "Falmouth",
    zips: ["04105"],
    aliases: ["falmouth", "falmouth foreside"],
    drive: "Fifteen to twenty-five minutes up Route 1.",
    meta: "Heating and plumbing in Falmouth, Maine. Boilers, heat pumps, and honest comparisons between them. Hale & Pine.",
    lede: "Larger colonials and long flue runs. Owners here are usually comparing a boiler replacement with a ducted heat pump. We will say when the heat pump is the wrong tool.",
    housing: "A lot of Falmouth houses have a boiler that still works and an electrical panel that does not have room for a heat pump. We look at the panel before we look at equipment brochures. Steam leftovers are rare; hot-water boilers and a cold room over the garage are not.",
    common: [
      "Boiler-to-heat-pump decisions",
      "Panels without spare capacity",
      "Cold rooms over garages",
    ],
  },
  {
    slug: "scarborough",
    name: "Scarborough",
    zips: ["04074"],
    aliases: ["scarborough", "higgins beach"],
    drive: "Twenty to thirty minutes, longer if Route 1 is sulking.",
    meta: "Scarborough plumbing and heating. Salt air, water heaters, and condensers near Higgins Beach. Hale & Pine Mechanical.",
    lede: "Salt air near Higgins Beach, and a few streets off the marsh where sediment eats anode rods early.",
    housing: "Outdoor units close to the water corrode faster than the brochure admits. We check the anode before we sell a new tank — on a few well-water streets it is the whole story. Newer subdivisions are straightforward: filters, drains, and a furnace that wants a tune-up it has never had.",
    common: [
      "Anode rods dying early",
      "Salt air on outdoor condensers",
      "Furnaces that have never been tuned",
    ],
  },
  {
    slug: "cape-elizabeth",
    name: "Cape Elizabeth",
    zips: ["04107"],
    aliases: ["cape elizabeth", "cape", "the cape"],
    drive: "About twenty minutes.",
    meta: "Cape Elizabeth plumber for seasonal houses, oceanfront cottages, and boilers that only need a zone valve. Hale & Pine.",
    lede: "Oceanfront cottages and seasonal houses that were shut down badly. Also boilers from the eighties that are oversized and still have years if a zone valve is the actual problem.",
    housing: "We winterize, and we open houses back up in May without flooding the crawlspace. A lot of Cape equipment gets replaced because it is old, not because it failed. If a zone valve or a vent will do it, that is the job we quote.",
    common: [
      "Seasonal open and close",
      "Oversized eighties boilers",
      "Zone valves blamed on the whole system",
    ],
  },
  {
    slug: "yarmouth",
    name: "Yarmouth",
    zips: ["04096"],
    aliases: ["yarmouth"],
    drive: "About twenty-five minutes up Route 1.",
    meta: "Yarmouth plumbing and heating for village colonials, leftover steam, and tight Main Street parking. Hale & Pine.",
    lede: "Village colonials with a mix of leftover steam and newer radiant. Parking on Main is tight, so we stage on a side street and walk in.",
    housing: "The village houses hide shutoffs in places that made sense in 1920. We find them and we label them. Radiant retrofits next to old steam need a careful look — the two systems do not share a personality.",
    common: [
      "Hidden shutoffs in village houses",
      "Steam beside newer radiant",
      "Tight parking on Main Street",
    ],
  },
  {
    slug: "freeport",
    name: "Freeport",
    zips: ["04032"],
    aliases: ["freeport"],
    drive: "About thirty minutes. We do not do retail fit-outs.",
    meta: "Freeport house plumbing and water heaters, including short-term rentals that need hot water before Saturday check-in. Hale & Pine.",
    lede: "Colonials behind the outlets, and short-term rentals that need hot water before a Saturday check-in. Houses and small apartments only — we do not fit out stores.",
    housing: "A rental with no hot water on Friday afternoon is a water heater job, not a renovation. We say what we can finish before check-in and what has to wait. Year-round colonials here look like Yarmouth's, with longer driveways and the same aging boilers.",
    common: [
      "Friday water-heater failures in rentals",
      "Colonials with aging boilers",
      "No retail or store fit-outs",
    ],
  },
];

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug);
}

export function matchArea(query: string): Area | null {
  const q = query.trim().toLowerCase().replace(/\./g, "");
  if (!q) return null;
  const exact = areas.find(
    (area) =>
      area.zips.includes(q) ||
      area.name.toLowerCase() === q ||
      area.aliases.some((alias) => alias === q),
  );
  if (exact) return exact;
  if (q.length < 4) return null;
  return (
    areas.find(
      (area) =>
        area.name.toLowerCase().includes(q) || area.aliases.some((alias) => alias.includes(q)),
    ) ?? null
  );
}

export type Review = {
  id: string;
  name: string;
  town: string;
  service: ServiceSlug;
  stars: number;
  text: string;
  when: string;
};

export const reviews: Review[] = [
  {
    id: "priya",
    name: "Priya Raman",
    town: "Portland",
    service: "plumbing",
    stars: 5,
    text: "They replaced the galvanized riser in our triple-decker without opening every wall. Texted before they arrived and left the stairwell cleaner than they found it.",
    when: "September 2026",
  },
  {
    id: "tom",
    name: "Tom Beal",
    town: "Falmouth",
    service: "heating",
    stars: 5,
    text: "The heat pump quote was plain about what it would not cover, including the panel. Install took two days. The upstairs is finally the same temperature as the kitchen.",
    when: "August 2026",
  },
  {
    id: "ellen",
    name: "Ellen Voss",
    town: "South Portland",
    service: "water-heaters",
    stars: 5,
    text: "The tank let go on a Sunday night. They were here before we ran out of towels, and the new one was in by morning. No rental pitch.",
    when: "February 2026",
  },
  {
    id: "chris",
    name: "Chris Doucette",
    town: "Westbrook",
    service: "boilers",
    stars: 4,
    text: "They fixed the circulator the same day, but the first window was the next morning and the house was cold overnight. The work was clean. I would call again, earlier.",
    when: "January 2026",
  },
  {
    id: "naomi",
    name: "Naomi Feld",
    town: "Cape Elizabeth",
    service: "emergency",
    stars: 5,
    text: "A pipe in the crawlspace in January. They shut it down, dried what they could, and came back for the repair on a Tuesday that was already full. Did not make us feel like a nuisance.",
    when: "January 2026",
  },
  {
    id: "luis",
    name: "Luis Ortega",
    town: "Yarmouth",
    service: "plumbing",
    stars: 5,
    text: "The kitchen shutoff had been painted over by the last owner. They found it, replaced the valve, and labeled it so I will not hunt next time.",
    when: "June 2026",
  },
  {
    id: "hannah",
    name: "Hannah Greer",
    town: "Scarborough",
    service: "heating",
    stars: 5,
    text: "Annual tune-up, on time, no upsell on a furnace that still has years. That is why we stayed.",
    when: "October 2025",
  },
  {
    id: "ruth",
    name: "Ruth Lang",
    town: "Freeport",
    service: "plumbing",
    stars: 5,
    text: "Main-line clog the week the outlets were packed. They cleared it, explained the root problem, and did not leave a mess in the mudroom. Hot water was back before our Saturday guests.",
    when: "July 2026",
  },
];

export function averageRating() {
  const sum = reviews.reduce((total, review) => total + review.stars, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export type Shot = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  town: string;
  width: number;
  height: number;
};

export const gallery: Shot[] = [
  {
    id: "bath",
    src: "/photos/bath.jpg",
    alt: "A finished Maine bathroom with white tile, a soaking tub, and a brass faucet.",
    caption: "Bath group and brass faucet after a repipe. The tile setter was theirs; the water was ours.",
    town: "Cape Elizabeth",
    width: 1600,
    height: 1200,
  },
  {
    id: "plumbing",
    src: "/photos/plumbing.jpg",
    alt: "Copper joint being soldered under a kitchen sink.",
    caption: "Kitchen supply replacement. New stops, labeled.",
    town: "Yarmouth",
    width: 1600,
    height: 1200,
  },
  {
    id: "heating",
    src: "/photos/heating.jpg",
    alt: "Furnace service in a clean basement.",
    caption: "High-efficiency furnace, annual service. It did not need a replacement.",
    town: "Scarborough",
    width: 1600,
    height: 1200,
  },
  {
    id: "boiler",
    src: "/photos/boiler.jpg",
    alt: "Old cast-iron boiler beside a new compact boiler.",
    caption: "Boiler swap in a peninsula triple-decker. The old one stayed in the photo because the owner asked.",
    town: "Portland",
    width: 1600,
    height: 1200,
  },
  {
    id: "water",
    src: "/photos/water.jpg",
    alt: "New water heater with copper piping in a closet.",
    caption: "Forty-gallon tank, Sunday night failure, Monday morning hot water.",
    town: "South Portland",
    width: 1600,
    height: 1200,
  },
  {
    id: "emergency",
    src: "/photos/emergency.jpg",
    alt: "Service van in a frosty driveway of a shingle house.",
    caption: "First call of a cold morning. No-heat, and it was a circulator.",
    town: "Falmouth",
    width: 1728,
    height: 1152,
  },
  {
    id: "shop",
    src: "/photos/shop.jpg",
    alt: "Brick workshop with a forest-green door and a copper lantern.",
    caption: "The shop door on the side street behind Fore. Suite 2 is up the stair.",
    town: "Portland",
    width: 1792,
    height: 1008,
  },
  {
    id: "hero",
    src: "/photos/hero.jpg",
    alt: "Dark green service van on wet cobblestones in the Old Port.",
    caption: "Between jobs on a wet afternoon. The side door is where the copper lives.",
    town: "Portland",
    width: 1792,
    height: 1008,
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do you charge to come look?",
    a: "The diagnostic is $89 during shop hours and $189 after hours. If you approve the repair on that visit, we waive it. We do not waive it when the visit is only a quote for a replacement you want to think about — that is still a fair use of the afternoon.",
  },
  {
    q: "How fast can you get here?",
    a: "For scheduled work on the peninsula, same day is the usual answer if you call before noon. No-heat and active leaks jump the list, including overnight. A water heater you can plan is not an emergency, and we will say so.",
  },
  {
    q: "Which towns do you cover?",
    a: "Portland, South Portland, Westbrook, Falmouth, Scarborough, Cape Elizabeth, Yarmouth, and Freeport. If you are outside that loop, call anyway for no-heat — we sometimes make the drive. We do not pretend to cover the whole state.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Maine Master Plumber MP-4418. EPA 608 Universal for refrigerant work. Fully insured. Property managers get a certificate of insurance the same day they ask.",
  },
  {
    q: "Will you tell me if a heat pump is a bad idea?",
    a: "Yes. No spare room in the panel, nowhere legal for the outdoor unit, or a steam system that should stay steam — those are reasons to walk away from a heat pump. We install them when the house is a fit.",
  },
  {
    q: "Do you rent water heaters?",
    a: "No. Rentals look cheap and cost more than owning by about year four. We sell and install, and we haul the old tank away.",
  },
  {
    q: "Does the website match the Google listing?",
    a: "The name, address, and phone on this site are the ones on the Google Business Profile: Hale & Pine Mechanical, 48 Fore Street, Suite 2, Portland, ME 04101, (207) 555-0148. The listing page shows the categories, hours, and description we prepared. Google verifies the profile with you, not with us.",
  },
  {
    q: "Can you guarantee the top spot on Google?",
    a: "No. Anyone who guarantees a ranking is selling a story. What we set up is the part a shop controls: a fast site, one name-address-phone everywhere, service pages, town pages, and a profile that matches. Movement usually shows up over weeks, and it depends on who else is in the town.",
  },
];

export const gbpDescription =
  "Hale & Pine Mechanical is a family plumbing and heating company on Fore Street in Portland, Maine. Since 1978 we have fixed leaks, boilers, furnaces, and water heaters for homes from the peninsula out to Freeport. Same-day visits in Portland, South Portland, Westbrook, Falmouth, Scarborough, Cape Elizabeth, Yarmouth, and Freeport. The diagnostic is $89 and waived when you approve the repair that visit. Overnight dispatch for burst pipes and no-heat. Licensed master plumber MP-4418, EPA 608, insured. Call (207) 555-0148.";

export const gbpCategories = {
  primary: "Plumber",
  secondary: ["HVAC contractor", "Water heater installation service", "Boiler repair service"],
};

export const gbpQuestions = [
  {
    q: "Do you offer free estimates?",
    a: "The visit is $89 during shop hours, waived if you approve the repair that same visit.",
  },
  {
    q: "Are you open Sundays?",
    a: "The shop is closed Sunday. Burst pipes and no-heat are answered overnight, every day.",
  },
  {
    q: "Do you serve Cape Elizabeth?",
    a: "Yes. Cape Elizabeth is on the regular loop, about twenty minutes from Fore Street.",
  },
];

export const crew = [
  {
    name: "Mara Hale",
    role: "Owner, master plumber",
    bio: "Ed Hale's daughter. She took the company over in 2014 and kept the habit of answering the phone herself in the morning.",
  },
  {
    name: "Jonah Pine",
    role: "Partner, heating",
    bio: "Steam, hot water, and heat pumps. He is the one who will talk you out of a system your house cannot feed.",
  },
  {
    name: "Ruth Calder",
    role: "Drains and repipes",
    bio: "The person you want when the clog is not where the plunger thinks it is.",
  },
  {
    name: "Owen Briggs",
    role: "Water heaters",
    bio: "Keeps the common tank sizes on the truck so a Sunday failure is not a Tuesday story.",
  },
] as const;

export type SavedQuote = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  city: string;
  message: string;
  at: string;
};
