import type { OptimalCropsInput, OptimalCropsOutput } from "./schemas";

export type CropData = {
  name: string;
  yield: number;
  yieldUnit: string;
  profit: number;
  profitUnit: string;
  sustainability: number;
};

export type RecommendationResult = {
  crops: CropData[];
  summary: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  text?: string | null;
  recommendation?: RecommendationResult | null;
  inputs?: OptimalCropsInput | null;
  error?: string | null;
};
