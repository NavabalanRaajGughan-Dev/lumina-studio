"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Beach Wedding Bliss",
    category: "wedding",
    image: "/portfolio/wedding-1.jpg",
    description: "A romantic beach wedding at sunset in Bentota"
  },
  {
    id: 2,
    title: "Executive Portrait",
    category: "portrait",
    image: "/portfolio/portrait-1.jpg",
    description: "Professional corporate headshot session"
  },
  {
    id: 3,
    title: "High Fashion Editorial",
    category: "fashion",
    image: "/portfolio/fashion-1.jpg",
    description: "Vogue-style fashion photography"
  },
  {
    id: 4,
    title: "Cultural Celebration",
    category: "event",
    image: "/portfolio/event-1.jpg",
    description: "Traditional Sri Lankan festival documentation"
  },
  {
    id: 5,
    title: "Luxury Product",
    category: "commercial",
    image: "/portfolio/commercial-1.jpg",
    description: "Premium perfume product photography"
  },
  {
    id: 6,
    title: "Eternal Vows",
    category: "wedding",
    image: "/projects/wedding-collection.jpg",
    description: "Destination wedding ceremony"
  },
  {
    id: 7,
    title: "Urban Elegance",
    category: "fashion",
    image: "/projects/fashion-collection.jpg",
    description: "Contemporary fashion editorial"
  },
  {
    id: 8,
    title: "Sacred Moments",
    category: "event",
    image: "/projects/event-collection.jpg",
    description: "Traditional ceremony photography"
  },
  {
    id: 9,
    title: "Brand Stories",
    category: "commercial",
    image: "/projects/commercial-collection.jpg",
    description: "Luxury hotel interior photography"
  },
];

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'event', label: 'Event' },
  { id: 'commercial', label: 'Commercial' },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Grid items staggered animation
      const items = gridRef.current?.querySelectorAll('.portfolio-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.3,
          }
        );
      }
    });

    return () => ctx.revert();
  }, [activeCategory]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="relative w-full bg-forest-dark min-h-[100dvh] pt-32 pb-24">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
          Our Work
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight mb-6">
          Portfolio
        </h1>
        <p className="text-white/60 font-body text-lg max-w-2xl">
          Explore our collection of carefully crafted photographs spanning weddings, portraits,
          fashion, events, and commercial projects across Sri Lanka.
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full text-sm font-body font-medium tracking-wide transition-all duration-300 border ${activeCategory === cat.id
                ? 'bg-[#c4a35a] text-white border-[#c4a35a] shadow-lg shadow-[#c4a35a]/20'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="portfolio-item group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/60 text-sm font-body uppercase tracking-wider mb-2">
                    {categories.find(c => c.id === item.category)?.label}
                  </p>
                  <h3 className="text-xl font-sans font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm font-body">
                    {item.description}
                  </p>
                </div>
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-forest-dark/98 backdrop-blur-lg flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            title="Close Lightbox"
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={prevImage}
            title="Previous Image"
            aria-label="Previous Image"
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            title="Next Image"
            aria-label="Next Image"
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[80vh] px-20">
            <Image
              src={filteredItems[currentImageIndex].image}
              alt={filteredItems[currentImageIndex].title}
              width={1200}
              height={800}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-6 text-center">
              <p className="text-white/50 text-sm font-body uppercase tracking-wider mb-2">
                {categories.find(c => c.id === filteredItems[currentImageIndex].category)?.label}
              </p>
              <h3 className="text-2xl font-sans font-semibold text-white">
                {filteredItems[currentImageIndex].title}
              </h3>
              <p className="text-white/60 font-body mt-2">
                {filteredItems[currentImageIndex].description}
              </p>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-body">
            {currentImageIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}
    </div>
  );
}
