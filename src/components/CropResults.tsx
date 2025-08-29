'use client';

import Image from 'next/image';
import type { ChatMessage } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CropCard } from "@/components/CropCard";
import { Bot, User } from "lucide-react";
import { useEffect, useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

type CropResultsProps = {
  loading: boolean;
  conversation: ChatMessage[];
  onSuggestionClick: (prompt: string) => void;
};

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
  const { t } = useTranslation();

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
                <h1 className="text-3xl font-bold tracking-tighter mb-2">{t('welcome.title')}</h1>
                <p className="text-muted-foreground mb-10">{t('welcome.subtitle')}</p>
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
                            <AlertTitle className="font-bold text-lg">{t('errors.errorTitle')}</AlertTitle>
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
