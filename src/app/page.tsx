"use client";

import dynamic from "next/dynamic";

import { Hero } from "@/sections/Hero";

const IntroGrid = dynamic(() => import("@/sections/IntroGrid").then((m) => ({ default: m.IntroGrid })), {
    loading: () => <SectionSkeleton />,
});
const ServicesSection = dynamic(() => import("@/sections/Services").then((m) => ({ default: m.Services })), {
    loading: () => <SectionSkeleton />,
});
const WhyChooseMe = dynamic(() => import("@/sections/WhyChooseMe").then((m) => ({ default: m.WhyChooseMe })), {
    loading: () => <SectionSkeleton />,
});
const FeaturedProjects = dynamic(() => import("@/sections/FeaturedProjects").then((m) => ({ default: m.FeaturedProjects })), {
    loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("@/sections/Testimonials").then((m) => ({ default: m.Testimonials })), {
    loading: () => <SectionSkeleton />,
});
const FAQ = dynamic(() => import("@/sections/FAQ").then((m) => ({ default: m.FAQ })), {
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
