import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { SiteShell } from "@/components/shell";
import { Stars } from "@/components/stars";
import {
  addressLine,
  averageRating,
  business,
  gbpCategories,
  gbpDescription,
  gbpQuestions,
  gallery,
  hourRows,
  phoneHref,
  reviews,
  services,
} from "@/lib/business";
import { container, fieldClass, labelClass } from "@/lib/cn";
import { pageMeta } from "@/lib/schema";

export const Route = createFileRoute("/listing")({
  head: () =>
    pageMeta(
      "Google Business Profile | Hale & Pine",
      "The Google Business Profile prepared with this website: categories, hours, service area, photos, and one matching name, address, and phone.",
    ),
  component: ListingPage,
});

const tabs = ["Overview", "Services", "Hours", "Photos", "Questions"] as const;
const LIMIT = 750;

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function ListingPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const [description, setDescription] = useState<string>(gbpDescription);
  const [name, setName] = useState<string>(business.name);
  const [street, setStreet] = useState<string>(business.street);
  const [phone, setPhone] = useState<string>(business.phoneDisplay);
  const over = description.length - LIMIT;
  const nameOk = name.trim().toLowerCase() === business.name.toLowerCase();
  const streetOk = street.trim().toLowerCase() === business.street.toLowerCase();
  const phoneOk = digits(phone).endsWith(digits(business.phoneTel));
  const matched = [nameOk, streetOk, phoneOk].filter(Boolean).length;

  return (
    <SiteShell>
      <header className={container + " pt-10"}>
        <p className="text-sm font-semibold tracking-wide text-copper">Google Business Profile</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-ink sm:text-5xl">
          The listing, set up with the website.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          This is the profile we prepare: category, services, hours, photos, questions, and a
          description inside Google's 750-character limit. Google still verifies it with the
          owner — by video, phone, or postcard — not with the person who built the site.
        </p>
      </header>

      <div className={container + " grid items-start gap-8 py-10 lg:grid-cols-5"}>
        <div className="rounded-lg border border-line bg-cream lg:col-span-3">
          <div className="border-b border-line p-5">
            <p className="text-sm text-muted">Profile preview</p>
            <h2 className="mt-1 font-display text-3xl text-ink">{business.name}</h2>
            <p className="text-sm text-muted">{gbpCategories.primary}</p>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Stars value={Math.round(averageRating())} />
              <span className="text-muted">
                {averageRating().toFixed(1)} · {reviews.length} notes on this site
              </span>
            </div>
            <p className="mt-3 text-sm text-ink">{addressLine()}</p>
            <a className="text-sm font-semibold text-pine" href={phoneHref}>
              {business.phoneDisplay}
            </a>
          </div>
          <div className="flex gap-2 overflow-x-auto border-b border-line px-3 py-3" role="tablist">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={tab === item}
                onClick={() => setTab(item)}
                className={
                  tab === item
                    ? "min-h-11 shrink-0 rounded-md bg-pine px-4 text-sm font-semibold text-cream"
                    : "min-h-11 shrink-0 rounded-md px-4 text-sm font-semibold text-ink"
                }
              >
                {item}
              </button>
            ))}
          </div>
          <div className="p-5" role="tabpanel">
            {tab === "Overview" ? (
              <div>
                <p className="text-ink">{description}</p>
                <p className="mt-4 text-sm text-muted">
                  Also: {gbpCategories.secondary.join(" · ")}
                </p>
              </div>
            ) : null}
            {tab === "Services" ? (
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.slug}>
                    <p className="font-semibold text-ink">{service.name}</p>
                    <p className="text-sm text-muted">{service.lede}</p>
                  </li>
                ))}
              </ul>
            ) : null}
            {tab === "Hours" ? (
              <ul className="space-y-2">
                {hourRows.map((row) => (
                  <li key={row.label} className="flex justify-between gap-4 text-ink">
                    <span>{row.label}</span>
                    <span className="text-muted">{row.time}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {tab === "Photos" ? (
              <ul className="grid grid-cols-2 gap-3">
                {gallery.slice(0, 4).map((shot) => (
                  <li key={shot.id}>
                    <img src={shot.src} alt={shot.alt} className="aspect-4/3 w-full rounded-md object-cover" />
                  </li>
                ))}
              </ul>
            ) : null}
            {tab === "Questions" ? (
              <ul className="space-y-4">
                {gbpQuestions.map((item) => (
                  <li key={item.q}>
                    <p className="font-semibold text-ink">{item.q}</p>
                    <p className="text-sm text-muted">{item.a}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-lg border border-line bg-cream p-5">
            <h2 className="font-display text-2xl text-ink">Description limit</h2>
            <p className="mt-2 text-sm text-muted">
              Google cuts a business description at {LIMIT} characters. Edit this one and watch the count.
            </p>
            <label htmlFor="gbp-description" className="sr-only">
              Profile description
            </label>
            <textarea
              id="gbp-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={8}
              className={fieldClass + " mt-4"}
            />
            <p className="mt-2 text-sm font-semibold text-ink" aria-live="polite">
              {description.length} / {LIMIT}. {over > 0 ? `Over by ${over}.` : "Within the limit."}
            </p>
          </div>
          <form className="rounded-lg border border-line bg-cream p-5" onSubmit={(event) => event.preventDefault()}>
            <h2 className="font-display text-2xl text-ink">Name, address, phone</h2>
            <p className="mt-2 text-sm text-muted">
              Change a field. If it no longer matches the site, the listing and the website have drifted — the usual local ranking leak.
            </p>
            <label className={labelClass + " mt-4"} htmlFor="nap-name">
              Business name
            </label>
            <input id="nap-name" className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} />
            <label className={labelClass + " mt-4"} htmlFor="nap-street">
              Street
            </label>
            <input
              id="nap-street"
              className={fieldClass}
              value={street}
              onChange={(event) => setStreet(event.target.value)}
            />
            <label className={labelClass + " mt-4"} htmlFor="nap-phone">
              Phone
            </label>
            <input id="nap-phone" className={fieldClass} value={phone} onChange={(event) => setPhone(event.target.value)} />
            <p className="mt-4 text-sm font-semibold text-ink" aria-live="polite">
              {matched} of 3 match the website.
              {!nameOk ? " Name differs." : ""}
              {!streetOk ? " Street differs." : ""}
              {!phoneOk ? " Phone differs." : ""}
              {matched === 3 ? " Name, address, and phone agree." : ""}
            </p>
          </form>
          <ul className="space-y-3 text-sm text-ink">
            {[
              `Primary category: ${gbpCategories.primary}`,
              "Service area set to the eight towns, not a radius that swallows Boston",
              "Hours include Sunday as emergency only",
              "Photos are from jobs, not a stock van",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-pine" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SiteShell>
  );
}
