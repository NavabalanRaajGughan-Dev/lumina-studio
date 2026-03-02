import { Hero } from '../sections/Hero';
import { IntroGrid } from '../sections/IntroGrid';
import { Services as ServicesSection } from '../sections/Services';
import { WhyChooseMe } from '../sections/WhyChooseMe';
import { FeaturedProjects } from '../sections/FeaturedProjects';
import { Testimonials } from '../sections/Testimonials';
import { FAQ } from '../sections/FAQ';

export function Home() {
  return (
    <>
      {/* Hero Section - Parallax Layering */}
      <Hero />

      {/* Intro & Masonry Grid - White Section */}
      <IntroGrid />

      {/* Services - Dark Section */}
      <ServicesSection />

      {/* Why Choose Me & Stats - White Section */}
      <WhyChooseMe />

      {/* Featured Projects - Dark Section */}
      <FeaturedProjects />

      {/* Testimonials Carousel - White Section */}
      <Testimonials />

      {/* FAQ Accordion - Dark Section */}
      <FAQ />
    </>
  );
}
