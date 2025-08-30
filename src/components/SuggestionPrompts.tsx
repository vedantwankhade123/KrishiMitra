
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
import { Badge } from "@/components/ui/badge";

type SuggestionPromptsProps = {
    onSuggestionClick: (prompt: string) => void;
};


export function SuggestionPrompts({ onSuggestionClick }: SuggestionPromptsProps) {
    const { t } = useTranslation();
    const suggestionPrompts = t('suggestions', { returnObjects: true }) as { title: string, prompt: string }[];

    return (
        <div className="mb-3 sm:mb-4 w-full">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-1">
                {suggestionPrompts.map(({title, prompt}) => (
                    <CarouselItem key={title} className="basis-auto pl-1">
                      <div className="p-1">
                        <Badge 
                            variant="outline" 
                            className="font-normal border-primary/20 bg-background hover:bg-primary/10 transition-all text-foreground cursor-pointer text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3"
                            onClick={() => onSuggestionClick(prompt)}
                        >
                           <p className="whitespace-normal text-left">{prompt}</p>
                        </Badge>
                      </div>
                    </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex -left-12 h-8 w-8"/>
              <CarouselNext className="hidden lg:flex -right-12 h-8 w-8"/>
            </Carousel>
        </div>
    );
}
