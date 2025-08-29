'use client';

import { Sprout, BrainCircuit } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from "@/hooks/useTranslation";

type SuggestionPromptsProps = {
    onSuggestionClick: (prompt: string) => void;
};


export function SuggestionPrompts({ onSuggestionClick }: SuggestionPromptsProps) {
    const { t } = useTranslation();
    const suggestionPrompts = t('suggestions', { returnObjects: true }) as { title: string, prompt: string }[];
    const icons = [<Sprout/>, <BrainCircuit/>, <Sprout/>, <Sprout/>, <BrainCircuit/>];

    return (
        <div className="mb-4 px-10">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {suggestionPrompts.map(({title, prompt}, index) => (
                    <CarouselItem key={title} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <button 
                            onClick={() => onSuggestionClick(prompt)} 
                            className="w-full h-full p-3 rounded-full bg-card/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all text-left space-y-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
                        >
                          <div className="flex items-center gap-2 text-primary text-xs">{icons[index]}<span className="font-semibold text-foreground">{title}</span></div>
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
