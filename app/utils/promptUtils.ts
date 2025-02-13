interface InferredParams {
    genre?: string;
    mood?: string;
    instruments?: string;
    tempo?: string;
    vocalType?: string;
}

interface PromptParams {
    genre?: string;
    mood?: string;
    instruments?: string;
    tempo?: string;
    vocalType?: string;
    songStructure?: string[];
    additionalMeta?: string[];
    soundEffects?: string;
}

interface LyricsPromptParams {
    structure: string[];
    theme?: string;
    style?: string;
    language?: string;
    mood?: string;
    genre?: string;
}

// 가사 구조 상수
export const LYRICS_SECTIONS = [
    'Intro',
    'Verse 1',
    'Verse 2',
    'Pre-Chorus',
    'Chorus',
    'Bridge',
    'Outro'
] as const;

// 가사 스타일 상수
export const LYRICS_STYLES = [
    'Narrative',
    'Emotional',
    'Poetic',
    'Metaphorical',
    'Direct',
    'Abstract'
] as const;

export const VOCAL_ARRANGEMENTS = [
    'Solo Vocal',
    'Duet',
    'Group Chorus',
    'A Cappella',
    'Call & Response',
    'Harmonized',
    'Unison Vocals',
    'Lead & Background',
    'Small Group',
    'Alternating Vocals',
    'Round Style',
    'Layered Vocals',
    'Spoken Word',
    'Vocal Effects',
    'Multi-Voice Harmony'
] as const;

export const LYRICS_STRUCTURES = [
    'Verse - Chorus - Verse - Bridge - Chorus',
    'Verse - Pre-Chorus - Chorus - Verse - Bridge - Chorus',
    'Intro - Verse - Chorus - Verse - Chorus - Outro',
    'Verse - Chorus - Verse - Chorus - Bridge - Chorus',
    'Verse - Verse - Bridge - Chorus - Outro',
    'Intro - Verse - Chorus - Bridge - Chorus - Outro'
] as const;

export const REPETITION_STYLES = [
    'High Chorus Repetition',
    'Moderate Repetition',
    'Minimal Repetition',
    'Strategic Hook Repetition',
    'Thematic Phrase Repetition'
] as const;

export const RHYME_PATTERNS = [
    'Strong End Rhymes',
    'Internal Rhyme Scheme',
    'Conversational Flow',
    'Loose Rhyme Pattern',
    'Complex Rhyme Structure',
    'Free Verse Style'
] as const;

export const METAPHOR_LEVELS = [
    'Highly Metaphoric',
    'Balanced Metaphors',
    'Direct and Clear',
    'Subtle Symbolism',
    'Mixed (Metaphoric & Direct)',
    'Abstract Imagery'
] as const;

export const THEMES = [
    'Custom',
    'Love & Romance',
    'Heartbreak & Loss',
    'Personal Growth',
    'Social Issues',
    'Nature & Environment',
    'Life & Death',
    'Dreams & Aspirations',
    'Friendship & Unity',
    'Nostalgia & Memories',
    'Hope & Inspiration',
    'Struggle & Resilience',
    'Joy & Celebration',
    'Faith & Spirituality',
    'Time & Change',
    'Freedom & Independence'
] as const;

export const SONG_LENGTHS = [
    '60 seconds (1:00)',
    '90 seconds (1:30)',
    '120 seconds (2:00)',
    '150 seconds (2:30)',
    '180 seconds (3:00)',
    '210 seconds (3:30)',
    '240 seconds (4:00)',
    '270 seconds (4:30)',
    '300 seconds (5:00)',
    '330 seconds (5:30)',
    '360 seconds (6:00)'
] as const;

export function parseDescription(description: string): InferredParams {
    const params: InferredParams = {};
    const keywords = description.toLowerCase();
    
    // 장르 감지
    if (keywords.includes('japanese') || keywords.includes('anime')) {
        params.genre = 'J-pop';
    } else if (keywords.includes('k-pop') || keywords.includes('korean')) {
        params.genre = 'K-pop';
    } else if (keywords.includes('rock')) {
        params.genre = 'Rock';
    } else if (keywords.includes('hip hop') || keywords.includes('rap')) {
        params.genre = 'Hip Hop';
    } else if (keywords.includes('jazz')) {
        params.genre = 'Jazz';
    } else if (keywords.includes('electronic') || keywords.includes('edm')) {
        params.genre = 'Dance & Electronic';
    }
    
    // 분위기 감지
    if (keywords.includes('happy') || keywords.includes('cheerful')) {
        params.mood = 'Upbeat';
    } else if (keywords.includes('sad') || keywords.includes('melancholic')) {
        params.mood = 'Melancholic';
    } else if (keywords.includes('energetic') || keywords.includes('powerful')) {
        params.mood = 'Energetic';
    } else if (keywords.includes('calm') || keywords.includes('peaceful')) {
        params.mood = 'Calm';
    } else if (keywords.includes('dark') || keywords.includes('gloomy')) {
        params.mood = 'Dark';
    } else if (keywords.includes('romantic') || keywords.includes('love')) {
        params.mood = 'Romantic';
    }
    
    // 악기 감지
    if (keywords.includes('piano')) {
        params.instruments = 'Piano';
    } else if (keywords.includes('guitar')) {
        params.instruments = 'Guitar';
    } else if (keywords.includes('synth')) {
        params.instruments = 'Synthesizer';
    } else if (keywords.includes('orchestra')) {
        params.instruments = 'Orchestra';
    } else if (keywords.includes('drums')) {
        params.instruments = 'Drums';
    }
    
    // 템포 감지
    if (keywords.includes('slow') || keywords.includes('calm')) {
        params.tempo = 'Adagio (66-76 BPM)';
    } else if (keywords.includes('moderate') || keywords.includes('medium')) {
        params.tempo = 'Moderato (108-120 BPM)';
    } else if (keywords.includes('fast') || keywords.includes('quick')) {
        params.tempo = 'Allegro (120-156 BPM)';
    } else if (keywords.includes('very fast') || keywords.includes('rapid')) {
        params.tempo = 'Presto (168-200 BPM)';
    }
    
    // 보컬 타입 감지
    if (keywords.includes('female') || keywords.includes('woman')) {
        params.vocalType = 'Female';
    } else if (keywords.includes('male') || keywords.includes('man')) {
        params.vocalType = 'Male';
    } else if (keywords.includes('boy')) {
        params.vocalType = 'Boy';
    } else if (keywords.includes('girl')) {
        params.vocalType = 'Girl';
    } else if (keywords.includes('whisper')) {
        params.vocalType = 'Whispering';
    }

    return params;
}

export function generateTitle(params: PromptParams): string {
    const parts: string[] = [];
    
    if (params.mood) {
        parts.push(params.mood);
    }
    if (params.genre) {
        parts.push(params.genre);
    }
    if (params.tempo) {
        // BPM 정보는 제목에서 제외
        const tempoName = params.tempo.split(' (')[0];
        parts.push(tempoName);
    }
    
    const relevantTags = params.additionalMeta?.filter(tag => 
        !tag.toLowerCase().includes('style') && 
        !tag.toLowerCase().includes('tempo')
    );
    
    if (relevantTags?.length) {
        parts.push(...relevantTags);
    }
    
    return parts.length === 0 ? "Untitled Song" : parts.join(' - ');
}

export function buildPromptString(params: PromptParams): string {
    const parts: string[] = [];
    
    if (params.genre) parts.push(`Genre: ${params.genre}`);
    if (params.mood) parts.push(`Mood: ${params.mood}`);
    if (params.instruments) parts.push(`Instruments: ${params.instruments}`);
    if (params.tempo) parts.push(`Tempo: ${params.tempo}`);
    if (params.vocalType) parts.push(`Vocal: ${params.vocalType}`);
    if (params.soundEffects) parts.push(`Effects: ${params.soundEffects}`);
    
    if (params.songStructure?.length) {
        const structure = params.songStructure.map(section => `[${section}]`).join(' ');
        parts.push(structure);
    }
    
    if (params.additionalMeta?.length) {
        parts.push(params.additionalMeta.join(', '));
    }
    
    return parts.join(', ');
}

export function buildLyricsPrompt(params: LyricsPromptParams): string {
    const parts: string[] = [];
    
    // 구조 추가
    if (params.structure.length) {
        parts.push(params.structure.map(section => `[${section}]`).join(' '));
    }
    
    // 메타 정보 추가 (theme을 앞쪽으로 이동)
    if (params.theme) parts.push(`Theme: ${params.theme}`);  // theme이 먼저 오도록
    if (params.style) parts.push(`Style: ${params.style}`);
    if (params.language) parts.push(`Language: ${params.language}`);
    if (params.mood) parts.push(`Mood: ${params.mood}`);
    if (params.genre) parts.push(`Genre: ${params.genre}`);
    
    return parts.join(', ');
}

// 가사 프롬프트 파싱
export function parseLyricsDescription(description: string): Partial<LyricsPromptParams> {
    const params: Partial<LyricsPromptParams> = {
        structure: []
    };
    
    const keywords = description.toLowerCase();
    
    // 스타일 감지
    if (keywords.includes('story') || keywords.includes('narrative')) {
        params.style = 'Narrative';
    } else if (keywords.includes('emotional') || keywords.includes('feeling')) {
        params.style = 'Emotional';
    } else if (keywords.includes('poetic') || keywords.includes('poem')) {
        params.style = 'Poetic';
    }
    
    // 언어 감지
    if (keywords.includes('korean') || keywords.includes('한국어')) {
        params.language = 'Korean';
    } else if (keywords.includes('japanese') || keywords.includes('日本語')) {
        params.language = 'Japanese';
    } else if (keywords.includes('english')) {
        params.language = 'English';
    }
    
    return params;
} 