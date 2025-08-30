'use client';

import type { CropData } from '@/lib/types';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ResultsChartProps = {
  data: CropData[];
};

type ChartMetric = 'yield' | 'profit' | 'sustainability';

const chartConfig = {
  value: {
    label: 'Value',
    color: 'hsl(var(--accent))',
  },
};

export function ResultsChart({ data }: ResultsChartProps) {
  const [metric, setMetric] = useState<ChartMetric>('yield');

  const axisConfig = {
      yield: { label: "Yield", unit: (data.length > 0 ? data[0]?.yieldUnit : 'units') || 'units' },
      profit: { label: "Profit", unit: `$` },
      sustainability: { label: "Score", unit: "/10" },
  }

  if (data.length === 0) {
    return null;
  }

  const chartData = data.map(crop => ({
    name: crop.name,
    value: crop[metric],
    fill: 'var(--color-value)',
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const crop = data.find(c => c.name === label);
      if (!crop) return null;
      
      const value = payload[0].value;
      let displayValue;
      if (metric === 'yield') displayValue = `${value.toFixed(1)} ${crop.yieldUnit}`;
      else if (metric === 'profit') displayValue = `$${value.toFixed(0)}`;
      else displayValue = `${value}/10`;
      
      return (
        <div className="p-3 bg-background/90 border rounded-lg shadow-lg backdrop-blur-sm">
          <p className="font-bold text-lg">{label}</p>
          <p className="capitalize text-sm text-muted-foreground">{metric}: <span className="font-medium text-foreground">{displayValue}</span></p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <CardTitle className="font-headline text-lg sm:text-xl">Visual Predictions</CardTitle>
            <CardDescription className="text-sm">Comparing recommended crops</CardDescription>
          </div>
          <ToggleGroup type="single" variant="outline" value={metric} onValueChange={(value: ChartMetric) => value && setMetric(value)} aria-label="Chart metric selector" className="flex-wrap justify-start sm:justify-end">
            <ToggleGroupItem value="yield" aria-label="Toggle yield" className="text-xs sm:text-sm px-2 sm:px-3">Yield</ToggleGroupItem>
            <ToggleGroupItem value="profit" aria-label="Toggle profit" className="text-xs sm:text-sm px-2 sm:px-3">Profit</ToggleGroupItem>
            <ToggleGroupItem value="sustainability" aria-label="Toggle sustainability" className="text-xs sm:text-sm px-2 sm:px-3">Sustainability</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 30, right: 5, left: 5, bottom: 5 }} accessibilityLayer>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} fontSize={10} className="sm:text-xs" />
              <YAxis
                tickFormatter={(value) => metric === 'profit' ? `$${value}` : value}
                domain={metric === 'sustainability' ? [0, 10] : undefined}
                axisLine={false}
                tickLine={false}
                width={35}
                fontSize={10}
                className="sm:text-xs"
              />
              <ChartTooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent) / 0.1)' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                <LabelList 
                  dataKey="value" 
                  position="top" 
                  offset={10} 
                  className="fill-foreground font-semibold text-xs"
                  formatter={(value: number) => {
                    if (metric === 'profit') return `$${value.toFixed(0)}`;
                    if (metric === 'yield') return value.toFixed(1);
                    return value;
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
