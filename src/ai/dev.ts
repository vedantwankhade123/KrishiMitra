import { config } from 'dotenv';
config();

import '@/ai/flows/optimal-crop-recommendation.ts';
import '@/ai/flows/crop-recommendation-explainer.ts';
import '@/ai/flows/extract-farm-data.ts';
import '@/ai/flows/menu.ts';
import '@/ai/flows/transcribe-audio.ts';
import '@/ai/flows/generate-title.ts';
import '@/ai/schemas.ts';
