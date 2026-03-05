"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen
        ? 'bg-[#0F2617]/98 backdrop-blur-md py-3 shadow-xs border-b border-white/5'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className={`font-sans font-bold text-xl tracking-tight transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-white'}`}>
            LUMINA
          </Link>

          {/* Desktop Navigation - Centered Absolutely */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[15px] font-body transition-colors duration-300 ${isActive(link.href)
                  ? 'text-white font-medium'
                  : 'text-white/60 hover:text-white'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/print-store"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-body transition-colors duration-300 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white`}
            >
              <ShoppingCart className="w-4 h-4" />
              Print Store
            </Link>
            <Link
              href="/booking"
              className="px-6 py-2.5 bg-[#c4a35a] text-forest-dark text-[15px] font-bold font-sans rounded-full hover:bg-[#c4a35a]/90 transition-colors shadow-xs"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-50 text-white p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 w-screen h-[100dvh] bg-[#0F2617]/98 backdrop-blur-3xl transition-all duration-300 overflow-y-auto flex flex-col z-40 pt-[80px] ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          <div className="px-6 py-10 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-2xl font-sans tracking-wide transition-colors duration-300 ${isActive(link.href)
                    ? 'text-white font-medium'
                    : 'text-white/60 hover:text-white'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4 pb-8 mt-auto">
              <Link
                href="/print-store"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-white/10 text-white rounded-full text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Print Store
              </Link>
              <Link
                href="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-4 bg-[#c4a35a] text-[#0F2617] font-sans font-bold rounded-full text-lg shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
