"use client";

import { ArrowRight, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/Majid-Abdul73", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/abdul-majid-amadu-691134207/", label: "LinkedIn" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(subheadingRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(socialRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.7,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/bg/hero.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center">
        <div className="max-w-4xl flex flex-col items-center text-center">
          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight mb-6"
          >
            Building <span className="text-emerald-500">Scalable</span>
            <br />
            Software & <span className="text-emerald-500">Empowering</span>
            <br />
            Engineers
          </h1>

          {/* Subheading */}
          <p
            ref={subheadingRef}
            className="text-lg sm:text-xl text-foreground/60 leading-relaxed max-w-2xl mb-10"
          >
            Code is my language, but impact is my purpose. I build systems that
            scale and teams that grow. Every line I write is a step toward something
            bigger.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-wrap justify-center items-center gap-4 mb-14"
          >
            <a
              href="https://cal.com/abdulmajid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-foreground font-semibold hover:bg-primary/90 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 group"
            >
              Book a Call
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-secondary text-foreground font-semibold border border-border hover:bg-foreground/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Download size={18} />
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div
            ref={socialRef}
            className="flex items-center justify-center gap-4"
          >
            <span className="text-foreground/30 text-sm">Connect:</span>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 bg-secondary border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
