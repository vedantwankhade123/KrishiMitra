
'use client';

import type { ChatSession, ChatMessage } from '@/lib/types';
import { createContext, useContext, useState, type ReactNode, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ChatHistoryContextType = {
  chatHistory: ChatSession[];
  filteredChatHistory: ChatSession[];
  activeChat: ChatSession | null;
  setActiveChatId: (id: string | null) => void;
  createNewChat: () => void;
  deleteChat: (id: string) => void;
  updateActiveChat: (updater: (chat: ChatSession) => ChatSession) => void;
  startRenaming: (id: string) => void;
  cancelRenaming: (id: string) => void;
  confirmRename: (id: string, newTitle: string) => void;
  isDeleteMode: boolean;
  toggleDeleteMode: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedChatIds: Set<string>;
  setSelectedChatIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  toggleChatSelection: (id: string) => void;
  deleteSelectedChats: () => void;
};

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

const LS_KEY = 'agriassist_chat_history';

export function ChatHistoryProvider({ children }: { children: ReactNode }) {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChatIds, setSelectedChatIds] = useState(new Set<string>());

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
    setChatHistory(prev => [newChat, ...prev].sort((a, b) => b.createdAt - a.createdAt));
    if(setAsActive) {
      setActiveChatId(newChat.id);
    }
    return newChat;
  }, []);
  

  const deleteChat = (id: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== id));
    if (activeChatId === id) {
      const remainingChats = chatHistory.filter(c => c.id !== id);
      if (remainingChats.length > 0) {
        const currentIndex = chatHistory.findIndex(c => c.id === id);
        const nextIndex = Math.max(0, currentIndex -1);
        setActiveChatId(chatHistory[nextIndex]?.id || remainingChats[0].id);

      } else {
        const newChat = createNewChat();
        setActiveChatId(newChat.id);
      }
    }
    if(chatHistory.length <= 1) {
        setIsDeleteMode(false);
    }
  };

  const deleteSelectedChats = () => {
    const idsToDelete = Array.from(selectedChatIds);
    setChatHistory(prev => prev.filter(chat => !idsToDelete.includes(chat.id)));

    if (idsToDelete.includes(activeChatId ?? '')) {
      const remainingChats = chatHistory.filter(c => !idsToDelete.includes(c.id));
      if (remainingChats.length > 0) {
        setActiveChatId(remainingChats[0].id);
      } else {
        const newChat = createNewChat();
        setActiveChatId(newChat.id);
      }
    }
    setSelectedChatIds(new Set());
    setIsDeleteMode(false);
  };
  
  const updateActiveChat = (updater: (chat: ChatSession) => ChatSession) => {
    setChatHistory(prevHistory => {
        const newHistory = prevHistory.map(chat => {
            if (chat.id === activeChatId) {
                return updater(chat);
            }
            return chat;
        });
        return newHistory.sort((a, b) => b.createdAt - a.createdAt);
    });
  };

  const startRenaming = (id: string) => {
    setChatHistory(prev => prev.map(chat => chat.id === id ? { ...chat, isRenaming: true } : { ...chat, isRenaming: false }));
  };

  const cancelRenaming = (id: string) => {
    setChatHistory(prev => prev.map(chat => chat.id === id ? { ...chat, isRenaming: false } : chat));
  }

  const confirmRename = (id: string, newTitle: string) => {
    setChatHistory(prev => prev.map(chat => chat.id === id ? { ...chat, title: newTitle, isRenaming: false } : chat));
  }
  
  const toggleDeleteMode = () => {
      if (chatHistory.length > 0) {
        setIsDeleteMode(prev => !prev);
      }
  }

  const toggleChatSelection = (id: string) => {
    setSelectedChatIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    });
  };


  const activeChat = chatHistory.find(chat => chat.id === activeChatId) || null;

  const filteredChatHistory = useMemo(() => {
    const sortedHistory = [...chatHistory].sort((a,b) => b.createdAt - a.createdAt);
    if (!searchTerm) {
        return sortedHistory;
    }
    return sortedHistory.filter(chat => 
        chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.messages.some(msg => msg.text?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [chatHistory, searchTerm]);


  return (
    <ChatHistoryContext.Provider value={{ 
        chatHistory, 
        filteredChatHistory,
        activeChat, 
        setActiveChatId, 
        createNewChat, 
        deleteChat, 
        updateActiveChat, 
        startRenaming, 
        cancelRenaming, 
        confirmRename,
        isDeleteMode,
        toggleDeleteMode,
        searchTerm,
        setSearchTerm,
        selectedChatIds,
        setSelectedChatIds,
        toggleChatSelection,
        deleteSelectedChats,
    }}>
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
