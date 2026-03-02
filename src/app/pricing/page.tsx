"use client";

import dynamic from "next/dynamic";

const Pricing = dynamic(() => import("@/views/Pricing").then((m) => ({ default: m.Pricing })), {
    loading: () => <PageSkeleton />,
});

function PageSkeleton() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-background">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
    );
}

export default Pricing;
