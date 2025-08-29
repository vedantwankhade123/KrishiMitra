
'use client';

import Image from 'next/image';
import type { ChatMessage } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CropCard } from "@/components/CropCard";
import { Sparkles, User } from "lucide-react";
import { useEffect, useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Welcome } from './Welcome';

type CropResultsProps = {
  loading: boolean;
  conversation: ChatMessage[];
  onSuggestionClick: (prompt: string) => void;
};


function ChatBubble({ children, variant }: { children: React.ReactNode, variant: 'user' | 'bot' }) {
    const avatar = variant === 'user' ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground flex-shrink-0" data-ai-hint="user avatar">
            <User className="h-5 w-5" />
        </div>
    ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
            <Sparkles className="h-5 w-5" />
        </div>
    );

    return (
        <div className={`flex items-start gap-4 ${variant === 'user' ? 'justify-end' : ''}`}>
            {variant === 'bot' && avatar}
            <div className={`max-w-[85%] w-full flex flex-col space-y-2 ${variant === 'user' ? 'items-end' : ''}`}>
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
            <Welcome />
        )}

        {conversation.map((message) => (
            <ChatBubble key={message.id} variant={message.role}>
                {message.role === 'user' && (
                    <div className={cn(
                      "rounded-2xl rounded-br-none space-y-2 p-2",
                      message.attachment ? "bg-primary/5" : "bg-primary/20"
                    )}>
                        {message.attachment && (
                            <Image src={message.attachment.url} alt="User attachment" width={200} height={200} className="rounded-lg" />
                        )}
                        {message.text && (
                          <p className={cn(
                            "p-2 text-primary-foreground"
                          )}>{message.text}</p>
                        )}
                    </div>
                )}
                {message.role === 'bot' && (
                  <>
                    {message.text && (
                      <div className="p-4 rounded-2xl rounded-bl-none">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{message.text}</p>
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

        {loading && (
          <ChatBubble variant="bot">
            <div className="p-4 rounded-2xl rounded-bl-none">
              <Skeleton className="h-4 w-32" />
            </div>
          </ChatBubble>
        )}
        
        <div ref={scrollRef} />
      </div>
  )
}
