// This component is not used in the current layout.
// You can remove this file if it's no longer needed.
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
            className="w-full justify-start"
            onClick={handleNewChat}
        >
            <Plus className="h-5 w-5 mr-2" />
            {t('header.newChat')}
        </Button>
    )
}
