'use client';

import type { OptimalCropsInput } from "@/ai/flows/optimal-crop-recommendation";
import type { RecommendationResult } from "@/lib/types";
import { useState, useMemo } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CropCard } from "@/components/CropCard";
import { ResultsChart } from "@/components/ResultsChart";
import { FilterControls } from "@/components/FilterControls";
import { Sprout } from "lucide-react";

type CropResultsProps = {
  loading: boolean;
  error: string | null;
  result: RecommendationResult | null;
  formInputs: OptimalCropsInput | null;
};

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-64 w-full" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CropResults({ loading, error, result, formInputs }: CropResultsProps) {
  const [filters, setFilters] = useState({ yield: 0, profit: 0, sustainability: 0 });

  const maxValues = useMemo(() => {
    if (!result || result.crops.length === 0) return { yield: 10, profit: 1000, sustainability: 10 };
    return {
      yield: Math.max(...result.crops.map(c => c.yield), 0),
      profit: Math.max(...result.crops.map(c => c.profit), 0),
      sustainability: 10,
    };
  }, [result]);

  const filteredCrops = useMemo(() => {
    if (!result) return [];
    return result.crops.filter(crop =>
      crop.yield >= filters.yield &&
      crop.profit >= filters.profit &&
      crop.sustainability >= filters.sustainability
    );
  }, [result, filters]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="bg-destructive/10">
        <AlertTitle className="font-headline">Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!result) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center rounded-lg border border-dashed text-center">
        <Sprout className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="font-headline text-2xl font-semibold">Ready to grow?</h3>
        <p className="text-muted-foreground">
          Fill out your farm's data to get personalized crop recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-headline text-3xl font-bold mb-2 text-primary">
          AI Recommendations
        </h2>
        <p className="text-muted-foreground">Based on the data you provided, here are the top crop suggestions.</p>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-primary">AI Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-primary/90">{result.summary}</p>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <FilterControls filters={filters} setFilters={setFilters} maxValues={maxValues} />
        <ResultsChart data={filteredCrops} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredCrops.length > 0 ? (
          filteredCrops.map(crop => (
            <CropCard key={crop.name} crop={crop} formInputs={formInputs} />
          ))
        ) : (
          <p className="text-muted-foreground md:col-span-2 lg:col-span-3 text-center py-8">
            No crops match the current filter settings.
          </p>
        )}
      </div>
    </div>
  );
}
