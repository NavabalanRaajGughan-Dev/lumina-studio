"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Camera, Users, Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Rajitha Fernando",
    role: "Founder & Lead Photographer",
    image: "/testimonials/client-2.jpg",
    bio: "With over 15 years of experience, Rajitha has captured over 500 weddings and countless portraits. His passion for storytelling through images drives the creative vision of Lumina."
  },
  {
    name: "Dilini Perera",
    role: "Senior Portrait Photographer",
    image: "/testimonials/client-3.jpg",
    bio: "Dilini specializes in capturing authentic emotions and natural expressions. Her warm personality puts every client at ease, resulting in genuine and heartfelt portraits."
  },
  {
    name: "Kasun Silva",
    role: "Event & Commercial Specialist",
    image: "/testimonials/client-1.jpg",
    bio: "Kasun's eye for detail and ability to anticipate moments makes him our go-to photographer for events and commercial projects. He never misses the perfect shot."
  },
  {
    name: "Amaya Gunawardena",
    role: "Fashion & Editorial Photographer",
    image: "/portfolio/fashion-1.jpg",
    bio: "Amaya brings a fresh, contemporary perspective to fashion photography. Her work has been featured in leading Sri Lankan fashion magazines and international campaigns."
  },
];

const achievements = [
  { icon: Award, value: "50+", label: "Industry Awards" },
  { icon: Camera, value: "5000+", label: "Projects Completed" },
  { icon: Users, value: "3000+", label: "Happy Clients" },
  { icon: Heart, value: "15+", label: "Years of Excellence" },
];

const values = [
  {
    title: "Creativity",
    description: "We believe every shot should tell a story. Our creative approach ensures your photos are unique and memorable."
  },
  {
    title: "Quality",
    description: "From equipment to editing, we maintain the highest standards to deliver exceptional results every time."
  },
  {
    title: "Passion",
    description: "Photography is not just our profession—it's our passion. This love for our craft shines through in every image we create."
  },
  {
    title: "Trust",
    description: "We build lasting relationships with our clients based on transparency, reliability, and exceeding expectations."
  },
];

export function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Image reveal animations (bottom-to-top clip-path wipe)
      // Initial clip state is set via inline CSS to prevent flash
      const revealImages = document.querySelectorAll('.img-reveal');
      revealImages.forEach((img) => {
        ScrollTrigger.create({
          trigger: img,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(img, {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.2,
              ease: 'power4.inOut',
            });
          },
          once: true,
        });
      });

      // Hero image — animate immediately (no scroll trigger)
      // Initial clip state is set via inline CSS to prevent flash
      const heroImage = heroRef.current?.querySelector('.img-reveal-hero');
      if (heroImage) {
        gsap.to(heroImage, {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.4,
          ease: 'power4.inOut',
          delay: 0.3,
        });
      }

      // Story section
      ScrollTrigger.create({
        trigger: storyRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            storyRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Team cards — unified card + image reveal
      const teamCards = teamRef.current?.querySelectorAll('.team-card');
      if (teamCards) {
        teamCards.forEach((card, index) => {
          const img = card.querySelector('.team-img');
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              const tl = gsap.timeline();
              tl.fromTo(
                card,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: index * 0.1 }
              );
              if (img) {
                tl.to(
                  img,
                  { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.inOut' },
                  '<0.1'
                );
              }
            },
            once: true,
          });
        });
      }

      // Values cards
      const valueCards = valuesRef.current?.querySelectorAll('.value-card');
      if (valueCards) {
        valueCards.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(
                card,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: index * 0.1 }
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
    <div className="relative w-full bg-forest-dark min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative pt-32 pb-20 opacity-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
                About Us
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight mb-6">
                Our <span className="font-serif italic font-normal text-white/80">Story</span>
              </h1>
              <p className="text-white/60 font-body text-lg leading-relaxed mb-8">
                Lumina Photography Studio was founded in 2009 with a simple mission:
                to capture life's most precious moments with artistry and authenticity.
                What started as a small home studio has grown into one of Sri Lanka's
                most respected photography studios.
              </p>
              <p className="text-white/60 font-body text-lg leading-relaxed">
                Today, our team of passionate photographers continues to push creative
                boundaries while staying true to our core belief—that every photograph
                should tell a story that lasts forever.
              </p>
            </div>
            <div className="relative">
              <div className="img-reveal-hero aspect-[4/5] rounded-2xl overflow-hidden [clip-path:inset(100%_0_0_0)]">
                <img
                  src="/features/studio.jpg"
                  alt="Lumina Photography Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#c4a35a]/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#c4a35a]" />
                  </div>
                  <div>
                    <p className="text-3xl font-sans font-bold text-forest-dark">4.9</p>
                    <p className="text-sm text-forest-dark/60 font-body">Client Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Bar */}
      <div className="bg-forest-mid/50 py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#c4a35a]" strokeWidth={1.5} />
                  </div>
                  <p className="text-4xl font-sans font-bold text-white mb-2">{item.value}</p>
                  <p className="text-white/50 text-sm font-body">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div ref={storyRef} className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="img-reveal aspect-[3/4] rounded-xl overflow-hidden [clip-path:inset(100%_0_0_0)]">
                  <img
                    src="/features/equipment.jpg"
                    alt="Studio Equipment"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="img-reveal aspect-[3/4] rounded-xl overflow-hidden mt-8 [clip-path:inset(100%_0_0_0)]">
                  <img
                    src="/features/team.jpg"
                    alt="Our Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">
                Why Choose <span className="font-serif italic font-normal text-white/80">Lumina?</span>
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-sans font-semibold text-white mb-2">
                    State-of-the-Art Equipment
                  </h3>
                  <p className="text-white/60 font-body leading-relaxed">
                    We invest in the latest photography technology, from high-resolution cameras
                    to advanced lighting systems, ensuring every shot is captured with exceptional clarity.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-sans font-semibold text-white mb-2">
                    Experienced Creative Team
                  </h3>
                  <p className="text-white/60 font-body leading-relaxed">
                    Our photographers are artists with a passion for storytelling. Each team member
                    brings unique expertise and creative vision to every project.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-sans font-semibold text-white mb-2">
                    Premium Studio Space
                  </h3>
                  <p className="text-white/60 font-body leading-relaxed">
                    Our fully-equipped Colombo studio offers multiple shooting environments,
                    from minimalist white spaces to dramatic dark setups.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div ref={valuesRef} className="py-24 bg-forest-mid/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
              What Drives Us
            </p>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white">
              Our <span className="font-serif italic font-normal text-white/80">Values</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-forest-dark/50 rounded-xl p-6 border border-white/10 hover:border-[#c4a35a]/30 transition-colors duration-300"
              >
                <h3 className="text-xl font-sans font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/60 font-body text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div ref={teamRef} className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
              Meet The Team
            </p>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-white">
              The <span className="font-serif italic font-normal text-white/80">Creatives</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="team-card group"
              >
                <div className="team-img relative aspect-[3/4] rounded-xl overflow-hidden mb-4 [clip-path:inset(100%_0_0_0)]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent" />
                </div>
                <h3 className="text-lg font-sans font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-[#c4a35a] text-sm font-body mb-2">
                  {member.role}
                </p>
                <p className="text-white/50 text-sm font-body leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-forest-mid/30">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">
            Ready to Create Something <span className="font-serif italic font-normal text-white/80">Beautiful?</span>
          </h2>
          <p className="text-white/60 font-body text-lg mb-8 max-w-2xl mx-auto">
            Let's work together to capture your special moments. Reach out to us and let's
            discuss how we can bring your vision to life.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-forest-dark font-sans font-semibold rounded-full hover:bg-white/90 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
