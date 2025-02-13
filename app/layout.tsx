import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Prompt Ai Pro',
    description: 'Prompt Ai Pro',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="g0sbygc">
            <head>
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-AD-CLIENT-ID"
                    crossOrigin="anonymous"
                />
            </head>
            <body className={inter.className} data-oid="tkxr-cz">
                {children}
            </body>
        </html>
    );
}
