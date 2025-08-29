
'use client';

import { MessageSquare, Trash2, Pencil, Check, X } from 'lucide-react';
import { Button } from './ui/button';
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

export function ChatHistory() {
    const { chatHistory, activeChat, setActiveChatId, deleteChat, clearAllChats, startRenaming, cancelRenaming, confirmRename } = useChatHistory();
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
        <div className='flex items-center justify-between px-4 py-1'>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            Recent
            </p>
        </div>
        <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
            {chatHistory.length > 0 ? (
                chatHistory.map((chat) => (
                <div
                    key={chat.id}
                    className={cn(
                        "group flex items-center justify-between rounded-full h-9 px-4 text-sm text-muted-foreground",
                        !chat.isRenaming && "hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer",
                        activeChat?.id === chat.id && !chat.isRenaming && "bg-primary/10 text-primary"
                    )}
                    onClick={() => !chat.isRenaming && setActiveChatId(chat.id)}
                >
                    {chat.isRenaming ? (
                        <>
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
                           />
                            <div className='flex items-center'>
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => handleRenameConfirm(chat.id)}>
                                    <Check className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => handleRenameCancel(chat.id)}>
                                    <X className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center truncate">
                                <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="truncate">{chat.title}</span>
                            </div>
                            <div className='flex items-center'>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                    onClick={(e) => { e.stopPropagation(); handleRenameStart(chat); }}
                                >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Rename chat</span>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                ))
            ) : (
                <div className='text-center text-sm text-muted-foreground p-4'>
                    No chat history.
                </div>
            )}
        </div>
        </ScrollArea>
    </div>
  );
}
