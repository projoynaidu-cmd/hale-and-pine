import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const fieldClass =
  "w-full rounded-md border border-line bg-cream px-3 py-3 text-base text-ink";

export const labelClass = "mb-2 block text-sm font-semibold text-ink";
