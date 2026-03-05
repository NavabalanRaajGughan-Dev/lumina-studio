"use client";

import dynamic from "next/dynamic";

import { Hero } from "@/sections/Hero";

const IntroGrid = dynamic(() => import("@/sections/IntroGrid").then((m) => ({ default: m.IntroGrid })), {
    ssr: false,
    loading: () => <SectionSkeleton />,
});
const ServicesSection = dynamic(() => import("@/sections/Services").then((m) => ({ default: m.Services })), {
    ssr: false,
    loading: () => <SectionSkeleton />,
});
const WhyChooseMe = dynamic(() => import("@/sections/WhyChooseMe").then((m) => ({ default: m.WhyChooseMe })), {
    ssr: false,
    loading: () => <SectionSkeleton />,
});
const FeaturedProjects = dynamic(() => import("@/sections/FeaturedProjects").then((m) => ({ default: m.FeaturedProjects })), {
    ssr: false,
    loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("@/sections/Testimonials").then((m) => ({ default: m.Testimonials })), {
    ssr: false,
    loading: () => <SectionSkeleton />,
});
const FAQ = dynamic(() => import("@/sections/FAQ").then((m) => ({ default: m.FAQ })), {
    ssr: false,
    loading: () => <SectionSkeleton />,
});

function SectionSkeleton() {
    return (
        <div className="w-full min-h-[60vh] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
    );
}

export default function HomePage() {
    return (
        <>
            {/* Hero Section - loaded eagerly (above the fold) */}
            <Hero />

            {/* Below-the-fold sections loaded lazily */}
            <IntroGrid />
            <ServicesSection />
            <WhyChooseMe />
            <FeaturedProjects />
            <Testimonials />
            <FAQ />
        </>
    );
}
