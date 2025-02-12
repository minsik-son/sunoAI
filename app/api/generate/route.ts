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

            // 1. 먼저 가사 생성
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

            // 2. 생성된 가사에서 언어 확인
            const lyrics = lyricsCompletion.choices[0].message.content;
            const languageMatch = lyrics.match(/\[Language:\s*([^\]]+)\]/);
            const language = languageMatch ? languageMatch[1].trim() : 'English';

            // 3. 언어별 제목 생성 예시 준비
            const titleExamples: { [key: string]: string } = {
                'Korean': '(e.g., "별빛 아래 우리의 약속", "마지막 춤", "사랑의 노래")',
                'English': '(e.g., "Moonlit Promises", "Dancing in Starlight", "Eternal Love")',
                'Japanese': '(e.g., "月明かりの約束", "最後のダンス", "永遠の愛")',
                'Chinese': '(e.g., "月光下的约定", "最后的舞蹈", "永恒的爱")',
                'Spanish': '(e.g., "Promesas Bajo la Luna", "Último Baile", "Amor Eterno")',
                'French': '(e.g., "Promesses au Clair de Lune", "Dernière Danse", "Amour Éternel")',
                // ... 다른 언어들에 대한 예시도 추가 가능
            };

            // 4. 가사 내용을 기반으로 제목 생성
            const titleContext = lyrics.split('\n').slice(0, 10).join('\n'); // 첫 10줄만 사용

            const titleCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: `Create a ${language} title ${titleExamples[language] || ''} based on these lyrics.`
                }, {
                    role: "user",
                    content: titleContext // 전체 가사 대신 일부만 전달
                }],
                max_tokens: 50,
                temperature: 0.8
            });

            return NextResponse.json({ 
                variations: [{
                    title: titleCompletion.choices[0].message.content,
                    prompt: lyrics
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