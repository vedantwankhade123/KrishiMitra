'use client';

import { Sprout, BrainCircuit } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type SuggestionPromptsProps = {
    onSuggestionClick: (prompt: string) => void;
};

const suggestionPrompts = [
    { icon: <Sprout/>, title: "Profitability", prompt: "I have sandy loam soil and want to maximize profit." },
    { icon: <BrainCircuit/>, title: "Soil Health", prompt: "What can I plant to improve soil nitrogen in clay soil?" },
    { icon: <Sprout/>, title: "Resilience", prompt: "Show me drought-resistant crops for a short, cool growing season." },
    { icon: <Sprout/>, title: "Water Usage", prompt: "Suggest crops that require minimal water for a dry climate." },
    { icon: <BrainCircuit/>, title: "Pest Control", prompt: "What are natural ways to control pests for corn?" },
];

export function SuggestionPrompts({ onSuggestionClick }: SuggestionPromptsProps) {
    return (
        <div className="mb-4 px-10">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {suggestionPrompts.map(({icon, title, prompt}) => (
                    <CarouselItem key={title} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <button 
                            onClick={() => onSuggestionClick(prompt)} 
                            className="w-full h-full p-3 rounded-lg bg-card/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all text-left space-y-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
                        >
                          <div className="flex items-center gap-2 text-primary text-xs">{icon}<span className="font-semibold text-foreground">{title}</span></div>
                          <p className="text-xs text-muted-foreground">{prompt}</p>
                        </button>
                      </div>
                    </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex"/>
              <CarouselNext className="hidden sm:flex"/>
            </Carousel>
        </div>
    );
}
