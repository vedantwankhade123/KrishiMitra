
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
    const icons = [<Sprout size={14}/>, <BrainCircuit size={14}/>, <Sprout size={14}/>, <Sprout size={14}/>, <BrainCircuit size={14}/>];

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
                    <CarouselItem key={title} className="basis-auto">
                      <div className="p-1">
                        <Badge 
                            variant="outline" 
                            className="font-normal border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
                            onClick={() => onSuggestionClick(prompt)}
                        >
                            {icons[index]}
                            {title}
                        </Badge>
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
