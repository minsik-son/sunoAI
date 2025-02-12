'use client';

import { useEffect } from 'react';

export default function FixedBottomAd() {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50">
            <div className="max-w-7xl mx-auto">
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="YOUR-AD-CLIENT-ID"
                    data-ad-slot="YOUR-BOTTOM-AD-SLOT-ID"
                    data-ad-format="horizontal"
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    );
} 