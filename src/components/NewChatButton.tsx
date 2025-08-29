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
        <div className="px-2">
            <Button 
                variant="ghost" 
                className="w-full justify-start h-9 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary px-4"
                onClick={handleNewChat}
            >
                <Plus className="h-5 w-5 mr-2" />
                {t('header.newChat')}
            </Button>
        </div>
    )
}
