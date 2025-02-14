import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
    try {
        const { keywords, type } = await req.json();

        if (type === 'lyrics') {
            // Lyrics Generator 처리
            const systemPrompt = `You are a professional lyrics generator. Create lyrics based on the given parameters.
            
            Rules:
            1. Follow the exact structure provided in the input.
            2. Match the specified language and theme.
            3. Maintain consistent style and tone.
            4. If no structure is provided, use this default structure:
               - [Verse 1]
               - [Chorus]
               - [Verse 2]
               - [Chorus]
               - [Bridge]
               - [Chorus]
            5. Consider the specified rhyme pattern and metaphor level.
            6. Use rich meta tags to enhance the lyrics, such as:
               - [Genre: Pop]
               - [Mood: Uplifting]
               - [Theme: Love]
               - [Language: English]
            7. Format the output as:
               TITLE: [Creative song title]
               
               [Section name]
               lyrics here...
               
               [Next section]
               lyrics here...
               
            Important: Generate the lyrics even if some parameters are missing. Use default values when needed.`;

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: `Generate lyrics with these parameters: ${keywords}
                        If structure is not specified, use the default structure.
                        If language is not specified, use English.
                        If theme is not specified, create a general theme.`
                    }
                ],
                temperature: 0.8,
                max_tokens: 2000
            });

            const content = response.choices[0].message.content || '';
            const [title, ...lyrics] = content.split('\n\n');
            
            return NextResponse.json({
                variations: [{
                    title: title.replace('TITLE:', '').trim(),
                    prompt: lyrics.join('\n\n')
                }]
            });

        } else {
            // Song Generator 처리
            const systemPrompt = `You are a music prompt generator. Create 5 different variations of music prompts based on the given description and elements. Each variation should include a creative title and a detailed prompt.

            Format your response exactly as:
            1 TITLE: [creative title]
            PROMPT: [detailed music prompt incorporating the given elements]

            2 TITLE: [creative title]
            PROMPT: [detailed music prompt incorporating the given elements]

            (continue for all 5 variations)

            Make each prompt unique and incorporate the given elements in different creative ways.
            IMPORTANT: Each prompt must be under 200 characters total.`;

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: `Create 5 music prompts using these elements: ${keywords}`
                    }
                ],
                temperature: 0.8,
                max_tokens: 1000
            });

            const content = response.choices[0].message.content || '';
            const variations = content.split(/\d+\s+TITLE:/)
                .filter(Boolean)
                .map(variation => {
                    const [title, ...promptParts] = variation.split('PROMPT:');
                    return {
                        title: title.trim(),
                        prompt: promptParts.join('PROMPT:').trim()
                    };
                })
                .slice(0, 5);

            return NextResponse.json({ variations });
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate response' },
            { status: 500 }
        );
    }
} 