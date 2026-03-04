"use client";

import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
    /** Starting Y offset (default: 60) */
    y?: number;
    /** Starting opacity (default: 0) */
    opacity?: number;
    /** Starting scale (default: 1) */
    scale?: number;
    /** Animation duration in seconds (default: 1) */
    duration?: number;
    /** GSAP easing (default: 'power3.out') */
    ease?: string;
    /** Delay before animation starts (default: 0) */
    delay?: number;
    /** ScrollTrigger start position (default: 'top 85%') */
    start?: string;
    /** Only animate once (default: true) */
    once?: boolean;
}

/**
 * A reusable hook for scroll-triggered reveal animations using GSAP.
 *
 * @example
 * ```tsx
 * const titleRef = useScrollReveal<HTMLHeadingElement>();
 * const cardRef = useScrollReveal<HTMLDivElement>({ y: 40, delay: 0.2 });
 *
 * return (
 *   <h1 ref={titleRef}>Title</h1>
 *   <div ref={cardRef}>Card</div>
 * );
 * ```
 */
export function useScrollReveal<T extends HTMLElement>(
    options: ScrollRevealOptions = {}
): RefObject<T | null> {
    const ref = useRef<T>(null);

    const {
        y = 60,
        opacity = 0,
        scale = 1,
        duration = 1,
        ease = 'power3.out',
        delay = 0,
        start = 'top 85%',
        once = true,
    } = options;

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: ref.current,
                start,
                once,
                onEnter: () => {
                    gsap.fromTo(
                        ref.current,
                        { y, opacity, scale },
                        { y: 0, opacity: 1, scale: 1, duration, ease, delay }
                    );
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [y, opacity, scale, duration, ease, delay, start, once]);

    return ref;
}
