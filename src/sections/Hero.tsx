"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!heroConfig.backgroundText && !heroConfig.heroImage && heroConfig.navLinks.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for model — direct tween (GPU-accelerated, no onUpdate)
      gsap.to(modelRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Fade out overlay text
      gsap.to(overlayTextRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '30% top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0F2617]"
    >
      {/* Layer 1: Background Base & Subtle Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-photographer-taking-photos-at-a-wedding-34421-large.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability and premium look */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0F2617]/80 via-[#0F2617]/60 to-[#0F2617]/90" />
      </div>


      {/* Layer 3: Full tagline — behind model so hero image overlaps "Creating Memories" */}
      {heroConfig.overlayText && (
        <div
          ref={overlayTextRef}
          className="absolute inset-0 flex items-start justify-center pt-[24vh] md:pt-[26vh] z-[15] pointer-events-none px-4"
        >
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto drop-shadow-2xl -rotate-3">
            <p className="font-serif italic text-4xl md:text-5xl lg:text-7xl text-white/90 tracking-wide leading-tight">
              Capturing Moments,
            </p>
            <p className="font-serif italic text-4xl md:text-5xl lg:text-7xl text-white/90 tracking-wide leading-tight">
              Creating Memories
            </p>
          </div>
        </div>
      )}

      {/* Layer 4: Hero Model Image (Cutout) */}
      {heroConfig.heroImage && (
        <div
          ref={modelRef}
          className="relative flex flex-col items-center justify-end z-20 will-change-transform pt-32 pointer-events-none"
        >
          <div className="relative w-[60vw] md:w-[45vw] lg:w-[35vw] max-w-[600px] -mb-10 lg:-mb-20">
            <img
              src={heroConfig.heroImage}
              alt={heroConfig.heroImageAlt}
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              loading="eager"
            />
            {/* Gradient fade at bottom for smooth transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0F2617] via-[#0F2617]/80 to-transparent" />
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs font-body uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
