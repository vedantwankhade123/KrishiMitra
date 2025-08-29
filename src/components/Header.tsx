
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
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/10 rounded-full p-2">
                <Weather />
                <Separator orientation="vertical" className="h-6" />
                <Gallery />
                <Separator orientation="vertical" className="h-6" />
                <LanguageSwitcher />
            </div>
        </div>
         {/* Right Group - Positioned absolutely to the viewport edge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 h-16">
            <ThemeToggle />
            <ProfileButton />
        </div>
    </header>
  );
}
