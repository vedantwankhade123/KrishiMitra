
'use client';

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Logo({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  
  const textOptions = ["Mitra", "AI", "Friend", "Guide"];

  useEffect(() => {
      const interval = setInterval(() => {
          setIndex(prevIndex => (prevIndex + 1) % textOptions.length);
          setAnimationKey(prevKey => prevKey + 1);
      }, 2000);

      return () => clearInterval(interval);
  }, [textOptions.length]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="font-logo text-xl font-bold tracking-tight">
        <span className="text-primary">Krishi</span>
        <span key={animationKey} className="text-foreground inline-block animate-fade-in-out-fast">
          {textOptions[index]}
        </span>
      </div>
    </div>
  );
}
