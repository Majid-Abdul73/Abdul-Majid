"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import Hire from "@/components/home/Hire";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(contactInfoRef.current, {
        opacity: 0,
        x: -30,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 80%",
        },
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 30,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="mt-4 text-foreground/50 text-lg max-w-2xl">
            Whether you need a consultant, a mentor, a speaker, or a developer —
            reach out and let&apos;s figure out the best path forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
          {/* Contact Info */}
          <div ref={contactInfoRef} className="lg:col-span-2 space-y-8 flex flex-col">
            <div>
              <h3 className="text-foreground font-bold text-xl mb-6">
                Contact Details
              </h3>
              <ul className="space-y-5">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "abdulmajid02a@gmail.com",
                    href: "mailto:abdulmajid02a@gmail.com",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+233 20 201 5059",
                    href: "tel:+233202015059",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "East Legon, Ghana (Remote-first)",
                    href: null,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-foreground/30 text-xs mb-0.5">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="text-foreground text-sm hover:text-primary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-foreground text-sm">{value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Book a call CTA */}
            <div className="p-6 bg-primary/5 border border-primary/20">
              <Calendar size={24} className="text-primary mb-3" />
              <h4 className="text-foreground font-bold mb-2">
                Book a Call Directly
              </h4>
              <p className="text-foreground/50 text-sm mb-4">
                Skip the form — pick a time that works for you on my calendar.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-start">
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
                >
                  Open Calendar
                </a>
                <button
                  onClick={() => setHireModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-foreground font-semibold text-sm hover:bg-secondary/80 transition-all border border-border"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </div>

          {/* Contact Image */}
          <div ref={imageRef} className="lg:col-span-3 flex flex-col">
            <div className="w-full h-full min-h-[400px] overflow-hidden flex-1">
              <img
                src="/img/img19.jpg"
                alt="Contact"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <Hire isOpen={hireModalOpen} onClose={() => setHireModalOpen(false)} />
    </section>
  );
}
