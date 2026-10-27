import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  addressLine,
  business,
  hourRows,
  mapsUrl,
  osmEmbed,
  phoneHref,
  services,
  shopStatus,
} from "@/lib/business";
import { cn, container } from "@/lib/cn";

const links = [
  { to: "/services", label: "Services", fuzzy: true },
  { to: "/areas", label: "Towns", fuzzy: true },
  { to: "/reviews", label: "Reviews", fuzzy: false },
  { to: "/gallery", label: "Work", fuzzy: false },
  { to: "/about", label: "About", fuzzy: false },
  { to: "/listing", label: "Listing", fuzzy: false },
] as const;

function OpenBadge() {
  const [label, setLabel] = useState("Shop hours");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const status = shopStatus(new Date());
    setLabel(status.label);
    setOpen(status.open);
  }, []);
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("size-2 rounded-full", open ? "bg-copper" : "bg-muted")} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col pb-24 lg:pb-0">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-cream focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <div className="bg-ink text-cream">
        <div className={cn(container, "flex flex-wrap items-center justify-between gap-2 py-2 text-sm")}>
          <p>Sample build by PrimeCrawl. Hale & Pine is not a real shop.</p>
          <Link to="/" className="underline decoration-cream/40 underline-offset-4">
            Back to PrimeCrawl
          </Link>
        </div>
      </div>
      <div className="border-b border-line bg-sand">
        <div className={cn(container, "flex flex-wrap items-center justify-between gap-2 py-2 text-sm text-muted")}>
          <span>{business.license}</span>
          <OpenBadge />
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className={cn(container, "flex items-center gap-4 py-3")}>
          <Link to="/sample" className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" width={36} height={36} className="size-9" />
            <span>
              <span className="block font-display text-xl leading-none text-ink">
                Hale <span className="text-copper italic">&</span> Pine
              </span>
              <span className="mt-1 block text-xs tracking-widest text-muted uppercase">
                Mechanical · Est. {business.founded}
              </span>
            </span>
          </Link>
          <nav aria-label="Primary" className="ml-auto hidden items-center gap-5 lg:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: !link.fuzzy }}
                className="text-sm font-semibold text-muted hover:text-ink data-[status=active]:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto hidden lg:ml-0 lg:block">
            <Button asChild>
              <a href={phoneHref}>
                <Phone className="size-4" aria-hidden="true" />
                {business.phoneDisplay}
              </a>
            </Button>
          </div>
          <button
            type="button"
            className="ml-auto inline-flex size-11 items-center justify-center rounded-md border border-line bg-cream lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
        {menuOpen ? (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-cream lg:hidden">
            <div className={cn(container, "flex flex-col py-2")}>
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="min-h-11 py-3 text-lg font-semibold text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/faq" className="min-h-11 py-3 text-lg font-semibold text-ink">
                Questions
              </Link>
              <Link to="/contact" className="min-h-11 py-3 text-lg font-semibold text-ink">
                Request a visit
              </Link>
            </div>
          </nav>
        ) : null}
      </header>
      <div id="content" className="flex-1">
        {children}
      </div>
      <footer className="bg-pine text-cream">
        <div className={cn(container, "grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4")}>
          <div>
            <p className="font-display text-2xl">
              Hale <span className="italic">&</span> Pine
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              Family plumbing and heating on Fore Street since {business.founded}.
            </p>
            <p className="mt-4 text-sm text-cream/80">{business.license}</p>
            <p className="text-sm text-cream/80">{business.epa}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-cream uppercase">Visit</h2>
            <address className="mt-3 text-sm leading-relaxed text-cream/85 not-italic">
              {addressLine()}
              <br />
              <a className="underline decoration-cream/40 underline-offset-4" href={phoneHref}>
                {business.phoneDisplay}
              </a>
              <br />
              <a className="underline decoration-cream/40 underline-offset-4" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </address>
            <ul className="mt-4 space-y-1 text-sm text-cream/80">
              {hourRows.map((row) => (
                <li key={row.label}>
                  {row.label}: {row.time}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-cream uppercase">Work</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="text-cream/85 underline decoration-cream/30 underline-offset-4"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-cream uppercase">The shop</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-cream/85 underline decoration-cream/30 underline-offset-4">
                  About
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-cream/85 underline decoration-cream/30 underline-offset-4">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-cream/85 underline decoration-cream/30 underline-offset-4">
                  Recent work
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-cream/85 underline decoration-cream/30 underline-offset-4">
                  Questions
                </Link>
              </li>
              <li>
                <Link to="/listing" className="text-cream/85 underline decoration-cream/30 underline-offset-4">
                  Google listing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream/85 underline decoration-cream/30 underline-offset-4">
                  Request a visit
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/20">
          <p className={cn(container, "py-4 text-xs text-cream/70")}>
            {business.name}. The name, address, and phone on this site match the Google Business Profile.
          </p>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream p-3 lg:hidden">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={phoneHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-copper px-3 font-semibold text-cream"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call
          </a>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-pine bg-paper px-3 font-semibold text-ink"
          >
            Request a visit
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className={cn(container, "pt-10 pb-2")}>
      <p className="text-sm font-semibold tracking-wide text-copper">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl text-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{lede}</p>
    </header>
  );
}

export function Crumbs({ items }: { items: { label: string; to?: "/" | "/services" | "/areas" | "/faq" }[] }) {
  return (
    <nav aria-label="Breadcrumb" className={cn(container, "pt-6 text-sm text-muted")}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.to ? (
              <Link to={item.to} className="underline decoration-line underline-offset-4 hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Missing({ what }: { what: string }) {
  return (
    <div className={cn(container, "py-20")}>
      <h1 className="font-display text-4xl text-ink">We don't have that {what}.</h1>
      <p className="mt-4 max-w-md text-muted">The link may be old. The shop is still on Fore Street.</p>
      <div className="mt-6">
        <Button asChild variant="pine">
          <Link to="/sample">Back to the sample</Link>
        </Button>
      </div>
    </div>
  );
}

export function MapFrame() {
  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-line bg-sand">
        <iframe
          title={`Map of ${business.name} at ${addressLine()}`}
          src={osmEmbed()}
          className="h-72 w-full"
          loading="lazy"
        />
      </div>
      <a
        href={mapsUrl()}
        className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-pine underline decoration-line underline-offset-4"
      >
        Open in Google Maps
      </a>
    </div>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-4">
          <summary className="cursor-pointer list-none text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.q}
              <span aria-hidden="true" className="font-display text-copper group-open:hidden">
                +
              </span>
              <span aria-hidden="true" className="hidden font-display text-copper group-open:inline">
                –
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
