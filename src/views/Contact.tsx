"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Linkedin, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Form animation
      ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            formRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Info cards animation
      const infoCards = infoRef.current?.querySelectorAll('.info-card');
      if (infoCards) {
        infoCards.forEach((card, index) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['42, Galle Road', 'Colombo 03, Sri Lanka'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+94 11 234 5678', '+94 77 123 4567'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@luminastudio.lk', 'bookings@luminastudio.lk'],
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9AM - 7PM', 'Sunday: By Appointment'],
    },
  ];

  const services = [
    { value: '', label: 'Select a Service' },
    { value: 'wedding', label: 'Wedding Photography' },
    { value: 'portrait', label: 'Portrait Photography' },
    { value: 'event', label: 'Event Photography' },
    { value: 'fashion', label: 'Fashion Photography' },
    { value: 'commercial', label: 'Commercial Photography' },
    { value: 'architectural', label: 'Architectural Photography' },
    { value: 'family', label: 'Family & Baby Photography' },
    { value: 'other', label: 'Other / Not Sure' },
  ];

  return (
    <div className="relative w-full bg-forest-dark min-h-[100dvh] pt-32 pb-24">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
          Get in Touch
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight mb-6">
          Let's <span className="font-serif italic font-normal text-white/80">Connect</span>
        </h1>
        <p className="text-white/60 font-body text-lg max-w-2xl">
          Ready to capture your special moments? We'd love to hear from you.
          Fill out the form below or reach out to us directly.
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="bg-forest-mid/50 rounded-2xl p-8 md:p-10 border border-white/10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#c4a35a]/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-[#c4a35a]" />
                  </div>
                  <h3 className="text-2xl font-sans font-semibold text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-white/60 font-body mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-white/10 text-white font-body rounded-full hover:bg-white/20 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/70 text-sm font-body mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-forest-dark border border-white/20 rounded-lg text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#c4a35a] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm font-body mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-forest-dark border border-white/20 rounded-lg text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#c4a35a] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/70 text-sm font-body mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-forest-dark border border-white/20 rounded-lg text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#c4a35a] transition-colors"
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm font-body mb-2">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        title="Service Interested In"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-forest-dark border border-white/20 rounded-lg text-white font-body focus:outline-none focus:border-[#c4a35a] transition-colors appearance-none cursor-pointer"
                      >
                        {services.map((service) => (
                          <option key={service.value} value={service.value} className="bg-forest-dark">
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm font-body mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-forest-dark border border-white/20 rounded-lg text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#c4a35a] transition-colors resize-none"
                      placeholder="Tell us about your project, event, or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-4 bg-white text-forest-dark font-sans font-semibold rounded-full hover:bg-white/90 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="info-card flex items-start gap-4 p-5 bg-forest-mid/30 rounded-xl border border-white/10"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#c4a35a]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-white font-sans font-semibold mb-1">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-white/60 font-body text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Social Links */}
            <div className="info-card p-5 bg-forest-mid/30 rounded-xl border border-white/10">
              <h3 className="text-white font-sans font-semibold mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/luminastudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Visit our Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#c4a35a] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/luminastudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Visit our Facebook page"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#c4a35a] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/luminastudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Visit our LinkedIn profile"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#c4a35a] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511757686!2d79.8486!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593b0fc9d3f7%3A0x2a2c3c4d5e6f7g8h!2sGalle%20Rd%2C%20Colombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1234567890"
            width="100%"
            height="400"
            title="Lumina Studio Map Location"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0 grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}
