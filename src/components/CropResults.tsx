
'use client';

import Image from 'next/image';
import type { ChatMessage } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { CropCard } from "@/components/CropCard";
import { Sparkles, User, Copy, ThumbsUp, ThumbsDown, Share2, Volume2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Welcome } from './Welcome';
import ReactMarkdown from 'react-markdown';
import { Button } from './ui/button';
import { getAudioForText } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';


function ActionButtons({ messageText }: { messageText: string | null | undefined }) {
  const [isListening, setIsListening] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleCopy = () => {
    if (messageText) {
      navigator.clipboard.writeText(messageText);
      toast({ title: "Copied to clipboard!" });
    }
  };

  const handleListen = async () => {
    if (!messageText) return;
    if (isListening && audio) {
        audio.pause();
        audio.currentTime = 0;
        setIsListening(false);
        setAudio(null);
        return;
    }

    setIsListening(true);
    try {
      const result = await getAudioForText(messageText);
      const newAudio = new Audio(result.audioDataUri);
      setAudio(newAudio);
      newAudio.play();
      newAudio.onended = () => {
        setIsListening(false);
        setAudio(null);
      };
    } catch (error) {
      console.error("Failed to get audio for text", error);
      toast({ variant: "destructive", title: "Error", description: "Could not play audio." });
      setIsListening(false);
    }
  };

  const buttonClass = "h-7 w-7 rounded-full group hover:bg-primary/10 transition-all duration-200 hover:scale-110";
  const iconClass = "h-4 w-4 text-muted-foreground group-hover:text-primary";
  
  return (
      <div className="flex items-center gap-2 mt-2">
        <Button variant="ghost" size="icon" className={buttonClass} onClick={handleCopy}>
            <Copy className={iconClass} />
        </Button>
        <Button variant="ghost" size="icon" className={buttonClass}>
            <ThumbsUp className={iconClass} />
        </Button>
        <Button variant="ghost" size="icon" className={buttonClass}>
            <ThumbsDown className={iconClass} />
        </Button>
         <Button variant="ghost" size="icon" className={buttonClass}>
            <Share2 className={iconClass} />
        </Button>
        <Button variant="ghost" size="icon" className={buttonClass} onClick={handleListen} disabled={isListening && !audio}>
            {isListening ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <Volume2 className={iconClass} />}
        </Button>
      </div>
  );
}


function ChatBubble({ children, variant, showAvatar = true }: { children: React.ReactNode, variant: 'user' | 'bot', showAvatar?: boolean }) {
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
            {variant === 'bot' && showAvatar && avatar}
            <div className={`max-w-[85%] w-full flex flex-col space-y-2 ${variant === 'user' ? 'items-end' : 'items-start'}`}>
                {children}
            </div>
            {variant === 'user' && showAvatar && avatar}
        </div>
    );
}

type CropResultsProps = {
    loading: boolean;
    conversation: ChatMessage[];
    onSuggestionClick: (prompt: string) => void;
};


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

        {conversation.map((message, index) => {
            const isLastMessage = index === conversation.length - 1;
            const prevMessage = index > 0 ? conversation[index - 1] : null;
            const showAvatar = !prevMessage || prevMessage.role !== message.role;

            return (
                <ChatBubble key={message.id} variant={message.role} showAvatar={showAvatar}>
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
                                "p-2",
                                !message.attachment && ""
                            )}>{message.text}</p>
                            )}
                        </div>
                    )}
                    {message.role === 'bot' && (
                    <>
                        {message.text && (
                        <div className="w-full">
                            <div className="p-4 rounded-2xl rounded-bl-none prose prose-sm dark:prose-invert prose-headings:font-semibold prose-p:text-muted-foreground prose-strong:text-foreground dark:text-white">
                                <ReactMarkdown>{message.text}</ReactMarkdown>
                            </div>
                            <ActionButtons messageText={message.text} />
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
            )
        })}

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
