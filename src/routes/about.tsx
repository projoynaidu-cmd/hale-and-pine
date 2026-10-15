import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/shell";
import { business, crew } from "@/lib/business";
import { container } from "@/lib/cn";
import { pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About Hale & Pine Mechanical | Portland",
      "Family plumbing and heating shop on Fore Street since 1978. Now run by Mara Hale and Jonah Pine. Licensed MP-4418.",
    ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <header className={container + " grid items-end gap-8 pt-10 lg:grid-cols-2"}>
        <div>
          <p className="text-sm font-semibold tracking-wide text-copper">The shop</p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Est. {business.founded}. Still a small crew.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Ed Hale started Hale Mechanical with a van and a yellow pages ad. The Pine got added when
            Jonah came in and the heating work outgrew a side of the truck. The address has been
            Fore Street long enough that the Google listing and the invoices finally match without a
            fight.
          </p>
        </div>
        <img
          src="/photos/shop.jpg"
          alt="Brick workshop with a forest-green door and a copper lantern, no sign lettering."
          width={1792}
          height={1008}
          className="aspect-video w-full rounded-lg object-cover"
        />
      </header>
      <section className={container + " grid items-center gap-10 py-16 lg:grid-cols-2"}>
        <img
          src="/photos/owner.jpg"
          alt="Mara Hale, owner, standing in the workshop."
          width={1200}
          height={1600}
          className="aspect-3/4 w-full max-w-md rounded-lg object-cover"
        />
        <div>
          <h2 className="font-display text-3xl text-ink">A note from Mara</h2>
          <div className="mt-4 space-y-4 text-muted">
            <p>
              People call because a neighbor did. That only keeps working if the neighbor was not
              surprised by the bill or by a tech who treated the house like a job site in a video.
            </p>
            <p>
              We are four people and a van, licensed {business.license}, {business.epa}. We do not
              have a call center. If you call during shop hours you get the shop. After hours you get
              whoever is on the emergency phone, and they already know the truck.
            </p>
            <p>
              If your site was built by someone who never looked at your Google listing, the name on
              one of them is probably wrong. Ours is not. That is not a trick. It is the listing page,
              and it is this one.
            </p>
          </div>
        </div>
      </section>
      <section className={container + " pb-16"}>
        <h2 className="font-display text-3xl text-ink">Who rolls the truck</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {crew.map((person) => (
            <li key={person.name} className="border-t border-line pt-4">
              <h3 className="font-display text-2xl text-ink">{person.name}</h3>
              <p className="text-sm font-semibold text-copper">{person.role}</p>
              <p className="mt-2 text-muted">{person.bio}</p>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
