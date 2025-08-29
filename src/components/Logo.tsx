
'use client';

import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";
import { useState, useEffect } from "react";


export function Logo({ className }: { className?: string }) {
    const [dynamicWord, setDynamicWord] = useState('Mitra');
    const words = ['Mitra', 'Friend', 'AI', 'Guide'];

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % words.length;
            setDynamicWord(words[currentIndex]);
        }, 2000); // Change word every 2 seconds

        return () => clearInterval(interval);
    }, []);


  return (
    <div className={cn("flex items-center gap-2 text-white", className)}>
      <Leaf className="h-6 w-6" />
      <div className="font-logo text-xl font-bold tracking-tight flex items-center">
        <span className="text-foreground">Krishi</span>
        <div className="w-16 text-left">
            <span
                key={dynamicWord}
                className="text-primary animate-fade-in-out-fast"
            >
                {dynamicWord}
            </span>
        </div>
      </div>
    </div>
  );
}
