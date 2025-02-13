import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_SUNO_API_KEY
});

export class SunoAPI {
    static async generatePromptWithGPT(keywords: string): Promise<any> {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: keywords }],
        });
        return response.choices[0].message.content;
    }
} 