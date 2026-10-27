import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn, container } from "@/lib/cn";
import { gigUrl, profileUrl, seller } from "@/lib/studio";

const links = [
  { to: "/", label: "Studio", exact: true },
  { to: "/packages", label: "Packages", exact: false },
  { to: "/sample", label: "Sample site", exact: false },
  { to: "/start", label: "Start a job", exact: false },
] as const;

export function StudioShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#121614] text-[#f4f1ea] pb-24 lg:pb-0">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-[#f4f1ea] focus:px-4 focus:py-3 focus:text-[#121614]"
      >
        Skip to content
      </a>
      <div className="border-b border-white/10">
        <div className={cn(container, "flex flex-wrap items-center justify-between gap-2 py-2 font-mono text-xs tracking-wide text-[#c9c2b4]")}>
          <span>
            {seller.place} · replies in {seller.response.toLowerCase()}
          </span>
          <span>{seller.languages}</span>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#121614]/95 backdrop-blur-sm">
        <div className={cn(container, "flex items-center gap-6 py-4")}>
          <Link to="/" className="leading-none">
            <span className="block font-mono text-sm tracking-[0.22em]">PRIMECRAWL</span>
            <span className="mt-1 block text-xs text-[#c9c2b4]">{seller.name}</span>
          </Link>
          <nav aria-label="Primary" className="ml-auto hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.exact }}
                className="text-sm text-[#c9c2b4] hover:text-[#f4f1ea] data-[status=active]:text-[#d6ff4a]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={gigUrl}
              className="inline-flex min-h-11 items-center bg-[#d6ff4a] px-4 text-sm font-semibold text-[#121614]"
            >
              Open the gig
            </a>
          </nav>
          <button
            type="button"
            className="ml-auto inline-flex size-11 items-center justify-center border border-white/20 lg:hidden"
            aria-expanded={open}
            aria-controls="studio-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
        {open ? (
          <nav id="studio-nav" aria-label="Mobile" className="border-t border-white/10 lg:hidden">
            <div className={cn(container, "flex flex-col py-2")}>
              {links.map((link) => (
                <Link key={link.to} to={link.to} className="min-h-11 py-3 text-lg">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>
      <div id="content">{children}</div>
      <footer className="border-t border-white/10">
        <div className={cn(container, "grid gap-8 py-12 sm:grid-cols-2")}>
          <div>
            <p className="font-mono text-sm tracking-[0.22em]">PRIMECRAWL</p>
            <p className="mt-3 max-w-sm text-[#c9c2b4]">
              {seller.name}. {seller.title}. Orders and payment stay on Fiverr.
            </p>
          </div>
          <div className="text-sm text-[#c9c2b4] sm:text-right">
            <a className="underline decoration-white/30 underline-offset-4" href={profileUrl}>
              fiverr.com/{seller.handle}
            </a>
            <p className="mt-2">{seller.place}</p>
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#121614] p-3 lg:hidden">
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/sample"
            className="inline-flex min-h-11 items-center justify-center border border-white/20 text-sm font-semibold"
          >
            Sample site
          </Link>
          <a
            href={gigUrl}
            className="inline-flex min-h-11 items-center justify-center bg-[#d6ff4a] text-sm font-semibold text-[#121614]"
          >
            Open the gig
          </a>
        </div>
      </div>
    </div>
  );
}
