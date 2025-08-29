
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
    const { 
        chatHistory, 
        activeChat, 
        setActiveChatId, 
        deleteChat, 
        startRenaming, 
        cancelRenaming, 
        confirmRename,
        isDeleteMode,
        toggleDeleteMode
    } = useChatHistory();

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
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "h-7 w-7 rounded-full text-muted-foreground hover:text-primary",
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
                {chatHistory.length > 0 ? (
                    chatHistory.map((chat) => (
                    <div
                        key={chat.id}
                        className={cn(
                            "group flex items-center justify-between rounded-full h-9 text-sm text-muted-foreground relative overflow-hidden",
                            !chat.isRenaming && "hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer",
                            activeChat?.id === chat.id && !chat.isRenaming && "bg-primary/10 text-primary"
                        )}
                        onClick={() => !chat.isRenaming && !isDeleteMode && setActiveChatId(chat.id)}
                    >
                        <div className={cn(
                            "flex items-center truncate transition-transform duration-300 ease-in-out w-full px-4",
                            isDeleteMode && "-translate-x-10"
                        )}>
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
                                    <div className="flex items-center truncate flex-1">
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

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                        "absolute right-0 h-9 w-9 rounded-full text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-transform duration-300 ease-in-out",
                                        isDeleteMode ? "translate-x-0" : "translate-x-full"
                                    )}
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteChat(chat.id);
                                    }}
                                >
                                    Delete
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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
