import { PromptOptions, LyricsOptions } from './types';
import axios from 'axios';

export class SunoPromptBuilder {
    static buildStylePrompt(description: string, params: PromptOptions): string {
        const promptParts = [];
        
        // 핵심 요소 먼저 추가
        if (params.genre) promptParts.push(params.genre);
        if (params.mood) promptParts.push(`${params.mood} mood`);
        if (params.instruments) promptParts.push(`featuring ${params.instruments}`);
        
        // 기본 프롬프트 구성
        let basePrompt = `Create ${promptParts.join(', ')}`;
        
        // 남은 공간 계산 (200자 제한)
        const remainingLength = 200 - basePrompt.length;
        
        // 추가 세부사항을 중요도 순으로 추가
        if (remainingLength > 0 && params.tempo) {
            const tempoText = ` at ${params.tempo}`;
            if (basePrompt.length + tempoText.length <= 200) {
                basePrompt += tempoText;
            }
        }
        
        if (remainingLength > 0 && params.vocalType) {
            const vocalText = `. Include ${params.vocalType} vocals`;
            if (basePrompt.length + vocalText.length <= 200) {
                basePrompt += vocalText;
            }
        }
        
        // 사용자 설명을 마지막에 추가
        if (description && basePrompt.length < 190) {
            const maxDescLength = 200 - basePrompt.length - 2;
            if (maxDescLength > 0) {
                basePrompt += `. ${description.slice(0, maxDescLength)}`;
            }
        }
        
        return basePrompt;
    }

    static buildLyricsPrompt(params: LyricsOptions): string {
        let prompt = `Write ${params.language} lyrics`;
        
        // 테마 추가 (필수 요소)
        if (params.theme) {
            prompt += ` about ${params.theme}`;
        }
        
        // 중요도 순으로 옵션 추가
        const options = [];
        if (params.style) options.push(`style: ${params.style}`);
        if (params.vocalStyle) options.push(`vocal style: ${params.vocalStyle}`);
        if (params.rhymePattern) options.push(`rhyme: ${params.rhymePattern}`);
        
        // 옵션을 하나씩 추가하면서 길이 체크
        for (const option of options) {
            const newPrompt = `${prompt}. ${option}`;
            if (newPrompt.length <= 200) {
                prompt = newPrompt;
            } else {
                break;
            }
        }
        
        return prompt;
    }

    static parseDescription(description: string): Partial<PromptOptions> {
        const params: Partial<PromptOptions> = {};
        const keywords = description.toLowerCase();
        
        // 장르 감지
        if (keywords.includes('japanese') || keywords.includes('anime')) {
            params.genre = 'J-pop';
        } else if (keywords.includes('k-pop') || keywords.includes('korean')) {
            params.genre = 'K-pop';
        }
        // ... 기존 감지 로직 유지 ...

        return params;
    }

    static parseLyricsDescription(description: string): Partial<LyricsOptions> {
        const params: Partial<LyricsOptions> = {
            structure: []
        };
        
        const keywords = description.toLowerCase();
        
        // ... 기존 감지 로직 유지 ...

        return params;
    }
}

export async function generatePromptWithGPT(keywords: string): Promise<any> {
    const response = await axios.post('/api/openai', { keywords });
    return response.data.content;
} 