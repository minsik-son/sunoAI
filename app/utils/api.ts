import OpenAI, { OpenAIApi } from 'openai';

const openai = new OpenAIApi({
    apiKey: process.env.NEXT_PUBLIC_SUNO_API_KEY
});

export class SunoAPI {
    static async generatePromptWithGPT(keywords: string): Promise<Response> {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: keywords }],
        });
        return response.data;
    }
} 