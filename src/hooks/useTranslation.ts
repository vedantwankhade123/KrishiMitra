
'use client';

import { useLanguage } from '@/context/LanguageContext';
import { dictionary } from '@/lib/dictionaries';

type Dictionary = typeof dictionary;
type Language = keyof Dictionary;

// This is a simplified i18n implementation.
// In a real app, you'd use a library like 'i18next' or 'react-intl'.

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}


export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: string, options?: { returnObjects?: boolean, [key: string]: any }): any => {
    const langDict = dictionary[language];
    let translation = getNestedValue(langDict, key);

    if (typeof translation === 'undefined') {
      console.warn(`Translation not found for key: "${key}" in language "${language}"`);
      // Fallback to English
      translation = getNestedValue(dictionary.en, key);
    }
    
    if (typeof translation === 'string' && options) {
      // Simple interpolation
      Object.keys(options).forEach(optionKey => {
        if (optionKey !== 'returnObjects') {
          translation = translation.replace(`{{${optionKey}}}`, options[optionKey]);
        }
      });
    }

    if (options?.returnObjects) {
      return translation;
    }
    
    return translation;
  };

  return { t, language };
}
