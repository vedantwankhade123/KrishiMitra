
'use client';

import Image from 'next/image';
import type { ChatMessage } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { CropCard } from "@/components/CropCard";
import { Sparkles, User, Copy, ThumbsUp, ThumbsDown, Share2, Volume2, Loader2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Welcome } from './Welcome';
import ReactMarkdown from 'react-markdown';
import { Button } from './ui/button';
import { getAudioForText } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';


function ActionButtons({ messageText }: { messageText: string | null | undefined }) {
  const [playbackState, setPlaybackState] = useState<'idle' | 'loading' | 'playing' | 'paused'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleCopy = () => {
    if (messageText) {
      navigator.clipboard.writeText(messageText);
      toast({ title: "Copied to clipboard!" });
    }
  };

  const handleListen = async () => {
    if (!messageText) return;

    if (playbackState === 'playing') {
      audioRef.current?.pause();
      setPlaybackState('paused');
      return;
    }

    if (playbackState === 'paused') {
      audioRef.current?.play();
      setPlaybackState('playing');
      return;
    }
    
    if (playbackState === 'idle') {
        setPlaybackState('loading');
        try {
          const result = await getAudioForText(messageText);
          const newAudio = new Audio(result.audioDataUri);
          audioRef.current = newAudio;
          
          newAudio.play();
          setPlaybackState('playing');

          newAudio.onended = () => {
            setPlaybackState('idle');
            audioRef.current = null;
          };
          newAudio.onerror = () => {
            toast({ variant: "destructive", title: "Error", description: "Could not play audio." });
            setPlaybackState('idle');
            audioRef.current = null;
          }

        } catch (error) {
          console.error("Failed to get audio for text", error);
          toast({ variant: "destructive", title: "Error", description: "Could not play audio." });
          setPlaybackState('idle');
        }
    }
  };

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);


  const buttonClass = "h-7 w-7 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110";
  const iconClass = "h-4 w-4";
  
  const renderPlaybackIcon = () => {
    switch (playbackState) {
        case 'loading':
            return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
        case 'playing':
            return <Pause className={cn(iconClass, 'text-primary')} />;
        case 'paused':
            return <Play className={cn(iconClass, 'text-primary ml-0.5')} />;
        case 'idle':
        default:
            return <Volume2 className={iconClass} />;
    }
  }

  return (
      <div className="flex items-center gap-2">
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
        <Button variant="ghost" size="icon" className={buttonClass} onClick={handleListen} disabled={playbackState === 'loading'}>
            {renderPlaybackIcon()}
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
                        <div className='w-full space-y-2'>
                            {message.text && (
                                <div className="prose prose-sm dark:prose-invert prose-headings:font-semibold prose-p:text-muted-foreground prose-strong:text-foreground dark:text-white">
                                    <ReactMarkdown>{message.text}</ReactMarkdown>
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
                             {message.text && (
                                <ActionButtons messageText={message.text} />
                            )}
                        </div>
                    )}
                </ChatBubble>
            )
        })}

        {loading && (
          <ChatBubble variant="bot">
            <div className="bg-muted rounded-2xl p-4 w-full">
                <div className="flex items-center space-x-2">
                  <p className="text-muted-foreground text-sm">Thinking</p>
                   <div className="flex space-x-1">
                       <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-dot-pulse [animation-delay:0s]"></span>
                       <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-dot-pulse [animation-delay:0.2s]"></span>
                       <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-dot-pulse [animation-delay:0.4s]"></span>
                   </div>
               </div>
            </div>
          </ChatBubble>
        )}
        
        <div ref={scrollRef} />
      </div>
  )
}
