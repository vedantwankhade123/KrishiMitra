'use client';

import type { OptimalCropsInput } from "@/ai/schemas";
import type { RecommendationResult } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CropCard } from "@/components/CropCard";
import { ResultsChart } from "@/components/ResultsChart";
import { Sprout } from "lucide-react";

type CropResultsProps = {
  loading: boolean;
  error: string | null;
  result: RecommendationResult | null;
  formInputs: OptimalCropsInput | null;
};

function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
      <Skeleton className="h-80 w-full rounded-lg" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function CropResults({ loading, error, result, formInputs }: CropResultsProps) {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
        <AlertTitle className="font-headline text-lg">Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!result) {
    return (
      <div className="flex h-[65vh] flex-col items-center justify-center rounded-lg border-2 border-dashed text-center p-8">
        <Sprout className="h-20 w-20 text-muted-foreground/30 mb-6" />
        <h3 className="font-headline text-3xl font-bold tracking-tight">Ready to grow?</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Describe your farm's conditions and goals below, or select a suggestion to get personalized crop recommendations from our AI.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-headline text-4xl font-bold mb-2 text-primary tracking-tight">
          AI Recommendations
        </h2>
        <p className="text-lg text-muted-foreground">Based on the data you provided, here are your top crop suggestions.</p>
      </div>

      <Card className="bg-primary/5 border-primary/20 shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline text-xl text-primary">AI Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-primary/90 leading-relaxed">{result.summary}</p>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <ResultsChart data={result.crops} />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {result.crops.length > 0 ? (
          result.crops.map(crop => (
            <CropCard key={crop.name} crop={crop} formInputs={formInputs} />
          ))
        ) : (
          <p className="text-muted-foreground md:col-span-2 lg:col-span-3 text-center py-8">
            No crops were recommended. Try adjusting your prompt.
          </p>
        )}
      </div>
    </div>
  );
}
