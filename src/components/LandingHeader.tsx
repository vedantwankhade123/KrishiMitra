
'use client';

import { LanguageSwitcher } from './LanguageSwitcher';
import { Separator } from './ui/separator';
import { ThemeToggle } from './ThemeToggle';
import { ProfileButton } from './ProfileButton';
import { Button } from './ui/button';
import { Logo } from './Logo';
import Link from 'next/link';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full p-4 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between">
            <Logo />
            
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
                <Link href="#" className="hover:text-primary transition-colors">Features</Link>
                <Link href="#" className="hover:text-primary transition-colors">About</Link>
                <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            </div>

            <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
                <Separator orientation="vertical" className="h-6 hidden sm:block" />
                <Button asChild variant="ghost" className="rounded-full hidden sm:inline-flex">
                    <Link href="/chat">
                        Get Started
                    </Link>
                </Button>
                <ProfileButton />
            </div>
        </div>
    </header>
  );
}
