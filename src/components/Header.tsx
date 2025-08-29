
'use client';

import { Weather } from './Weather';
import { Gallery } from './Gallery';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Separator } from './ui/separator';
import { ThemeToggle } from './ThemeToggle';
import { ProfileButton } from './ProfileButton';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full p-4">
        <div className="container relative flex h-16 items-center justify-center mx-auto max-w-4xl">
            {/* Middle Group */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/10 rounded-full p-2">
                <Weather />
                <Separator orientation="vertical" className="h-6" />
                <Gallery />
                <Separator orientation="vertical" className="h-6" />
                <LanguageSwitcher />
            </div>

            {/* Right Group */}
            <div className="absolute right-0 flex items-center gap-2">
               <ThemeToggle />
               <ProfileButton />
            </div>
        </div>
    </header>
  );
}
