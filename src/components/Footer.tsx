"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "./Icons";
import { useState } from "react";

const socials = [
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="bg-background relative overflow-hidden border-t border-border">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-8 border-b border-border pb-16">
          
          {/* Brand & CTA */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
              Ready to <span className="text-primary italic">elevate</span> your engineering career?{" "}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-12 h-12 bg-primary text-foreground hover:bg-primary/80 transition-all shadow-lg shadow-primary/20 align-middle -translate-y-1"
                aria-label="Start a conversation"
              >
                <ArrowUpRight size={22} />
              </Link>
            </h2>

            <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
              I specialize in building scalable software systems and mentoring the next generation of top-tier engineers. Let's collaborate.
            </p>

          </div>

          {/* Navigation & Newsletter */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-20 shrink-0">
            {/* Quick Links */}
            <div className="flex flex-col gap-5">
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Explore</span>
              <Link href="/projects" className="text-foreground/70 hover:text-primary transition-colors font-medium">Projects</Link>
              <Link href="/services" className="text-foreground/70 hover:text-primary transition-colors font-medium">Services</Link>
              <Link href="/courses" className="text-foreground/70 hover:text-primary transition-colors font-medium">Courses</Link>
              <Link href="/blog" className="text-foreground/70 hover:text-primary transition-colors font-medium">Writing</Link>
            </div>

            {/* Stay Updated */}
            <div className="flex flex-col gap-5 max-w-xs">
              <span className="text-primary font-bold uppercase tracking-widest text-xs">Stay Updated</span>
              <p className="text-foreground/50 text-sm">
                Join my newsletter for weekly insights on system design and software architecture.
              </p>
              {subscribed ? (
                <div className="text-primary text-sm font-semibold flex items-center gap-2 py-3">
                  ✓ You're on the list!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative mt-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full pl-4 pr-12 py-3 bg-secondary border border-border text-foreground placeholder-foreground/30 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary/20 text-primary hover:bg-primary hover:text-foreground transition-colors"
                    aria-label="Subscribe"
                  >
                    <Mail size={16} />
                  </button>
                </form>
                
              )}
              <div className="flex items-center gap-6">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-foreground/40 hover:text-primary transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
