import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react";
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Prompt Ai Pro - Best AI Prompt Generator',
    description: 'Create professional AI-generated music and lyrics with Prompt AI Pro. Our advanced AI technology helps you generate high-quality song prompts and creative lyrics in multiple languages.',
    keywords: 'AI Music Generator, Lyrics Generator, Music Prompts, AI Songwriting, Creative Writing AI',
    openGraph: {
        url: 'https://www.promptaipro.com',
        type: 'website',
        images: [
            {
                url: 'https://www.promptaipro.com/images/2d-logo--side-view-of-the-brain.png',
                width: 1200,
                height: 630,
                alt: 'Prompt AI Pro - AI Music & Lyrics Generator'
            }
        ],
    }
};

/*
export const metadata: Metadata = {
    title: 'Prompt Ai Pro - Best AI Prompt Generator',
    description: 'Create AI prompts effortlessly with Prompt Ai Pro. Generate high-quality prompts for ai music, lyrics ai',
    keywords: 'AI Prompt Generator, ChatGPT prompts, AI writing assistant, best AI prompts',
    openGraph: {
        title: 'Prompt Ai Pro - Best AI Prompt Generator',
        description: 'Create AI prompts effortlessly with Prompt Ai Pro.',
        url: 'https://www.promptaipro.com', // 실제 도메인으로 변경
        type: 'website',
        images: [
            {
                url: 'https://www.promptaipro.com/images/2d-logo--side-view-of-the-brain.png', // 로고 이미지 URL
                width: 1200,
                height: 630,
                alt: 'Prompt Ai Pro Thumbnail'
            }
        ],
    }
};
*/
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                {/* Google AdSense 최적화: defer 사용 */}
                <Script 
                    strategy="lazyOnload"
                    async 
                    defer
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9921649727270589"
                    crossOrigin="anonymous"
                />
                
                {/* Canonical URL 추가 */}
                <link rel="canonical" href="https://suno-ai-lac.vercel.app" />

                {/* 검색 엔진 크롤링 허용 */}
                <meta name="robots" content="index, follow" />
                
                {/* 로고 설정 */}
                <link rel="icon" href="/images/2d-logo--side-view-of-the-brain.png" />
            </head>
            <body className={inter.className}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
