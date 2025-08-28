'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowUp } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(10, "Please provide a more detailed description."),
});

const defaultPromptValue = `My farm has soil with a pH of 6.5 and medium moisture, rich in phosphorus. The weather forecast predicts an average temperature of 25°C with 300mm of rain. I've previously grown corn and soybeans. Corn prices are high, while soybeans are stable. I'm looking for high-yield, profitable crops.`;

const suggestionPrompts = [
    "I have sandy loam soil and want to maximize profit.",
    "Show me drought-resistant crops for clay soil.",
    "What can I plant to improve soil nitrogen?",
    "Recommend crops for a short, cool growing season."
]

type PromptFormProps = {
  onSubmit: (prompt: string) => void;
  disabled: boolean;
};

export function PromptForm({
  onSubmit,
  disabled,
}: PromptFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data.prompt);
    form.reset({ prompt: '' });
  }

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue('prompt', suggestion);
    form.handleSubmit(handleSubmit)();
  }

  return (
    <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
            {suggestionPrompts.map(prompt => (
                <Button key={prompt} variant="outline" size="sm" onClick={() => handleSuggestionClick(prompt)} disabled={disabled}>
                    {prompt}
                </Button>
            ))}
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="relative">
            <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Textarea
                    placeholder="Describe your farm and goals, or select a suggestion above..."
                    className="resize-none pr-20 min-h-[52px]"
                    {...field}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(handleSubmit)();
                        }
                    }}
                    />
                </FormControl>
                <FormMessage className="absolute -top-8 left-0" />
                </FormItem>
            )}
            />
            <Button 
                type="submit" 
                size="icon" 
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90" 
                disabled={disabled || !form.watch('prompt')}
            >
                {disabled ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
                <span className="sr-only">Get Recommendations</span>
            </Button>
        </form>
        </Form>
        <p className="text-xs text-center text-muted-foreground">
          AgriAssist AI can make mistakes. Consider verifying important information.
        </p>
    </div>
  );
}
