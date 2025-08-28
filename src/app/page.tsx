'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { PromptForm } from '@/components/PromptForm';
import { CropResults } from '@/components/CropResults';
import type { RecommendationResult } from '@/lib/types';
import { getRecommendationsFromPrompt } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { OptimalCropsInput } from '@/ai/schemas';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [formInputs, setFormInputs] = useState<OptimalCropsInput | null>(null);
  const { toast } = useToast();

  const handleGetRecommendations = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setFormInputs(null);
    try {
      const { recommendation, parsedInput } = await getRecommendationsFromPrompt(prompt);
      setFormInputs(parsedInput);
      if (recommendation.crops.length === 0) {
        setError("The AI couldn't find any suitable crops based on your prompt. Please try adjusting the inputs.");
        setResult(null);
      } else {
        setResult(recommendation);
      }
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred while getting recommendations. The AI model might have returned an unparsable response. Please check the console for details and try again.");
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
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-1 flex flex-col container mx-auto w-full max-w-4xl py-8">
        <div className="flex-1 pb-40">
          <CropResults
            loading={loading}
            error={error}
            result={result}
            formInputs={formInputs}
          />
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/90 to-transparent">
          <div className="container mx-auto max-w-4xl px-4 pt-8 pb-4">
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
