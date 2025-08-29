
'use client';

import { ThemeToggle } from './ThemeToggle';
import { ProfileButton } from './ProfileButton';
import { Button } from './ui/button';
import { Logo } from './Logo';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ChevronDown, MessageSquare, Search } from 'lucide-react';

export function LandingHeader() {
  return (
    <header className="absolute top-0 z-50 w-full p-4">
        <div className="container mx-auto flex h-16 items-center justify-between">
            <Logo />
            
            <div className="hidden md:flex items-center justify-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                <Button variant="pill" asChild>
                    <Link href="#">Home</Link>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="pill" visual="ghost">
                            Products <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-black/50 backdrop-blur-md border-white/10 text-white">
                        <DropdownMenuItem className="cursor-pointer hover:!bg-primary/20">Crop AI</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:!bg-primary/20">Marketplace</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:!bg-primary/20">Farm Analytics</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                 <Button variant="pill" visual="ghost" asChild>
                    <Link href="#">About Us</Link>
                </Button>
                 <Button variant="pill" visual="ghost" asChild>
                    <Link href="#">Blog</Link>
                </Button>
                 <Button variant="pill" asChild>
                    <Link href="#">Contact</Link>
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full text-white/80 hover:text-white hover:bg-white/10">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </Button>
                <ProfileButton />
                <Button variant="ghost" size="icon" className="rounded-full text-white/80 hover:text-white hover:bg-white/10">
                    <MessageSquare className="h-5 w-5" />
                    <span className="sr-only">Messages</span>
                </Button>
            </div>
        </div>
    </header>
  );
}
