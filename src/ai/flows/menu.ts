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
import {GenerateRequest, MessageData} from 'genkit/generate';

const MenuInputSchema = z.object({
  prompt: z.string().describe('The user prompt.'),
  language: z.string().describe('The language to respond in.'),
  imageUrl: z.string().optional().describe('A data URI of an image uploaded by the user.'),
  history: z.array(z.any()).optional().describe('The conversation history.'),
});
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
  const llmResponse = await menuFlow(input);
  const toolRequest = llmResponse.toolRequest;
  const textResponse = llmResponse.text;

  if (toolRequest?.name === 'recommendOptimalCrops') {
    const toolResult = await toolRequest.call();
    return {
      toolRecommended: true,
      response: textResponse,
      structuredOutput: toolResult as OptimalCropsOutput,
    };
  } else {
    return {
      toolRecommended: false,
      response: textResponse,
    };
  }
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
    outputSchema: z.any(),
  },
  async ({ prompt, language, imageUrl, history }) => {

    const systemPrompt = `You are an expert AI assistant for farmers. Your primary goal is to provide crop recommendations.

- If the user provides a text prompt asking for a recommendation, use the \`recommendOptimalCrops\` tool.
- If the user provides only an image and no text prompt, describe the image.
- For any other general questions, provide a helpful answer without using tools.

You must respond in the following language: ${language}.
USER_PROMPT: ${prompt || '(No text prompt provided)'}`;

    const llmPrompt: GenerateRequest['prompt'] = [{ text: systemPrompt }];

    if (imageUrl) {
        llmPrompt.push({media: {url: imageUrl}});
    }

    return await ai.generate({
        prompt: llmPrompt,
        model: 'googleai/gemini-2.5-flash',
        tools: [recommendOptimalCropsTool],
        history: history as MessageData[],
    });
  }
);
