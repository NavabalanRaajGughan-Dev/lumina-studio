"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Preloader } from "@/components/Preloader";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { useLenis } from "@/hooks/useLenis";

export function ClientShell({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    // Initialize Lenis smooth scroll
    useLenis();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
        return () => clearTimeout(timer);
    }, [pathname]);

    // Handle initial page load
    useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
        return () => {
            window.history.scrollRestoration = "auto";
        };
    }, []);



    const handlePreloaderComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
            <div
                className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
            >
                <div className="relative min-h-screen">
                    <Navigation />
                    <main className="relative">{children}</main>
                    <Footer />
                </div>
            </div>
        </>
    );
}
