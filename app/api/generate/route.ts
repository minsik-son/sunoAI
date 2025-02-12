import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_SUNO_API_KEY
});

export async function POST(request: Request) {
    try {
        const { keywords } = await request.json();
        const isLyrics = keywords.includes('[Language:') || keywords.includes('[Theme:');

        if (isLyrics) {
            const sunoGuide = `Reference Guide for Suno Prompt Generation:
            1. Meta tags should be formatted as [Tag: Value]
            2. Song structure should be clearly marked with section tags
            3. Each section should have its own dynamic and emotional markers
            4. Example format:
               [Genre: Pop]
               [Mood: Uplifting]
               
               [Verse]
               [Dynamic: Soft]
               lyrics here...
               
               [Chorus]
               [Dynamic: Building]
               lyrics here...`;

            // 가사 생성
            const lyricsCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: `You are a professional lyrics generator. Here is the reference guide for formatting:
                    ${sunoGuide}
                    
                    Additional rules:
                    1. Start with ONLY ONE set of meta tags
                    2. Never repeat input tags
                    3. Follow the exact formatting from the guide
                    4. Add appropriate dynamics and emotion markers`
                }, {
                    role: "user",
                    content: `Create lyrics using these elements: ${keywords}`
                }],
                max_tokens: 1000,
                temperature: 0.8
            });

            // 가사 내용을 기반으로 제목 생성
            const titleCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: `You are a creative song title generator. Create a single poetic title that captures the essence of the lyrics:
                    1. For Korean lyrics, create a Korean title (e.g., "별빛 아래 우리의 약속", "마지막 춤")
                    2. For English lyrics, create an English title (e.g., "Moonlit Promises", "Dancing in Starlight")
                    3. Make it short, memorable, and related to the lyrics' theme
                    4. Return ONLY the title, no additional text or formatting`
                }, {
                    role: "user",
                    content: `Create a title for these lyrics: ${lyricsCompletion.choices[0].message.content}`
                }],
                max_tokens: 50,
                temperature: 0.8
            });

            return NextResponse.json({ 
                variations: [{
                    title: titleCompletion.choices[0].message.content,
                    prompt: lyricsCompletion.choices[0].message.content
                }]
            });
        } else {
            // 기존 음악 프롬프트 생성 로직 유지
            const variations = keywords.split('VARIATION').slice(1).map(variation => {
                const [title, prompt] = variation.split('PROMPT:').map(str => str.trim());
                return {
                    title: title.replace(/^\d+\s*TITLE:\s*/, '').trim(),
                    prompt: prompt.split('\n\n')[0].trim()
                };
            });
            
            return NextResponse.json({ variations });
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ 
            variations: [{
                title: 'Generated Content',
                prompt: keywords
            }]
        }, { status: 500 });
    }
} 