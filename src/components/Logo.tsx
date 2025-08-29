import { cn } from "@/lib/utils";
import { BrainCircuit, Sprout } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <div className="relative flex items-center justify-center h-8 w-8">
            <Sprout className="h-7 w-7 text-primary transition-all group-hover:scale-105" />
            <BrainCircuit className="h-4 w-4 text-primary/80 absolute transition-all group-hover:text-primary" />
        </div>
      <span className="font-bold text-lg text-primary tracking-tighter">
        AgriAssist
      </span>
    </div>
  );
}
