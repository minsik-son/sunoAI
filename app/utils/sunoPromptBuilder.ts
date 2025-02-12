import { PromptOptions, LyricsOptions } from './types';

export class SunoPromptBuilder {
    static buildStylePrompt(description: string, options: PromptOptions): string {
        const parts: string[] = [];
        
        // [Describe] - 사용자의 설명을 첫 번째로
        if (description) {
            parts.push(description);
        }

        // [Genre]
        if (options.genre) {
            parts.push(options.genre);
        }

        // [Tempo]
        if (options.tempo) {
            const bpm = options.tempo.match(/\((.*?)\)/)?.[1] || options.tempo;
            parts.push(bpm);
        }

        // [Mood]
        if (options.mood) {
            parts.push(options.mood);
        }

        // [Instruments]
        if (options.instruments) {
            parts.push(options.instruments);
        }

        // [Vocal Type]
        if (options.vocalType) {
            parts.push(options.vocalType);
        }

        // [Sound Effects]
        if (options.soundEffects) {
            parts.push(options.soundEffects);
        }

        // 200자 제한 확인 및 처리
        let result = parts.join(', ');
        if (result.length > 200) {
            // 중요도가 낮은 요소부터 제거
            const importantParts = [description, options.genre, options.tempo, options.mood];
            result = importantParts.filter(Boolean).join(', ');
            
            // 여전히 200자를 초과하면 설명 부분을 줄임
            if (result.length > 200) {
                result = result.slice(0, 197) + '...';
            }
        }

        return result;
    }

    static buildLyricsPrompt(params: LyricsOptions): string {
        const metaTags: string[] = [];
        
        // 기본 메타 태그 추가
        if (params.language) metaTags.push(`[Language: ${params.language}]`);
        if (params.theme) metaTags.push(`[Theme: ${params.theme}]`);
        if (params.vocalStyle) metaTags.push(`[Vocal: ${params.vocalStyle}]`);
        if (params.style) metaTags.push(`[Style: ${params.style}]`);
        if (params.songLength) metaTags.push(`[Length: ${params.songLength}]`);
        
        // 구조 관련 태그
        if (params.structure) metaTags.push(`[Structure: ${params.structure}]`);
        if (params.repetition) metaTags.push(`[Repetition: ${params.repetition}]`);
        
        // 세부 스타일 태그
        if (params.rhymePattern) metaTags.push(`[Rhyme: ${params.rhymePattern}]`);
        if (params.metaphorLevel) metaTags.push(`[Metaphor: ${params.metaphorLevel}]`);

        // 메타 태그를 한 줄로 결합
        const metaTagsString = metaTags.join(' ');

        return metaTagsString;
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