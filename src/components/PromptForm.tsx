'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowUp, Mic, Square, BrainCircuit, Paperclip, X } from 'lucide-react';
import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useRecorder } from '@/hooks/use-recorder';
import { getTranscription } from '@/app/actions';
import { useLanguage } from '@/context/LanguageContext';
import type { Attachment } from '@/lib/types';

const formSchema = z.object({
  prompt: z.string(),
});

type PromptFormProps = {
  onSubmit: (prompt: string, attachment?: Attachment | null) => void;
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();
  const { language } = useLanguage();
  const placeholderPrompts = t('promptForm.placeholders', { returnObjects: true }) as string[];

  const [placeholder, setPlaceholder] = useState(t('promptForm.placeholder'));
  const { isRecording, startRecording, stopRecording, audioData } = useRecorder();
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | null>(null);

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

  useEffect(() => {
    const transcribe = async () => {
      if (audioData) {
        setIsTranscribing(true);
        try {
          const result = await getTranscription({ audioDataUri: audioData, language });
          if(result.transcription) {
            form.setValue('prompt', form.getValues('prompt') + result.transcription);
          }
        } catch (error) {
          console.error("Transcription failed", error);
        } finally {
          setIsTranscribing(false);
        }
      }
    };
    transcribe();
  }, [audioData, form, language]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAttachment({
          url: e.target?.result as string,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    if (!data.prompt && !attachment) {
        form.setError("prompt", { message: "Prompt or attachment is required." });
        return;
    }
    onSubmit(data.prompt, attachment);
    form.reset();
    setAttachment(null);
  }

  const watchedPrompt = form.watch('prompt');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200; // Corresponds to max-h-48 (12rem) roughly
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [watchedPrompt]);
  
  const isMicDisabled = disabled || isTranscribing;
  const isSubmitDisabled = disabled || (!watchedPrompt && !attachment);

  return (
    <div className="px-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="relative">
          {attachment && (
            <div className="relative mb-2 w-fit">
              <Image
                src={attachment.url}
                alt="Attachment preview"
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => setAttachment(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
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
                    className="resize-none pr-32 text-base rounded-full bg-card border-2 border-primary/10 focus-visible:border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 overflow-y-auto max-h-48 py-3.5 pl-5"
                    rows={1}
                    {...field}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (!isSubmitDisabled) {
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
          <div className="absolute right-1.5 bottom-1.5 flex items-center gap-1.5">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
            <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
                disabled={disabled}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach file"
            >
                <Paperclip className="h-5 w-5" />
            </Button>
            <Button 
                type="button" 
                size="icon" 
                variant="ghost"
                className="h-10 w-10 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
                disabled={isMicDisabled}
                onClick={isRecording ? stopRecording : startRecording}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
                {isRecording ? (
                  <Square className="h-5 w-5 text-red-500 fill-red-500" />
                ) : isTranscribing ? (
                  <BrainCircuit className="h-5 w-5 animate-pulse" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
                <span className="sr-only">{isRecording ? "Stop recording" : "Start recording"}</span>
            </Button>

            <Button 
                type="submit" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                disabled={isSubmitDisabled}
                aria-label={t('promptForm.send')}
            >
                {disabled ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
                <span className="sr-only">{t('promptForm.send')}</span>
            </Button>
          </div>
      </form>
      </Form>
       <p className="text-center text-xs text-muted-foreground/50 pt-3">
          {t('promptForm.disclaimer')}
      </p>
    </div>
  );
}
