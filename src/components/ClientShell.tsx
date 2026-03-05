"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Preloader } from "@/components/Preloader";
import { Navigation } from "@/components/shared/Navigation";
import { Footer } from "@/components/shared/Footer";
import { useLenis } from "@/hooks/useLenis";

export function ClientShell({ children }: { children: React.ReactNode }) {
    const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);
    const [pageName, setPageName] = useState('LUMINA');
    const pathname = usePathname();
    const [prevPathname, setPrevPathname] = useState(pathname);

    // Initialize Lenis smooth scroll
    useLenis();

    // Formats pathname to a display name
    const getPageName = (path: string) => {
        if (path === '/' || path === '') return 'LUMINA';
        // e.g. "/print-store" -> "Print Store"
        const name = path.substring(1).replace(/-/g, ' ');
        // capitalize each word
        return name.replace(/\b\w/g, l => l.toUpperCase());
    };

    // Intercept route changes during render to prevent a split-second flash
    // React will immediately process these state updates before the browser paints
    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setPageName(getPageName(pathname));
        setIsPreloaderVisible(true);
    }

    // Scroll handling on route change
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
        setIsPreloaderVisible(false);
    };

    return (
        <>
            {isPreloaderVisible && <Preloader onComplete={handlePreloaderComplete} title={pageName} />}
            <div className="relative min-h-[100dvh]">
                <Navigation />
                <main className="relative">{children}</main>
                <Footer />
            </div>
        </>
    );
}
