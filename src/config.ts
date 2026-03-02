// Site Configuration
// Lumina Photography Studio - Sri Lanka

export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Lumina Photography Studio | Sri Lanka",
  siteDescription: "Premium photography studio in Sri Lanka specializing in portrait, wedding, event, fashion, commercial, and architectural photography. Capturing moments that last forever.",
};

// Hero Section
export interface HeroConfig {
  backgroundText: string;
  heroImage: string;
  heroImageAlt: string;
  overlayText: string;
  brandName: string;
  navLinks: { label: string; href: string }[];
}

export const heroConfig: HeroConfig = {
  backgroundText: "LUMINA",
  heroImage: "/hero-photographer.png",
  heroImageAlt: "Professional photographer with camera",
  overlayText: "Capturing Moments, Creating Memories",
  brandName: "LUMINA",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

// Intro Grid Section
export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface IntroGridConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  portfolioImages: PortfolioImage[];
  accentText: string;
}

export const introGridConfig: IntroGridConfig = {
  titleLine1: "Where Vision",
  titleLine2: "Meets Light",
  description: "At Lumina Photography Studio, we transform fleeting moments into timeless art. Based in the heart of Sri Lanka, our team of passionate photographers brings creativity, technical excellence, and an eye for beauty to every project. From intimate portraits to grand celebrations, we capture the essence of your story with precision and artistry.",
  portfolioImages: [
    { src: "/portfolio/wedding-1.jpg", alt: "Wedding photography - bride and groom" },
    { src: "/portfolio/portrait-1.jpg", alt: "Portrait photography" },
    { src: "/portfolio/fashion-1.jpg", alt: "Fashion photography" },
    { src: "/portfolio/event-1.jpg", alt: "Event photography" },
    { src: "/portfolio/commercial-1.jpg", alt: "Commercial photography" },
  ],
  accentText: "Selected Works - 2024",
};

// Featured Projects Section
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface FeaturedProjectsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  viewAllText: string;
  viewAllHref: string;
  viewProjectText: string;
  projects: Project[];
}

export const featuredProjectsConfig: FeaturedProjectsConfig = {
  subtitle: "Featured Work",
  titleRegular: "Signature",
  titleItalic: "Collections",
  viewAllText: "View All Projects",
  viewAllHref: "#portfolio",
  viewProjectText: "View Project",
  projects: [
    {
      id: 1,
      title: "Eternal Vows",
      category: "Wedding Photography",
      year: "2024",
      image: "/projects/wedding-collection.jpg",
      description: "A breathtaking destination wedding captured at the golden shores of Bentota. Every emotion, every tear, every smile preserved in stunning detail."
    },
    {
      id: 2,
      title: "Urban Elegance",
      category: "Fashion Photography",
      year: "2024",
      image: "/projects/fashion-collection.jpg",
      description: "High-fashion editorial shoot featuring contemporary Sri Lankan designers. Bold colors, dramatic lighting, and uncompromising style."
    },
    {
      id: 3,
      title: "Sacred Moments",
      category: "Event Photography",
      year: "2024",
      image: "/projects/event-collection.jpg",
      description: "Traditional Sri Lankan ceremonies and celebrations documented with cultural sensitivity and artistic vision."
    },
    {
      id: 4,
      title: "Brand Stories",
      category: "Commercial Photography",
      year: "2024",
      image: "/projects/commercial-collection.jpg",
      description: "Product and brand photography that elevates your business. From luxury hotels to artisanal crafts, we make your brand shine."
    },
  ],
};

// Services Section
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
}

export interface ServicesConfig {
  subtitle: string;
  titleLine1: string;
  titleLine2Italic: string;
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  subtitle: "What We Offer",
  titleLine1: "Our",
  titleLine2Italic: "Expertise",
  description: "From intimate portraits to grand commercial campaigns, Lumina Photography Studio offers comprehensive photography services tailored to your unique vision. Our diverse expertise spans nine specialized categories, ensuring every moment is captured with artistry and precision.",
  services: [
    {
      iconName: "Camera",
      title: "Portrait Photography",
      description: "Individual, couple, family and group portraits. Professional headshots and corporate profile shots that capture your authentic self."
    },
    {
      iconName: "Heart",
      title: "Wedding Photography",
      description: "Full wedding day coverage, pre-wedding and post-wedding shoots. Candid and traditional wedding styles to tell your love story."
    },
    {
      iconName: "PartyPopper",
      title: "Event Photography",
      description: "Birthdays, parties, corporate events, graduations, cultural events. Capturing key moments and expressions that matter."
    },
    {
      iconName: "Sparkles",
      title: "Fashion & Model Photography",
      description: "Studio fashion shoots, portfolio & editorial work, model portfolio development for aspiring and professional models."
    },
    {
      iconName: "ShoppingBag",
      title: "Commercial / Product Photography",
      description: "Photos for online shops, catalogs, marketing. Food photography for restaurants and menus that make mouths water."
    },
    {
      iconName: "Building",
      title: "Architectural & Interior Photography",
      description: "Buildings, homes, hotels, real-estate listings. Hotel/resort marketing photography that showcases spaces beautifully."
    },
    {
      iconName: "Palette",
      title: "Specialty & Art Photography",
      description: "Fine art photos, macro photography (close-ups), experimental and styled shoots for unique creative visions."
    },
    {
      iconName: "Users",
      title: "Family & Baby Photography",
      description: "Maternity, newborn, baby milestone sessions. Creating cherished memories of your family's precious moments."
    },
  ],
};

// Why Choose Me Section
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WhyChooseMeConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  statsLabel: string;
  stats: StatItem[];
  featureCards: FeatureCard[];
  wideImage: string;
  wideImageAlt: string;
  wideTitle: string;
  wideDescription: string;
}

export const whyChooseMeConfig: WhyChooseMeConfig = {
  subtitle: "Why Choose Us",
  titleRegular: "The Lumina",
  titleItalic: "Difference",
  statsLabel: "By The Numbers",
  stats: [
    { value: 15, suffix: "+", label: "Years Experience" },
    { value: 5000, suffix: "+", label: "Projects Completed" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 50, suffix: "+", label: "Industry Awards" },
  ],
  featureCards: [
    {
      image: "/features/equipment.jpg",
      imageAlt: "Professional camera equipment",
      title: "State-of-the-Art Equipment",
      description: "We invest in the latest photography technology, from high-resolution cameras to advanced lighting systems, ensuring every shot is captured with exceptional clarity and detail."
    },
    {
      image: "/features/team.jpg",
      imageAlt: "Our photography team",
      title: "Expert Creative Team",
      description: "Our photographers are not just technicians; they are artists with a passion for storytelling. Each team member brings unique expertise and creative vision to every project."
    },
  ],
  wideImage: "/features/studio.jpg",
  wideImageAlt: "Lumina photography studio interior",
  wideTitle: "Premium Studio Space",
  wideDescription: "Our fully-equipped studio in Colombo offers multiple shooting environments, from minimalist white spaces to dramatic dark setups, providing the perfect backdrop for any vision.",
};

// Testimonials Section
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface TestimonialsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  testimonials: Testimonial[];
}

export const testimonialsConfig: TestimonialsConfig = {
  subtitle: "Client Stories",
  titleRegular: "Words of",
  titleItalic: "Appreciation",
  testimonials: [
    {
      id: 1,
      name: "Priya & Arjun",
      role: "Wedding Clients",
      image: "/testimonials/client-1.jpg",
      quote: "Lumina captured our wedding day with such artistry and emotion. Every photo tells a story, and looking through our album brings back all the joy of that special day. Truly exceptional work."
    },
    {
      id: 2,
      name: "Dinesh Fernando",
      role: "CEO, Ceylon Resorts",
      image: "/testimonials/client-2.jpg",
      quote: "The architectural photography Lumina provided for our hotels exceeded all expectations. Their attention to detail and ability to capture the essence of our properties has significantly elevated our marketing."
    },
    {
      id: 3,
      name: "Shalini Perera",
      role: "Fashion Designer",
      image: "/testimonials/client-3.jpg",
      quote: "Working with Lumina on my fashion lookbook was an incredible experience. They understood my vision perfectly and delivered images that truly showcase my designs in the best light."
    },
    {
      id: 4,
      name: "The Silva Family",
      role: "Family Portrait Clients",
      image: "/testimonials/client-4.jpg",
      quote: "Our family portrait session was so much fun, and the results are absolutely stunning. The team made everyone feel comfortable, and they captured our family's personality beautifully."
    },
  ],
};

// FAQ Section
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  subtitle: "Common Questions",
  titleRegular: "Frequently",
  titleItalic: "Asked",
  ctaText: "Still have questions?",
  ctaButtonText: "Get in Touch",
  ctaHref: "#contact",
  faqs: [
    {
      id: "1",
      question: "How far in advance should I book a photography session?",
      answer: "We recommend booking wedding photography at least 6-12 months in advance, especially during peak season (December-March). For other sessions like portraits, events, or commercial work, 2-4 weeks notice is typically sufficient. However, we always try to accommodate last-minute requests when possible."
    },
    {
      id: "2",
      question: "What is included in your wedding photography packages?",
      answer: "Our wedding packages typically include full-day coverage (8-12 hours), a second photographer, professional editing of all images, an online gallery for sharing and downloading, and a premium photo album. We also offer add-ons like engagement shoots, drone coverage, and same-day editing. Custom packages can be tailored to your specific needs."
    },
    {
      id: "3",
      question: "Do you travel for destination weddings and events?",
      answer: "Absolutely! We love destination weddings and have photographed celebrations across Sri Lanka and internationally. Travel fees are calculated based on location and duration. Contact us with your destination details for a custom quote."
    },
    {
      id: "4",
      question: "How long does it take to receive the final photos?",
      answer: "For portrait sessions, you can expect your edited photos within 1-2 weeks. Wedding galleries are typically delivered within 4-6 weeks. Commercial and product photography timelines vary based on project scope but are agreed upon before shooting begins. Rush delivery is available for an additional fee."
    },
    {
      id: "5",
      question: "Can I request specific shots or styles?",
      answer: "Of course! We encourage clients to share their vision, inspiration photos, and any specific shots they want. During our pre-session consultation, we'll discuss your preferences, style, and must-have shots to ensure we capture exactly what you're looking for."
    },
    {
      id: "6",
      question: "What are your payment terms?",
      answer: "We require a 50% deposit to secure your booking, with the remaining balance due one week before the session for weddings and on the day of the shoot for other sessions. We accept bank transfers, credit cards, and cash. Payment plans are available for larger packages."
    },
  ],
};

// Footer Section
export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logoText: string;
  contactLabel: string;
  email: string;
  locationText: string;
  navigationLabel: string;
  navLinks: FooterLink[];
  socialLabel: string;
  socialLinks: SocialLink[];
  tagline: string;
  copyright: string;
  bottomLinks: FooterLink[];
}

export const footerConfig: FooterConfig = {
  logoText: "LUMINA",
  contactLabel: "Get in Touch",
  email: "hello@luminastudio.lk",
  locationText: "42, Galle Road\nColombo 03, Sri Lanka",
  navigationLabel: "Navigation",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  socialLabel: "Follow Along",
  socialLinks: [
    { iconName: "Instagram", href: "https://instagram.com/luminastudio", label: "Instagram" },
    { iconName: "Facebook", href: "https://facebook.com/luminastudio", label: "Facebook" },
    { iconName: "Linkedin", href: "https://linkedin.com/company/luminastudio", label: "LinkedIn" },
    { iconName: "Mail", href: "mailto:hello@luminastudio.lk", label: "Email" },
  ],
  tagline: "Capturing Moments,\nCreating Memories",
  copyright: "© 2024 Lumina Photography Studio. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
  ],
};
