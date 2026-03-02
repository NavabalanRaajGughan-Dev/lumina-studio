"use client";

import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail, ShoppingCart, Calendar } from 'lucide-react';

export function Footer() {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const quickLinks = [
    { label: 'Book a Session', href: '/booking', icon: Calendar },
    { label: 'Print Store', href: '/print-store', icon: ShoppingCart },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/luminastudio', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/luminastudio', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com/company/luminastudio', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@luminastudio.lk', label: 'Email' },
  ];

  return (
    <footer className="relative w-full bg-white pt-16 md:pt-24 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Logo */}
        <div className="mb-12 md:mb-20">
          <svg
            viewBox="0 0 600 100"
            className="w-full h-auto max-h-[15vh] md:max-h-[20vh]"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="fill-softblack font-sans font-extrabold"
              style={{
                fontSize: '90px',
                letterSpacing: '-0.03em',
              }}
            >
              LUMINA
            </text>
          </svg>
        </div>

        {/* Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-16">
          {/* Contact Info */}
          <div>
            <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <a
              href="mailto:hello@luminastudio.lk"
              className="text-lg md:text-xl font-sans font-semibold text-softblack hover:text-softblack/70 transition-colors duration-300"
            >
              hello@luminastudio.lk
            </a>
            <p className="mt-4 text-softblack/60 font-body text-sm whitespace-pre-line">
              42, Galle Road
              <br />
              Colombo 03, Sri Lanka
            </p>
            <p className="mt-2 text-softblack/60 font-body text-sm">
              +94 11 234 5678
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
              Navigation
            </p>
            <nav className="space-y-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-softblack/80 hover:text-softblack font-body transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
              Quick Links
            </p>
            <nav className="space-y-2.5">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-softblack/80 hover:text-softblack font-body transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-4">
              Follow Us
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-offwhite flex items-center justify-center text-softblack/70 hover:bg-forest-dark hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
            <p className="mt-6 text-softblack/40 font-body text-sm whitespace-pre-line">
              Capturing Moments,
              <br />
              Creating Memories
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-softblack/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-softblack/40 font-body text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Lumina Photography Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-softblack/40 font-body text-sm">
            <Link href="/privacy" className="hover:text-softblack transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-softblack transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
