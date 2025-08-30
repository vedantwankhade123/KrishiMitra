
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
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

function ChatPageHeader() {
    const { open, isMobile } = useSidebar();
    
    // Show header when sidebar is closed on mobile, or always hidden on desktop (since sidebar is always open)
    const shouldShowHeader = isMobile && !open;
    
    return (
        <div className={`flex items-center gap-2 h-16 absolute top-2 sm:top-4 left-2 sm:left-4 z-10 ${shouldShowHeader ? 'block' : 'hidden'}`}>
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
        </div>
    )
}


function CustomSidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Always open on desktop, toggleable on mobile
  useEffect(() => {
    if (isMobile !== undefined) {
      if (!isMobile) {
        setIsOpen(true);
      } else if (!isInitialized) {
        setIsOpen(false);
      }
      setIsInitialized(true);
    }
  }, [isMobile, isInitialized]);

  return (
    <SidebarProvider 
      open={isOpen} 
      onOpenChange={(open) => {
        // Only allow toggling on mobile
        if (isMobile) {
          setIsOpen(open);
        }
      }}
      variant="sidebar"
    >
      {children}
    </SidebarProvider>
  );
}

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatHistoryProvider>
      <CustomSidebarProvider>
        <Sidebar className="border-r-0 md:border-r">
          <SidebarContent className="p-2 sm:p-4">
            <SidebarHeader>
              <div className="flex items-center justify-between w-full">
                <Logo className="text-sm sm:text-base" />
                <SidebarTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 hover:scale-110 md:hidden"
                  >
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Toggle menu</span>
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
      </CustomSidebarProvider>
    </ChatHistoryProvider>
  );
}
