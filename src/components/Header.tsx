'use client';

import { LanguageSwitcher } from './LanguageSwitcher';
import { Weather } from './Weather';
import { ThemeToggle } from './ThemeToggle';
import { NewChatButton } from './NewChatButton';
import { Separator } from './ui/separator';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full p-4">
      <div className="container flex h-14 items-center justify-around mx-auto max-w-lg bg-card/50 backdrop-blur-sm border border-primary/10 rounded-full shadow-lg">
        <Weather />
        <Separator orientation="vertical" className="h-6" />
        <ThemeToggle />
        <Separator orientation="vertical" className="h-6" />
        <NewChatButton />
        <Separator orientation="vertical" className="h-6" />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
