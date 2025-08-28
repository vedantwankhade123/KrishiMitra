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
import { Loader2, ArrowUp, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const formSchema = z.object({
  prompt: z.string().min(10, "Please provide a more detailed description for better results."),
});

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
    // Do not reset the form to allow for easy editing
  }

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue('prompt', suggestion);
    // Automatically submit when a suggestion is clicked
    form.handleSubmit(handleSubmit)();
  }

  return (
    <Card className="p-4 shadow-2xl shadow-primary/10">
      <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
              <p className="text-sm font-medium text-muted-foreground mr-2 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-accent"/>
                Try a suggestion:
              </p>
              {suggestionPrompts.slice(0, 3).map(prompt => (
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
                        aria-label="Describe your farm conditions and goals"
                        placeholder="Describe your farm and goals, or select a suggestion above..."
                        className="resize-none pr-20 min-h-[56px] text-base"
                        {...field}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                if (form.formState.isValid) {
                                  form.handleSubmit(handleSubmit)();
                                }
                            }
                        }}
                      />
                  </FormControl>
                  <FormMessage className="absolute -top-8 left-0 text-red-500" />
                  </FormItem>
              )}
              />
              <Button 
                  type="submit" 
                  size="lg" 
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-10 w-10 p-0 rounded-full bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                  disabled={disabled || !form.watch('prompt')}
                  aria-label="Get Recommendations"
              >
                  {disabled ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
                  <span className="sr-only">Get Recommendations</span>
              </Button>
          </form>
          </Form>
          <p className="text-xs text-center text-muted-foreground px-4">
            AgriAssist AI can make mistakes. Please verify critical information before making financial decisions.
          </p>
      </div>
    </Card>
  );
}
