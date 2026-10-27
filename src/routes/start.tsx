import { createFileRoute } from "@tanstack/react-router";
import { StudioShell } from "@/components/studio-shell";
import { container } from "@/lib/cn";
import { pageMeta } from "@/lib/schema";
import { brief, gigUrl, seller } from "@/lib/studio";

export const Route = createFileRoute("/start")({
  head: () =>
    pageMeta(
      "Start a job · PrimeCrawl",
      "What to send Projoy Naidu before a local SEO website and Google Business Profile build.",
    ),
  component: StartPage,
});

function StartPage() {
  return (
    <StudioShell>
      <section className={container + " grid gap-12 py-14 lg:grid-cols-12"}>
        <div className="lg:col-span-7">
          <p className="font-mono text-xs tracking-[0.18em] text-[#d6ff4a]">BEFORE THE CLOCK STARTS</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Send the facts. The pages come back matching Google.</h1>
          <p className="mt-4 max-w-xl text-[#c9c2b4]">
            Orders go through Fiverr, so the scope and the payment stay in one thread. {seller.name} replies in{" "}
            {seller.response.toLowerCase()}.
          </p>
          <ol className="mt-8 space-y-4">
            {brief.map((item, index) => (
              <li key={item} className="grid grid-cols-[auto_1fr] gap-4 border-b border-white/10 pb-4">
                <span className="font-mono text-xs text-[#d6ff4a]">0{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <a
            href={gigUrl}
            className="mt-8 inline-flex min-h-11 items-center bg-[#d6ff4a] px-5 font-semibold text-[#121614]"
          >
            Message on the gig
          </a>
        </div>
        <aside className="border border-white/15 p-6 lg:col-span-5">
          <p className="font-mono text-xs tracking-[0.16em] text-[#d6ff4a]">NOT INCLUDED IN THE SAMPLE</p>
          <p className="mt-4 text-[#c9c2b4]">
            Hale & Pine is a walkthrough. A real job uses your name, your towns, and your photos. Nothing here
            files a Google listing or takes a card.
          </p>
          <p className="mt-4 text-sm text-[#c9c2b4]">
            Basic $105 · Standard $175 · Premium $275
          </p>
        </aside>
      </section>
    </StudioShell>
  );
}
