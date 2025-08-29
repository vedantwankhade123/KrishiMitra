import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <Image src="https://picsum.photos/32/32" alt="KrishiMitra Logo" width={32} height={32} className="rounded-full" data-ai-hint="logo" />
      <span className="font-logo text-xl font-bold tracking-tight">
        <span className="text-primary">Krishi</span>
        <span className="text-foreground">Mitra</span>
      </span>
    </div>
  );
}
