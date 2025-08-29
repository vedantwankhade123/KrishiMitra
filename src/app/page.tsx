
'use client';

import { LandingHeader } from '@/components/LandingHeader';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1 container mx-auto px-4">
        <section className="text-center pt-24 pb-16">
           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Smarter Farming, Brighter Futures
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            KrishiMitra is your AI-powered agricultural assistant, providing data-driven crop recommendations to help you maximize yield, increase profits, and farm sustainably.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="rounded-full text-lg h-14 px-8 group">
              <Link href="/chat">
                Chat with Krishi AI
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-64 bg-primary/20 blur-3xl rounded-full -z-10" />
          <Image 
            src="https://picsum.photos/seed/farm-hero/1600/800"
            alt="Farm landscape"
            width={1600}
            height={800}
            className="rounded-2xl mx-auto border-4 border-primary/10 shadow-2xl shadow-primary/10"
            data-ai-hint="farm landscape"
          />
        </section>
      </main>

       <footer className="py-8 mt-24 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} KrishiMitra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
