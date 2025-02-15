import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header>
            <nav className="border-b border-gray-100 bg-white/70 backdrop-blur-sm px-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link href="/" className="flex items-center">
                            <Image 
                                src="/images/2d-logo--side-view-of-the-brain.png" 
                                alt="Prompt AI Pro Logo"
                                width={40}
                                height={40}
                                className="mr-2"
                            />
                            <span className="text-2xl font-light">
                                Prompt Ai Pro
                            </span>
                        </Link>
                        <div className="flex space-x-8">
                            <Link
                                href="/about"
                                className="text-sm font-light hover:text-gray-600 transition-colors"
                            >
                                About
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
} 