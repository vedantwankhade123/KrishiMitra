'use client';

import Image from 'next/image';
import type { ChatMessage } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CropCard } from "@/components/CropCard";
import { Bot, User, Sprout, BrainCircuit } from "lucide-react";
import { Button } from './ui/button';
import { useEffect, useRef } from 'react';

type CropResultsProps = {
  loading: boolean;
  conversation: ChatMessage[];
  onSuggestionClick: (prompt: string) => void;
};

const suggestionPrompts = [
    { icon: <Sprout/>, title: "Profitability", prompt: "I have sandy loam soil and want to maximize profit." },
    { icon: <BrainCircuit/>, title: "Soil Health", prompt: "What can I plant to improve soil nitrogen in clay soil?" },
    { icon: <Sprout/>, title: "Resilience", prompt: "Show me drought-resistant crops for a short, cool growing season." }
];

function LoadingSkeleton() {
  return (
    <ChatBubble variant="bot">
        <div className="flex items-start gap-4">
            <Card className="w-full">
            <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
            </Card>
        </div>
    </ChatBubble>
  );
}

function ChatBubble({ children, variant }: { children: React.ReactNode, variant: 'user' | 'bot' }) {
    const avatar = variant === 'user' ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card flex-shrink-0 overflow-hidden" data-ai-hint="user avatar">
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
            <div className={`max-w-[85%] w-full flex flex-col space-y-4 ${variant === 'user' ? 'items-end' : ''}`}>
                {children}
            </div>
            {variant === 'user' && avatar}
        </div>
    );
}

export function CropResults({ loading, conversation, onSuggestionClick }: CropResultsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation, loading]);

  const showWelcome = conversation.length === 0 && !loading;

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

        {conversation.map((message) => (
            <ChatBubble key={message.id} variant={message.role}>
                {message.role === 'user' && message.text && (
                    <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-br-none">
                        <p>{message.text}</p>
                    </div>
                )}
                {message.role === 'bot' && (
                  <>
                    {message.text && (
                      <div className="bg-card p-4 rounded-2xl rounded-bl-none">
                        <p className="text-muted-foreground leading-relaxed">{message.text}</p>
                      </div>
                    )}
                    {message.recommendation && message.recommendation.crops.length > 0 && (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {message.recommendation.crops.map(crop => (
                            <CropCard key={crop.name} crop={crop} formInputs={message.inputs || null} />
                        ))}
                      </div>
                    )}
                    {message.error && (
                       <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
                            <AlertTitle className="font-bold text-lg">Error</AlertTitle>
                            <AlertDescription>{message.error}</AlertDescription>
                        </Alert>
                    )}
                  </>
                )}
            </ChatBubble>
        ))}
        
        {loading && <LoadingSkeleton />}
        <div ref={scrollRef} />
      </div>
  )
}
