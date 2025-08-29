
'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

export function Welcome() {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const [animationKey, setAnimationKey] = useState(0);
    
    const textOptions = [t('welcome.title'), t('welcome.title2'), t('welcome.title3')];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % textOptions.length);
            setAnimationKey(prevKey => prevKey + 1); // Reset animation
        }, 4000); // Change text every 4 seconds (2s visible, 2s for fade out/in)

        return () => clearInterval(interval);
    }, [textOptions.length]);

    return (
        <div className="text-center pt-16 animate-fade-in-up">
            <h1 key={animationKey} className="text-3xl font-bold tracking-tighter mb-2 min-h-[40px] animate-fade-in-out">
                {textOptions[index]}
            </h1>
            <p className="text-muted-foreground mb-10">{t('welcome.subtitle')}</p>
        </div>
    );
}
