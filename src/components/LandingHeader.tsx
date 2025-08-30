

'use client';

import { ThemeToggle } from './ThemeToggle';
import { ProfileButton } from './ProfileButton';
import { Button } from './ui/button';
import { Logo } from './Logo';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

export function LandingHeader() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={mobile ? "flex flex-col space-y-2" : "flex items-center gap-2"}>
      <Button variant="pill" visual="ghost" asChild onClick={mobile ? () => setMobileMenuOpen(false) : undefined}>
        <Link href="/chat">Krishi AI</Link>
      </Button>
      <Button variant="pill" visual="ghost" asChild onClick={mobile ? () => setMobileMenuOpen(false) : undefined}>
        <Link href="#">Marketplace</Link>
      </Button>
      <Button variant="pill" visual="ghost" asChild onClick={mobile ? () => setMobileMenuOpen(false) : undefined}>
        <Link href="/crop-library">Crop Library</Link>
      </Button>
      <Button variant="pill" visual="ghost" asChild onClick={mobile ? () => setMobileMenuOpen(false) : undefined}>
        <Link href="#">About Us</Link>
      </Button>
      <Button variant="pill" visual="ghost" asChild onClick={mobile ? () => setMobileMenuOpen(false) : undefined}>
        <Link href="#">Contact</Link>
      </Button>
    </div>
  );

  return (
    <header className="absolute top-0 z-50 w-full p-2 sm:p-4">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
          <NavLinks />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="rounded-full text-white/80 hover:text-white hover:bg-white/10 hidden sm:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <ProfileButton />
          
          {/* Mobile Menu */}
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white/80 hover:text-white hover:bg-white/10 ml-1">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-black/95 backdrop-blur-md border-white/20 text-white">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">Navigation</h2>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                  <NavLinks mobile />
                  <div className="pt-4 border-t border-white/20">
                    <Button variant="ghost" size="icon" className="w-full justify-start text-white/80 hover:text-white">
                      <Search className="h-5 w-5 mr-3" />
                      Search
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
