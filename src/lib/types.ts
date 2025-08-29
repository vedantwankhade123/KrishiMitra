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

export type Attachment = {
  url: string;
  type: string;
}

export type Part = 
  | { text: string; media?: never }
  | { text?: never; media: { url: string } };

export type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  text?: string | null;
  content: Part[];
  recommendation?: RecommendationResult | null;
  inputs?: OptimalCropsInput | null;
  error?: string | null;
  attachment?: Attachment | null;
};

export type ChatSession = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  isRenaming?: boolean;
};
