'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { PromptForm } from '@/components/PromptForm';
import { CropResults } from '@/components/CropResults';
import type { RecommendationResult, ChatMessage, Attachment } from '@/lib/types';
import { getRecommendationsFromPrompt } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SuggestionPrompts } from '@/components/SuggestionPrompts';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useCompletion } from '@/hooks/use-completion';

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { toast } = useToast();

  const { completion, input, isLoading, handleInputChange, handleSubmit, stop } = useCompletion({
    onFinish: async (prompt, completion) => {
      const imageUrl = (lastUserMessage?.attachment?.url);

      try {
        const { recommendation, parsedInput, generalResponse } = await getRecommendationsFromPrompt(prompt, language, imageUrl);
        
        let botMessage: ChatMessage;

        if (recommendation) {
            if (recommendation.crops.length === 0) {
              botMessage = {
                id: `bot-error-${Date.now()}`,
                role: 'bot',
                text: t('errors.noCropsFound'),
              };
            } else {
              botMessage = {
                id: `bot-${Date.now()}`,
                role: 'bot',
                recommendation,
                inputs: parsedInput,
                text: generalResponse
              };
            }
        } else {
            botMessage = {
              id: `bot-${Date.now()}`,
              role: 'bot',
              text: completion || generalResponse,
            };
        }
        setConversation(prev => [...prev, botMessage]);

      } catch (e) {
          console.error(e);
          const errorMsg = t('errors.unexpectedError');
          setError(errorMsg);
          const errorBotMessage: ChatMessage = {
            id: `bot-error-${Date.now()}`,
            role: 'bot',
            error: errorMsg
          };
          setConversation(prev => [...prev, errorBotMessage]);
          toast({
            title: t('errors.errorTitle'),
            description: t('errors.failedToGetRecommendations'),
            variant: "destructive",
          });
      }
    },
    onError: (e) => {
        console.error(e);
        const errorMsg = t('errors.unexpectedError');
        setError(errorMsg);
        const errorBotMessage: ChatMessage = {
          id: `bot-error-${Date.now()}`,
          role: 'bot',
          error: errorMsg
        };
        setConversation(prev => [...prev, errorBotMessage]);
        toast({
          title: t('errors.errorTitle'),
          description: t('errors.failedToGetRecommendations'),
          variant: "destructive",
        });
    }
  });


  const handlePromptSubmit = async (prompt: string, attachment?: Attachment | null) => {
    setError(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: prompt,
      attachment: attachment
    };
    setConversation(prev => [...prev, userMessage]);
    
    // This will trigger the useCompletion hook's logic
    handleSubmit(prompt, {
      body: { language, imageUrl: attachment?.url }
    });
  };
  
  const handleSuggestionClick = (prompt: string) => {
    handlePromptSubmit(prompt, null);
  }

  const lastMessage = conversation[conversation.length - 1];
  const lastUserMessage = conversation.findLast(m => m.role === 'user');

  useEffect(() => {
    if (isLoading && lastMessage?.role === 'user') {
      const streamingBotMessage: ChatMessage = {
        id: `bot-streaming-${Date.now()}`,
        role: 'bot',
        text: completion,
      };
      setConversation(prev => [...prev, streamingBotMessage]);
    } else if (isLoading && lastMessage?.role === 'bot' && lastMessage.id.includes('streaming')) {
       setConversation(prev => prev.map((msg, index) => 
        index === prev.length - 1 ? { ...msg, text: completion } : msg
      ));
    }
  }, [isLoading, completion, lastMessage]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col container mx-auto w-full max-w-2xl py-8">
        <div className="flex-1 pb-48">
          <CropResults
            loading={isLoading}
            conversation={conversation}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent">
          <div className="container mx-auto max-w-2xl px-4 pt-8 pb-4">
            <SuggestionPrompts onSuggestionClick={handleSuggestionClick} />
            <PromptForm
              onSubmit={handlePromptSubmit}
              disabled={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
