import {z} from 'genkit';

export const OptimalCropsInputSchema = z.object({
  soilData: z
    .string()
    .describe('The data about the soil properties (pH, moisture, nutrient content).'),
  weatherForecast: z.string().describe('The localized weather forecast data.'),
  cropRotationHistory: z
    .string()
    .describe('The past crop rotation data for the field.'),
  marketPrices: z.string().describe('The current market prices for various crops.'),
  language: z.string().describe('The language for the AI to respond in.').optional(),
});
export type OptimalCropsInput = z.infer<typeof OptimalCropsInputSchema>;

export const OptimalCropsOutputSchema = z.object({
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
