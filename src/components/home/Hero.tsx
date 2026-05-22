"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/Majid-Abdul73", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/abdul-majid-amadu-691134207/", label: "LinkedIn" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
];

export default function Hero() {
  return (
    <section
      id="home"
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight mb-6">
            Building <span className="text-emerald-500">Scalable</span>
            <br />
            Software & <span className="text-emerald-500">Empowering</span>
            <br />
            Engineers
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-foreground/60 leading-relaxed max-w-2xl mb-10">
            Senior Software Engineer & Tech Consultant specializing in system
            design, scalable architecture, and full-stack development. I help
            teams ship better products and engineers level up their careers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-14">
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
          <div className="flex items-center justify-center gap-4">
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
