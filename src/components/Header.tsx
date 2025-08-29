'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

export function Header() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Button variant="ghost" size="icon" aria-label="Menu">
             <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center space-x-2">
           <h1 className="font-semibold tracking-widest text-sm text-muted-foreground">{t('header.newChat')}</h1>
        </div>
         <div className="w-auto">
            <LanguageSwitcher />
         </div>
      </div>
    </header>
  );
}
