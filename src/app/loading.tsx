export default function Loading() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                <p className="text-white/40 text-sm font-body tracking-wider uppercase">Loading</p>
            </div>
        </div>
    );
}
