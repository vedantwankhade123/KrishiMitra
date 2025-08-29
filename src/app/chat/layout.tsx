
'use client';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarInset, SidebarSeparator } from '@/components/ui/sidebar';
import { NewChatButton } from '@/components/NewChatButton';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ChatHistory } from '@/components/ChatHistory';
import { ChatHistoryProvider } from '@/context/ChatHistoryContext';
import { Logo } from '@/components/Logo';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatHistoryProvider>
       <AuroraBackground>
          <SidebarProvider defaultOpen={true} variant="inset">
            <Sidebar>
              <SidebarContent>
                <SidebarHeader>
                  <div className="flex items-center gap-2">
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
                  </div>
                </SidebarHeader>
                <NewChatButton />
                <SidebarSeparator />
                <ChatHistory />
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              {children}
            </SidebarInset>
            <Toaster />
          </SidebarProvider>
       </AuroraBackground>
    </ChatHistoryProvider>
  );
}
