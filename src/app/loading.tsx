export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F2617]">
            <div className="flex flex-col items-center gap-6">
                {/* Animated camera aperture spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                    <div className="absolute inset-0 rounded-full border-2 border-t-white/80 animate-spin" />
                    <div className="absolute inset-3 rounded-full border border-white/20" />
                    <div className="absolute inset-[18px] rounded-full bg-white/10" />
                </div>
                <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-light">
                    Loading
                </p>
            </div>
        </div>
    );
}
