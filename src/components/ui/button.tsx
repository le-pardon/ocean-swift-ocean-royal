import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-[opacity,transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-11 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-92",
        accent: "bg-accent text-accent-foreground hover:opacity-92",
        outline: "border border-border bg-surface text-foreground hover:bg-cream",
        ghost: "text-foreground hover:bg-muted",
        soil: "bg-soil text-soil-foreground hover:opacity-92",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-5 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
