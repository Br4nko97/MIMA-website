import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mono-caption mb-4 text-[var(--color-aura-3)]">
        // DOCUMENT 404 · CLASSIFICATION UNKNOWN
      </div>
      <h1
        className="font-display font-extrabold leading-[0.85] tracking-[-0.05em]"
        style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}
      >
        <span className="aura-text">404</span>
      </h1>
      <p className="mt-4 max-w-md font-serif text-xl italic text-[var(--color-fg-1)]">
        Questa risorsa è stata classificata, distrutta o non è mai esistita.
      </p>
      <div className="mt-10">
        <Button asChild variant="aura" size="lg">
          <Link href="/">Torna all&apos;archivio</Link>
        </Button>
      </div>
    </div>
  );
}
