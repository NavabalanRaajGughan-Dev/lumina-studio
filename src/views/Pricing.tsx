"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Check, Star, ArrowRight, Camera, Heart, Users, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingPackage {
  icon: React.ElementType;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  popular?: boolean;
}

const weddingPackages: PricingPackage[] = [
  {
    icon: Heart,
    name: "Essential",
    description: "Perfect for intimate weddings",
    price: "LKR 150,000",
    period: "per event",
    features: [
      "6 hours coverage",
      "1 professional photographer",
      "200+ edited photos",
      "Online gallery",
      "USB with all images",
    ],
  },
  {
    icon: Heart,
    name: "Premium",
    description: "Our most popular choice",
    price: "LKR 250,000",
    period: "per event",
    features: [
      "10 hours coverage",
      "2 professional photographers",
      "400+ edited photos",
      "Online gallery",
      "Premium wedding album",
      "Engagement shoot included",
      "Same-day highlights",
    ],
    highlighted: true,
    popular: true,
  },
  {
    icon: Heart,
    name: "Luxury",
    description: "The complete experience",
    price: "LKR 400,000",
    period: "per event",
    features: [
      "Full day coverage",
      "2 photographers + assistant",
      "600+ edited photos",
      "Online gallery",
      "Luxury leather album",
      "Pre & post-wedding shoots",
      "Cinematic video highlights",
      "Drone coverage",
    ],
  },
];

const portraitPackages: PricingPackage[] = [
  {
    icon: Camera,
    name: "Mini Session",
    description: "Quick professional shots",
    price: "LKR 25,000",
    period: "per session",
    features: [
      "30-minute session",
      "Studio or outdoor",
      "10 edited photos",
      "Online gallery",
      "1 outfit change",
    ],
  },
  {
    icon: Camera,
    name: "Standard",
    description: "Complete portrait experience",
    price: "LKR 45,000",
    period: "per session",
    features: [
      "1-hour session",
      "Studio or outdoor",
      "25 edited photos",
      "Online gallery",
      "3 outfit changes",
      "Professional retouching",
    ],
    highlighted: true,
  },
  {
    icon: Camera,
    name: "Family Deluxe",
    description: "For the whole family",
    price: "LKR 75,000",
    period: "per session",
    features: [
      "2-hour session",
      "Studio or outdoor",
      "50 edited photos",
      "Online gallery",
      "Unlimited outfit changes",
      "Large canvas print",
      "Family album",
    ],
  },
];

const eventPackages: PricingPackage[] = [
  {
    icon: Users,
    name: "Basic",
    description: "Small gatherings",
    price: "LKR 20,000",
    period: "per hour",
    features: [
      "Minimum 3 hours",
      "1 photographer",
      "Candid & posed shots",
      "Online gallery",
      "Quick delivery",
    ],
  },
  {
    icon: Users,
    name: "Corporate",
    description: "Business events",
    price: "LKR 35,000",
    period: "per hour",
    features: [
      "Minimum 4 hours",
      "1 photographer",
      "Corporate branding",
      "Headshots included",
      "24-hour delivery",
      "Commercial usage rights",
    ],
    highlighted: true,
  },
  {
    icon: Users,
    name: "Grand",
    description: "Large celebrations",
    price: "LKR 50,000",
    period: "per hour",
    features: [
      "Minimum 5 hours",
      "2 photographers",
      "Full coverage",
      "Same-day preview",
      "48-hour delivery",
      "Highlight video",
    ],
  },
];

const commercialPackages: PricingPackage[] = [
  {
    icon: Building,
    name: "Product Basic",
    description: "E-commerce ready",
    price: "LKR 5,000",
    period: "per product",
    features: [
      "White background",
      "3 angles per product",
      "Basic retouching",
      "Web-ready files",
      "Bulk discounts available",
    ],
  },
  {
    icon: Building,
    name: "Product Pro",
    description: "Premium product shots",
    price: "LKR 12,000",
    period: "per product",
    features: [
      "Lifestyle setup",
      "5+ angles per product",
      "Advanced retouching",
      "Print-ready files",
      "360° view option",
    ],
    highlighted: true,
  },
  {
    icon: Building,
    name: "Architectural",
    description: "Property showcase",
    price: "LKR 35,000",
    period: "per project",
    features: [
      "Interior & exterior",
      "HDR processing",
      "Twilight shots",
      "20+ final images",
      "Fast turnaround",
    ],
  },
];

function PackageCard({ pkg }: { pkg: PricingPackage }) {
  const Icon = pkg.icon;
  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-500 ${pkg.highlighted
        ? 'bg-gradient-to-b from-[#c4a35a]/20 to-[#8b7355]/10 border-2 border-[#c4a35a]/50 scale-105'
        : 'bg-forest-mid/50 border border-white/10 hover:border-white/20'
        }`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#c4a35a] rounded-full">
          <span className="text-forest-dark text-sm font-sans font-semibold flex items-center gap-1">
            <Star className="w-4 h-4" /> Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${pkg.highlighted ? 'bg-[#c4a35a]/20' : 'bg-white/10'
          }`}>
          <Icon className={`w-7 h-7 ${pkg.highlighted ? 'text-[#c4a35a]' : 'text-white'}`} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-sans font-semibold text-white mb-2">
          {pkg.name}
        </h3>
        <p className="text-white/50 font-body text-sm">
          {pkg.description}
        </p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-sans font-bold text-white">{pkg.price}</span>
        <span className="text-white/50 font-body text-sm ml-2">{pkg.period}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-white/70 text-sm font-body">
            <Check className={`w-5 h-5 flex-shrink-0 ${pkg.highlighted ? 'text-[#c4a35a]' : 'text-white/50'}`} />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`w-full py-3 rounded-full font-sans font-semibold text-center flex items-center justify-center gap-2 transition-all duration-300 ${pkg.highlighted
          ? 'bg-white text-forest-dark hover:bg-white/90'
          : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
          }`}
      >
        Book Now
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export function Pricing() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Package sections
      const sections = sectionsRef.current?.querySelectorAll('.pricing-section');
      if (sections) {
        sections.forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            onEnter: () => {
              gsap.fromTo(
                section,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
              );
            },
            once: true,
          });
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
          Investment
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight mb-6">
          Pricing <span className="font-serif italic font-normal text-white/80">Plans</span>
        </h1>
        <p className="text-white/60 font-body text-lg max-w-2xl">
          Transparent pricing for every need. Choose the package that fits your vision,
          or contact us for a custom quote tailored to your specific requirements.
        </p>
      </div>

      {/* Pricing Sections */}
      <div ref={sectionsRef} className="space-y-24">
        {/* Wedding Packages */}
        <div className="pricing-section max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#c4a35a]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl font-sans font-bold text-white">Wedding Packages</h2>
              <p className="text-white/50 font-body">Capture your special day</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {weddingPackages.map((pkg, idx) => (
              <PackageCard key={idx} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Portrait Packages */}
        <div className="pricing-section max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Camera className="w-6 h-6 text-[#c4a35a]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl font-sans font-bold text-white">Portrait Sessions</h2>
              <p className="text-white/50 font-body">Professional portraits for every occasion</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {portraitPackages.map((pkg, idx) => (
              <PackageCard key={idx} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Event Packages */}
        <div className="pricing-section max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#c4a35a]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl font-sans font-bold text-white">Event Coverage</h2>
              <p className="text-white/50 font-body">From corporate to celebrations</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {eventPackages.map((pkg, idx) => (
              <PackageCard key={idx} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Commercial Packages */}
        <div className="pricing-section max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Building className="w-6 h-6 text-[#c4a35a]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl font-sans font-bold text-white">Commercial Services</h2>
              <p className="text-white/50 font-body">Elevate your brand</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {commercialPackages.map((pkg, idx) => (
              <PackageCard key={idx} pkg={pkg} />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Quote CTA */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="relative bg-gradient-to-r from-[#c4a35a]/20 to-[#8b7355]/20 rounded-3xl p-10 md:p-16 text-center border border-[#c4a35a]/20">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">
            Need Something Custom?
          </h2>
          <p className="text-white/60 font-body max-w-xl mx-auto mb-8">
            Every project is unique. Contact us for a personalized quote tailored to your
            specific requirements and budget.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-forest-dark font-sans font-semibold rounded-full hover:bg-white/90 transition-colors duration-300"
          >
            Get a Custom Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
