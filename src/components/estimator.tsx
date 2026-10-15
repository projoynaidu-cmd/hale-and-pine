import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { getService, money, services } from "@/lib/business";
import { fieldClass, labelClass } from "@/lib/cn";

export function Estimator({ initial }: { initial?: string }) {
  const starting = initial && getService(initial) ? initial : services[0].slug;
  const [slug, setSlug] = useState(starting);
  const service = getService(slug) ?? services[0];
  const [jobId, setJobId] = useState(service.jobs[0].id);
  const job = service.jobs.find((item) => item.id === jobId) ?? service.jobs[0];

  return (
    <div className="rounded-lg border border-line bg-cream p-5">
      <h2 className="font-display text-2xl text-ink">What this usually costs</h2>
      <p className="mt-2 text-sm text-muted">
        Ranges from recent Greater Portland jobs. Your house sets the actual price.
      </p>
      <div className="mt-5 grid gap-4">
        <div>
          <label htmlFor="estimate-service" className={labelClass}>
            Service
          </label>
          <select
            id="estimate-service"
            className={fieldClass}
            value={service.slug}
            onChange={(event) => {
              const next = getService(event.target.value);
              if (!next) return;
              setSlug(next.slug);
              setJobId(next.jobs[0].id);
            }}
          >
            {services.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="estimate-job" className={labelClass}>
            Job
          </label>
          <select
            id="estimate-job"
            className={fieldClass}
            value={job.id}
            onChange={(event) => setJobId(event.target.value)}
          >
            {service.jobs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="mt-5 font-display text-4xl text-ink">
        {job.low === job.high ? money(job.low) : `${money(job.low)}–${money(job.high)}`}
      </p>
      <p className="mt-2 text-muted">{job.note}</p>
      <Link
        to="/contact"
        search={{ service: service.slug }}
        className="mt-5 inline-flex min-h-11 items-center font-semibold text-pine underline decoration-line underline-offset-4"
      >
        Ask for a price on this job
      </Link>
    </div>
  );
}
