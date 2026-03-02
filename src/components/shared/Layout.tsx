"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main className="relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}
