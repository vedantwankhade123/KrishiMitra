'use client';

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export function NewChatButton() {
    const { t } = useTranslation();
    const handleNewChat = () => {
        window.location.reload();
    }
    return (
        <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground h-9 rounded-full px-4"
            onClick={handleNewChat}
        >
            <Plus className="h-5 w-5 mr-2" />
            {t('header.newChat')}
        </Button>
    )
}
