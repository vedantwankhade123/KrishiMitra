
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const languages: Record<string, string> = {
    en: 'English',
    hi: 'हिन्दी',
    mr: 'मराठी',
  };

  const handleValueChange = (newLanguage: 'en' | 'hi' | 'mr') => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
    }
  };

  return (
    <Select value={language} onValueChange={handleValueChange}>
      <SelectTrigger className="w-auto gap-2 border-none bg-transparent text-muted-foreground hover:text-foreground focus:ring-0">
        <Globe className="h-4 w-4" />
        <SelectValue>{languages[language]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिन्दी</SelectItem>
        <SelectItem value="mr">मराठी</SelectItem>
      </SelectContent>
    </Select>
  );
}
