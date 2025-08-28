export type CropData = {
  name: string;
  yield: number;
  yieldUnit: string;
  profit: number;
  profitUnit: string;
  sustainability: number;
};

export type RecommendationResult = {
  crops: CropData[];
  summary: string;
};
