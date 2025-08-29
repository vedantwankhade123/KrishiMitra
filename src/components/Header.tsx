
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
        <div className="container flex h-16 items-center justify-between mx-auto max-w-4xl">
            {/* This empty div will act as a spacer to help center the middle group */}
            <div className="w-1/4"></div>

            {/* Middle Group */}
            <div className="flex-1 flex justify-center">
                 <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/10 rounded-full p-2">
                    <Weather />
                    <Separator orientation="vertical" className="h-6" />
                    <Gallery />
                    <Separator orientation="vertical" className="h-6" />
                    <LanguageSwitcher />
                </div>
            </div>

            {/* Right Group */}
            <div className="w-1/4 flex justify-end items-center gap-2">
               <ThemeToggle />
               <ProfileButton />
            </div>
        </div>
    </header>
  );
}
