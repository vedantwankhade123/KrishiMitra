
'use client';

import { MessageSquare, Trash2, ShieldX } from 'lucide-react';
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

export function ChatHistory() {
    const { chatHistory, activeChat, setActiveChatId, deleteChat, clearAllChats } = useChatHistory();

  return (
    <div className='flex flex-col flex-1'>
        <div className='flex items-center justify-between px-4 py-1'>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            Recent
            </p>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" disabled={chatHistory.length <= 1}>
                        Clear all
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your chat history.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearAllChats}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
            {chatHistory.length > 0 ? (
                chatHistory.map((chat) => (
                <div
                    key={chat.id}
                    className={cn(
                        "group flex items-center justify-between rounded-full h-9 px-4 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer",
                        activeChat?.id === chat.id && "bg-primary/10 text-primary"
                    )}
                    onClick={() => setActiveChatId(chat.id)}
                >
                    <div className="flex items-center truncate">
                    <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{chat.title}</span>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                disabled={chatHistory.length <= 1}
                                onClick={(e) => { e.stopPropagation(); }}
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete chat</span>
                            </Button>
                        </AlertDialogTrigger>
                         <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the chat "{chat.title}".
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteChat(chat.id)}>Delete</AlertDialogAction>
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
