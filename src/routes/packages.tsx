import { createFileRoute, Link } from "@tanstack/react-router";
import { StudioShell } from "@/components/studio-shell";
import { container } from "@/lib/cn";
import { pageMeta } from "@/lib/schema";
import { gigUrl, packages } from "@/lib/studio";

export const Route = createFileRoute("/packages")({
  head: () =>
    pageMeta(
      "Packages · PrimeCrawl",
      "Basic, Standard, and Premium local SEO websites with Google Business Profile setup. From $105.",
    ),
  component: PackagesPage,
});

const rows = [
  { label: "Custom pages", values: ["Up to 4", "Up to 7", "Up to 10"] },
  { label: "On-page SEO", values: ["Yes", "Yes", "Yes"] },
  { label: "Service-area pages", values: ["—", "—", "Yes"] },
  { label: "Schema", values: ["—", "Local business", "Advanced"] },
  { label: "Speed pass", values: ["—", "Yes", "Yes"] },
  { label: "Google Business Profile", values: ["Basic setup", "Full optimization", "Full optimization"] },
  { label: "Technical audit", values: ["—", "—", "Yes"] },
  { label: "Delivery", values: ["7 days", "10 days", "14 days"] },
];

function PackagesPage() {
  return (
    <StudioShell>
      <section className={container + " py-14"}>
        <p className="font-mono text-xs tracking-[0.18em] text-[#d6ff4a]">PACKAGES</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Pick the size of the search system.</h1>
        <p className="mt-4 max-w-2xl text-[#c9c2b4]">
          Prices match the Fiverr gig. Days start when the business details arrive, not when the first message does.
        </p>
        <div className="mt-10 hidden overflow-hidden border border-white/15 lg:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="p-4 font-medium text-[#c9c2b4]"> </th>
                {packages.map((pack) => (
                  <th key={pack.name} className="p-4 font-display text-2xl font-normal">
                    {pack.name}
                    <span className="mt-1 block font-mono text-xs tracking-wide text-[#d6ff4a]">${pack.price}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-white/10">
                  <th className="p-4 font-medium">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td key={packages[index].name} className="p-4 text-[#c9c2b4]">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-4 lg:hidden">
          {packages.map((pack, index) => (
            <article key={pack.name} className="border border-white/15 p-5">
              <p className="font-mono text-xs tracking-[0.16em] text-[#d6ff4a]">{pack.name}</p>
              <p className="mt-2 font-display text-4xl">${pack.price}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {rows.map((row) => (
                  <li key={row.label} className="flex justify-between gap-4 border-b border-white/10 py-2">
                    <span className="text-[#c9c2b4]">{row.label}</span>
                    <span>{row.values[index]}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={gigUrl}
            className="inline-flex min-h-11 items-center bg-[#d6ff4a] px-5 font-semibold text-[#121614]"
          >
            Order on Fiverr
          </a>
          <Link to="/start" className="inline-flex min-h-11 items-center border border-white/25 px-5 font-semibold">
            What to send
          </Link>
        </div>
      </section>
    </StudioShell>
  );
}
