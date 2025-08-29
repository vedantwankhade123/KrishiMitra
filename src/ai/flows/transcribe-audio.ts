'use server';
/**
 * @fileOverview A flow for transcribing audio to text.
 * - transcribeAudio - A function that handles the audio transcription.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranscribeAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "A chunk of audio as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z
    .string()
    .describe('The language spoken in the audio for transcription.'),
});
export type TranscribeAudioInput = z.infer<typeof TranscribeAudioInputSchema>;

const TranscribeAudioOutputSchema = z.object({
  transcription: z.string().describe('The transcribed text from the audio.'),
});
export type TranscribeAudioOutput = z.infer<
  typeof TranscribeAudioOutputSchema
>;

export async function transcribeAudio(
  input: TranscribeAudioInput
): Promise<TranscribeAudioOutput> {

  const {output} = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    prompt: [
      {
        text: `Transcribe the following audio. The speaker is talking in ${input.language}.`,
      },
      {
        media: {
          url: input.audioDataUri,
        },
      },
    ],
    output: {
      schema: z.object({
        transcription: z.string(),
      }),
    },
  });

  return {
    transcription: output?.transcription || '',
  };
}
