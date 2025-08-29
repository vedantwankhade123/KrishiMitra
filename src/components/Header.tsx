'use client';

import { LanguageSwitcher } from './LanguageSwitcher';
import { Weather } from './Weather';
import { ThemeToggle } from './ThemeToggle';
import { NewChatButton } from './NewChatButton';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full p-4">
      <div className="container flex h-14 items-center justify-between mx-auto max-w-sm bg-card/50 backdrop-blur-sm border border-primary/10 rounded-full shadow-lg">
        <Weather />
        <ThemeToggle />
        <NewChatButton />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
