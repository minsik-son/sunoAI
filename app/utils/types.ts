export interface PromptOptions {
    genre?: string;
    mood?: string;
    instruments?: string;
    tempo?: string;
    vocalType?: string;
    songStructure?: string[];
    additionalMeta?: string[];
    soundEffects?: string;
}

export interface LyricsOptions {
    structure: string[];
    theme: string;
    language: string;
    vocalStyle?: string;
    style?: string;
    repetition?: string;
    rhymePattern?: string;
    metaphorLevel?: string;
    songLength?: string;
} 