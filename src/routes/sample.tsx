import { createFileRoute, Link } from "@tanstack/react-router";
import { AreaCheck } from "@/components/area-check";
import { JsonLd } from "@/components/json-ld";
import { FaqList, MapFrame, SiteShell } from "@/components/shell";
import { Stars } from "@/components/stars";
import { Button } from "@/components/ui/button";
import {
  addressLine,
  areas,
  averageRating,
  business,
  faqs,
  money,
  phoneHref,
  reviews,
  services,
} from "@/lib/business";
import { container } from "@/lib/cn";
import { localBusinessLd, pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/sample")({
  head: () =>
    pageMeta(
      "Sample site · Hale & Pine | PrimeCrawl",
      "A demonstration local SEO site for a Portland plumbing shop. Service pages, town pages, schema, and a Google Business Profile check.",
    ),
  component: Home,
});

function Home() {
  const featured = reviews[0];
  return (
    <SiteShell>
      <JsonLd data={localBusinessLd()} />
      <section className={container + " pt-8 pb-4"}>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold tracking-wide text-copper">
              Portland, Maine · Est. {business.founded}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
              Heat and water, handled by people who live here.
            </h1>
            <p className="mt-5 text-lg text-muted">
              Hale & Pine is the plumbing and heating shop on Fore Street. Furnaces, leaks, boilers,
              and water heaters for Greater Portland — booked by morning, overnight when a pipe lets go.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <a href={phoneHref}>Call {business.phoneDisplay}</a>
              </Button>
              <Button asChild variant="line">
                <Link to="/contact">Request a visit</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:gap-8">
              <li>
                <p className="font-display text-3xl text-ink">{money(business.diagnostic)}</p>
                <p className="text-sm text-muted">diagnostic, waived with the repair</p>
              </li>
              <li>
                <p className="font-display text-3xl text-ink">{averageRating().toFixed(1)}</p>
                <p className="text-sm text-muted">from {reviews.length} recent local jobs</p>
              </li>
              <li>
                <p className="font-display text-3xl text-ink">24/7</p>
                <p className="text-sm text-muted">for no-heat and burst pipes</p>
              </li>
            </ul>
          </div>
          <figure className="lg:col-span-7">
            <img
              src="/photos/hero.jpg"
              alt="Dark green service van parked on wet cobblestones in Portland's Old Port, side door open to copper pipe."
              width={1792}
              height={1008}
              fetchPriority="high"
              className="aspect-video w-full rounded-lg object-cover"
            />
            <figcaption className="mt-3 text-sm text-muted">
              Between jobs in the Old Port. We still park the van ourselves.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mt-12 bg-sand py-12">
        <div className={container + " grid items-center gap-8 lg:grid-cols-2"}>
          <div>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">See if we cover your town</h2>
            <p className="mt-3 text-muted">
              Eight towns from Fore Street. Type a name, a neighborhood, or a zip — we say so when
              you're outside the loop.
            </p>
          </div>
          <AreaCheck />
        </div>
      </section>

      <section className={container + " py-16"}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">The work</h2>
          <Link to="/services" className="text-sm font-semibold text-pine underline decoration-line underline-offset-4">
            All services
          </Link>
        </div>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="grid gap-4 py-6 sm:grid-cols-12 sm:items-center"
            >
              <span className="font-display text-copper sm:col-span-1">0{index + 1}</span>
              <span className="font-display text-2xl text-ink sm:col-span-3">{service.name}</span>
              <span className="text-muted sm:col-span-6">{service.lede}</span>
              <span className="text-sm font-semibold text-pine sm:col-span-2 sm:text-right">
                From {money(service.jobs[0].low)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className={container + " grid items-center gap-10 lg:grid-cols-2"}>
          <img
            src="/photos/owner.jpg"
            alt="Mara Hale in a forest-green chore coat in the workshop, copper pipe behind her."
            width={1200}
            height={1600}
            className="aspect-3/4 w-full rounded-lg object-cover"
          />
          <div>
            <p className="text-sm font-semibold tracking-wide text-copper">From the owner</p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              My father started with a van and a yellow pages ad.
            </h2>
            <p className="mt-4 text-lg text-muted">
              I kept the phone number's manners. We still tell you when a part will not fix it,
              and we still wipe the stair on the way out. The Google listing says the same address
              as the invoice, because that is the whole trick.
            </p>
            <p className="mt-4 font-display text-xl text-ink">— Mara Hale</p>
            <div className="mt-6">
              <Button asChild variant="line">
                <Link to="/about">The shop</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={container + " py-16"}>
        <div className="max-w-3xl">
          <Stars value={featured.stars} />
          <blockquote className="mt-4 font-display text-3xl leading-snug text-ink sm:text-4xl">
            “{featured.text}”
          </blockquote>
          <p className="mt-4 text-muted">
            {featured.name}, {featured.town} · {featured.when}
          </p>
          <Link
            to="/reviews"
            className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-pine underline decoration-line underline-offset-4"
          >
            All {reviews.length} notes
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-sand py-16">
        <div className={container}>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Towns on the loop</h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => (
              <li key={area.slug} className="bg-cream">
                <Link to="/areas/$slug" params={{ slug: area.slug }} className="block p-5 hover:bg-paper">
                  <span className="font-display text-2xl text-ink">{area.name}</span>
                  <span className="mt-2 block text-sm text-muted">{area.zips.join(" · ")}</span>
                  <span className="mt-2 block text-sm text-muted">{area.drive}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={container + " grid gap-10 py-16 lg:grid-cols-2"}>
        <div>
          <h2 className="font-display text-3xl text-ink">Questions we answer on the phone</h2>
          <div className="mt-6">
            <FaqList items={faqs.slice(0, 4)} />
          </div>
          <Link
            to="/faq"
            className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-pine underline decoration-line underline-offset-4"
          >
            The rest of the questions
          </Link>
        </div>
        <div>
          <h2 className="font-display text-3xl text-ink">Fore Street</h2>
          <p className="mt-3 text-muted">{addressLine()}</p>
          <div className="mt-4">
            <MapFrame />
          </div>
        </div>
      </section>

      <section className="bg-pine text-cream">
        <div className={container + " py-16"}>
          <h2 className="max-w-2xl font-display text-4xl sm:text-5xl">If it's leaking or cold, call.</h2>
          <p className="mt-4 max-w-xl text-cream/85">
            The form is for planned work. A burst pipe or a dead furnace does not need a paragraph.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <a href={phoneHref}>Call {business.phoneDisplay}</a>
            </Button>
            <Button asChild variant="inverse">
              <Link to="/contact">Request a visit</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
