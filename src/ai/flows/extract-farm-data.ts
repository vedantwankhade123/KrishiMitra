'use server';
/**
 * @fileOverview Extracts structured farm data from a natural language prompt.
 *
 * - extractFarmData - A function that parses a prompt and returns structured data.
 * - ExtractFarmDataInput - The input type for the extractFarmData function.
 * - ExtractFarmDataOutput - The return type for the extractFarmData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { OptimalCropsInputSchema, type OptimalCropsInput } from '@/ai/schemas';

const ExtractFarmDataInputSchema = z.object({
  prompt: z.string().describe("The user's natural language description of their farm and conditions."),
  imageUrl: z.string().optional().describe("A data URI of an image of the farm or crop."),
});
export type ExtractFarmDataInput = z.infer<typeof ExtractFarmDataInputSchema>;
export type ExtractFarmDataOutput = OptimalCropsInput;

export async function extractFarmData(input: ExtractFarmDataInput): Promise<ExtractFarmDataOutput> {
  return extractFarmDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractFarmDataPrompt',
  input: {schema: ExtractFarmDataInputSchema},
  output: {schema: OptimalCropsInputSchema},
  prompt: `You are an expert agricultural assistant. Your task is to extract structured data from a user's natural language prompt and an accompanying image if provided.
The user will describe their farm, including soil conditions, weather, crop history, and market prices.
You must parse this information and populate the fields of the output schema accordingly.
If an image is provided, use it to infer details about the soil, crop health, or other relevant factors.

If a piece of information is not provided, make a reasonable assumption or leave it blank if no assumption can be made.

User prompt:
"{{{prompt}}}"
{{#if imageUrl}}
[IMAGE: {{media url=imageUrl}}]
{{/if}}
`,
});

const extractFarmDataFlow = ai.defineFlow(
  {
    name: 'extractFarmDataFlow',
    inputSchema: ExtractFarmDataInputSchema,
    outputSchema: OptimalCropsInputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
