import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/shell";
import { money, services } from "@/lib/business";
import { container } from "@/lib/cn";
import { pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageMeta(
      "Plumbing & heating services | Hale & Pine",
      "Plumbing, heating, boilers, water heaters, and overnight emergency calls for Greater Portland. Hale & Pine Mechanical.",
    ),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteShell>
      <header className={container + " pt-10"}>
        <p className="text-sm font-semibold tracking-wide text-copper">Services</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-ink sm:text-5xl">
          Five things we actually do.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          No drain-cleaning franchise menu. If it is water or heat in a house, it is probably here.
          If it is a store fit-out, it is not.
        </p>
      </header>
      <div className={container + " grid gap-10 py-12"}>
        {services.map((service) => (
          <article key={service.slug} className="grid items-center gap-6 border-t border-line pt-10 lg:grid-cols-2">
            <img
              src={service.image}
              alt={service.imageAlt}
              width={service.width}
              height={service.height}
              className="aspect-4/3 w-full rounded-lg object-cover"
            />
            <div>
              <h2 className="font-display text-3xl text-ink">{service.name}</h2>
              <p className="mt-3 text-muted">{service.lede}</p>
              <p className="mt-4 text-sm font-semibold text-ink">
                From {money(Math.min(...service.jobs.map((job) => job.low)))}
              </p>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="mt-4 inline-flex min-h-11 items-center font-semibold text-pine underline decoration-line underline-offset-4"
              >
                {service.name} in detail
              </Link>
            </div>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
