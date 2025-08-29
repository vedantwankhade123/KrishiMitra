
'use client';

import { MessageSquare, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

// Placeholder data for chat history
const chatHistory = [
  { id: 1, title: 'Best crops for sandy soil' },
  { id: 2, title: 'Drought-resistant options' },
  { id: 3, title: 'How to improve nitrogen' },
  { id: 4, title: 'What to plant after corn' },
  { id: 5, title: 'Profitable crops for cool climate' },
];

export function ChatHistory() {
  return (
    <ScrollArea className="flex-1 px-2">
      <div className="space-y-1">
        <p className="px-4 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          Recent
        </p>
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className="group flex items-center justify-between rounded-full h-9 px-4 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <div className="flex items-center truncate">
              <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{chat.title}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => alert(`Delete chat ${chat.id}`)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete chat</span>
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
