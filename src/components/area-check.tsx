import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { areas, matchArea, phoneHref, type Area } from "@/lib/business";
import { fieldClass, labelClass } from "@/lib/cn";

export function AreaCheck() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Area | "none" | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = matchArea(query);
    setResult(match ?? "none");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-line bg-cream p-5">
      <label htmlFor="town" className={labelClass}>
        Town or zip
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="town"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Falmouth, 04106, Munjoy…"
          className={fieldClass}
          autoComplete="address-level2"
        />
        <Button type="submit">Check</Button>
      </div>
      <div className="mt-4 min-h-16 text-sm" aria-live="polite">
        {result && result !== "none" ? (
          <p className="text-ink">
            Yes — we run <span className="font-semibold">{result.name}</span> on the regular loop.{" "}
            {result.drive}{" "}
            <Link
              to="/areas/$slug"
              params={{ slug: result.slug }}
              className="font-semibold text-pine underline decoration-line underline-offset-4"
            >
              See {result.name}
            </Link>
          </p>
        ) : null}
        {result === "none" ? (
          <p className="text-ink">
            That's outside the eight towns we cover every week. For no-heat or a burst pipe,{" "}
            <a href={phoneHref} className="font-semibold text-pine underline decoration-line underline-offset-4">
              call anyway
            </a>
            . We sometimes make the drive, and we will say so if we can't.
          </p>
        ) : null}
        {result === null ? (
          <p className="text-muted">
            Regular loop: {areas.map((area) => area.name).join(", ")}.
          </p>
        ) : null}
      </div>
    </form>
  );
}
