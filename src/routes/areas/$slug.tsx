import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import { Crumbs, Missing, SiteShell } from "@/components/shell";
import { Stars } from "@/components/stars";
import { getArea, getService, phoneHref, reviews, services } from "@/lib/business";
import { container } from "@/lib/cn";
import { areaLd, breadcrumbLd, pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/areas/$slug")({
  head: ({ params }) => {
    const area = getArea(params.slug);
    if (!area) return pageMeta("Town not found | Hale & Pine", "That town is not on our loop.");
    return pageMeta(`Plumber in ${area.name}, ME | Hale & Pine`, area.meta);
  },
  component: AreaPage,
});

function AreaPage() {
  const { slug } = Route.useParams();
  const area = getArea(slug);
  if (!area) {
    return (
      <SiteShell>
        <Missing what="town" />
      </SiteShell>
    );
  }
  const local = reviews.filter((review) => review.town === area.name);
  const shown = local.length > 0 ? local : reviews.slice(0, 2);
  return (
    <SiteShell>
      <JsonLd data={areaLd(area)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Towns", path: "/areas" },
          { name: area.name, path: `/areas/${area.slug}` },
        ])}
      />
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Towns", to: "/areas" },
          { label: area.name },
        ]}
      />
      <header className={container + " max-w-3xl py-8"}>
        <p className="text-sm font-semibold tracking-wide text-copper">{area.zips.join(" · ")}</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          Plumbing and heating in {area.name}
        </h1>
        <p className="mt-4 text-lg text-muted">{area.lede}</p>
        <p className="mt-2 text-muted">{area.drive}</p>
      </header>
      <section className={container + " grid gap-10 pb-12 lg:grid-cols-2"}>
        <div>
          <h2 className="font-display text-2xl text-ink">The houses</h2>
          <p className="mt-3 text-muted">{area.housing}</p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">What we see there</h2>
          <ul className="mt-4 space-y-3">
            {area.common.map((item) => (
              <li key={item} className="border-l-2 border-copper pl-4 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={container + " pb-12"}>
        <h2 className="font-display text-2xl text-ink">Services in {area.name}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="inline-flex min-h-11 items-center rounded-md border border-line bg-cream px-4 text-sm font-semibold"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className={container + " pb-16"}>
        <h2 className="font-display text-2xl text-ink">
          {local.length > 0 ? `Notes from ${area.name}` : "Notes from nearby"}
        </h2>
        <ul className="mt-6 grid gap-6 lg:grid-cols-2">
          {shown.map((review) => (
            <li key={review.id} className="rounded-lg border border-line bg-cream p-5">
              <Stars value={review.stars} />
              <p className="mt-3 text-ink">“{review.text}”</p>
              <p className="mt-3 text-sm text-muted">
                {review.name}, {review.town} · {getService(review.service)?.name} · {review.when}
              </p>
            </li>
          ))}
        </ul>
        <a
          href={phoneHref}
          className="mt-8 inline-flex min-h-11 items-center rounded-md bg-copper px-5 font-semibold text-cream"
        >
          Call for {area.name}
        </a>
      </section>
    </SiteShell>
  );
}
