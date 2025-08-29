'use server';
/**
 * @fileOverview Summarizes the key factors influencing crop recommendations.
 *
 * - cropRecommendationExplainer - A function that provides explanations for crop recommendations.
 * - CropRecommendationExplainerInput - The input type for the cropRecommendationExplainer function.
 * - CropRecommendationExplainerOutput - The return type for the cropRecommendationExplainer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropRecommendationExplainerInputSchema = z.object({
  crop: z.string().describe('The name of the recommended crop.'),
  soilData: z.string().describe('Soil properties including pH, moisture, and nutrient content.'),
  weatherForecast: z.string().describe('Localized weather forecast data.'),
  cropRotationHistory: z.string().describe('Past crop rotation data.'),
  marketPrices: z.string().describe('Current market prices for various crops.'),
  language: z.string().describe('The language to respond in.'),
});
export type CropRecommendationExplainerInput = z.infer<typeof CropRecommendationExplainerInputSchema>;

const CropRecommendationExplainerOutputSchema = z.object({
  explanation: z.string().describe('A summary of the key factors influencing the crop recommendation.'),
});
export type CropRecommendationExplainerOutput = z.infer<typeof CropRecommendationExplainerOutputSchema>;

export async function cropRecommendationExplainer(input: CropRecommendationExplainerInput): Promise<CropRecommendationExplainerOutput> {
  return cropRecommendationExplainerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropRecommendationExplainerPrompt',
  input: {schema: CropRecommendationExplainerInputSchema},
  output: {schema: CropRecommendationExplainerOutputSchema},
  prompt: `You are an AI assistant that explains why a certain crop is recommended to a farmer.
  Your response must be in this language: {{language}}.

  Given the following information, summarize the key factors influencing the recommendation of {{crop}}.

  Soil Data: {{soilData}}
  Weather Forecast: {{weatherForecast}}
  Crop Rotation History: {{cropRotationHistory}}
  Market Prices: {{marketPrices}}

  Provide a concise explanation understandable to a farmer. Focus on the most important factors.
`,
});

const cropRecommendationExplainerFlow = ai.defineFlow(
  {
    name: 'cropRecommendationExplainerFlow',
    inputSchema: CropRecommendationExplainerInputSchema,
    outputSchema: CropRecommendationExplainerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
