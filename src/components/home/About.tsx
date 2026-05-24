"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(bioRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 80%",
        },
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        x: 50,
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
    <section id="about" ref={sectionRef} className="py-24 lg:py-28 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Text (Bio, Skills, Experience) */}
          <div className="space-y-12">

            {/* Header */}
            <div ref={headerRef} className="mb-16">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                About Me
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold">
                The Engineer Behind the Work
              </h2>
            </div>


            {/* Bio */}
            <div ref={bioRef} className="space-y-5 text-white/60 text-base leading-relaxed">
              <p>
                I started coding because I wanted to build things that matter. Five
                years later, that hasn&apos;t changed.
              </p>
              <p>
                From Accra to the world, I&apos;ve helped startups launch, enterprises
                scale, and NGOs reach more people. The technology changes, but the
                mission stays the same: solve real problems.
              </p>
              <p>
                Now I&apos;m paying it forward — mentoring the next generation of
                African engineers and building open source tools that anyone can use.
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div ref={imageRef} className="relative w-full h-[500px] lg:h-full min-h-[500px] overflow-hidden border border-border lg:sticky lg:top-24">
            <Image
              src="/img/img22.jpg"
              alt="About Me"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Optional overlay gradient for styling */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  );
}
