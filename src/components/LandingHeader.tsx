
'use client';

import { ThemeToggle } from './ThemeToggle';
import { ProfileButton } from './ProfileButton';
import { Button } from './ui/button';
import { Logo } from './Logo';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { CropLibrary } from './CropLibrary';

export function LandingHeader() {
  return (
    <header className="absolute top-0 z-50 w-full p-4">
        <div className="container mx-auto flex h-16 items-center justify-between">
            <Logo />
            
            <div className="hidden md:flex items-center justify-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                <Button variant="pill" asChild>
                    <Link href="/">Home</Link>
                </Button>
                 <Button variant="pill" visual="ghost" asChild>
                    <Link href="/chat">Krishi AI</Link>
                </Button>
                 <Button variant="pill" visual="ghost" asChild>
                    <Link href="#">Marketplace</Link>
                </Button>
                <CropLibrary trigger={
                    <Button variant="pill" visual="ghost">
                        Crop Library
                    </Button>
                } />
                 <Button variant="pill" visual="ghost" asChild>
                    <Link href="#">About Us</Link>
                </Button>
                 <Button variant="pill" visual="ghost" asChild>
                    <Link href="#">Contact</Link>
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full text-white/80 hover:text-white hover:bg-white/10">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </Button>
                <ProfileButton />
            </div>
        </div>
    </header>
  );
}
