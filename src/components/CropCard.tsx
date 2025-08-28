'use client';

import type { OptimalCropsInput } from "@/ai/schemas";
import type { CropData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sprout, DollarSign, BarChart, Info, Leaf } from "lucide-react";
import { RecommendationExplainer } from "@/components/RecommendationExplainer";

type CropCardProps = {
  crop: CropData;
  formInputs: OptimalCropsInput | null;
};

export function CropCard({ crop, formInputs }: CropCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-full">
            <Sprout className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-headline text-2xl">{crop.name}</CardTitle>
            <CardDescription>Predicted Performance</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center">
          <BarChart className="h-5 w-5 mr-3 text-accent" />
          <span className="font-semibold mr-2">Yield:</span>
          <span>{crop.yield.toFixed(1)} {crop.yieldUnit}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 mr-3 text-accent" />
          <span className="font-semibold mr-2">Profit Margin:</span>
          <span>~${crop.profit.toFixed(0)} / {crop.profitUnit.split('/')[1] || 'acre'}</span>
        </div>
        <div className="flex items-center">
          <Leaf className="h-5 w-5 mr-3 text-accent" />
          <span className="font-semibold mr-2">Sustainability:</span>
          <div className="flex items-center gap-1">
            <span className="font-bold">{crop.sustainability}/10</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <RecommendationExplainer cropName={crop.name} formInputs={formInputs}>
          <Button variant="outline" className="w-full">
            <Info className="mr-2 h-4 w-4" />
            See Why
          </Button>
        </RecommendationExplainer>
      </CardFooter>
    </Card>
  );
}
