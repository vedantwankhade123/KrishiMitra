
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
        <div className="mb-4 w-full">
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
                            className="font-normal border-primary/20 bg-primary/5 hover:bg-accent hover:border-primary/30 transition-all text-muted-foreground hover:text-primary-foreground cursor-pointer"
                            onClick={() => onSuggestionClick(prompt)}
                        >
                           <p className="whitespace-normal text-left">{prompt}</p>
                        </Badge>
                      </div>
                    </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12"/>
              <CarouselNext className="hidden sm:flex -right-12"/>
            </Carousel>
        </div>
    );
}
