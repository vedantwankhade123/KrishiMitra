
'use client';

import { MessageSquare, Trash2, Pencil, Check, X, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useChatHistory } from '@/context/ChatHistoryContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function ChatHistory() {
    const { 
        filteredChatHistory, 
        activeChat, 
        setActiveChatId, 
        deleteChat, 
        startRenaming, 
        cancelRenaming, 
        confirmRename,
        isDeleteMode,
        toggleDeleteMode,
        searchTerm,
        setSearchTerm,
    } = useChatHistory();
    const { t } = useTranslation();

    const [editingTitle, setEditingTitle] = useState('');

    const handleRenameStart = (chat: {id: string, title: string}) => {
        startRenaming(chat.id);
        setEditingTitle(chat.title);
    };

    const handleRenameConfirm = (chatId: string) => {
        if (editingTitle.trim()) {
            confirmRename(chatId, editingTitle.trim());
        }
        setEditingTitle('');
    };

    const handleRenameCancel = (chatId: string) => {
        cancelRenaming(chatId);
        setEditingTitle('');
    };
    
  return (
    <div className='flex flex-col flex-1'>
        <div className='px-2 pb-2'>
            <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input
                    placeholder="Search chats..."
                    className="pl-9 h-9 rounded-full bg-primary/5 border-primary/10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className='flex items-center justify-between px-4 py-1'>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            Recent
            </p>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-7 w-7 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary",
                    isDeleteMode && "bg-primary/10 text-primary"
                )}
                onClick={toggleDeleteMode}
            >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Toggle delete mode</span>
            </Button>
        </div>
        <ScrollArea className="flex-1 px-2">
            <div className="space-y-1">
                {filteredChatHistory.length > 0 ? (
                    filteredChatHistory.map((chat) => (
                    <div
                        key={chat.id}
                        className={cn(
                            "group flex items-center justify-between rounded-full h-9 text-sm text-muted-foreground relative overflow-hidden",
                            !chat.isRenaming && "hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer",
                            activeChat?.id === chat.id && !chat.isRenaming && "bg-primary/10 text-primary"
                        )}
                        onClick={() => !chat.isRenaming && setActiveChatId(chat.id)}
                    >
                        <div className="flex items-center w-full pl-4 pr-2">
                            {chat.isRenaming ? (
                                <div className="flex-1 flex items-center">
                                    <input 
                                        type="text"
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleRenameConfirm(chat.id);
                                            if (e.key === 'Escape') handleRenameCancel(chat.id);
                                        }}
                                        className="bg-transparent border-b border-primary/50 focus:outline-none flex-1 text-sm h-7"
                                        autoFocus
                                        onFocus={(e) => e.target.select()}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <div className='flex items-center'>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={(e) => { e.stopPropagation(); handleRenameConfirm(chat.id); }}>
                                            <Check className="h-4 w-4 text-green-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={(e) => { e.stopPropagation(); handleRenameCancel(chat.id); }}>
                                            <X className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <div className="flex-1 flex items-center justify-between min-w-0">
                                        <span className="truncate">{chat.title}</span>
                                        <div className="flex items-center flex-shrink-0">
                                            <div className={cn("transition-transform duration-300 ease-in-out", isDeleteMode && "-translate-x-8")}>
                                                    <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary opacity-0 transition-opacity group-hover:opacity-100"
                                                    onClick={(e) => { e.stopPropagation(); handleRenameStart(chat); }}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Rename chat</span>
                                                </Button>
                                            </div>
                                            <div className={cn(
                                                "absolute right-2 transition-all duration-300 ease-in-out",
                                                isDeleteMode ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                            )}>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7 rounded-full text-red-500/80 hover:bg-red-500/10 hover:text-red-500"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">Delete chat</span>
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will permanently delete the chat "{chat.title}". This action cannot be undone.
                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className="bg-destructive hover:bg-destructive/90"
                                                            onClick={() => deleteChat(chat.id)}
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    ))
                ) : (
                    <div className='text-center text-sm text-muted-foreground p-4'>
                        {searchTerm ? t('header.noChatsFound') : t('header.noChats')}
                    </div>
                )}
            </div>
        </ScrollArea>
    </div>
  );
}
