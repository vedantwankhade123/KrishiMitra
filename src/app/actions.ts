'use server';

import { 
  recommendOptimalCrops, 
} from '@/ai/flows/optimal-crop-recommendation';
import type { OptimalCropsInput } from '@/ai/schemas';
import { 
  cropRecommendationExplainer, 
  type CropRecommendationExplainerInput,
  type CropRecommendationExplainerOutput
} from '@/ai/flows/crop-recommendation-explainer';
import { 
  extractFarmData,
} from '@/ai/flows/extract-farm-data';
import { menu, menuStream } from '@/ai/flows/menu';
import { 
  transcribeAudio, 
  type TranscribeAudioInput, 
  type TranscribeAudioOutput 
} from '@/ai/flows/transcribe-audio';
import { parseRecommendations } from '@/lib/parsers';
import type { RecommendationResult } from '@/lib/types';
import {readableStreamToAsyncGenerator} from '@genkit-ai/next';

export async function getRecommendations(input: OptimalCropsInput): Promise<RecommendationResult> {
  const result = await recommendOptimalCrops(input);
  return parseRecommendations(result);
}

export async function getRecommendationsFromPrompt(prompt: string, language: string, imageUrl?: string): Promise<{recommendation: RecommendationResult | null, parsedInput: OptimalCropsInput | null, generalResponse: string | null}> {
  const result = await menu({prompt, language, imageUrl});

  if (result.toolRecommended && result.structuredOutput) {
    const recommendation = parseRecommendations(result.structuredOutput);
    const parsedInput = await extractFarmData({prompt, imageUrl});
    // Pass language to the parsed input for the explainer
    parsedInput.language = language; 
    return { recommendation, parsedInput, generalResponse: result.response };
  }
  
  return { recommendation: null, parsedInput: null, generalResponse: result.response };
}

export async function getStreamingResponse(prompt: string, language: string, imageUrl?: string) {
    const stream = await menuStream({prompt, language, imageUrl});
    return readableStreamToAsyncGenerator(stream);
}

export async function getExplanation(input: CropRecommendationExplainerInput): Promise<CropRecommendationExplainerOutput> {
  return await cropRecommendationExplainer(input);
}

export async function getTranscription(input: TranscribeAudioInput): Promise<TranscribeAudioOutput> {
  return await transcribeAudio(input);
}
