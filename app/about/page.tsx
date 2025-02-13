'use client';

import InlineAd from '../components/ads/InlineAd';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#f8f9ff] text-gray-900">
            <nav className="border-b border-gray-100 bg-white/70 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <a href="/" className="text-2xl font-light">
                            harmonia.ai
                        </a>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex gap-8">
                    {/* Main Content */}
                    <main className="flex-1 max-w-4xl">
                        <h1 className="text-4xl font-light mb-8">How to Use harmonia.ai</h1>
                        
                        <div className="space-y-8">
                            <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
                                <h2 className="text-2xl font-light mb-4">Song Generator</h2>
                                <div className="prose prose-gray">
                                    <p>The Song Generator helps you create music prompts with specific styles and characteristics:</p>
                                    <ol className="list-decimal list-inside space-y-2">
                                        <li>Select the "Song Generator" tab</li>
                                        <li>Describe your desired song in the text area</li>
                                        <li>Customize options like Genre, Instruments, Mood, etc.</li>
                                        <li>Click Generate to create your music prompt</li>
                                    </ol>
                                </div>
                            </section>

                            <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
                                <h2 className="text-2xl font-light mb-4">Lyrics Generator</h2>
                                <div className="prose prose-gray">
                                    <p>The Lyrics Generator helps you create song lyrics in various languages and styles:</p>
                                    <ol className="list-decimal list-inside space-y-2">
                                        <li>Select the "Lyrics Generator" tab</li>
                                        <li>Choose your preferred language</li>
                                        <li>Select a theme for your lyrics</li>
                                        <li>Customize additional options:
                                            <ul className="list-disc list-inside ml-4 mt-2">
                                                <li>Vocal Style</li>
                                                <li>Lyrics Style</li>
                                                <li>Song Structure</li>
                                                <li>Rhyme Pattern</li>
                                                <li>Song Length</li>
                                            </ul>
                                        </li>
                                        <li>Add a theme description (optional)</li>
                                        <li>Click Generate to create your lyrics</li>
                                    </ol>
                                </div>
                            </section>

                            <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
                                <h2 className="text-2xl font-light mb-4">Tips for Better Results</h2>
                                <div className="prose prose-gray">
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>Be specific in your descriptions</li>
                                        <li>Try different combinations of options</li>
                                        <li>Use the theme description to add context</li>
                                        <li>Experiment with different song structures</li>
                                    </ul>
                                </div>
                            </section>
                        </div>

                        {/* Generate 버튼 */}
                        <div className="mt-12 flex justify-center">
                            <a
                                href="/"
                                className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-light"
                            >
                                Start Generating
                            </a>
                        </div>
                        <p className="text-center text-gray-500 mt-4">
                            If you find any bugs or have suggestions for improvements, please report them to <a href="mailto:aiprmpt@gmail.com" className="text-blue-500 underline">aiprmpt@gmail.com</a>.
                        </p>
                    </main>

                    {/* Aside Advertisement */}
                    <aside className="w-[300px] hidden lg:block">
                        <div className="sticky top-8">
                            {/* 
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
                                <div className="h-[600px] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <div className="text-gray-400 text-sm">
                                        Advertisement Area (300x600)
                                    </div>
                                </div>
                            </div>
                            */}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
} 