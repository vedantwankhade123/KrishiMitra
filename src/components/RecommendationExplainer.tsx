'use client';

import type { OptimalCropsInput } from '@/ai/schemas';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { getExplanation } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

type RecommendationExplainerProps = {
  cropName: string;
  formInputs: OptimalCropsInput | null;
  children: ReactNode;
};

export function RecommendationExplainer({
  cropName,
  formInputs,
  children,
}: RecommendationExplainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const { t } = useTranslation();

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (open && !explanation && formInputs) {
      setLoading(true);
      setError(null);
      try {
        const result = await getExplanation({
          crop: cropName,
          ...formInputs,
          language,
        });
        setExplanation(result.explanation);
      } catch (e) {
        console.error(e);
        setError(t('errors.failedToLoadExplanation'));
        toast({
          title: t('errors.errorTitle'),
          description: t('errors.couldNotFetchExplanation'),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">{t('explainer.title', { cropName })}</DialogTitle>
          <DialogDescription>
            {t('explainer.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>{t('errors.errorTitle')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {explanation && <p className="text-muted-foreground leading-relaxed">{explanation}</p>}
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                {t('explainer.close')}
                </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
