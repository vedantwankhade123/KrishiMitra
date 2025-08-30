

'use client';

import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarInset, SidebarSeparator } from '@/components/ui/sidebar';
import { NewChatButton } from '@/components/NewChatButton';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ChatHistory } from '@/components/ChatHistory';
import { ChatHistoryProvider } from '@/context/ChatHistoryContext';
import { Logo } from '@/components/Logo';
import { RightSidebar } from '@/components/RightSidebar';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatHistoryProvider>
        <SidebarProvider defaultOpen={true} variant="sidebar">
          <Sidebar>
            <SidebarContent>
              <SidebarHeader>
                <div className="flex items-center justify-between w-full">
                  <Logo />
                  <SidebarTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SidebarTrigger>
                </div>
              </SidebarHeader>
              <ChatHistory />
              <SidebarSeparator />
              <NewChatButton />
            </SidebarContent>
          </Sidebar>
          <SidebarInset className='flex overflow-hidden'>
            {children}
            <RightSidebar />
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
    </ChatHistoryProvider>
  );
}
