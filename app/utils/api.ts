import { Configuration, OpenAIApi } from 'openai';

export class SunoAPI {
    static async generatePromptWithGPT(keywords: string): Promise<Response> {
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ keywords })
            });

            if (!response.ok) {
                throw new Error('Failed to generate prompt');
            }

            return response;
        } catch (error) {
            console.error('GPT prompt generation failed:', error);
            throw error;
        }
    }
} 