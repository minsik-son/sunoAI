import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_SUNO_API_KEY
});

export async function POST(request: Request) {
    try {
        const { keywords } = await request.json();

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a music prompt generator. Generate 5 different variations of titles and prompts. Each prompt should be natural and flowing, within 200 characters, with different styles and approaches. The titles should be short and catchy. Return in format:\n\nVARIATION 1\nTITLE: <title1>\nPROMPT: <prompt1>\n\nVARIATION 2\nTITLE: <title2>\nPROMPT: <prompt2>\n\n... and so on."
            }, {
                role: "user",
                content: `Create 5 different title and prompt variations using these elements: ${keywords}`
            }],
            max_tokens: 500,
            temperature: 0.8
        });

        const response = completion.choices[0].message.content || keywords;
        const variations = response.split('VARIATION').slice(1).map(variation => {
            const [title, prompt] = variation.split('PROMPT:').map(str => str.trim());
            return {
                title: title.replace(/^\d+\s*TITLE:\s*/, '').trim(),
                prompt: prompt.split('\n\n')[0].trim()
            };
        });
        
        return NextResponse.json({ variations });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ 
            variations: [{
                title: 'Generated Song',
                prompt: keywords
            }]
        }, { status: 500 });
    }
} 