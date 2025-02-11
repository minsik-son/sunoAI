'use client';

import { useState } from 'react';
import { parseDescription, generateTitle, buildPromptString } from './utils/promptUtils';

interface PromptOptions {
    genre?: string;
    mood?: string;
    instruments?: string;
    tempo?: string;
    vocalType?: string;
    songStructure?: string[];
    additionalMeta?: string[];
    soundEffects?: string;
}

export default function Page() {
    const [activeTab, setActiveTab] = useState('style');
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [options, setOptions] = useState<PromptOptions>({});
    const [generatedTitle, setGeneratedTitle] = useState('');
    const [generatedPrompt, setGeneratedPrompt] = useState('');

    const handleOptionChange = (key: keyof PromptOptions, value: string | string[]) => {
        setOptions(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const generateResponse = () => {
        setIsGenerating(true);
        
        // 자연어 설명에서 매개변수 추출
        const inferredParams = parseDescription(prompt);
        
        // 사용자 옵션과 추론된 매개변수 병합
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

        // 제목 생성
        const title = generateTitle(finalParams);
        setGeneratedTitle(title);

        // 프롬프트 문자열 생성
        const promptString = buildPromptString(finalParams);
        setGeneratedPrompt(promptString);

        setTimeout(() => setIsGenerating(false), 2000);
    };

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

                <div className="flex justify-center space-x-4 mb-8" data-oid="fa6xfid">
                    <button
                        onClick={() => setActiveTab('style')}
                        className={`px-6 py-2 rounded-full text-sm transition-all ${activeTab === 'style' ? 'bg-black text-white' : 'bg-white'}`}
                        data-oid="z3.xpgs"
                    >
                        Style Generator
                    </button>
                    <button
                        onClick={() => setActiveTab('lyrics')}
                        className={`px-6 py-2 rounded-full text-sm transition-all ${activeTab === 'lyrics' ? 'bg-black text-white' : 'bg-white'}`}
                        data-oid="mqx4kd:"
                    >
                        Lyrics Generator
                    </button>
                    <button
                        onClick={() => setActiveTab('advanced')}
                        className={`px-6 py-2 rounded-full text-sm transition-all ${activeTab === 'advanced' ? 'bg-black text-white' : 'bg-white'}`}
                        data-oid="rdeqyub"
                    >
                        Advanced
                    </button>
                </div>
{/* 
                <div className="max-w-3xl mx-auto mb-12" data-oid=":7:_:f7">
                    <textarea
                        className="w-full h-32 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-black focus:ring-1 focus:ring-black text-lg p-4 shadow-sm transition-all duration-200 placeholder-gray-400 resize-none"
                        placeholder="✨ Describe the song you want to create..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        data-oid="ynellg8"
                    />
                </div>
*/}
                <div
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm mb-12 border border-gray-100"
                    data-oid="ighmlue"
                >
                    <div className="space-y-6" data-oid="l82mya2">
                        {activeTab === 'style' && (
                            <div className="max-w-3xl mx-auto" data-oid="vo5_n8l">
                                <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                                    <div data-oid="f4h_z2o">
                                        <span className="text-sm font-light text-gray-700">Genre</span>
                                        <select
                                            className="mt-1 block w-[240px] rounded-lg border-gray-200 bg-white shadow-sm 
                                            focus:border-black focus:ring-black transition-colors cursor-pointer
                                            [&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50"
                                            onChange={(e) => handleOptionChange('genre', e.target.value)}
                                            value={options.genre || ''}
                                            data-oid="b2vl0lr"
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
                                    <div data-oid="mye_v:h">
                                        <span className="text-sm font-light text-gray-700">Instruments</span>
                                        <select
                                            className="mt-1 block w-[240px] rounded-lg border-gray-200 bg-white shadow-sm 
                                            focus:border-black focus:ring-black transition-colors cursor-pointer
                                            [&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50"
                                            onChange={(e) => handleOptionChange('instruments', e.target.value)}
                                            value={options.instruments || ''}
                                            data-oid="_tcpl6-"
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
                                    <div data-oid="e:0olrk">
                                        <span className="text-sm font-light text-gray-700">Mood</span>
                                        <select
                                            className="mt-1 block w-[240px] rounded-lg border-gray-200 bg-white shadow-sm 
                                            focus:border-black focus:ring-black transition-colors cursor-pointer
                                            [&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50"
                                            onChange={(e) => handleOptionChange('mood', e.target.value)}
                                            value={options.mood || ''}
                                            data-oid="66o3wfi"
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
                                    <div data-oid="yv8_347">
                                        <span className="text-sm font-light text-gray-700">Tempo</span>
                                        <select
                                            className="mt-1 block w-[240px] rounded-lg border-gray-200 bg-white shadow-sm 
                                            focus:border-black focus:ring-black transition-colors cursor-pointer
                                            [&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50"
                                            onChange={(e) => handleOptionChange('tempo', e.target.value)}
                                            value={options.tempo || ''}
                                            data-oid="hhit.no"
                                        >
                                            <option value="">Select Tempo</option>
                                            <option value="Slow">Slow</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Fast">Fast</option>
                                        </select>
                                    </div>
                                    <div data-oid="vocal-type-label">
                                        <span className="text-sm font-light text-gray-700">Vocal Type</span>
                                        <select
                                            className="mt-1 block w-[240px] rounded-lg border-gray-200 bg-white shadow-sm 
                                            focus:border-black focus:ring-black transition-colors cursor-pointer
                                            [&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50"
                                            onChange={(e) => handleOptionChange('vocalType', e.target.value)}
                                            value={options.vocalType || ''}
                                            data-oid="vocal-type-select"
                                        >
                                            <option value="">Select Vocal Type</option>
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
                                    <div data-oid="sound-effects-label">
                                        <span className="text-sm font-light text-gray-700">Sound Effects</span>
                                        <select
                                            className="mt-1 block w-[240px] rounded-lg border-gray-200 bg-white shadow-sm 
                                            focus:border-black focus:ring-black transition-colors cursor-pointer
                                            [&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50"
                                            onChange={(e) => handleOptionChange('soundEffects', e.target.value)}
                                            value={options.soundEffects || ''}
                                            data-oid="sound-effects-select"
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
                            <div className="space-y-4" data-oid="cpo:tke">
                                <div className="flex space-x-2" data-oid="wbc23n9">
                                    <button
                                        className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition-colors"
                                        data-oid="1dep6x-"
                                    >
                                        [Intro]
                                    </button>
                                    <button
                                        className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition-colors"
                                        data-oid="sb-en7g"
                                    >
                                        [Verse]
                                    </button>
                                    <button
                                        className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition-colors"
                                        data-oid="3t66ko5"
                                    >
                                        [Chorus]
                                    </button>
                                    <button
                                        className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition-colors"
                                        data-oid="tsu-p.:"
                                    >
                                        [Bridge]
                                    </button>
                                </div>
                                <textarea
                                    className="w-full h-40 rounded-lg border-gray-200 focus:border-black focus:ring-black"
                                    placeholder="Enter your lyrics prompt here..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    data-oid="3_im9jb"
                                />
                            </div>
                        )}

                        {activeTab === 'advanced' && (
                            <div className="space-y-4" data-oid="2hq-37z">
                                <textarea
                                    className="w-full h-40 rounded-lg border-gray-200 focus:border-black focus:ring-black"
                                    placeholder="Enter detailed requirements for your song..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    data-oid="1uz:17l"
                                />

                                <div className="flex space-x-2" data-oid="vj2_5be">
                                    <button
                                        className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition-colors"
                                        data-oid="oybmr8e"
                                    >
                                        [whispering]
                                    </button>
                                    <button
                                        className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition-colors"
                                        data-oid="uvrkjx6"
                                    >
                                        [rock]
                                    </button>
                                    <button
                                        className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition-colors"
                                        data-oid="j8oa9fs"
                                    >
                                        [emotional]
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={generateResponse}
                            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors relative overflow-hidden"
                            data-oid="l3lp11j"
                        >
                            {isGenerating ? (
                                <div
                                    className="flex items-center justify-center"
                                    data-oid="jrg9ksf"
                                >
                                    <div
                                        className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                                        data-oid="h9ef4w1"
                                    ></div>
                                </div>
                            ) : (
                                'Generate'
                            )}
                        </button>
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
                    generatedPrompt && (
                        <div className="max-w-3xl mx-auto mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 space-y-6" data-oid="u1qzym.">
                            <div className="flex items-center justify-between mb-4" data-oid="x_5bkhc">
                                <h3 className="text-xl font-light" data-oid="pja3od6">
                                    {generatedTitle}
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="u:m.28q">
                                <p className="text-gray-700">{generatedPrompt}</p>
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
