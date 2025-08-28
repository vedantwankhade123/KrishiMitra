'use client';

import type { OptimalCropsInput } from '@/ai/flows/optimal-crop-recommendation';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { CropRecommendationForm } from '@/components/CropRecommendationForm';
import { CropResults } from '@/components/CropResults';
import type { RecommendationResult } from '@/lib/types';
import { getRecommendations } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [formInputs, setFormInputs] = useState<OptimalCropsInput | null>(null);
  const { toast } = useToast();

  const handleGetRecommendations = async (data: OptimalCropsInput) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setFormInputs(data);
    try {
      const recommendation = await getRecommendations(data);
      if (recommendation.crops.length === 0) {
        setError("The AI couldn't find any suitable crops based on the provided data. Please try adjusting the inputs.");
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <aside className="lg:col-span-1">
            <div className="sticky top-20">
              <h1 className="font-headline text-3xl font-bold mb-6 text-primary">
                Your Farm Data
              </h1>
              <CropRecommendationForm
                onSubmit={handleGetRecommendations}
                disabled={loading}
              />
            </div>
          </aside>
          <div className="lg:col-span-2">
            <CropResults
              loading={loading}
              error={error}
              result={result}
              formInputs={formInputs}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
