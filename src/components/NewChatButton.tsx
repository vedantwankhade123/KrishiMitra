'use client';

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useSidebar } from "./ui/sidebar";

export function NewChatButton() {
    const { t } = useTranslation();
    const { setOpenMobile } = useSidebar();
    const handleNewChat = () => {
        window.location.reload();
        setOpenMobile(false);
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
