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
import { menu } from '@/ai/flows/menu';
import { 
  transcribeAudio, 
  type TranscribeAudioInput, 
  type TranscribeAudioOutput 
} from '@/ai/flows/transcribe-audio';
import {
  generateTitle,
  type GenerateTitleInput,
  type GenerateTitleOutput,
} from '@/ai/flows/generate-title';
import { parseRecommendations } from '@/lib/parsers';
import type { RecommendationResult } from '@/lib/types';
import cropData from '@/lib/crop-data.json';

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

export async function getExplanation(input: CropRecommendationExplainerInput): Promise<CropRecommendationExplainerOutput> {
  return await cropRecommendationExplainer(input);
}

export async function getTranscription(input: TranscribeAudioInput): Promise<TranscribeAudioOutput> {
  return await transcribeAudio(input);
}

export async function getChatTitle(input: GenerateTitleInput): Promise<GenerateTitleOutput> {
    return await generateTitle(input);
}

export async function getCropsFromLibrary({ page = 1, limit = 8, searchTerm = '' }: { page?: number; limit?: number; searchTerm?: string }) {
  const allCrops = cropData;

  const filteredCrops = searchTerm
    ? allCrops.filter(crop => crop.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : allCrops;

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedCrops = filteredCrops.slice(start, end);

  return {
    crops: paginatedCrops,
    hasMore: end < filteredCrops.length,
  };
}
