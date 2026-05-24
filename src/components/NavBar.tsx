"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import Hire from "./home/Hire";

const navLinks = [
  { href: "/", label: "About"},
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/courses", label: "Classes" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hireModalOpen, setHireModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu or modal is open
  useEffect(() => {
    if (open || hireModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open, hireModalOpen]);

  return (
    <>
      <Hire isOpen={hireModalOpen} onClose={() => setHireModalOpen(false)} />
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled && !open
            ? "bg-black/90 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              onClick={() => setOpen(false)}
            >
              <div className="w-8 h-8 bg-primary flex items-center justify-center font-bold text-foreground text-sm transition-transform group-hover:scale-110">
                AM
              </div>
              <span className="text-foreground font-bold text-lg hidden sm:block">
                {/* AL<span className="text-primary">MAJID</span> */}
              </span>
            </Link>

            {/* Right side actions */}
            <div className="flex items-center gap-4 md:gap-6">
              
              {/* Hire me button */}
              <button
                // onClick={() => setHireModalOpen(true)}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2 bg-primary/20 border border-primary/30 text-foreground text-sm font-semibold hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <Link href="/courses">Classes</Link>
              </button>
               <button
                onClick={() => setHireModalOpen(true)}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2 bg-primary/20 border border-primary/30 text-foreground text-sm font-semibold hover:bg-primary hover:border-primary transition-all duration-300"
              >
                Hire Me
              </button>

              {/* Menu Toggle */}
              <button
                className="text-foreground hover:bg-foreground/10 transition-colors z-50 flex items-center gap-3"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? (
                  <>
                    <X size={28} />
                  </>
                ) : (
                  <div className="bg-primary p-2 hover:bg-primary/90 transition-colors">
                    <Menu size={24} className="text-foreground" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-40 bg-card transition-all duration-500 ease-in-out ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-1 flex flex-col md:flex-row justify-between py-8 md:py-12 gap-12 overflow-y-auto hide-scrollbar">
            {/* Left: Navigation Links */}
            <nav className="flex flex-col gap-4 md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground hover:text-foreground/70 transition-colors tracking-tight"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: Contact Details */}
            <div className="flex flex-col gap-10 md:w-80 md:text-right md:items-end md:mt-4">
              <div>
                <h4 className="text-lg font-bold text-foreground mb-2">Contact Details</h4>
                <p className="text-primary font-medium text-sm sm:text-base">
                  [+233] 20 401 5059
                </p>
                <p className="text-primary font-medium text-sm sm:text-base hover:underline">
                  <a href="mailto:abdulmajid020a@gmail.com">abdulmajid020a@gmail.com</a>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-foreground mb-2">Address</h4>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  East Legon, Accra, Ghana
                </p>
              </div>
            </div>
          </div>

          {/* Footer inside Menu */}
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-foreground/10 flex items-center justify-center text-foreground/70 hover:bg-foreground/20 hover:text-foreground transition-colors"
              >
                <GithubIcon size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-foreground/10 flex items-center justify-center text-foreground/70 hover:bg-foreground/20 hover:text-foreground transition-colors"
              >
                <LinkedinIcon size={14} />
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-foreground/60">
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms and Conditions
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
