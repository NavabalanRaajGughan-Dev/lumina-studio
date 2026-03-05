"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Camera,
  Heart,
  PartyPopper,
  Sparkles,
  ShoppingBag,
  Building,
  Palette,
  Users,
  type LucideIcon
} from 'lucide-react';
import { servicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Camera,
  Heart,
  PartyPopper,
  Sparkles,
  ShoppingBag,
  Building,
  Palette,
  Users,
};

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  if (!servicesConfig.titleLine1 && servicesConfig.services.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading — slide up
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headingRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Service cards — staggered slide up
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 78%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.12,
              }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-24 md:py-32 bg-[#0F2617]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column - Heading */}
          <div ref={headingRef} className="opacity-0">
            {servicesConfig.subtitle && (
              <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
                {servicesConfig.subtitle}
              </p>
            )}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-tight">
              {servicesConfig.titleLine1}
              <br />
              <span className="font-serif italic font-normal text-white/80">
                {servicesConfig.titleLine2Italic}
              </span>
            </h2>
            {servicesConfig.description && (
              <p className="mt-6 text-white/60 font-body text-base md:text-lg max-w-md leading-relaxed">
                {servicesConfig.description}
              </p>
            )}
          </div>

          {/* Right Column - Services Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {servicesConfig.services.map((service, index) => {
              const Icon = iconMap[service.iconName] || Camera;
              // Hardcoded beautiful background images corresponding to the services
              const bgImages = [
                "/portfolio/portrait-1.jpg",
                "/portfolio/wedding-1.jpg",
                "/portfolio/event-1.jpg",
                "/portfolio/fashion-1.jpg",
                "/portfolio/commercial-1.jpg",
                "/projects/commercial-collection.jpg",
                "/features/equipment.jpg",
                "/testimonials/client-4.jpg"
              ];
              const hoverImg = bgImages[index % bgImages.length];

              return (
                <div
                  key={index}
                  className="service-card group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 p-6 md:p-8 opacity-0 transition-all duration-[800ms] hover:-translate-y-2 hover:border-[#c4a35a]/40 hover:shadow-[0_15px_50px_rgba(196,163,90,0.15)] cursor-pointer isolate min-h-[280px]"
                >
                  {/* Image Reveal on Hover */}
                  <div className="absolute inset-0 -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <Image
                      src={hoverImg}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                    />
                  </div>

                  {/* Heavy Gradient Overlay so text remains 100% readable over the bright images */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0F2617]/95 via-[#0F2617]/85 to-[#c4a35a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms]" />

                  {/* Top Bar: Icon + Arrow */}
                  <div className="flex items-center justify-between mb-8 z-10 w-full transform transition-transform duration-[800ms] group-hover:-translate-y-1">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-[#c4a35a] group-hover:border-[#c4a35a] group-hover:shadow-[0_0_20px_rgba(196,163,90,0.5)] transition-all duration-500">
                      <Icon className="w-6 h-6 text-[#c4a35a] group-hover:text-[#0F2617] transition-colors duration-500" strokeWidth={1.5} />
                    </div>

                    {/* Fly-in Arrow */}
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-white/10 transition-all duration-500 ease-out transform">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="mt-auto z-10 transform transition-transform duration-[800ms] group-hover:-translate-y-1">
                    <h3 className="text-xl md:text-2xl font-sans font-bold text-white mb-3 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/50 font-body leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
