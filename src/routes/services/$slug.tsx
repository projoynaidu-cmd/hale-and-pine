import { createFileRoute, Link } from "@tanstack/react-router";
import { Estimator } from "@/components/estimator";
import { JsonLd } from "@/components/json-ld";
import { Crumbs, Missing, SiteShell } from "@/components/shell";
import { areas, getService, services } from "@/lib/business";
import { container } from "@/lib/cn";
import { breadcrumbLd, pageMeta, serviceLd } from "@/lib/schema";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const service = getService(params.slug);
    if (!service) return pageMeta("Service not found | Hale & Pine", "That service is not on our list.");
    return pageMeta(`${service.name} in Portland, ME | Hale & Pine`, service.meta);
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const service = getService(slug);
  if (!service) {
    return (
      <SiteShell>
        <Missing what="service" />
      </SiteShell>
    );
  }
  return (
    <SiteShell>
      <JsonLd data={serviceLd(service)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.name },
        ]}
      />
      <article className={container + " grid gap-10 py-8 lg:grid-cols-2"}>
        <img
          src={service.image}
          alt={service.imageAlt}
          width={service.width}
          height={service.height}
          className="aspect-4/3 w-full rounded-lg object-cover"
        />
        <div>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">{service.name}</h1>
          <p className="mt-4 text-lg text-muted">{service.lede}</p>
          <div className="mt-6">
            <Link
              to="/contact"
              search={{ service: service.slug }}
              className="inline-flex min-h-11 items-center rounded-md bg-copper px-5 font-semibold text-cream"
            >
              Request this visit
            </Link>
          </div>
        </div>
      </article>
      <section className={container + " grid gap-10 pb-12 lg:grid-cols-2"}>
        <div>
          <h2 className="font-display text-2xl text-ink">What we usually find</h2>
          <ul className="mt-4 space-y-3">
            {service.problems.map((problem) => (
              <li key={problem} className="border-l-2 border-copper pl-4 text-muted">
                {problem}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink">What the visit includes</h2>
          <ul className="mt-4 space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="border-l-2 border-pine pl-4 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={container + " grid items-start gap-10 pb-16 lg:grid-cols-2"}>
        <Estimator initial={service.slug} />
        <div>
          <h2 className="font-display text-2xl text-ink">Towns</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {areas.map((area) => (
              <li key={area.slug}>
                <Link
                  to="/areas/$slug"
                  params={{ slug: area.slug }}
                  className="inline-flex min-h-11 items-center rounded-md border border-line bg-cream px-4 text-sm font-semibold text-ink"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-10 font-display text-2xl text-ink">Other work</h2>
          <ul className="mt-4 space-y-2">
            {services
              .filter((item) => item.slug !== service.slug)
              .map((item) => (
                <li key={item.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: item.slug }}
                    className="font-semibold text-pine underline decoration-line underline-offset-4"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
