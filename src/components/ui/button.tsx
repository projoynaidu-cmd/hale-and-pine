import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-base font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        solid: "bg-copper text-cream hover:bg-copper-deep",
        pine: "bg-pine text-cream hover:bg-pine-deep",
        line: "border border-pine bg-cream text-ink hover:bg-sand",
        inverse: "border border-cream bg-transparent text-cream hover:bg-pine-deep",
        ghost: "bg-transparent text-ink hover:bg-sand",
      },
    },
    defaultVariants: { variant: "solid" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, asChild = false, type, ...props }: ButtonProps) {
  if (asChild) {
    return <Slot className={cn(buttonVariants({ variant }), className)} {...props} />;
  }
  return (
    <button
      type={type ?? "button"}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}
