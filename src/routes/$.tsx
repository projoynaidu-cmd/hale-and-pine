import { createFileRoute } from "@tanstack/react-router";
import { Missing, SiteShell } from "@/components/shell";
import { pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/$")({
  head: () => pageMeta("Page not found | Hale & Pine", "That page is not on the Hale & Pine site."),
  component: function NotFoundPage() {
    return (
      <SiteShell>
        <Missing what="page" />
      </SiteShell>
    );
  },
});
