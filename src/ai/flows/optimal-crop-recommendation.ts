'use server';
/**
 * @fileOverview An AI agent that recommends optimal crops based on various factors.
 *
 * - recommendOptimalCrops - A function that handles the crop recommendation process.
 * - OptimalCropsInput - The input type for the recommendOptimalCrops function.
 * - OptimalCropsOutput - The return type for the recommendOptimalCrops function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimalCropsInputSchema = z.object({
  soilData: z
    .string()
    .describe('The data about the soil properties (pH, moisture, nutrient content).'),
  weatherForecast: z.string().describe('The localized weather forecast data.'),
  cropRotationHistory: z
    .string()
    .describe('The past crop rotation data for the field.'),
  marketPrices: z.string().describe('The current market prices for various crops.'),
});
export type OptimalCropsInput = z.infer<typeof OptimalCropsInputSchema>;

const OptimalCropsOutputSchema = z.object({
  recommendedCrops: z
    .string()
    .describe('The list of recommended crops based on the input data.'),
  yieldPrediction: z.string().describe('The predicted yield for each recommended crop.'),
  profitMargin: z.string().describe('The profit margin for each recommended crop.'),
  sustainabilityScore: z
    .string()
    .describe('The sustainability score for each recommended crop.'),
  summary: z.string().describe('A summary of the key factors influencing the recommendation.'),
});
export type OptimalCropsOutput = z.infer<typeof OptimalCropsOutputSchema>;

export async function recommendOptimalCrops(
  input: OptimalCropsInput
): Promise<OptimalCropsOutput> {
  return recommendOptimalCropsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimalCropRecommendationPrompt',
  input: {schema: OptimalCropsInputSchema},
  output: {schema: OptimalCropsOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the following data, recommend the optimal crops to plant.

Soil Data: {{{soilData}}}
Weather Forecast: {{{weatherForecast}}}
Crop Rotation History: {{{cropRotationHistory}}}
Market Prices: {{{marketPrices}}}

Consider all these factors holistically to recommend the best crops, predict their yield, estimate profit margins, and provide a sustainability score. Also provide a summary of key factors that influenced the recommendation.

Ensure the output is formatted in a way that is easily understandable for a farmer.
`,
});

const recommendOptimalCropsFlow = ai.defineFlow(
  {
    name: 'recommendOptimalCropsFlow',
    inputSchema: OptimalCropsInputSchema,
    outputSchema: OptimalCropsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
