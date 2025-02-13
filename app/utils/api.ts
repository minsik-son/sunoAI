import axios from 'axios';

export class SunoAPI {
    static async generatePromptWithGPT(keywords: string): Promise<any> {
        try {
            const response = await axios.post('/api/openai', { keywords });
            return response.data;
        } catch (error) {
            console.error('Error generating prompt:', error);
            throw error;
        }
    }
} 