'use client';

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function NewChatButton() {
    const { t } = useTranslation();
    const handleNewChat = () => {
        window.location.reload();
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-foreground h-9 w-9 rounded-full"
                        onClick={handleNewChat}
                    >
                        <Plus className="h-5 w-5" />
                        <span className="sr-only">{t('header.newChat')}</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                <p>{t('header.newChat')}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
