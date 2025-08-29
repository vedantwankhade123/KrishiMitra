'use client';

import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { SidebarTrigger } from './ui/sidebar';
import { Sprout } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/60 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <div className="hidden md:flex items-center gap-2 font-bold text-lg">
          <Sprout className="h-6 w-6 text-primary" />
          AgriAssist AI
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
