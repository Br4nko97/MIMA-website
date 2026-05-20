import { cn } from "@/lib/utils/cn";

interface ClassifiedTagProps {
  label: string;
  variant?: "default" | "danger" | "warn" | "success" | "aura";
  className?: string;
}

export function ClassifiedTag({
  label,
  variant = "default",
  className,
}: ClassifiedTagProps) {
  const color =
    variant === "danger"
      ? "text-[var(--color-danger)] border-[var(--color-danger)]/40 bg-[var(--color-danger)]/8"
      : variant === "warn"
        ? "text-[var(--color-warning)] border-[var(--color-warning)]/40 bg-[var(--color-warning)]/8"
        : variant === "success"
          ? "text-[var(--color-success)] border-[var(--color-success)]/40 bg-[var(--color-success)]/8"
          : variant === "aura"
            ? "text-[var(--color-aura-3)] border-[var(--color-aura-1)]/40 bg-[var(--color-aura-1)]/8"
            : "text-[var(--color-fg-1)] border-[var(--color-line-strong)] bg-white/[0.03]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]",
        color,
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full",
          variant === "danger" && "bg-[var(--color-danger)] animate-pulse-soft",
          variant === "warn" && "bg-[var(--color-warning)] animate-pulse-soft",
          variant === "success" && "bg-[var(--color-success)] animate-pulse-soft",
          variant === "aura" && "bg-[var(--color-aura-1)] animate-pulse-soft",
          variant === "default" && "bg-[var(--color-fg-2)]",
        )}
      />
      {label}
    </span>
  );
}
