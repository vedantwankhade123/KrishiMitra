import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-logo text-xl font-bold tracking-tight">
        <span className="text-primary">Krishi</span>
        <span className="text-foreground">Mitra</span>
      </span>
    </div>
  );
}
