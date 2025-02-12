'use client';

export default function FixedBottomAd() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 h-[90px] py-2">
            <div className="max-w-7xl mx-auto h-full">
                <div className="h-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-gray-400 text-sm">
                        Fixed Bottom Advertisement Area (728x90)
                    </div>
                </div>
            </div>
        </div>
    );
} 