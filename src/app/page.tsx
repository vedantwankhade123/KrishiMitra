'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { PromptForm } from '@/components/PromptForm';
import { CropResults } from '@/components/CropResults';
import type { ChatMessage, Attachment } from '@/lib/types';
import { getRecommendationsFromPrompt } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SuggestionPrompts } from '@/components/SuggestionPrompts';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarItem, SidebarMenu, SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar';
import { NewChatButton } from '@/components/NewChatButton';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { toast } = useToast();

  const handlePromptSubmit = async (prompt: string, attachment?: Attachment | null) => {
    setLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: prompt,
      attachment: attachment
    };
    setConversation(prev => [...prev, userMessage]);

    try {
      const { recommendation, parsedInput, generalResponse } = await getRecommendationsFromPrompt(prompt, language, attachment?.url);
      
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
            text: generalResponse,
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
    } finally {
      setLoading(false);
    }
  };
  
  const handleSuggestionClick = (prompt: string) => {
    handlePromptSubmit(prompt, null);
  }

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <NewChatButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex flex-col container mx-auto w-full max-w-2xl py-8">
            <div className="flex-1 pb-48">
              <CropResults
                loading={loading}
                conversation={conversation}
                onSuggestionClick={handleSuggestionClick}
              />
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent">
              <div className="container mx-auto max-w-2xl px-4 pt-8 pb-4">
                <SuggestionPrompts onSuggestionClick={handleSuggestionClick} />
                <PromptForm
                  onSubmit={handlePromptSubmit}
                  disabled={loading}
                />
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </>
  );
}
