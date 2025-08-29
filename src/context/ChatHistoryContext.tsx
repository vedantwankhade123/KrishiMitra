
'use client';

import type { ChatSession, ChatMessage } from '@/lib/types';
import { createContext, useContext, useState, type ReactNode, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ChatHistoryContextType = {
  chatHistory: ChatSession[];
  activeChat: ChatSession | null;
  setActiveChatId: (id: string | null) => void;
  createNewChat: () => void;
  deleteChat: (id: string) => void;
  clearAllChats: () => void;
  updateActiveChat: (updater: (chat: ChatSession) => ChatSession) => void;
};

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

const LS_KEY = 'agriassist_chat_history';

export function ChatHistoryProvider({ children }: { children: ReactNode }) {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(LS_KEY);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory) as ChatSession[];
        setChatHistory(parsedHistory);
        if (parsedHistory.length > 0 && !activeChatId) {
          setActiveChatId(parsedHistory[0].id);
        }
      } else {
         const newChat = createNewChat(false);
         setActiveChatId(newChat.id);
         setChatHistory([newChat]);
      }
    } catch (error) {
      console.error("Failed to load chat history from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (chatHistory.length > 0) {
        localStorage.setItem(LS_KEY, JSON.stringify(chatHistory));
      } else {
        localStorage.removeItem(LS_KEY);
      }
    } catch (error) {
      console.error("Failed to save chat history to localStorage", error);
    }
  }, [chatHistory]);

  const createNewChat = useCallback((setAsActive = true): ChatSession => {
    const newChat: ChatSession = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
    };
    setChatHistory(prev => [newChat, ...prev]);
    if(setAsActive) {
      setActiveChatId(newChat.id);
    }
    return newChat;
  }, []);
  

  const deleteChat = (id: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(chatHistory.length > 1 ? chatHistory.find(c => c.id !== id)!.id : null);
       if (chatHistory.length <= 1) {
          const newChat = createNewChat();
          setActiveChatId(newChat.id);
       }
    }
  };

  const clearAllChats = () => {
    setChatHistory([]);
    setActiveChatId(null);
    const newChat = createNewChat();
    setActiveChatId(newChat.id);
  };
  
  const updateActiveChat = (updater: (chat: ChatSession) => ChatSession) => {
    setChatHistory(prevHistory => {
        return prevHistory.map(chat => {
            if (chat.id === activeChatId) {
                return updater(chat);
            }
            return chat;
        });
    });
  };

  const activeChat = chatHistory.find(chat => chat.id === activeChatId) || null;

  return (
    <ChatHistoryContext.Provider value={{ chatHistory, activeChat, setActiveChatId, createNewChat, deleteChat, clearAllChats, updateActiveChat }}>
      {children}
    </ChatHistoryContext.Provider>
  );
}

export function useChatHistory() {
  const context = useContext(ChatHistoryContext);
  if (context === undefined) {
    throw new Error('useChatHistory must be used within a ChatHistoryProvider');
  }
  return context;
}
