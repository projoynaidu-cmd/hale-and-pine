import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/shell";
import { gallery, type Shot } from "@/lib/business";
import { container } from "@/lib/cn";
import { pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/gallery")({
  head: () =>
    pageMeta(
      "Recent work | Hale & Pine Mechanical",
      "Photos from recent plumbing, heating, boiler, and water heater jobs around Greater Portland.",
    ),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState<Shot | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <SiteShell>
      <header className={container + " pt-10"}>
        <p className="text-sm font-semibold tracking-wide text-copper">Recent work</p>
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">Jobs, not stock.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          A few houses from the last year. Tap a photo for the note.
        </p>
      </header>
      <ul className={container + " grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3"}>
        {gallery.map((shot) => (
          <li key={shot.id}>
            <button type="button" onClick={() => setActive(shot)} className="block w-full text-left">
              <img
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                className="aspect-4/3 w-full rounded-lg object-cover"
              />
              <span className="mt-2 block text-sm font-semibold text-ink">{shot.town}</span>
              <span className="block text-sm text-muted">{shot.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/80 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-3xl rounded-lg bg-cream p-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex size-11 items-center justify-center rounded-md"
              >
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <img
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              className="max-h-[70vh] w-full rounded-md object-contain"
            />
            <p className="px-2 pt-3 pb-2 text-ink">
              <span className="font-semibold">{active.town}. </span>
              {active.caption}
            </p>
          </div>
        </div>
      ) : null}
    </SiteShell>
  );
}
