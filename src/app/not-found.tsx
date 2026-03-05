import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <p className="text-8xl font-serif text-white/10 mb-4">404</p>
                <h2 className="text-2xl font-semibold text-white mb-3">
                    Page Not Found
                </h2>
                <p className="text-white/50 mb-8 text-sm leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved to a different location.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-white text-[#0F2617] rounded-full text-sm font-medium
                               hover:bg-white/90 transition-colors duration-300"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
