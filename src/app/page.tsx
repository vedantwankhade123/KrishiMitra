
'use client';

import { LandingHeader } from '@/components/LandingHeader';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <main className="flex-1">
        <div className="relative bg-black rounded-b-3xl">
          <LandingHeader />
          <Image
            src="https://picsum.photos/seed/farmers/1200/800"
            alt="Farmers in a field"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 opacity-40 z-0 rounded-b-3xl"
            data-ai-hint="farmers field"
          />
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-48">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <Leaf className="w-16 h-16 text-primary animate-float" />
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                  Smart Solutions for Farmers
                </h1>
                <p className="text-lg md:text-xl text-white/80">
                  Save more with sustainable farming tools.
                </p>
                <div className="flex justify-start gap-4">
                  <Button asChild size="lg" className="rounded-full text-lg h-14 px-8 group bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/chat">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md rounded-full p-3 flex items-center gap-3 max-w-sm ml-auto">
                    <span className="h-3 w-3 rounded-full bg-green-400 block animate-pulse"></span>
                    <p className="text-sm">Tax exemption for farmers secured.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 space-y-4 max-w-sm ml-auto">
                    <div className="flex justify-between items-center">
                        <Logo />
                        <span className="text-sm font-semibold">2025</span>
                    </div>
                    <h3 className="text-2xl font-semibold">
                        Agricultural Development Initiative
                    </h3>
                    <p className="text-white/70 text-sm">
                        Incentives for Eco-Friendly Agricultural Practices
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AgriTech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
