
'use client';

import { LandingHeader } from '@/components/LandingHeader';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Play, Award, BarChart, Users, CheckCircle, Rss } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      <main className="flex-1">
        <div className="relative bg-black rounded-b-3xl">
          <LandingHeader />
          <Image
            src="https://picsum.photos/seed/farmers/1200/800"
            alt="Farmers in a field"
            fill
            className="absolute inset-0 opacity-40 z-0 rounded-b-3xl object-cover"
            data-ai-hint="farmers field"
            priority
          />
          <div className="relative z-10 container mx-auto px-4 py-32 md:py-48">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-white">
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
                    <p className="text-sm text-white">KrishiMitra AI is now online.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 space-y-4 max-w-sm ml-auto">
                    <div className="flex justify-between items-center text-white">
                        <Logo />
                        <span className="text-sm font-semibold">2025</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                        AI-Powered Insights
                    </h3>
                    <p className="text-white/70 text-sm">
                        Get real-time crop recommendations and analysis.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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

        <section className="bg-primary text-primary-foreground py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <p className="text-5xl font-bold">15</p>
                        <p className="text-primary-foreground/80">Years of experience</p>
                    </div>
                    <div>
                        <p className="text-5xl font-bold">36k+</p>
                        <p className="text-primary-foreground/80">Acres Planted</p>
                    </div>
                     <div>
                        <p className="text-5xl font-bold">6428</p>
                        <p className="text-primary-foreground/80">Projects completed</p>
                    </div>
                     <div>
                        <p className="text-5xl font-bold">92k+</p>
                        <p className="text-primary-foreground/80">Customers</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                 <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-primary font-semibold mb-2">Our Work</p>
                    <h2 className="text-4xl font-bold mb-4">See How We Complete the Work</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <Image src="https://picsum.photos/seed/work-process/800/1000" alt="Farmer examining crops" width={800} height={1000} className="rounded-3xl object-cover" data-ai-hint="farmer examining crops" />
                        <Button variant="ghost" size="icon" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/50">
                            <Play className="h-8 w-8 fill-current" />
                        </Button>
                    </div>
                    <div>
                        <Accordion type="single" collapsible defaultValue="item-1">
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="text-xl font-semibold">Beginning of Agriculture</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              Expert analysis of your farm's current soil conditions and historical data. We provide a baseline for improvement and a clear path forward to regenerative practices.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                            <AccordionTrigger className="text-xl font-semibold">Design and Planning</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              Our AI platform creates a customized crop rotation and soil amendment plan to maximize your yield, profitability, and long-term soil health, tailored to your specific farm.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-3">
                            <AccordionTrigger className="text-xl font-semibold">Maintenance</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              Continuous monitoring with real-time alerts and recommendations. We provide ongoing support to help you adapt to changing conditions and ensure a successful harvest.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                 <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-primary font-semibold mb-2">Benefits</p>
                    <h2 className="text-4xl font-bold mb-4">Why Choose Us - Key Benefits</h2>
                     <p className="text-muted-foreground">Our innovative solutions for your farm's success. We analyze your unique conditions to provide data-driven strategies for boosting productivity and sustainability.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <Award className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Smart Farming Technology</h3>
                                <p className="text-muted-foreground">Get data-driven insights and AI-powered recommendations to make smarter decisions for your farm.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <BarChart className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Improved Crop Yield</h3>
                                <p className="text-muted-foreground">Optimize your planting strategies based on soil data, weather forecasts, and market trends to increase productivity.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1">Resource Optimization</h3>
                                <p className="text-muted-foreground">Conserve water, reduce fertilizer use, and lower costs with our precision agriculture tools and recommendations.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <Image src="https://picsum.photos/seed/benefits-image/600/700" alt="Farmer holding seedlings" width={600} height={700} className="rounded-3xl object-cover" data-ai-hint="farmer holding seedlings" />
                        <div className="absolute -bottom-8 -right-8 bg-card p-4 rounded-2xl shadow-lg max-w-xs border border-primary/10">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <p className="font-semibold">Real-Time Data</p>
                            </div>
                            <p className="text-sm text-muted-foreground">Our AI provides instant analysis and ongoing recommendations.</p>
                        </div>
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

      <footer className="bg-black text-white rounded-t-3xl mt-16">
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
