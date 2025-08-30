
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
        <div className="flex items-center gap-2 h-16 absolute top-4 left-4">
             {!open && (
            <>
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
              <Logo />
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
