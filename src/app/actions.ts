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
import { parseRecommendations } from '@/lib/parsers';
import type { RecommendationResult } from '@/lib/types';

export async function getRecommendations(input: OptimalCropsInput): Promise<RecommendationResult> {
  const result = await recommendOptimalCrops(input);
  return parseRecommendations(result);
}

export async function getRecommendationsFromPrompt(prompt: string): Promise<{recommendation: RecommendationResult, parsedInput: OptimalCropsInput}> {
  const parsedInput = await extractFarmData({prompt});
  const result = await recommendOptimalCrops(parsedInput);
  const recommendation = parseRecommendations(result);
  return { recommendation, parsedInput };
}

export async function getExplanation(input: CropRecommendationExplainerInput): Promise<CropRecommendationExplainerOutput> {
  return await cropRecommendationExplainer(input);
}
