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
import { useTranslation } from "@/hooks/useTranslation";

type CropCardProps = {
  crop: CropData;
  formInputs: OptimalCropsInput | null;
};

export function CropCard({ crop, formInputs }: CropCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30">
      <CardHeader className="p-3 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 p-2 sm:p-3 rounded-lg">
            <Sprout className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-bold text-base sm:text-lg">{crop.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 sm:space-y-3 text-xs sm:text-sm p-3 sm:p-6 pt-0">
        <div className="flex items-start">
          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 mt-0.5 text-accent flex-shrink-0" />
          <div>
            <span className="font-semibold mr-1 sm:mr-2">{t('cropCard.yield')}:</span>
            <span>{crop.yield.toFixed(1)} {crop.yieldUnit}</span>
          </div>
        </div>
        <div className="flex items-start">
          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 mt-0.5 text-accent flex-shrink-0" />
          <div>
            <span className="font-semibold mr-1 sm:mr-2">{t('cropCard.profitMargin')}:</span>
            <span>~${crop.profit.toFixed(0)} / {crop.profitUnit.split('/')[1] || 'acre'}</span>
          </div>
        </div>
        <div className="flex items-start">
          <Leaf className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 mt-0.5 text-accent flex-shrink-0" />
          <div>
            <span className="font-semibold mr-1 sm:mr-2">{t('cropCard.sustainability')}:</span>
            <span className="font-bold">{crop.sustainability}/10</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-6 pt-0">
        <RecommendationExplainer cropName={crop.name} formInputs={formInputs}>
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:bg-primary/10 hover:text-primary text-xs sm:text-sm h-8 sm:h-9">
            <Info className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {t('cropCard.whyRecommended')}
          </Button>
        </RecommendationExplainer>
      </CardFooter>
    </Card>
  );
}
