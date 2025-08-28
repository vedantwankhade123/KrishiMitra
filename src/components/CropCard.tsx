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
import { Sprout, DollarSign, BarChart, Info, Leaf, TrendingUp } from "lucide-react";
import { RecommendationExplainer } from "@/components/RecommendationExplainer";

type CropCardProps = {
  crop: CropData;
  formInputs: OptimalCropsInput | null;
};

export function CropCard({ crop, formInputs }: CropCardProps) {
  return (
    <Card className="flex flex-col transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Sprout className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-bold text-lg">{crop.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-start">
          <TrendingUp className="h-4 w-4 mr-3 mt-0.5 text-accent flex-shrink-0" />
          <div>
            <span className="font-semibold mr-2">Yield:</span>
            <span>{crop.yield.toFixed(1)} {crop.yieldUnit}</span>
          </div>
        </div>
        <div className="flex items-start">
          <DollarSign className="h-4 w-4 mr-3 mt-0.5 text-accent flex-shrink-0" />
          <div>
            <span className="font-semibold mr-2">Profit Margin:</span>
            <span>~${crop.profit.toFixed(0)} / {crop.profitUnit.split('/')[1] || 'acre'}</span>
          </div>
        </div>
        <div className="flex items-start">
          <Leaf className="h-4 w-4 mr-3 mt-0.5 text-accent flex-shrink-0" />
          <div>
            <span className="font-semibold mr-2">Sustainability:</span>
            <span className="font-bold">{crop.sustainability}/10</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <RecommendationExplainer cropName={crop.name} formInputs={formInputs}>
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:bg-primary/10 hover:text-primary">
            <Info className="mr-2 h-4 w-4" />
            Why was this recommended?
          </Button>
        </RecommendationExplainer>
      </CardFooter>
    </Card>
  );
}
