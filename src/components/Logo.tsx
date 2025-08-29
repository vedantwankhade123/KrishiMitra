
'use client';

import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";


export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-white", className)}>
      <Leaf className="h-6 w-6" />
      <div className="font-logo text-xl font-bold tracking-tight">
        KrishiMitra
      </div>
    </div>
  );
}
