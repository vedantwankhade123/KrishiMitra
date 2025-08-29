
'use client';

import { Weather } from './Weather';
import { Gallery } from './Gallery';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Separator } from './ui/separator';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full p-4">
        <div className="container flex h-16 items-center justify-center mx-auto max-w-sm">
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/10 rounded-full p-2">
                <Weather />
                <Separator orientation="vertical" className="h-6" />
                <Gallery />
                <Separator orientation="vertical" className="h-6" />
                <LanguageSwitcher />
            </div>
        </div>
    </header>
  );
}
