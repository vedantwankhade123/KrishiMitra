import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
      </head>
      <body className={cn('font-sans antialiased', inter.variable, 'min-h-screen bg-background font-sans')} suppressHydrationWarning={true}>
        <LanguageProvider>
          <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent -z-10" />
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
