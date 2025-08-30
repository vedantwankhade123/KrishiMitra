
'use client';

import { Header } from "@/components/Header";

export default function WeatherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen mobile-safe-area">
            <Header />
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
