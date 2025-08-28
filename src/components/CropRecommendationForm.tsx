'use client';

import type { OptimalCropsInput } from '@/ai/flows/optimal-crop-recommendation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  soilData: z.string().min(10, "Please provide more detailed soil data."),
  weatherForecast: z.string().min(10, "Please provide a more detailed weather forecast."),
  cropRotationHistory: z.string().min(5, "Please provide some crop rotation history."),
  marketPrices: z.string().min(10, "Please provide more detailed market price data."),
});

const defaultValues: OptimalCropsInput = {
  soilData: 'pH: 6.5, Moisture: 45%, Nutrients: Nitrogen-Medium, Phosphorus-High, Potassium-Medium',
  weatherForecast: 'Next 3 months: Average temperature 25°C, 300mm rainfall predicted, chance of late frost is low.',
  cropRotationHistory: 'Last year: Fallow. Two years ago: Corn. Three years ago: Soybeans.',
  marketPrices: 'Current prices: Corn - $4.50/bushel (High demand), Soybeans - $12.00/bushel (Stable demand), Wheat - $5.50/bushel (Low demand).',
};

type CropRecommendationFormProps = {
  onSubmit: (data: OptimalCropsInput) => void;
  disabled: boolean;
};

export function CropRecommendationForm({
  onSubmit,
  disabled,
}: CropRecommendationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="p-6 space-y-6">
            <FormField
              control={form.control}
              name="soilData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soil Data</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., pH: 6.5, Moisture: 45%, Nitrogen: Medium..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weatherForecast"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weather Forecast</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Next 3 months: Avg temp 25°C, 300mm rainfall..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cropRotationHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop Rotation History</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Last year: Fallow, 2 years ago: Corn..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketPrices"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Market Prices & Demand</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Corn - $4.50/bushel (High demand)..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={disabled}>
              {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {disabled ? 'Analyzing...' : 'Get Recommendations'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
