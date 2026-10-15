import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import { FaqList, SiteShell } from "@/components/shell";
import { faqs } from "@/lib/business";
import { container } from "@/lib/cn";
import { faqLd, pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageMeta(
      "Questions | Hale & Pine Mechanical",
      "Diagnostic fees, towns we cover, licensing, heat pumps, water heater rentals, and what we will not promise about Google rankings.",
    ),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteShell>
      <JsonLd data={faqLd(faqs)} />
      <header className={container + " pt-10 pb-6"}>
        <p className="text-sm font-semibold tracking-wide text-copper">Questions</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-ink sm:text-5xl">
          Before you call, the short version.
        </h1>
      </header>
      <div className={container + " pb-16"}>
        <FaqList items={faqs} />
      </div>
    </SiteShell>
  );
}
