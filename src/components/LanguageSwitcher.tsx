
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
import { Button } from "./ui/button";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const languages: Record<string, string> = {
    en: 'EN',
    hi: 'HI',
    mr: 'MR',
  };

  const handleValueChange = (newLanguage: 'en' | 'hi' | 'mr') => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
    }
  };

  return (
    <Select defaultValue={language} onValueChange={handleValueChange}>
      <SelectTrigger className="w-auto border-none bg-transparent focus:ring-0 focus:ring-offset-0 gap-2 px-3 h-auto">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिन्दी</SelectItem>
        <SelectItem value="mr">मराठी</SelectItem>
      </SelectContent>
    </Select>
  );
}
