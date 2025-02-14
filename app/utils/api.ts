import axios from 'axios';

export class SunoAPI {
    static async generatePromptWithGPT(keywords: string, type: 'song' | 'lyrics') {
        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ keywords, type }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate prompt');
            }

            return response.json();
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }
} 