
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Home, Library, Map, Menu, Sun } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { ProfileButton } from './ProfileButton';
import { SidebarTrigger, useSidebar } from './ui/sidebar';

export function Header() {

  return (
    <header className="sticky top-0 z-50 w-full p-4">
        <div className="container relative flex h-16 items-center justify-center mx-auto max-w-4xl">
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/10 rounded-full p-2">
                <Button variant="ghost" className="h-9 rounded-full text-foreground hover:bg-primary/10 hover:text-primary px-4" asChild>
                  <Link href="/">
                    <Home className="h-5 w-5" />
                    <span className="ml-2">Home</span>
                  </Link>
                </Button>
                <Button variant="ghost" className="h-9 rounded-full text-foreground hover:bg-primary/10 hover:text-primary px-4" asChild>
                    <Link href="/weather">
                        <Sun className="h-5 w-5" />
                        <span className="ml-2">Weather</span>
                    </Link>
                </Button>
                <Button variant="ghost" className="h-9 rounded-full text-foreground hover:bg-primary/10 hover:text-primary px-4" asChild>
                    <Link href="/crop-library">
                        <Library className="h-5 w-5" />
                        <span className="ml-2">Crop Library</span>
                    </Link>
                </Button>
                 <Button variant="ghost" className="h-9 rounded-full text-foreground hover:bg-primary/10 hover:text-primary px-4" asChild>
                  <Link href="#">
                    Marketplace
                  </Link>
                </Button>
                <LanguageSwitcher />
            </div>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2 h-16">
            <ThemeToggle />
            <ProfileButton />
        </div>
    </header>
  );
}
