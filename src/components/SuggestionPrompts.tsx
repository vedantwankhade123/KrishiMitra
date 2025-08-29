'use client';

import { Sprout, BrainCircuit } from "lucide-react";

type SuggestionPromptsProps = {
    onSuggestionClick: (prompt: string) => void;
};

const suggestionPrompts = [
    { icon: <Sprout/>, title: "Profitability", prompt: "I have sandy loam soil and want to maximize profit." },
    { icon: <BrainCircuit/>, title: "Soil Health", prompt: "What can I plant to improve soil nitrogen in clay soil?" },
    { icon: <Sprout/>, title: "Resilience", prompt: "Show me drought-resistant crops for a short, cool growing season." }
];

export function SuggestionPrompts({ onSuggestionClick }: SuggestionPromptsProps) {
    return (
        <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {suggestionPrompts.map(({icon, title, prompt}) => (
                    <button 
                        key={title} 
                        onClick={() => onSuggestionClick(prompt)} 
                        className="p-3 rounded-lg bg-card/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all text-left space-y-1 focus:outline-none focus:ring-1 focus:ring-primary/50"
                    >
                       <div className="flex items-center gap-2 text-primary text-xs">{icon}<span className="font-semibold text-foreground">{title}</span></div>
                       <p className="text-xs text-muted-foreground">{prompt}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
