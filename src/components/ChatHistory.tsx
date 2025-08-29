
'use client';

import { MessageSquare, Trash2, Pencil, Check, X, Search, MoreHorizontal, Edit, MinusCircle } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Checkbox } from './ui/checkbox';

export function ChatHistory() {
    const { 
        filteredChatHistory, 
        activeChat, 
        setActiveChatId, 
        deleteChat, 
        startRenaming, 
        cancelRenaming, 
        confirmRename,
        searchTerm,
        setSearchTerm,
        isDeleteMode,
        toggleDeleteMode,
        selectedChatIds,
        toggleChatSelection,
        deleteSelectedChats,
        setSelectedChatIds,
    } = useChatHistory();
    const { t } = useTranslation();

    const [editingTitle, setEditingTitle] = useState('');
    const [dialogOpen, setDialogOpen] = useState<string | false>(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

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
    
    const handleToggleDeleteMode = () => {
        toggleDeleteMode();
        setSelectedChatIds(new Set()); // Clear selections when toggling mode
    };

    const handleBulkDelete = () => {
        deleteSelectedChats();
        setBulkDeleteDialogOpen(false);
    }

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
             {isDeleteMode ? (
                <div className='flex items-center gap-2'>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 rounded-full text-xs hover:bg-muted"
                        onClick={handleToggleDeleteMode}
                    >
                        Cancel
                    </Button>
                     <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant="destructive" 
                                size="sm" 
                                className="h-7 rounded-full text-xs"
                                disabled={selectedChatIds.size === 0}
                            >
                                Delete ({selectedChatIds.size})
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete {selectedChatIds.size} selected chat(s). This action cannot be undone.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-destructive hover:bg-destructive/90"
                                onClick={handleBulkDelete}
                            >
                                Delete
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ) : (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-full hover:bg-muted"
                    onClick={handleToggleDeleteMode}
                    disabled={filteredChatHistory.length === 0}
                >
                    <Edit className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Edit chats</span>
                </Button>
            )}
        </div>
        <ScrollArea className="flex-1 px-2">
            <div className="space-y-1">
                {filteredChatHistory.length > 0 ? (
                    filteredChatHistory.map((chat) => (
                    <div
                        key={chat.id}
                        className={cn(
                            "group flex items-center justify-between rounded-full h-9 px-3 text-sm text-muted-foreground relative",
                            !chat.isRenaming && !isDeleteMode && "hover:bg-muted cursor-pointer",
                            activeChat?.id === chat.id && !chat.isRenaming && !isDeleteMode && "bg-muted text-foreground"
                        )}
                        onClick={() => !chat.isRenaming && !isDeleteMode && setActiveChatId(chat.id)}
                    >
                        <div className="flex items-center flex-1 min-w-0">
                            {isDeleteMode && (
                                <Checkbox
                                    variant="circular"
                                    checked={selectedChatIds.has(chat.id)}
                                    onCheckedChange={() => toggleChatSelection(chat.id)}
                                    className="mr-3"
                                    aria-label={`Select chat titled ${chat.title}`}
                                />
                            )}
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
                                <div className='flex-1 min-w-0'>
                                    <span className="truncate">{chat.title}</span>
                                </div>
                            )}
                        </div>
                        
                        {!chat.isRenaming && !isDeleteMode && (
                            <div className={cn(
                                "flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                                activeChat?.id === chat.id && "opacity-100"
                            )}>
                                <AlertDialog open={dialogOpen === chat.id} onOpenChange={(open) => !open && setDialogOpen(false)}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">More options</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                            <DropdownMenuItem onClick={() => handleRenameStart(chat)}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Rename
                                            </DropdownMenuItem>
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem 
                                                    className="text-red-500 focus:text-red-500"
                                                    onClick={(e) => { e.stopPropagation(); setDialogOpen(chat.id); }}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
                        )}
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
