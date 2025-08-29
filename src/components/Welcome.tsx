'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { TypingIndicator } from './TypingIndicator';
import { cn } from '@/lib/utils';

export function Welcome() {
    const { t } = useTranslation();
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const textOptions = [t('welcome.title'), t('welcome.title2'), t('welcome.title3')];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % textOptions.length;
            const fullText = textOptions[i];

            setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

            setTypingSpeed(isDeleting ? 80 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, textOptions, typingSpeed]);

    return (
        <div className="text-center pt-16 animate-fade-in-up">
            <h1 className="text-3xl font-bold tracking-tighter mb-2 min-h-[40px]">
                {text}
                <TypingIndicator />
            </h1>
            <p className="text-muted-foreground mb-10">{t('welcome.subtitle')}</p>
        </div>
    );
}
