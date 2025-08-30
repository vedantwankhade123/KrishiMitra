

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
import { AnimatedButton } from '@/components/AnimatedButton';

export default function LandingPage() {
  const staticHeadline = "Your <span class='text-primary'>AI Farming Assistant</span>";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden mobile-safe-area">
      <main className="flex-1">
        <div className="relative bg-black rounded-2xl sm:rounded-3xl m-1 sm:m-2.5">
          <LandingHeader />
          <Image
            src="https://picsum.photos/seed/farm-background/1200/800"
            alt="Farmers in a field"
            fill
            className="absolute inset-0 opacity-40 z-0 rounded-2xl sm:rounded-3xl object-cover"
            data-ai-hint="farmers field"
            priority
          />
          <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 md:py-48 text-center">
            <div className="grid grid-cols-1 gap-8 items-center">
              <div className="space-y-4 sm:space-y-6 text-white max-w-3xl mx-auto flex flex-col items-center">
                <div className="min-h-[120px] sm:min-h-[160px] md:min-h-[180px] flex items-center justify-center">
                    <h1 
                        className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-tight"
                        dangerouslySetInnerHTML={{ __html: staticHeadline }}
                    />
                </div>
                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl">
                  Save more with sustainable farming tools.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <AnimatedButton href="/chat" text="Get Started" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-12 sm:py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                    <p className="text-primary font-semibold mb-2">See It in Action</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">How Our System Works</h2>
                    <p className="text-muted-foreground text-sm sm:text-base">Watch a quick demo of our Chat AI, Crop Library, Weather, and Marketplace features. See how easy it is to get the insights you need for a successful harvest.</p>
                </div>
                <div className="relative max-w-5xl mx-auto">
                    <Image src="https://picsum.photos/seed/video-thumb/1280/720" alt="Video thumbnail" width={1280} height={720} className="rounded-2xl sm:rounded-3xl object-cover w-full shadow-2xl" data-ai-hint="video thumbnail" />
                    <div className="absolute inset-0 flex items-center justify-center">
                         <Button size="icon" className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/20 backdrop-blur-sm group hover:bg-white/30">
                            <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white fill-white ml-1 transition-transform group-hover:scale-110" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <p className="text-primary font-semibold mb-2">All-in-One Platform</p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Your Complete Farming Toolkit</h2>
                        <p className="text-muted-foreground mb-6 text-sm sm:text-base">Our platform integrates cutting-edge technology to bring you a seamless farming experience. Get instant advice, browse detailed crop information, and explore the latest farming equipment—all in one place.</p>
                        <ul className="space-y-4 sm:space-y-6">
                            <li className="flex items-start gap-3">
                                <BrainCircuit className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg">AI Chat Interface</h3>
                                    <p className="text-muted-foreground text-sm sm:text-base">Converse with our advanced AI to get personalized solutions for your farming challenges, from pest control to irrigation schedules.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-3">
                                <Database className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg">Comprehensive Crop Library</h3>
                                    <p className="text-muted-foreground text-sm sm:text-base">Access a vast database of crops to learn about planting seasons, soil requirements, and best practices for a successful harvest.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-3">
                                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg">Farmer's Marketplace</h3>
                                    <p className="text-muted-foreground text-sm sm:text-base">Coming soon: A dedicated marketplace to buy, sell, or rent farming machinery and equipment from a community of trusted vendors.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="order-1 md:order-2">
                        <Image src="https://picsum.photos/seed/farm-features/800/800" alt="Farmer using a tablet in a field" width={800} height={800} className="rounded-2xl sm:rounded-3xl object-cover aspect-square w-full max-w-md mx-auto md:max-w-none" data-ai-hint="farmer tablet field" />
                    </div>
                </div>
            </div>
        </section>
        
        <section className="py-12 sm:py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="bg-lime-100/50 dark:bg-lime-900/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute -left-10 sm:-left-20 -top-10 sm:-top-20 w-32 h-32 sm:w-64 sm:h-64 bg-primary/10 rounded-full" />
                    <div className="absolute -right-10 sm:-right-20 -bottom-10 sm:-bottom-20 w-32 h-32 sm:w-64 sm:h-64 bg-primary/10 rounded-full" />
                    <div className="relative text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Collaborate and learn from industry experts and enthusiasts</h2>
                        <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Join our community to share knowledge, ask questions, and grow together with the latest advancements in agriculture.</p>
                        <Button size="lg" className="rounded-full w-full sm:w-auto">Join Now</Button>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                    <p className="text-primary font-semibold mb-2">News & Updates</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Check Our Latest News</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="group">
                        <Image src="https://picsum.photos/seed/news1/600/400" alt="News 1" width={600} height={400} className="rounded-2xl sm:rounded-3xl object-cover mb-4 w-full aspect-[3/2]" data-ai-hint="corn seedling" />
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">What is the Farming Best Grow</h3>
                        <Link href="#" className="text-primary font-semibold flex items-center gap-2 text-sm sm:text-base">
                            Read More <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="group">
                        <Image src="https://picsum.photos/seed/news2/600/400" alt="News 2" width={600} height={400} className="rounded-2xl sm:rounded-3xl object-cover mb-4 w-full aspect-[3/2]" data-ai-hint="field sunset" />
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">What is the Farming Best Grow</h3>
                        <Link href="#" className="text-primary font-semibold flex items-center gap-2 text-sm sm:text-base">
                            Read More <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="group sm:col-span-2 lg:col-span-1">
                        <Image src="https://picsum.photos/seed/news3/600/400" alt="News 3" width={600} height={400} className="rounded-2xl sm:rounded-3xl object-cover mb-4 w-full aspect-[3/2]" data-ai-hint="tractor field" />
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">What is the Farming Best Grow</h3>
                         <Link href="#" className="text-primary font-semibold flex items-center gap-2 text-sm sm:text-base">
                            Read More <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>


      </main>

      <footer className="bg-black text-white rounded-2xl sm:rounded-3xl m-1 sm:m-2.5">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
                <div className="sm:col-span-2 lg:col-span-2">
                    <Logo className="mb-4" />
                    <p className="text-white/70 max-w-sm text-sm sm:text-base">
                        Providing smart, sustainable, and data-driven solutions to empower farmers everywhere.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Resources</h4>
                    <ul className="space-y-2 text-white/70 text-sm sm:text-base">
                        <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Company</h4>
                    <ul className="space-y-2 text-white/70 text-sm sm:text-base">
                        <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Legal</h4>
                    <ul className="space-y-2 text-white/70 text-sm sm:text-base">
                        <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="border-t border-white/10">
            <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-white/50 gap-4 sm:gap-0">
                <p>&copy; {new Date().getFullYear()} KrishiMitra. All rights reserved.</p>
                <div className="flex gap-4">
                   <Link href="#"><Rss className="h-4 w-4 sm:h-5 sm:w-5 hover:text-white transition-colors" /></Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
