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
import { useEffect, useState } from 'react';

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty."),
});

type PromptFormProps = {
  onSubmit: (prompt: string) => void;
  disabled: boolean;
};

const placeholderPrompts = [
  "What crops are best for sandy soil?",
  "Suggest drought-resistant options.",
  "How can I improve soil nitrogen?",
  "What should I plant after corn?",
  "Show me profitable crops for a cool climate.",
];

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

  const [placeholder, setPlaceholder] = useState("What is on your mind?");

  useEffect(() => {
    let currentPromptIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 100;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const fullPrompt = placeholderPrompts[currentPromptIndex];

      if (isDeleting) {
        currentText = fullPrompt.substring(0, currentText.length - 1);
      } else {
        currentText = fullPrompt.substring(0, currentText.length + 1);
      }

      setPlaceholder(currentText + '|');

      let nextTypingSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && currentText === fullPrompt) {
        nextTypingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentPromptIndex = (currentPromptIndex + 1) % placeholderPrompts.length;
        nextTypingSpeed = 500; // Pause before new prompt
      }

      timeoutId = setTimeout(type, nextTypingSpeed);
    };

    timeoutId = setTimeout(type, 1000); // Initial delay

    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data.prompt);
    form.reset();
  }

  const watchedPrompt = form.watch('prompt');

  return (
    <div className="px-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="relative">
          <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
              <FormItem>
              <FormControl>
                  <Textarea
                    aria-label="What is on your mind?"
                    placeholder={!watchedPrompt ? placeholder : "What is on your mind?"}
                    className="resize-none pr-14 min-h-[52px] text-base rounded-full bg-card border border-primary/10 focus:border-primary/30 flex items-center"
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
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
              disabled={disabled || !watchedPrompt}
              aria-label="Send"
          >
              {disabled ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
              <span className="sr-only">Send</span>
          </Button>
      </form>
      </Form>
       <p className="text-center text-xs text-muted-foreground/50 pt-3">
          AgriAssist can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}