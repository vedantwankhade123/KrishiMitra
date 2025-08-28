import type { OptimalCropsOutput } from "@/ai/flows/optimal-crop-recommendation";
import type { CropData, RecommendationResult } from "@/lib/types";

// These regex patterns are designed to be flexible with the AI's output format.
const valueAndUnitRegex = /([\d.,-]+)\s*([^,]+)/;
const scoreRegex = /(\d+)\/10/;

function parseMetric(text: string, cropName: string): [number, string] {
  const cropRegex = new RegExp(`${cropName}:\\s*([^,]+)`, 'i');
  const match = text.match(cropRegex);
  if (!match) return [0, ''];
  
  const valueMatch = match[1].match(valueAndUnitRegex);
  if (!valueMatch) return [0, ''];

  // Handle ranges like "5-6" by taking the average
  const valuePart = valueMatch[1].replace(/,/g, '');
  let numericValue: number;
  if (valuePart.includes('-')) {
    const [start, end] = valuePart.split('-').map(Number);
    numericValue = (start + end) / 2;
  } else {
    numericValue = parseFloat(valuePart);
  }

  const unit = valueMatch[2]?.trim() || '';
  
  return [isNaN(numericValue) ? 0 : numericValue, unit];
}


function parseSustainability(text: string, cropName: string): number {
  const cropRegex = new RegExp(`${cropName}:\\s*([^,]+)`, 'i');
  const match = text.match(cropRegex);
  if (!match) return 0;
  
  const scoreMatch = match[1].match(scoreRegex);
  if (!scoreMatch) return 0;
  
  const score = parseInt(scoreMatch[1], 10);
  return isNaN(score) ? 0 : score;
}

export function parseRecommendations(output: OptimalCropsOutput): RecommendationResult {
  const cropNames = output.recommendedCrops.split(',').map(c => c.trim()).filter(Boolean);

  const crops: CropData[] = cropNames.map(name => {
    const [yieldValue, yieldUnit] = parseMetric(output.yieldPrediction, name);
    const [profitValue, profitUnit] = parseMetric(output.profitMargin, name);
    const sustainabilityValue = parseSustainability(output.sustainabilityScore, name);

    return {
      name,
      yield: yieldValue,
      yieldUnit,
      profit: profitValue,
      profitUnit,
      sustainability: sustainabilityValue,
    };
  }).filter(crop => crop.name && (crop.yield > 0 || crop.profit > 0 || crop.sustainability > 0));

  return {
    crops,
    summary: output.summary,
  };
}
