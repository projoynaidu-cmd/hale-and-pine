import { useEffect, useState, type FormEvent } from "react";
import { areas, business, getService, phoneHref, services, type SavedQuote } from "@/lib/business";
import { fieldClass, labelClass } from "@/lib/cn";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "hale-pine-quotes";

function isQuote(value: unknown): value is SavedQuote {
  if (!value || typeof value !== "object") return false;
  const quote = value as SavedQuote;
  return typeof quote.id === "string" && typeof quote.name === "string" && typeof quote.message === "string";
}

function loadQuotes(): SavedQuote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isQuote);
  } catch {
    return [];
  }
}

type Fields = {
  name: string;
  phone: string;
  email: string;
  service: string;
  city: string;
  message: string;
};

function validate(input: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (input.name.trim().length < 2) errors.name = "Tell us your name.";
  if (input.phone.replace(/\D/g, "").length < 10) errors.phone = "Add a 10-digit phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = "That email doesn't look right.";
  }
  if (!getService(input.service)) errors.service = "Pick a service.";
  if (!input.city) errors.city = "Pick a town.";
  if (input.message.trim().length < 8) {
    errors.message = "A sentence about the job helps us send the right person.";
  }
  return errors;
}

export function QuoteForm({ initialService = "" }: { initialService?: string }) {
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [latest, setLatest] = useState<SavedQuote | null>(null);

  useEffect(() => {
    setQuotes(loadQuotes());
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input: Fields = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      service: String(data.get("service") ?? ""),
      city: String(data.get("city") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const nextErrors = validate(input);
    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    const entry: SavedQuote = {
      ...input,
      name: input.name.trim(),
      email: input.email.trim(),
      message: input.message.trim(),
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
    };
    const next = [entry, ...quotes].slice(0, 6);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // The confirmation still shows if storage is blocked.
    }
    setQuotes(next);
    setLatest(entry);
    event.currentTarget.reset();
  }

  return (
    <div>
      {latest ? (
        <div className="mb-6 rounded-lg bg-pine p-5 text-cream" role="status">
          <h2 className="font-display text-2xl">Request saved, {latest.name.split(" ")[0]}.</h2>
          <p className="mt-2 text-cream/85">
            For a live shop this would land on the dispatcher's desk. Here it stays on this device.
            If water is moving or the heat is dead,{" "}
            <a className="font-semibold underline" href={phoneHref}>
              call {business.phoneDisplay}
            </a>
            .
          </p>
        </div>
      ) : null}
      <form onSubmit={onSubmit} noValidate className="grid gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" autoComplete="name" className={fieldClass} />
          {errors.name ? <p className="mt-1 text-sm font-semibold text-ink">{errors.name}</p> : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
            {errors.phone ? <p className="mt-1 text-sm font-semibold text-ink">{errors.phone}</p> : null}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="email" className={fieldClass} />
            {errors.email ? <p className="mt-1 text-sm font-semibold text-ink">{errors.email}</p> : null}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="service" className={labelClass}>
              Service
            </label>
            <select id="service" name="service" className={fieldClass} defaultValue={initialService}>
              <option value="">Choose</option>
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.service ? <p className="mt-1 text-sm font-semibold text-ink">{errors.service}</p> : null}
          </div>
          <div>
            <label htmlFor="city" className={labelClass}>
              Town
            </label>
            <select id="city" name="city" className={fieldClass} defaultValue="">
              <option value="">Choose</option>
              {areas.map((area) => (
                <option key={area.slug} value={area.name}>
                  {area.name}
                </option>
              ))}
              <option value="Outside the usual loop">Outside the usual loop</option>
            </select>
            {errors.city ? <p className="mt-1 text-sm font-semibold text-ink">{errors.city}</p> : null}
          </div>
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>
            What's going on
          </label>
          <textarea id="message" name="message" rows={4} className={fieldClass} />
          {errors.message ? <p className="mt-1 text-sm font-semibold text-ink">{errors.message}</p> : null}
        </div>
        <Button type="submit">Send the request</Button>
      </form>
      {quotes.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">On this device</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {quotes.map((quote) => (
              <li key={quote.id} className="py-3 text-sm">
                <p className="font-semibold text-ink">
                  {quote.name} · {getService(quote.service)?.name ?? quote.service} · {quote.city}
                </p>
                <p className="text-muted">{quote.message}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
