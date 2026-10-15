import { createFileRoute } from "@tanstack/react-router";
import { Estimator } from "@/components/estimator";
import { QuoteForm } from "@/components/quote-form";
import { MapFrame, SiteShell } from "@/components/shell";
import { addressLine, business, hourRows, phoneHref } from "@/lib/business";
import { container } from "@/lib/cn";
import { pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => {
    if (typeof search.service !== "string" || search.service.length === 0) return {};
    return { service: search.service };
  },
  head: () =>
    pageMeta(
      "Request a visit | Hale & Pine Mechanical",
      "Ask Hale & Pine for a plumbing or heating visit in Greater Portland. For no-heat and burst pipes, call (207) 555-0148.",
    ),
  component: ContactPage,
});

function ContactPage() {
  const { service } = Route.useSearch();
  return (
    <SiteShell>
      <header className={container + " pt-10"}>
        <p className="text-sm font-semibold tracking-wide text-copper">Contact</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Tell us the house and the problem.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Planned work can use the form. If water is on the floor or the heat is dead, call{" "}
          <a className="font-semibold text-ink underline" href={phoneHref}>
            {business.phoneDisplay}
          </a>
          .
        </p>
      </header>
      <div className={container + " grid gap-12 py-10 lg:grid-cols-2"}>
        <QuoteForm initialService={service ?? ""} />
        <div className="space-y-8">
          <Estimator initial={service} />
          <div className="rounded-lg border border-line bg-cream p-5">
            <h2 className="font-display text-2xl text-ink">Shop</h2>
            <p className="mt-3 text-muted">{addressLine()}</p>
            <p className="mt-2">
              <a className="font-semibold text-pine" href={phoneHref}>
                {business.phoneDisplay}
              </a>
            </p>
            <ul className="mt-4 space-y-1 text-sm text-muted">
              {hourRows.map((row) => (
                <li key={row.label}>
                  {row.label}: {row.time}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <MapFrame />
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
