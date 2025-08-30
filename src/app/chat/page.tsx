
'use client';

import { useState, useEffect } from 'react';
import { PromptForm } from '@/components/PromptForm';
import { CropResults } from '@/components/CropResults';
import type { ChatMessage, Attachment } from '@/lib/types';
import { getRecommendationsFromPrompt, getChatTitle } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SuggestionPrompts } from '@/components/SuggestionPrompts';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useChatHistory } from '@/context/ChatHistoryContext';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { activeChat, updateActiveChat } = useChatHistory();
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  
  useEffect(() => {
    if (activeChat) {
      setConversation(activeChat.messages);
    } else {
      setConversation([]);
    }
  }, [activeChat]);

  const handlePromptSubmit = async (prompt: string, attachment?: Attachment | null) => {
    setLoading(true);

    const isNewChat = conversation.length === 0;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: prompt,
      attachment: attachment,
      content: [
        { text: prompt },
        ...(attachment ? [{ media: { url: attachment.url } }] : [])
      ],
    };
    
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);

    try {
      if (isNewChat && prompt) {
          getChatTitle({ prompt, language }).then(({ title }) => {
            if (title) {
                updateActiveChat(chat => ({
                    ...chat,
                    title,
                }));
            }
          }).catch(e => console.error("Failed to generate title", e));
      }

      const { recommendation, parsedInput, generalResponse } = await getRecommendationsFromPrompt(prompt, language, conversation, attachment?.url);
      
      let botMessage: ChatMessage;

      if (recommendation) {
          if (recommendation.crops.length === 0) {
            botMessage = {
              id: `bot-error-${Date.now()}`,
              role: 'bot',
              text: t('errors.noCropsFound'),
              content: [{ text: t('errors.noCropsFound') }]
            };
          } else {
            botMessage = {
              id: `bot-${Date.now()}`,
              role: 'bot',
              recommendation,
              inputs: parsedInput,
              text: generalResponse,
              content: [{ text: generalResponse || '' }]
            };
          }
      } else {
          botMessage = {
            id: `bot-${Date.now()}`,
            role: 'bot',
            text: generalResponse,
            content: [{ text: generalResponse || '' }]
          };
      }
      
      const finalConversation = [...updatedConversation, botMessage];
      setConversation(finalConversation);

      updateActiveChat(chat => ({
          ...chat,
          messages: finalConversation,
          title: isNewChat ? (chat.title || t('header.newChat')) : chat.title,
      }));

    } catch (e) {
        console.error(e);
        const errorMsg = t('errors.unexpectedError');
        const errorBotMessage: ChatMessage = {
          id: `bot-error-${Date.now()}`,
          role: 'bot',
          error: errorMsg,
          content: [{ text: errorMsg }]
        };
        const finalConversation = [...updatedConversation, errorBotMessage];
        setConversation(finalConversation);

        updateActiveChat(chat => ({
          ...chat,
          messages: finalConversation,
        }));

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
    <div className='flex flex-col h-full flex-1'>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-4xl py-8">
            <CropResults
                loading={loading}
                conversation={conversation}
                onSuggestionClick={handleSuggestionClick}
            />
        </div>
      </main>
      <div className="bg-gradient-to-t from-background to-transparent">
        <div className="container mx-auto max-w-4xl p-4 flex flex-col items-center">
            <SuggestionPrompts onSuggestionClick={handleSuggestionClick} />
            <PromptForm
            onSubmit={handlePromptSubmit}
            disabled={loading || !activeChat}
            />
        </div>
      </div>
    </div>
  );
}
