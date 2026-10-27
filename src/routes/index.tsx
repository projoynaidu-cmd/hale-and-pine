import { createFileRoute, Link } from "@tanstack/react-router";
import { StudioShell } from "@/components/studio-shell";
import { container } from "@/lib/cn";
import { pageMeta } from "@/lib/schema";
import { faqs, gigUrl, included, packages, seller, trades } from "@/lib/studio";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "PrimeCrawl · Custom websites and local SEO",
      "Projoy Naidu builds fast custom websites and Google Business Profiles for local service businesses.",
    ),
  component: StudioHome,
});

function StudioHome() {
  return (
    <StudioShell>
      <section className={container + " grid items-end gap-12 py-16 lg:grid-cols-12 lg:py-24"}>
        <div className="lg:col-span-8">
          <p className="font-mono text-xs tracking-[0.18em] text-[#d6ff4a]">LOCAL SEARCH, NOT A BROCHURE</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.05] text-[#f4f1ea] sm:text-6xl">
            {seller.line}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#c9c2b4]">
            {seller.name} builds the website and the Google Business Profile together, so a nearby customer can
            find the shop, trust it, and call.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/sample"
              className="inline-flex min-h-11 items-center bg-[#d6ff4a] px-5 font-semibold text-[#121614]"
            >
              Open the sample site
            </Link>
            <Link
              to="/packages"
              className="inline-flex min-h-11 items-center border border-white/25 px-5 font-semibold"
            >
              Compare packages
            </Link>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden border border-white/15 bg-white/15 lg:col-span-4">
          {[
            ["From", "$105"],
            ["Delivery", "7–14 days"],
            ["Reply", seller.response],
            ["Based in", seller.place],
          ].map(([label, value]) => (
            <div key={label + value} className="bg-[#121614] p-4">
              <dt className="font-mono text-xs tracking-wide text-[#c9c2b4]">{label}</dt>
              <dd className="mt-2 font-display text-2xl">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-y border-white/10">
        <div className={container + " flex flex-wrap gap-x-6 gap-y-3 py-5 font-mono text-xs tracking-[0.16em] text-[#c9c2b4]"}>
          {trades.map((trade) => (
            <span key={trade}>{trade}</span>
          ))}
        </div>
      </section>

      <section className={container + " grid gap-10 py-16 lg:grid-cols-12"}>
        <div className="lg:col-span-4">
          <h2 className="font-display text-3xl sm:text-4xl">What gets delivered</h2>
          <p className="mt-4 text-[#c9c2b4]">
            One person writes the pages, marks them up, and lines up the listing. The phone number on the site is
            the phone number on Google.
          </p>
        </div>
        <ol className="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
          {included.map((item, index) => (
            <li key={item.title} className="grid gap-2 py-5 sm:grid-cols-12">
              <span className="font-mono text-xs text-[#d6ff4a] sm:col-span-1">0{index + 1}</span>
              <span className="font-display text-2xl sm:col-span-4">{item.title}</span>
              <span className="text-[#c9c2b4] sm:col-span-7">{item.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#f4f1ea] text-[#121614]">
        <div className={container + " grid items-center gap-8 py-16 lg:grid-cols-2"}>
          <img
            src="/photos/hero.jpg"
            alt="Sample site: a service van on a wet street, used as the homepage of a fictional Portland plumbing shop."
            width={1792}
            height={1008}
            className="aspect-video w-full object-cover"
          />
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-[#5c564c]">LIVE SAMPLE, NOT A CLIENT</p>
            <h2 className="mt-3 font-display text-4xl">Hale & Pine Mechanical</h2>
            <p className="mt-4 text-[#3d3a34]">
              A full local site for a fictional Portland plumber: five services, eight towns, a quote form, a cost
              range, and a Google listing page that checks the name, address, and phone.
            </p>
            <Link
              to="/sample"
              className="mt-6 inline-flex min-h-11 items-center bg-[#121614] px-5 font-semibold text-[#f4f1ea]"
            >
              Walk through the sample
            </Link>
          </div>
        </div>
      </section>

      <section className={container + " py-16"}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl sm:text-4xl">Three ways to start</h2>
          <Link to="/packages" className="text-sm text-[#d6ff4a] underline decoration-[#d6ff4a]/40 underline-offset-4">
            Full comparison
          </Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {packages.map((pack) => (
            <article
              key={pack.name}
              className={
                "border p-5 " + (pack.name === "Standard" ? "border-[#d6ff4a]" : "border-white/15")
              }
            >
              <p className="font-mono text-xs tracking-[0.16em] text-[#d6ff4a]">{pack.name}</p>
              <p className="mt-3 font-display text-4xl">${pack.price}</p>
              <p className="mt-1 text-sm text-[#c9c2b4]">
                {pack.aim} · {pack.days} days
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#f4f1ea]">
                {pack.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className={container + " grid gap-10 py-16 lg:grid-cols-2"}>
          <div>
            <h2 className="font-display text-3xl">One person, both halves</h2>
            <p className="mt-4 text-[#c9c2b4]">
              {seller.name} is a full-stack developer and technical SEO specialist in {seller.place}. The site, the
              speed, the schema, and the map listing are one job — not a designer, then an SEO, then a listing
              someone else forgot to update.
            </p>
            <p className="mt-4 text-[#c9c2b4]">সিলেটে বসে কাজ। ক্লায়েন্ট যুক্তরাষ্ট্রের লোকাল সার্ভিস বিজনেস।</p>
            <a
              href={gigUrl}
              className="mt-6 inline-flex min-h-11 items-center bg-[#d6ff4a] px-5 font-semibold text-[#121614]"
            >
              Hire on Fiverr
            </a>
          </div>
          <div>
            {faqs.slice(0, 4).map((item) => (
              <details key={item.q} className="group border-b border-white/10 py-4">
                <summary className="cursor-pointer list-none font-semibold [&::-webkit-details-marker]:hidden">
                  <span className="flex justify-between gap-4">
                    {item.q}
                    <span aria-hidden="true" className="text-[#d6ff4a] group-open:hidden">
                      +
                    </span>
                    <span aria-hidden="true" className="hidden text-[#d6ff4a] group-open:inline">
                      –
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-[#c9c2b4]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </StudioShell>
  );
}
