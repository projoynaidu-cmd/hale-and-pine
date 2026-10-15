import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/shell";
import { Stars } from "@/components/stars";
import { averageRating, getService, reviews, services } from "@/lib/business";
import { cn, container } from "@/lib/cn";
import { pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/reviews")({
  head: () =>
    pageMeta(
      "Reviews | Hale & Pine Mechanical",
      "Recent notes from plumbing and heating jobs in Portland, Falmouth, South Portland, Westbrook, Cape Elizabeth, Yarmouth, Scarborough, and Freeport.",
    ),
  component: ReviewsPage,
});

function ReviewsPage() {
  const [filter, setFilter] = useState<string>("all");
  const shown = filter === "all" ? reviews : reviews.filter((review) => review.service === filter);
  return (
    <SiteShell>
      <header className={container + " pt-10"}>
        <p className="text-sm font-semibold tracking-wide text-copper">Reviews</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          {averageRating().toFixed(1)} from the last {reviews.length} jobs we wrote down.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          These are the notes on this site, not a borrowed pile of stars. The four-star one stays up.
        </p>
      </header>
      <div className={container + " flex flex-wrap gap-2 py-6"} role="group" aria-label="Filter reviews">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterChip>
        {services.map((service) => (
          <FilterChip
            key={service.slug}
            active={filter === service.slug}
            onClick={() => setFilter(service.slug)}
          >
            {service.name}
          </FilterChip>
        ))}
      </div>
      <ul className={container + " grid gap-6 pb-16 lg:grid-cols-2"}>
        {shown.map((review) => (
          <li key={review.id} className="rounded-lg border border-line bg-cream p-5">
            <Stars value={review.stars} />
            <p className="mt-3 text-lg text-ink">“{review.text}”</p>
            <p className="mt-4 text-sm text-muted">
              {review.name} · {review.town} · {getService(review.service)?.name} · {review.when}
            </p>
          </li>
        ))}
      </ul>
    </SiteShell>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-md border px-4 text-sm font-semibold",
        active ? "border-pine bg-pine text-cream" : "border-line bg-cream text-ink",
      )}
    >
      {children}
    </button>
  );
}
