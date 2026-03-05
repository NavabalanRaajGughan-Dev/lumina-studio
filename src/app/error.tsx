"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Page error:", error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <div className="text-6xl mb-6 opacity-30">📷</div>
                <h2 className="text-2xl font-semibold text-white mb-3">
                    Something went wrong
                </h2>
                <p className="text-white/50 mb-8 text-sm leading-relaxed">
                    We couldn&apos;t load this page. This might be a temporary
                    issue — please try again.
                </p>
                <button
                    onClick={reset}
                    className="px-6 py-3 bg-white text-[#0F2617] rounded-full text-sm font-medium
                               hover:bg-white/90 transition-colors duration-300"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
