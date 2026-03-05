"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import {
  Camera,
  Heart,
  PartyPopper,
  Sparkles,
  ShoppingBag,
  Building,
  Palette,
  Users,
  ArrowRight,
  Check
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceDetail {
  icon: React.ElementType;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  priceRange: string;
  image: string;
}

const services: ServiceDetail[] = [
  {
    icon: Camera,
    title: "Portrait Photography",
    shortDesc: "Individual, couple, family and group portraits",
    fullDesc: "Our portrait sessions are designed to capture your authentic self. Whether you need professional headshots for your corporate profile, family portraits to cherish for generations, or creative personal shots, we create images that tell your unique story.",
    features: [
      "Professional studio or on-location shoots",
      "Wardrobe consultation and styling advice",
      "Multiple outfit changes",
      "High-resolution edited images",
      "Online gallery for easy sharing",
      "Print-ready files included"
    ],
    priceRange: "From LKR 25,000",
    image: "/portfolio/portrait-1.jpg"
  },
  {
    icon: Heart,
    title: "Wedding Photography",
    shortDesc: "Full wedding day coverage and pre-wedding shoots",
    fullDesc: "Your wedding day deserves to be remembered in all its glory. From the nervous anticipation of getting ready to the joyous celebration on the dance floor, we capture every emotion, every detail, and every precious moment of your special day.",
    features: [
      "Full-day coverage (8-12 hours)",
      "Second photographer included",
      "Pre-wedding consultation",
      "Engagement shoot option",
      "Premium wedding album",
      "Online gallery with download",
      "Same-day editing available"
    ],
    priceRange: "From LKR 150,000",
    image: "/portfolio/wedding-1.jpg"
  },
  {
    icon: PartyPopper,
    title: "Event Photography",
    shortDesc: "Birthdays, parties, corporate events, graduations",
    fullDesc: "From intimate birthday gatherings to large corporate galas, our event photography captures the energy and essence of your celebrations. We document key moments, candid interactions, and the overall atmosphere that makes your event unique.",
    features: [
      "Flexible hourly coverage",
      "Candid and posed shots",
      "Quick turnaround time",
      "Corporate branding options",
      "Social media-ready images",
      "On-site printing available"
    ],
    priceRange: "From LKR 20,000/hr",
    image: "/portfolio/event-1.jpg"
  },
  {
    icon: Sparkles,
    title: "Fashion & Model Photography",
    shortDesc: "Studio fashion shoots and portfolio development",
    fullDesc: "Elevate your fashion brand or modeling portfolio with stunning editorial-quality images. We work with designers, models, and agencies to create visually striking photographs that showcase style, elegance, and creativity.",
    features: [
      "Full studio lighting setup",
      "Creative direction and styling",
      "Lookbook and catalog shoots",
      "Model portfolio development",
      "Editorial-style photography",
      "Retouching and color grading"
    ],
    priceRange: "From LKR 40,000",
    image: "/portfolio/fashion-1.jpg"
  },
  {
    icon: ShoppingBag,
    title: "Commercial Photography",
    shortDesc: "Product photos for shops, catalogs, and marketing",
    fullDesc: "High-quality product photography that drives sales. From e-commerce listings to advertising campaigns, we create images that highlight your products' best features and appeal to your target audience.",
    features: [
      "Clean white background shots",
      "Lifestyle product photography",
      "360-degree product views",
      "Food photography for menus",
      "Amazon/eBay optimized images",
      "Bulk pricing available"
    ],
    priceRange: "From LKR 5,000/item",
    image: "/portfolio/commercial-1.jpg"
  },
  {
    icon: Building,
    title: "Architectural Photography",
    shortDesc: "Buildings, hotels, real-estate listings",
    fullDesc: "Showcase properties in their best light with professional architectural photography. Perfect for real estate listings, hotel marketing, construction documentation, and interior design portfolios.",
    features: [
      "Interior and exterior shots",
      "Twilight photography",
      "Drone aerial views",
      "Virtual tour integration",
      "HDR processing",
      "Fast delivery for listings"
    ],
    priceRange: "From LKR 35,000",
    image: "/projects/commercial-collection.jpg"
  },
  {
    icon: Palette,
    title: "Specialty & Art Photography",
    shortDesc: "Fine art, macro, and experimental shoots",
    fullDesc: "Push creative boundaries with our specialty photography services. From intricate macro shots to conceptual fine art pieces, we bring artistic vision and technical expertise to create truly unique images.",
    features: [
      "Macro and close-up photography",
      "Fine art prints available",
      "Conceptual and themed shoots",
      "Experimental techniques",
      "Gallery-quality printing",
      "Limited edition options"
    ],
    priceRange: "Custom Quote",
    image: "/features/equipment.jpg"
  },
  {
    icon: Users,
    title: "Family & Baby Photography",
    shortDesc: "Maternity, newborn, and milestone sessions",
    fullDesc: "Preserve your family's precious moments with heartwarming photography. From maternity glow to newborn innocence and childhood milestones, we create timeless images that become cherished family heirlooms.",
    features: [
      "Gentle newborn posing",
      "Maternity gown collection",
      "Family coordination styling",
      "Milestone packages (3, 6, 9, 12 months)",
      "Holiday mini sessions",
      "Heirloom albums and prints"
    ],
    priceRange: "From LKR 30,000",
    image: "/testimonials/client-4.jpg"
  },
];

export function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Service cards animation
      const cards = servicesRef.current?.querySelectorAll('.service-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
              delay: index * 0.1,
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-forest-dark min-h-[100dvh] pt-32 pb-24">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
          What We Offer
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight mb-6">
          Our <span className="font-serif italic font-normal text-white/80">Services</span>
        </h1>
        <p className="text-white/60 font-body text-lg max-w-2xl">
          From intimate portraits to grand commercial campaigns, we offer comprehensive
          photography services tailored to your unique vision and needs.
        </p>
      </div>

      {/* Services Grid */}
      <div ref={servicesRef} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group bg-forest-mid/50 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-mid to-transparent" />
                  {/* Icon Badge */}
                  <div className="absolute bottom-4 left-6 w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/60 font-body mb-4 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-white/70 text-sm font-body">
                        <Check className="w-4 h-4 text-[#c4a35a] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <p className="text-white/40 text-xs font-body uppercase tracking-wider">Starting from</p>
                      <p className="text-[#c4a35a] font-sans font-semibold">{service.priceRange}</p>
                    </div>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-body rounded-full transition-all duration-300"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        <div className="relative bg-gradient-to-r from-[#c4a35a]/20 to-[#8b7355]/20 rounded-3xl p-10 md:p-16 text-center border border-[#c4a35a]/20">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-white/60 font-body max-w-xl mx-auto mb-8">
            Let's discuss your project and find the perfect photography solution for you.
            We offer custom packages tailored to your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-forest-dark font-sans font-semibold rounded-full hover:bg-white/90 transition-colors duration-300"
            >
              Get a Custom Quote
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white/10 text-white font-sans font-semibold rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/20"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
