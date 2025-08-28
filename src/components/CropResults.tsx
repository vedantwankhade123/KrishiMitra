'use client';

import Image from 'next/image';
import type { OptimalCropsInput } from "@/ai/schemas";
import type { RecommendationResult } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CropCard } from "@/components/CropCard";
import { Bot, User, Sprout, BrainCircuit } from "lucide-react";
import { Button } from './ui/button';

type CropResultsProps = {
  loading: boolean;
  error: string | null;
  result: RecommendationResult | null;
  formInputs: OptimalCropsInput | null;
  lastPrompt: string;
  onSuggestionClick: (prompt: string) => void;
};

const suggestionPrompts = [
    { icon: <Sprout/>, title: "Profitability", prompt: "I have sandy loam soil and want to maximize profit." },
    { icon: <BrainCircuit/>, title: "Soil Health", prompt: "What can I plant to improve soil nitrogen in clay soil?" },
    { icon: <Sprout/>, title: "Resilience", prompt: "Show me drought-resistant crops for a short, cool growing season." }
];

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
          <Bot className="h-5 w-5" />
        </div>
        <Card className="w-full">
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      </div>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ChatBubble({ children, variant }: { children: React.ReactNode, variant: 'user' | 'bot' }) {
    const avatar = variant === 'user' ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card flex-shrink-0 overflow-hidden">
            <Image src="https://picsum.photos/100/100" alt="User avatar" width={32} height={32} />
        </div>
    ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
            <Bot className="h-5 w-5" />
        </div>
    );

    return (
        <div className={`flex items-start gap-4 ${variant === 'user' ? 'justify-end' : ''}`}>
            {variant === 'bot' && avatar}
            <div className={`max-w-[85%] space-y-4 ${variant === 'user' ? 'items-end' : ''}`}>
                {children}
            </div>
            {variant === 'user' && avatar}
        </div>
    );
}

export function CropResults({ loading, error, result, formInputs, lastPrompt, onSuggestionClick }: CropResultsProps) {

  const showWelcome = !loading && !error && !result;
  const showResults = !loading && !error && result;

  return (
      <div className="space-y-8">
        {showWelcome && (
            <div className="text-center pt-16">
                <h1 className="text-3xl font-bold tracking-tighter mb-2">HI JOSH!</h1>
                <p className="text-muted-foreground mb-10">What Do You Want To Chat About Today?</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                    {suggestionPrompts.map(({icon, title, prompt}) => (
                        <button key={title} onClick={() => onSuggestionClick(prompt)} className="p-4 rounded-lg bg-card hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all text-left space-y-1 focus:outline-none focus:ring-2 focus:ring-primary">
                           <div className="flex items-center gap-2 text-primary">{icon}<span className="font-semibold text-foreground">{title}</span></div>
                           <p className="text-xs text-muted-foreground">{prompt}</p>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {lastPrompt && (
          <ChatBubble variant="user">
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-br-none">
              <p>{lastPrompt}</p>
            </div>
          </ChatBubble>
        )}
        
        {loading && <ChatBubble variant="bot"><LoadingSkeleton /></ChatBubble>}

        {error && (
            <ChatBubble variant="bot">
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
                    <AlertTitle className="font-bold text-lg">Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </ChatBubble>
        )}

        {showResults && (
            <ChatBubble variant="bot">
                <div className="bg-card p-4 rounded-2xl rounded-bl-none">
                  <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {result.crops.length > 0 ? (
                    result.crops.map(crop => (
                        <CropCard key={crop.name} crop={crop} formInputs={formInputs} />
                    ))
                    ) : (
                    <p className="text-muted-foreground md:col-span-2 lg:col-span-3 text-center py-8">
                        No crops were recommended. Try adjusting your prompt.
                    </p>
                    )}
                </div>
            </ChatBubble>
        )}
      </div>
  )
}
