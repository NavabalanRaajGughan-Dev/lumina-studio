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
      // Store ScrollTrigger instances for cleanup
      const triggers: ScrollTrigger[] = [];

      // Parallax effect for model (slower movement = appears closer)
      const modelTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (modelRef.current) {
            gsap.set(modelRef.current, { yPercent: self.progress * 20 });
          }
        },
      });
      triggers.push(modelTrigger);

      // Fade out overlay text faster
      const overlayTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '30% top',
        scrub: 1,
        onUpdate: (self) => {
          if (overlayTextRef.current) {
            gsap.set(overlayTextRef.current, { opacity: 1 - self.progress });
          }
        },
      });
      triggers.push(overlayTrigger);

      // Cleanup function
      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-forest-dark"
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
        <div className="absolute inset-0 bg-linear-to-b from-forest-dark/80 via-forest-dark/60 to-forest-dark/90" />
      </div>

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] z-1"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />


      {/* Layer 3: Primary Subtitle/Tagline Structured Behind the Image */}
      {heroConfig.overlayText && (
        <div
          ref={overlayTextRef}
          className="absolute inset-0 flex items-center justify-center z-[15] pointer-events-none px-4"
        >
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto -mt-20 md:-mt-32 drop-shadow-2xl">
            <p className="font-serif italic text-4xl md:text-5xl lg:text-7xl text-white/90 tracking-wide leading-tight">
              {heroConfig.overlayText}
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
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-forest-dark via-forest-dark/80 to-transparent" />
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
