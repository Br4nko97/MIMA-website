import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[var(--color-line-strong)] bg-white/[0.03] px-4 py-2 text-sm text-[var(--color-fg-0)] placeholder:text-[var(--color-fg-2)] transition-colors focus-visible:outline-none focus-visible:border-[var(--color-aura-1)]/60 focus-visible:bg-white/[0.05] file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
