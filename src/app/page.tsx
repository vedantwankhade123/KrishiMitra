'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { PromptForm } from '@/components/PromptForm';
import { CropResults } from '@/components/CropResults';
import type { RecommendationResult, ChatMessage } from '@/lib/types';
import { getRecommendationsFromPrompt } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { OptimalCropsInput } from '@/ai/schemas';
import { SuggestionPrompts } from '@/components/SuggestionPrompts';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);

  const { toast } = useToast();

  const handleGetRecommendations = async (prompt: string) => {
    setLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: prompt,
    };
    setConversation(prev => [...prev, userMessage]);

    try {
      const { recommendation, parsedInput, generalResponse } = await getRecommendationsFromPrompt(prompt);
      
      let botMessage: ChatMessage;

      if (recommendation) {
        if (recommendation.crops.length === 0) {
           botMessage = {
            id: `bot-error-${Date.now()}`,
            role: 'bot',
            error: "The AI couldn't find any suitable crops based on your prompt. Please try adjusting the inputs."
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
      const errorMsg = "An unexpected error occurred while getting recommendations. The AI model might have returned an unparsable response. Please check the console for details and try again.";
      setError(errorMsg);
      const errorBotMessage: ChatMessage = {
        id: `bot-error-${Date.now()}`,
        role: 'bot',
        error: errorMsg
      };
      setConversation(prev => [...prev, errorBotMessage]);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col container mx-auto w-full max-w-2xl py-8">
        <div className="flex-1 pb-40">
          <CropResults
            loading={loading}
            conversation={conversation}
            onSuggestionClick={handleGetRecommendations}
          />
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent">
          <div className="container mx-auto max-w-2xl px-4 pt-8 pb-4">
            <SuggestionPrompts onSuggestionClick={handleGetRecommendations} />
            <PromptForm
              onSubmit={handleGetRecommendations}
              disabled={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
