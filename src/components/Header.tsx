
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Home, Library, Map, Menu, Sun, X } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { ProfileButton } from './ProfileButton';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

export function Header() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Button variant="ghost" className="h-9 rounded-full text-foreground hover:bg-primary/10 hover:text-primary px-4" asChild>
        <Link href="/">
          <Home className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Home</span>
        </Link>
      </Button>
      <Button variant="ghost" className="h-9 rounded-full text-foreground hover:bg-primary/10 hover:text-primary px-4" asChild>
        <Link href="/weather">
          <Sun className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Weather</span>
        </Link>
      </Button>
      <Button variant="ghost" className="h-9 rounded-full text-foreground hover:bg-primary/10 hover:text-primary px-4" asChild>
        <Link href="/crop-library">
          <Library className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Crop Library</span>
        </Link>
      </Button>
      <Button variant="ghost" className="h-9 rounded-full text-foreground hover:bg-primary/10 hover:text-primary px-4" asChild>
        <Link href="#">
          <span className="hidden sm:inline">Marketplace</span>
          <span className="sm:hidden">Market</span>
        </Link>
      </Button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full p-2 sm:p-4">
      <div className="container relative flex h-16 items-center justify-between mx-auto max-w-4xl">
        {/* Mobile Menu */}
        {isMobile ? (
          <>
            <Logo />
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <ProfileButton />
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Navigation</h2>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </SheetClose>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button variant="ghost" className="justify-start" asChild onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/">
                          <Home className="h-5 w-5 mr-3" />
                          Home
                        </Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" asChild onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/weather">
                          <Sun className="h-5 w-5 mr-3" />
                          Weather
                        </Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" asChild onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/crop-library">
                          <Library className="h-5 w-5 mr-3" />
                          Crop Library
                        </Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" asChild onClick={() => setMobileMenuOpen(false)}>
                        <Link href="#">
                          <Map className="h-5 w-5 mr-3" />
                          Marketplace
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </>
        ) : (
          <>
            {/* Desktop Navigation */}
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/10 rounded-full p-2">
              <NavLinks />
              <LanguageSwitcher />
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2 h-16">
              <ThemeToggle />
              <ProfileButton />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
