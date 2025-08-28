'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type FilterControlsProps = {
    filters: {
        yield: number;
        profit: number;
        sustainability: number;
    };
    setFilters: (filters: {
        yield: number;
        profit: number;
        sustainability: number;
    }) => void;
    maxValues: {
        yield: number;
        profit: number;
        sustainability: number;
    }
};

export function FilterControls({ filters, setFilters, maxValues }: FilterControlsProps) {
    const handleSliderChange = (name: keyof typeof filters) => (value: number[]) => {
        setFilters({ ...filters, [name]: value[0] });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Filter Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
                <div className="space-y-3">
                    <Label htmlFor="yield-slider">Minimum Yield (_.../acre)</Label>
                    <div className="flex items-center gap-4">
                        <Slider
                            id="yield-slider"
                            min={0}
                            max={maxValues.yield}
                            step={maxValues.yield / 20}
                            value={[filters.yield]}
                            onValueChange={handleSliderChange('yield')}
                        />
                        <span className="text-sm font-medium w-20 text-right">{filters.yield.toFixed(1)}</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <Label htmlFor="profit-slider">Minimum Profit ($.../acre)</Label>
                     <div className="flex items-center gap-4">
                        <Slider
                            id="profit-slider"
                            min={0}
                            max={maxValues.profit}
                            step={maxValues.profit / 20}
                            value={[filters.profit]}
                            onValueChange={handleSliderChange('profit')}
                        />
                        <span className="text-sm font-medium w-20 text-right">${filters.profit.toFixed(0)}</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <Label htmlFor="sustainability-slider">Minimum Sustainability Score</Label>
                    <div className="flex items-center gap-4">
                        <Slider
                            id="sustainability-slider"
                            min={0}
                            max={10}
                            step={1}
                            value={[filters.sustainability]}
                            onValueChange={handleSliderChange('sustainability')}
                        />
                         <span className="text-sm font-medium w-20 text-right">{filters.sustainability}/10</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
