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
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { t } = useTranslation();
  const placeholderPrompts = t('promptForm.placeholders', { returnObjects: true }) as string[];

  const [placeholder, setPlaceholder] = useState(t('promptForm.placeholder'));

  useEffect(() => {
    let currentPromptIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const fullPrompt = placeholderPrompts[currentPromptIndex];
      const typingSpeed = isDeleting ? 50 : 100;

      if (isDeleting) {
        currentText = fullPrompt.substring(0, currentText.length - 1);
      } else {
        currentText = fullPrompt.substring(0, currentText.length + 1);
      }

      setPlaceholder(currentText + ' ');

      let nextTypingSpeed = typingSpeed;

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
  }, [placeholderPrompts]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data.prompt);
    form.reset();
  }

  const watchedPrompt = form.watch('prompt');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [watchedPrompt]);

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
                    ref={textareaRef}
                    aria-label={t('promptForm.placeholder')}
                    placeholder={!watchedPrompt ? placeholder : t('promptForm.placeholder')}
                    className="resize-none pr-14 text-base rounded-full bg-card border-2 border-primary/10 focus-visible:border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 overflow-y-hidden max-h-48 py-3.5"
                    rows={1}
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
              className="absolute right-1.5 bottom-1.5 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
              disabled={disabled || !watchedPrompt}
              aria-label={t('promptForm.send')}
          >
              {disabled ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
              <span className="sr-only">{t('promptForm.send')}</span>
          </Button>
      </form>
      </Form>
       <p className="text-center text-xs text-muted-foreground/50 pt-3">
          {t('promptForm.disclaimer')}
      </p>
    </div>
  );
}
