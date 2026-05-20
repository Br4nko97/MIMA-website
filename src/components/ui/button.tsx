import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-aura-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-0)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-fg-0)] text-[var(--color-bg-0)] hover:bg-white/90 active:scale-[0.98]",
        aura: "bg-gradient-to-br from-[var(--color-aura-1)] via-[var(--color-aura-glow)] to-[var(--color-aura-2)] text-white shadow-[0_8px_30px_-8px_rgba(124,77,255,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(124,77,255,0.9)] active:scale-[0.98]",
        ghost:
          "bg-transparent text-[var(--color-fg-1)] hover:bg-white/[0.04] hover:text-[var(--color-fg-0)]",
        outline:
          "border border-[var(--color-line-strong)] bg-white/[0.02] text-[var(--color-fg-0)] hover:bg-white/[0.06] hover:border-white/20",
        glass:
          "glass text-[var(--color-fg-0)] hover:border-[var(--color-line-strong)]",
        destructive:
          "bg-[var(--color-danger)] text-white hover:bg-[var(--color-danger)]/90",
        link: "text-[var(--color-fg-0)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-9 text-base tracking-wide",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-cursor="link"
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
