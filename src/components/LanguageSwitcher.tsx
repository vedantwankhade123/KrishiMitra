
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
      <SelectTrigger asChild>
        <Button variant="ghost" className="h-9 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary px-4">
            <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>{languages[language]}</span>
            </div>
        </Button>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिन्दी</SelectItem>
        <SelectItem value="mr">मराठी</SelectItem>
      </SelectContent>
    </Select>
  );
}
