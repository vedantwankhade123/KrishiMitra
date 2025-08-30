
'use client';

import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarInset, SidebarSeparator, useSidebar } from '@/components/ui/sidebar';
import { NewChatButton } from '@/components/NewChatButton';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ChatHistory } from '@/components/ChatHistory';
import { ChatHistoryProvider } from '@/context/ChatHistoryContext';
import { Logo } from '@/components/Logo';
import { Header } from '@/components/Header';

function ChatPageHeader() {
    const { open } = useSidebar();
    return (
        <div className="flex items-center gap-2 h-16 absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
             {!open && (
            <>
              <SidebarTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SidebarTrigger>
              <Logo className="hidden sm:block" />
            </>
          )}
        </div>
    )
}


export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatHistoryProvider>
        <SidebarProvider defaultOpen={false} variant="sidebar">
          <Sidebar className="border-r-0 sm:border-r">
            <SidebarContent className="p-2 sm:p-4">
              <SidebarHeader>
                <div className="flex items-center justify-between w-full">
                  <Logo className="text-sm sm:text-base" />
                  <SidebarTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                    >
                      <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
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
          <SidebarInset className='flex flex-col overflow-hidden'>
             <ChatPageHeader />
             <Header />
            {children}
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
    </ChatHistoryProvider>
  );
}
