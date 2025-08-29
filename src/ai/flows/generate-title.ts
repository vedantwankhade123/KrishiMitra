'use server';
/**
 * @fileOverview A flow for generating a short title for a chat session.
 * - generateTitle - A function that creates a concise title from a prompt.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTitleInputSchema = z.object({
  prompt: z.string().describe('The user prompt to summarize into a title.'),
  language: z.string().describe('The language for the title.'),
});
export type GenerateTitleInput = z.infer<typeof GenerateTitleInputSchema>;

const GenerateTitleOutputSchema = z.object({
  title: z
    .string()
    .describe('A short, concise title (3-4 words) for the chat session.'),
});
export type GenerateTitleOutput = z.infer<typeof GenerateTitleOutputSchema>;

export async function generateTitle(
  input: GenerateTitleInput
): Promise<GenerateTitleOutput> {
  return generateTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTitlePrompt',
  input: {schema: GenerateTitleInputSchema},
  output: {schema: GenerateTitleOutputSchema},
  prompt: `Generate a short, concise title (3-4 words max) in {{language}} for the following user prompt. The title should capture the main topic of the prompt.

User Prompt:
"{{{prompt}}}"
`,
});

const generateTitleFlow = ai.defineFlow(
  {
    name: 'generateTitleFlow',
    inputSchema: GenerateTitleInputSchema,
    outputSchema: GenerateTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
