'use client';

import { useState } from 'react';
import { LYRICS_SECTIONS, LYRICS_STYLES, VOCAL_ARRANGEMENTS } from './utils/promptUtils';
import { SunoAPI } from './utils/api';
import { SunoPromptBuilder } from './utils/sunoPromptBuilder';
import type { PromptOptions, LyricsOptions } from './utils/types';

// 타입 정의 추가
interface GeneratedItem {
    title: string;
    prompt: string;
}

export default function Page() {
    const [activeTab, setActiveTab] = useState('song');
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [options, setOptions] = useState<PromptOptions>({});
    const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedItem[]>([]);
    const [lyricsOptions, setLyricsOptions] = useState<LyricsOptions>({
        structure: []
    });
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleOptionChange = (key: keyof PromptOptions, value: string | string[]) => {
        setOptions(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const toggleSection = (section: string) => {
        setLyricsOptions(prev => {
            const structure = prev.structure.includes(section)
                ? prev.structure.filter(s => s !== section)
                : [...prev.structure, section];
            return { ...prev, structure };
        });
    };

    const handleLyricsOptionChange = (key: keyof LyricsOptions, value: string) => {
        setLyricsOptions(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const generateResponse = async () => {
        setIsGenerating(true);
        
        try {
            if (activeTab === 'lyrics') {
                const inferredParams = SunoPromptBuilder.parseLyricsDescription(prompt);
                const finalParams = {
                    ...lyricsOptions,
                    ...inferredParams,
                    theme: prompt
                };
                const generatedPrompt = SunoPromptBuilder.buildLyricsPrompt(finalParams);
                setGeneratedPrompts([{
                    title: `${finalParams.style || 'Custom'} Lyrics - ${finalParams.language || 'Multi'} Language`,
                    prompt: generatedPrompt
                }]);
            } else {
                const inferredParams = SunoPromptBuilder.parseDescription(prompt);
                const finalParams = {
                    genre: options.genre || inferredParams.genre,
                    mood: options.mood || inferredParams.mood,
                    instruments: options.instruments || inferredParams.instruments,
                    tempo: options.tempo || inferredParams.tempo,
                    vocalType: options.vocalType || inferredParams.vocalType,
                    songStructure: options.songStructure || [],
                    additionalMeta: options.additionalMeta || [],
                    soundEffects: options.soundEffects || '',
                };
                
                const keywords = SunoPromptBuilder.buildStylePrompt(prompt, finalParams);
                const response = await SunoAPI.generatePromptWithGPT(keywords);
                const data = await response.json();
                setGeneratedPrompts(data.variations);
            }
        } catch (error) {
            console.error('Generation failed:', error);
            setGeneratedPrompts([]);
        } finally {
            setIsGenerating(false);
        }
    };

    // select 요소들의 공통 클래스 수정
    const selectClass = `mt-1 block w-[200px] rounded-lg border-2 border-gray-200 bg-white shadow-sm 
    focus:border-black focus:ring-1 focus:ring-black transition-colors cursor-pointer
    [&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50/50`;

    // 복사 함수 수정
    const copyToClipboard = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            
            // 1초 후에 복사 상태 초기화
            setTimeout(() => {
                setCopiedIndex(null);
            }, 1000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // 버튼 활성화 여부를 확인하는 함수 추가
    const isGenerateDisabled = () => {
        if (activeTab === 'song') {
            // song 탭에서는 description이나 다른 옵션들 중 하나라도 있으면 활성화
            return !prompt && !Object.values(options).some(value => value && value.length > 0);
        } else {
            // lyrics 탭에서는 structure나 다른 옵션들이 있어야 활성화
            return lyricsOptions.structure.length === 0 && 
                   !Object.values(lyricsOptions).some(value => value && typeof value === 'string' && value.length > 0);
        }
    };

    // Generate 버튼 스타일 계산
    const generateButtonClass = `px-8 py-2.5 rounded-lg transition-colors relative overflow-hidden ${
        isGenerateDisabled() 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-black text-white hover:bg-gray-900'
    }`;

    return (
        <div
            className="min-h-screen bg-[#f8f9ff] text-gray-900"
            data-oid="h_2hx8:"
        >
            <nav
                className="border-b border-gray-100 bg-white/70 backdrop-blur-sm"
                data-oid=":-3qkmv"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="fu3ddcb">
                    <div className="flex justify-between h-16 items-center" data-oid="4ylj6vl">
                        <span className="text-2xl font-light" data-oid="1xi6p7x">
                            harmonia.ai
                        </span>
                        <div className="flex space-x-8" data-oid="gs.scx1">
                            <button
                                className="text-sm font-light hover:text-gray-600 transition-colors"
                                data-oid="6ce.npu"
                            >
                                About
                            </button>
                            <button
                                className="text-sm font-light hover:text-gray-600 transition-colors"
                                data-oid="v77d2x2"
                            >
                                Examples
                            </button>
                            <button
                                className="text-sm font-light hover:text-gray-600 transition-colors"
                                data-oid="o3uj1h4"
                            >
                                Pricing
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-oid="7.mc683">
                <h1 className="text-5xl font-light text-center mb-4" data-oid="h5azvzr">
                    Create Music with AI
                </h1>
                <p className="text-gray-500 text-center mb-8 font-light" data-oid="c-8imqs">
                    Transform your ideas into beautiful songs with our AI-powered music generator
                </p>

                <div className="flex justify-center space-x-4 mb-8">
                    <button
                        onClick={() => setActiveTab('song')}
                        className={`px-6 py-2 rounded-full text-sm transition-all ${
                            activeTab === 'song' ? 'bg-black text-white' : 'bg-white'
                        }`}
                    >
                        Song Generator
                    </button>
                    <button
                        onClick={() => setActiveTab('lyrics')}
                        className={`px-6 py-2 rounded-full text-sm transition-all ${
                            activeTab === 'lyrics' ? 'bg-black text-white' : 'bg-white'
                        }`}
                    >
                        Lyrics Generator
                    </button>
                </div>
 
                {activeTab === 'song' && (
                    <div className="max-w-3xl mx-auto mb-12" data-oid=":7:_:f7">
                        <textarea
                            className="w-full h-32 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-black focus:ring-1 focus:ring-black text-lg p-4 shadow-sm transition-all duration-200 placeholder-gray-400 resize-none"
                            placeholder="✨ Describe the song you want to create..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            data-oid="ynellg8"
                        />
                    </div>
                )}

                <div
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm mb-12 border border-gray-100"
                    data-oid="ighmlue"
                >
                    <div className="space-y-6" data-oid="l82mya2">
                        {activeTab === 'song' && (
                            <div className="max-w-3xl mx-auto">
                                <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                                    <div>
                                        <span className="text-sm font-light text-gray-700">Genre</span>
                                        <select
                                            className={selectClass}
                                            onChange={(e) => handleOptionChange('genre', e.target.value)}
                                            value={options.genre || ''}
                                        >
                                            <option value="">Select Genre</option>
                                            {/* Electronic */}
                                            <option value="Ambient">Ambient</option>
                                            <option value="Dance & Electronic">Dance & Electronic</option>
                                            <option value="EDM">EDM</option>
                                            <option value="House">House</option>
                                            <option value="Techno">Techno</option>
                                            <option value="Synth Pop">Synth Pop</option>
                                            
                                            {/* Pop & Rock */}
                                            <option value="Pop">Pop</option>
                                            <option value="Alternative Pop">Alternative Pop</option>
                                            <option value="K-pop">K-pop</option>
                                            <option value="J-pop">J-pop</option>
                                            <option value="Rock">Rock</option>
                                            <option value="Alternative Rock">Alternative Rock</option>
                                            <option value="Indie Rock">Indie Rock</option>
                                            <option value="Pop Rock">Pop Rock</option>
                                            <option value="Punk Rock">Punk Rock</option>
                                            
                                            {/* Hip Hop & R&B */}
                                            <option value="Hip Hop">Hip Hop</option>
                                            <option value="R&B">R&B</option>
                                            <option value="R&B & Soul">R&B & Soul</option>
                                            <option value="Rap">Rap</option>
                                            <option value="Soul">Soul</option>
                                            
                                            {/* Jazz & Blues */}
                                            <option value="Jazz">Jazz</option>
                                            <option value="Blues">Blues</option>
                                            <option value="Gospel">Gospel</option>
                                            
                                            {/* Other Genres */}
                                            <option value="Country & Americana">Country & Americana</option>
                                            <option value="Lo-fi">Lo-fi</option>
                                            <option value="Orchestra">Orchestra</option>
                                            <option value="Reggae">Reggae</option>
                                            <option value="Christmas">Christmas</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span className="text-sm font-light text-gray-700">Instruments</span>
                                        <select
                                            className={selectClass}
                                            onChange={(e) => handleOptionChange('instruments', e.target.value)}
                                            value={options.instruments || ''}
                                        >
                                            <option value="">Select Instrument</option>
                                            <option value="Piano">Piano</option>
                                            <option value="Guitar">Guitar</option>
                                            <option value="Synthesizer">Synthesizer</option>
                                            <option value="Orchestra">Orchestra</option>
                                            <option value="Drums">Drums</option>
                                            <option value="Cello">Cello</option>
                                            <option value="Synth">Synth</option>
                                            <option value="Bass">Bass</option>
                                            <option value="Strings">Strings</option>
                                            <option value="Brass">Brass</option>
                                            <option value="Woodwinds">Woodwinds</option>
                                            <option value="Percussion">Percussion</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span className="text-sm font-light text-gray-700">Mood</span>
                                        <select
                                            className={selectClass}
                                            onChange={(e) => handleOptionChange('mood', e.target.value)}
                                            value={options.mood || ''}
                                        >
                                            <option value="">Select Mood</option>
                                            <option value="Upbeat">Upbeat</option>
                                            <option value="Melancholic">Melancholic</option>
                                            <option value="Energetic">Energetic</option>
                                            <option value="Calm">Calm</option>
                                            <option value="Dark">Dark</option>
                                            <option value="Romantic">Romantic</option>
                                            <option value="Ethereal">Ethereal</option>
                                            <option value="Emotional">Emotional</option>
                                            <option value="Chill">Chill</option>
                                            <option value="Party">Party</option>
                                            <option value="Vibrant">Vibrant</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span className="text-sm font-light text-gray-700">Tempo</span>
                                        <select
                                            className={selectClass}
                                            onChange={(e) => handleOptionChange('tempo', e.target.value)}
                                            value={options.tempo || ''}
                                        >
                                            <option value="">Select Tempo</option>
                                            {/* 느린 템포 */}
                                            <option value="Largo (40-60 BPM)">Largo (40-60 BPM)</option>
                                            <option value="Adagio (66-76 BPM)">Adagio (66-76 BPM)</option>
                                            <option value="Andante (76-108 BPM)">Andante (76-108 BPM)</option>
                                            {/* 중간 템포 */}
                                            <option value="Moderato (108-120 BPM)">Moderato (108-120 BPM)</option>
                                            <option value="Allegretto (112-120 BPM)">Allegretto (112-120 BPM)</option>
                                            {/* 빠른 템포 */}
                                            <option value="Allegro (120-156 BPM)">Allegro (120-156 BPM)</option>
                                            <option value="Vivace (156-176 BPM)">Vivace (156-176 BPM)</option>
                                            <option value="Presto (168-200 BPM)">Presto (168-200 BPM)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span className="text-sm font-light text-gray-700">Vocal Type</span>
                                        <select
                                            className={selectClass}
                                            onChange={(e) => handleOptionChange('vocalType', e.target.value)}
                                            value={options.vocalType || ''}
                                        >
                                            <option value="">Select Vocal Type</option>
                                            <option value="Instrumental">Instrumental (No Vocals)</option>
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                            <option value="Boy">Boy</option>
                                            <option value="Girl">Girl</option>
                                            <option value="Announcer">Announcer</option>
                                            <option value="Reporter">Reporter</option>
                                            <option value="Female narrator">Female narrator</option>
                                            <option value="Whispering">Whispering</option>
                                            <option value="Giggling">Giggling</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span className="text-sm font-light text-gray-700">Sound Effects</span>
                                        <select
                                            className={selectClass}
                                            onChange={(e) => handleOptionChange('soundEffects', e.target.value)}
                                            value={options.soundEffects || ''}
                                        >
                                            <option value="">Select Sound Effect</option>
                                            <option value="Barking">Barking</option>
                                            <option value="Beeping">Beeping</option>
                                            <option value="Bell dings">Bell dings</option>
                                            <option value="Birds chirping">Birds chirping</option>
                                            <option value="Cheering">Cheering</option>
                                            <option value="Clapping">Clapping</option>
                                            <option value="Whistling">Whistling</option>
                                            <option value="Whispers">Whispers</option>
                                            <option value="Silence">Silence</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'lyrics' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <span className="text-sm font-light text-gray-700 mb-2 block">Vocal Arrangement</span>
                                        <select
                                            className={selectClass}
                                            onChange={(e) => handleLyricsOptionChange('vocalArrangement', e.target.value)}
                                            value={lyricsOptions.vocalArrangement || ''}
                                        >
                                            <option value="">Select Vocal Arrangement</option>
                                            {VOCAL_ARRANGEMENTS.map(arrangement => (
                                                <option key={arrangement} value={arrangement}>{arrangement}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <span className="text-sm font-light text-gray-700 mb-2 block">Lyrics Style</span>
                                        <select
                                            className={selectClass}
                                            onChange={(e) => handleLyricsOptionChange('style', e.target.value)}
                                            value={lyricsOptions.style || ''}
                                        >
                                            <option value="">Select Style</option>
                                            {LYRICS_STYLES.map(style => (
                                                <option key={style} value={style}>{style}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <span className="text-sm font-light text-gray-700 mb-2 block">Language</span>
                                        <select
                                            className={selectClass}
                                            onChange={(e) => handleLyricsOptionChange('language', e.target.value)}
                                            value={lyricsOptions.language || ''}
                                        >
                                            <option value="">Select Language</option>
                                            <option value="English">English (English)</option>
                                            <option value="Korean">Korean (한국어)</option>
                                            <option value="Japanese">Japanese (日本語)</option>
                                            <option value="Chinese">Chinese (中文)</option>
                                            <option value="German">German (Deutsch)</option>
                                            <option value="Russian">Russian (Русский)</option>
                                            <option value="French">French (Français)</option>
                                            <option value="Portuguese">Portuguese (Português)</option>
                                            <option value="Italian">Italian (Italiano)</option>
                                            <option value="Spanish">Spanish (Español)</option>
                                            <option value="Arabic">Arabic (العربية)</option>
                                            <option value="Polish">Polish (Polski)</option>
                                            <option value="Turkish">Turkish (Türkçe)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-sm font-light text-gray-700 mb-2 block">Theme Description</span>
                                    <textarea
                                        className="w-full h-32 rounded-lg border-2 border-gray-200 focus:border-black focus:ring-1 focus:ring-black p-4"
                                        placeholder="Describe the theme or story of your lyrics..."
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center mt-8">
                            <button
                                onClick={generateResponse}
                                className={generateButtonClass}
                                disabled={isGenerateDisabled()}
                            >
                                {isGenerating ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    </div>
                                ) : (
                                    'Generate'
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {isGenerating ? (
                    <div
                        className="max-w-3xl mx-auto mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 space-y-6"
                        data-oid="u1qzym."
                    >
                        <div className="flex items-center justify-between mb-4" data-oid="x_5bkhc">
                            <h3 className="text-xl font-light" data-oid="pja3od6">
                                Generated Result
                            </h3>
                            <span className="text-sm text-gray-500" data-oid="m0rpj3v">
                                Processing...
                            </span>
                        </div>
                        <div className="space-y-4" data-oid="u:m.28q">
                            <div
                                className="h-2 bg-gray-200 rounded animate-pulse"
                                data-oid="oxykh.5"
                            ></div>
                            <div
                                className="h-2 bg-gray-200 rounded animate-pulse"
                                data-oid="cd-4.-g"
                            ></div>
                            <div
                                className="h-2 bg-gray-200 rounded animate-pulse w-3/4"
                                data-oid="z0u4l68"
                            ></div>
                        </div>
                        <div className="flex items-center space-x-4 pt-4" data-oid="g.dguwx">
                            <button
                                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                                data-oid="c1-lq.i"
                            >
                                Download
                            </button>
                            <button
                                className="px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-sm"
                                data-oid="i:dn6fn"
                            >
                                Share
                            </button>
                        </div>
                    </div>
                ) : (
                    generatedPrompts.length > 0 && (
                        <div className="max-w-3xl mx-auto mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 space-y-6">
                            {generatedPrompts.map((item, index) => (
                                <div key={index} className={index > 0 ? "pt-6 border-t border-gray-100" : ""}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-light">
                                            {item.title}
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(item.prompt, index)}
                                            className={`p-2 rounded-lg transition-all duration-200 ${
                                                copiedIndex === index 
                                                    ? 'bg-black text-white' 
                                                    : 'hover:bg-gray-100'
                                            }`}
                                            title="Copy to clipboard"
                                        >
                                            {copiedIndex === index ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-gray-700">{item.prompt}</p>
                                </div>
                            ))}
                        </div>
                    )
                )}

                <div className="text-center space-y-4" data-oid="2au7:xz">
                    <h2 className="text-2xl font-light" data-oid="lyv02wl">
                        Recent Generations
                    </h2>
                    <div className="grid grid-cols-3 gap-6" data-oid="-z8xb1d">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:bg-white/80"
                                data-oid="9:0kdas"
                            >
                                <div
                                    className="w-12 h-12 bg-black rounded-full mx-auto mb-4 flex items-center justify-center"
                                    data-oid="dyl2w10"
                                >
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="f2j6-6-"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                            data-oid="crerbbe"
                                        />
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-500 font-light" data-oid="g.:x2b2">
                                    Generated Song #{item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
