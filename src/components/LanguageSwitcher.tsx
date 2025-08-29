
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
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

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
      <SelectTrigger className={cn(
        buttonVariants({ variant: "ghost" }),
        "h-9 rounded-full text-foreground hover:bg-primary/10 hover:text-primary px-4 border-0"
      )}>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <SelectValue asChild>
            <span>{languages[language]}</span>
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिन्दी</SelectItem>
        <SelectItem value="mr">मराठी</SelectItem>
      </SelectContent>
    </Select>
  );
}
