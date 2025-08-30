
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Inter, Poppins } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const poppins = Poppins({ subsets: ['latin'], weight: '700', variable: '--font-logo' });

export const metadata: Metadata = {
  title: 'KrishiMitra',
  description: 'AI-Based Crop Recommendation for Farmers',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
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
      <body className={cn('font-sans antialiased', inter.variable, poppins.variable, 'min-h-screen font-sans touch-manipulation')} suppressHydrationWarning={true}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
