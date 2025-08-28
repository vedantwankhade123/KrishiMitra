'use client';

import type { CropData } from '@/lib/types';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
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
} satisfies ChartConfig;

const axisConfig = {
    yield: { label: "Yield", unit: (data[0]?.yieldUnit || 'units') },
    profit: { label: "Profit", unit: `$` },
    sustainability: { label: "Score", unit: "/10" },
}

export function ResultsChart({ data }: ResultsChartProps) {
  const [metric, setMetric] = useState<ChartMetric>('yield');

  if (data.length === 0) {
    return null;
  }

  const chartData = data.map(crop => ({
    name: crop.name,
    value: crop[metric],
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
        <div className="p-2 bg-background border rounded-md shadow-lg">
          <p className="font-bold">{label}</p>
          <p className="capitalize text-sm text-muted-foreground">{metric}: {displayValue}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="font-headline">Visual Predictions</CardTitle>
            <CardDescription>Comparing recommended crops</CardDescription>
          </div>
          <ToggleGroup type="single" value={metric} onValueChange={(value: ChartMetric) => value && setMetric(value)}>
            <ToggleGroupItem value="yield" aria-label="Toggle yield">Yield</ToggleGroupItem>
            <ToggleGroupItem value="profit" aria-label="Toggle profit">Profit</ToggleGroupItem>
            <ToggleGroupItem value="sustainability" aria-label="Toggle sustainability">Sustainability</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis
                tickFormatter={(value) => metric === 'profit' ? `$${value}` : value}
                domain={metric === 'sustainability' ? [0, 10] : undefined}
              />
              <ChartTooltip content={<CustomTooltip />} cursor={false} />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
