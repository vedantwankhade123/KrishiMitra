import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <Image src="https://picsum.photos/32/32" alt="AgriAI Logo" width={32} height={32} className="rounded-full" data-ai-hint="logo" />
      <span className="font-bold text-lg text-primary tracking-tighter">
        AgriAI
      </span>
    </div>
  );
}
