'use server';
/**
 * @fileOverview The main entry function for the AgriAssist AI.
 *
 * This flow is responsible for routing user requests to the appropriate tool.
 */
import {ai} from '@/ai/genkit';
import {recommendOptimalCrops} from '@/ai/flows/optimal-crop-recommendation';
import {
  OptimalCropsInputSchema,
  type OptimalCropsInput,
  OptimalCropsOutputSchema,
  type OptimalCropsOutput,
} from '@/ai/schemas';
import {z} from 'genkit';

const MenuInputSchema = z.string().describe('The user prompt.');
export type MenuInput = z.infer<typeof MenuInputSchema>;

const MenuOutputSchema = z.object({
  // True if the model recommends to use a tool.
  toolRecommended: z.boolean(),
  // The general response to the user.
  response: z.string(),
  // The structured output if a tool is used.
  structuredOutput: OptimalCropsOutputSchema.optional(),
});
export type MenuOutput = z.infer<typeof MenuOutputSchema>;

export async function menu(input: MenuInput): Promise<MenuOutput> {
  return menuFlow(input);
}

const recommendOptimalCropsTool = ai.defineTool(
  {
    name: 'recommendOptimalCrops',
    description:
      'Provides optimal crop recommendations based on soil data, weather, etc.',
    inputSchema: OptimalCropsInputSchema,
    outputSchema: OptimalCropsOutputSchema,
  },
  async (input: OptimalCropsInput) => {
    return await recommendOptimalCrops(input);
  }
);

const menuFlow = ai.defineFlow(
  {
    name: 'menuFlow',
    inputSchema: MenuInputSchema,
    outputSchema: MenuOutputSchema,
  },
  async prompt => {
    const llmResponse = await ai.generate({
      prompt: `You are an expert AI assistant for farmers.
      If the user is asking for a recommendation, use the recommendOptimalCrops tool.
      Otherwise, simply answer their question.
      USER_PROMPT: ${prompt}`,
      model: 'googleai/gemini-2.5-flash',
      tools: [recommendOptimalCropsTool],
    });

    const toolChoice = llmResponse.choices[0].tool?.name;
    const textResponse = llmResponse.text();
    if (toolChoice === 'recommendOptimalCrops') {
      const toolResult = await llmResponse.choices[0].tool!.call();
      return {
        toolRecommended: true,
        response: textResponse,
        structuredOutput: toolResult.output as OptimalCropsOutput,
      };
    } else {
      return {
        toolRecommended: false,
        response: textResponse,
      };
    }
  }
);
