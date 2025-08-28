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

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty."),
});

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
    form.reset();
  }

  return (
    <div>
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
                    placeholder="What is on your mind?"
                    className="resize-none pr-14 min-h-[52px] text-base rounded-full bg-input border-2 border-transparent focus:border-primary"
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
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
              disabled={disabled || !form.watch('prompt')}
              aria-label="Send"
          >
              {disabled ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
              <span className="sr-only">Send</span>
          </Button>
      </form>
      </Form>
    </div>
  );
}
