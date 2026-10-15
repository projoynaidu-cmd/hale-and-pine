import { createFileRoute, Link } from "@tanstack/react-router";
import { AreaCheck } from "@/components/area-check";
import { SiteShell } from "@/components/shell";
import { areas } from "@/lib/business";
import { container } from "@/lib/cn";
import { pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/areas/")({
  head: () =>
    pageMeta(
      "Service areas | Hale & Pine, Portland ME",
      "Hale & Pine covers Portland, South Portland, Westbrook, Falmouth, Scarborough, Cape Elizabeth, Yarmouth, and Freeport.",
    ),
  component: AreasPage,
});

function AreasPage() {
  return (
    <SiteShell>
      <header className={container + " pt-10"}>
        <p className="text-sm font-semibold tracking-wide text-copper">Service area</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-ink sm:text-5xl">
          Eight towns. Not the whole state.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Each town page is about the houses there, not a copy of the homepage with the city name swapped in.
        </p>
      </header>
      <div className={container + " py-8"}>
        <AreaCheck />
      </div>
      <ul className={container + " grid gap-6 pb-16 sm:grid-cols-2"}>
        {areas.map((area) => (
          <li key={area.slug} className="rounded-lg border border-line bg-cream p-5">
            <h2 className="font-display text-3xl text-ink">{area.name}</h2>
            <p className="mt-2 text-sm text-muted">{area.zips.join(" · ")}</p>
            <p className="mt-3 text-muted">{area.lede}</p>
            <p className="mt-2 text-sm text-muted">{area.drive}</p>
            <Link
              to="/areas/$slug"
              params={{ slug: area.slug }}
              className="mt-4 inline-flex min-h-11 items-center font-semibold text-pine underline decoration-line underline-offset-4"
            >
              {area.name} page
            </Link>
          </li>
        ))}
      </ul>
    </SiteShell>
  );
}
