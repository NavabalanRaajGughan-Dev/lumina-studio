"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
  title?: string;
}

export function Preloader({ onComplete, title = "LUMINA" }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Use refs for callbacks to avoid re-triggering the useEffect
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onCompleteRef.current) onCompleteRef.current();
        }
      });

      // Aperture rotation animation
      gsap.to(apertureRef.current, {
        rotation: 360,
        duration: 2,
        ease: 'none',
        repeat: -1
      });

      // Progress bar animation
      gsap.to(progressRef.current, {
        width: '100%',
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        }
      });

      // Logo fade in and scale
      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Hold for a moment
      tl.to({}, { duration: 0.5 });

      // Slide entire preloader up to reveal content
      tl.to(preloaderRef.current, {
        y: '-100%',
        duration: 1.2,
        ease: 'power4.inOut'
      });

      tl.set(preloaderRef.current, { display: 'none' });

    }, preloaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] bg-[#0F2617] flex items-center justify-center overflow-hidden"
    >
      {/* Center Content */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center">
        {/* Camera Aperture SVG */}
        <div ref={apertureRef} className="w-24 h-24 mb-8">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="apertureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c4a35a" />
                <stop offset="100%" stopColor="#8b7355" />
              </linearGradient>
            </defs>
            {/* Aperture blades */}
            <polygon
              points="50,10 60,35 85,25 70,50 85,75 60,65 50,90 40,65 15,75 30,50 15,25 40,35"
              fill="none"
              stroke="url(#apertureGradient)"
              strokeWidth="1.5"
            />
            <circle cx="50" cy="50" r="20" fill="none" stroke="url(#apertureGradient)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="8" fill="url(#apertureGradient)" />
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="font-sans text-3xl md:text-4xl font-bold text-white tracking-wider mb-2 uppercase">
          {title}
        </h1>
        <p className="font-serif italic text-[#c4a35a] text-sm tracking-widest mb-8">
          Photography Studio
        </p>

        {/* Progress Bar */}
        <div className="w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#c4a35a] to-[#8b7355] w-0"
          />
        </div>
        <span className="text-white/50 text-xs mt-3 font-mono">{progress}%</span>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#c4a35a]/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#c4a35a]/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#c4a35a]/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#c4a35a]/30" />
    </div>
  );
}
