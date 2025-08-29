
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarInset, SidebarSeparator } from '@/components/ui/sidebar';
import { NewChatButton } from '@/components/NewChatButton';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ChatHistory } from '@/components/ChatHistory';
import { ChatHistoryProvider } from '@/context/ChatHistoryContext';
import { Logo } from '@/components/Logo';


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });


export const metadata: Metadata = {
  title: 'AgriAssist AI',
  description: 'AI-Based Crop Recommendation for Farmers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={cn('font-sans antialiased', inter.variable, 'min-h-screen font-sans')} suppressHydrationWarning={true}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <LanguageProvider>
            <ChatHistoryProvider>
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
            </ChatHistoryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
