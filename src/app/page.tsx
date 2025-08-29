
'use client';

import { LandingHeader } from '@/components/LandingHeader';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Award, BarChart, Users, CheckCircle, Rss, Database, BrainCircuit, Repeat } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = [
    "Your <span class='text-primary'>AI Farming Assistant</span>",
    "Instant <span class='text-primary'>Crop Recommendations</span>",
    "Explore Our <span class='text-primary'>Crop Library</span>"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex(prevIndex => (prevIndex + 1) % headlines.length);
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="flex-1">
        <div className="relative bg-black rounded-3xl m-2.5">
          <LandingHeader />
          <Image
            src="https://picsum.photos/seed/farm-background/1200/800"
            alt="Farmers in a field"
            fill
            className="absolute inset-0 opacity-40 z-0 rounded-3xl object-cover"
            data-ai-hint="farmers field"
            priority
          />
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-48 text-center">
            <div className="grid grid-cols-1 gap-8 items-center">
              <div className="space-y-4 text-white max-w-3xl mx-auto flex flex-col items-center">
                <div className="min-h-[160px] md:min-h-[180px] flex items-center justify-center">
                    <h1 
                        key={headlineIndex} 
                        className="text-5xl md:text-7xl font-bold tracking-tighter animate-fade-in-out"
                        dangerouslySetInnerHTML={{ __html: headlines[headlineIndex] }}
                    />
                </div>
                <p className="text-lg md:text-xl text-white/80">
                  Save more with sustainable farming tools.
                </p>
                <div className="flex justify-center gap-4">
                  <Button asChild size="lg" className="rounded-full text-lg h-14 px-8 group bg-gradient-green text-primary-foreground shadow-lg hover:shadow-primary/40 hover:brightness-110 transition-all duration-300 transform hover:-translate-y-1">
                    <Link href="/chat">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <p className="text-primary font-semibold mb-2">See It in Action</p>
                    <h2 className="text-4xl font-bold mb-4">How Our System Works</h2>
                    <p className="text-muted-foreground">Watch a quick demo of our Chat AI, Crop Library, Weather, and Marketplace features. See how easy it is to get the insights you need for a successful harvest.</p>
                </div>
                <div className="relative max-w-5xl mx-auto">
                    <Image src="https://picsum.photos/seed/video-thumb/1280/720" alt="Video thumbnail" width={1280} height={720} className="rounded-3xl object-cover w-full shadow-2xl" data-ai-hint="video thumbnail" />
                    <div className="absolute inset-0 flex items-center justify-center">
                         <Button size="icon" className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm group hover:bg-white/30">
                            <Play className="h-8 w-8 text-white fill-white ml-1 transition-transform group-hover:scale-110" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-primary font-semibold mb-2">Farm Types</p>
                        <h2 className="text-4xl font-bold mb-4">Smart Farming Support for All Types of Farms</h2>
                        <p className="text-muted-foreground">From small family plots to large-scale agriculture - our focus is to support you. We make sure that our product will fit every step of the way.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Image src="https://picsum.photos/seed/farm1/400/400" alt="Close up of a crop" width={400} height={400} className="rounded-3xl object-cover aspect-square" data-ai-hint="crop close-up" />
                        <Image src="https://picsum.photos/seed/farm2/400/400" alt="Vineyard" width={400} height={400} className="rounded-3xl object-cover aspect-square mt-8" data-ai-hint="vineyard" />
                        <Image src="https://picsum.photos/seed/farm3/400/400" alt="Lush green crops" width={400} height={400} className="rounded-3xl object-cover aspect-square" data-ai-hint="green crops" />
                        <Image src="https://picsum.photos/seed/farm4/400/400" alt="Apple orchard" width={400} height={400} className="rounded-3xl object-cover aspect-square mt-8" data-ai-hint="apple orchard" />
                    </div>
                </div>
            </div>
        </section>
        
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="bg-lime-100/50 dark:bg-lime-900/20 rounded-3xl p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/10 rounded-full" />
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full" />
                    <div className="relative text-center max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold mb-4">Collaborate and learn from industry experts and enthusiasts</h2>
                        <p className="text-muted-foreground mb-8">Join our community to share knowledge, ask questions, and grow together with the latest advancements in agriculture.</p>
                        <Button size="lg" className="rounded-full">Join Now</Button>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-primary font-semibold mb-2">News & Updates</p>
                    <h2 className="text-4xl font-bold mb-4">Check Our Latest News</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="group">
                        <Image src="https://picsum.photos/seed/news1/600/400" alt="News 1" width={600} height={400} className="rounded-3xl object-cover mb-4" data-ai-hint="corn seedling" />
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">What is the Farming Best Grow</h3>
                        <Link href="#" className="text-primary font-semibold flex items-center gap-2">
                            Read More <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="group">
                        <Image src="https://picsum.photos/seed/news2/600/400" alt="News 2" width={600} height={400} className="rounded-3xl object-cover mb-4" data-ai-hint="field sunset" />
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">What is the Farming Best Grow</h3>
                        <Link href="#" className="text-primary font-semibold flex items-center gap-2">
                            Read More <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="group">
                        <Image src="https://picsum.photos/seed/news3/600/400" alt="News 3" width={600} height={400} className="rounded-3xl object-cover mb-4" data-ai-hint="tractor field" />
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">What is the Farming Best Grow</h3>
                         <Link href="#" className="text-primary font-semibold flex items-center gap-2">
                            Read More <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>


      </main>

      <footer className="bg-black text-white rounded-3xl m-2.5">
        <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2">
                    <Logo className="mb-4" />
                    <p className="text-white/70 max-w-sm">
                        Providing smart, sustainable, and data-driven solutions to empower farmers everywhere.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-4">Resources</h4>
                    <ul className="space-y-2 text-white/70">
                        <li><Link href="#" className="hover:text-white">Blog</Link></li>
                        <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                        <li><Link href="#" className="hover:text-white">Community</Link></li>
                        <li><Link href="#" className="hover:text-white">API</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-4">Company</h4>
                    <ul className="space-y-2 text-white/70">
                        <li><Link href="#" className="hover:text-white">About Us</Link></li>
                        <li><Link href="#" className="hover:text-white">Careers</Link></li>
                        <li><Link href="#" className="hover:text-white">Press</Link></li>
                        <li><Link href="#" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-lg mb-4">Legal</h4>
                    <ul className="space-y-2 text-white/70">
                        <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="border-t border-white/10">
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
                <p>&copy; {new Date().getFullYear()} KrishiMitra. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                   <Link href="#"><Rss className="h-5 w-5 hover:text-white transition-colors" /></Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}

    

    
