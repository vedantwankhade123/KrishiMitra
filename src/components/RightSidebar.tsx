
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Zap } from "lucide-react";

export function RightSidebar() {
  return (
    <div className="hidden xl:block w-80 border-l bg-muted/20 p-4">
        <div className="sticky top-4 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                        <Zap className="h-4 w-4" />
                        Model Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    <p>This chat is using the latest AI model for crop analysis.</p>
                    <ul className="mt-2 list-disc pl-4 text-xs space-y-1">
                        <li>Real-time data processing</li>
                        <li>Enhanced image recognition</li>
                        <li>Multilingual support</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
