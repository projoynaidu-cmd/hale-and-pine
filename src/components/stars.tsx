import { Star } from "lucide-react";

export function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={
            index < value ? "size-4 fill-copper text-copper" : "size-4 text-muted"
          }
        />
      ))}
    </span>
  );
}
