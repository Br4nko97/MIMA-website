import { type ReactNode, type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "soft" | "strong";
  hoverable?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, variant = "soft", hoverable = false, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[var(--radius)]",
          variant === "soft" ? "glass" : "glass-strong",
          hoverable &&
            "transition-[border-color,box-shadow] duration-500 hover:border-[var(--color-line-strong)] hover:shadow-[0_30px_80px_-30px_rgba(124,77,255,0.35)]",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
GlassCard.displayName = "GlassCard";
