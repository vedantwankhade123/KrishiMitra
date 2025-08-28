'use server';

import { 
  recommendOptimalCrops, 
  type OptimalCropsInput 
} from '@/ai/flows/optimal-crop-recommendation';
import { 
  cropRecommendationExplainer, 
  type CropRecommendationExplainerInput,
  type CropRecommendationExplainerOutput
} from '@/ai/flows/crop-recommendation-explainer';
import { parseRecommendations } from '@/lib/parsers';
import type { RecommendationResult } from '@/lib/types';

export async function getRecommendations(input: OptimalCropsInput): Promise<RecommendationResult> {
  const result = await recommendOptimalCrops(input);
  return parseRecommendations(result);
}

export async function getExplanation(input: CropRecommendationExplainerInput): Promise<CropRecommendationExplainerOutput> {
  return await cropRecommendationExplainer(input);
}
