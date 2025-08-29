'use server';
/**
 * @fileOverview An AI agent that recommends optimal crops based on various factors.
 *
 * - recommendOptimalCrops - A function that handles the crop recommendation process.
 */

import {ai} from '@/ai/genkit';
import {
  OptimalCropsInputSchema,
  type OptimalCropsInput,
  OptimalCropsOutputSchema,
  type OptimalCropsOutput,
} from '@/ai/schemas';

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
Your response must be in this language: {{{language}}}.

Soil Data: {{{soilData}}}
Weather Forecast: {{{weatherForecast}}}
Crop Rotation History: {{{cropRotationHistory}}}
Market Prices: {{{marketPrices}}}

Consider all these factors holistically to recommend the best crops, predict their yield, estimate profit margins, and provide a sustainability score. Also provide a summary of key factors that influenced the recommendation.

Ensure the output is formatted in a way that is easily understandable for a farmer.
Use clear Markdown formatting. For example:
- Use headings for different sections.
- Use bold text for important terms.
- Use bullet points for lists of reasons.
- Use tables for comparing data if needed.
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
