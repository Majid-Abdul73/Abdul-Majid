"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    category: "Development Services",
    items: [
      {
        image: "/img/img1.jpg",
        title: "Frontend Development",
        description:
          "Building fast, accessible, and beautiful web interfaces with React, Next.js, and TypeScript.",
        tags: ["React", "Next.js", "TypeScript"],
      },
      {
        image: "/img/img2.jpg",
        title: "Backend Development",
        description:
          "Designing robust APIs and server-side systems with Node.js, Go, and cloud-native patterns.",
        tags: ["Node.js", "REST", "GraphQL"],
      },
      {
        image: "/img/img3.jpg",
        title: "System Design",
        description:
          "Architecting scalable, resilient systems. From database modeling to microservices and event-driven patterns.",
        tags: ["Microservices", "DDD", "Event-Driven"],
      },
      {
        image: "/img/img4.jpg",
        title: "Mobile Development",
        description:
          "Cross-platform mobile applications using React Native for iOS and Android.",
        tags: ["React Native", "Expo", "iOS/Android"],
      },
      {
        image: "/img/img5.jpg",
        title: "DevOps & Cloud",
        description:
          "CI/CD pipelines, containerization with Docker & Kubernetes, and cloud infrastructure on AWS and GCP.",
        tags: ["Docker", "AWS", "CI/CD"],
      },
    ],
  },
  {
    category: "Education & Training",
    items: [
      {
        image: "/img/img7.jpg",
        title: "Training & Workshops",
        description:
          "Intensive programs on software engineering, system design, interview prep, and career growth.",
        tags: ["1-on-1", "Cohorts", "Live Sessions"],
      },
      {
        image: "/img/img8.jpg",
        title: "Mentorship & Coaching",
        description:
          "Personalized guidance to help junior and mid-level engineers fast-track their career trajectory.",
        tags: ["Career Growth", "Code Review", "Roadmaps"],
      },
      {
        image: "/img/img10.jpg",
        title: "Speaking & Lectures",
        description:
          "Conference talks, guest lectures at universities, webinars and panel discussions on tech topics.",
        tags: ["Conferences", "Universities", "Webinars"],
      },
    ],
  },
  {
    category: "Business Solutions",
    items: [
      {
        image: "/img/img9.jpg",
        title: "Freelance & Collaboration",
        description:
          "Available for contract work, startup MVPs, technical leadership, and open source collaboration.",
        tags: ["Contract", "MVP", "Open Source"],
      },
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

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

      gsap.from(categoriesRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            What I Do
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-foreground">
            Services & Expertise
          </h2>
          <p className="mt-4 text-foreground/50 text-lg max-w-2xl">
            From building production-ready software to training the next
            generation of engineers — here&apos;s how I can add value.
          </p>
        </div>

        {/* Grid */}
        <div ref={categoriesRef} className="space-y-16">
          {services.map((category) => (
            <div key={category.category}>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((service) => (
                  <div
                    key={service.title}
                    className="group p-6 bg-white/[0.03] border border-white/[0.08] hover:border-primary/40 hover:bg-secondary transition-all duration-300"
                  >
                    <div className="w-full h-40 mb-5 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-foreground font-bold text-lg mb-2">
                      {service.title}
                    </h4>
                    <p className="text-foreground/50 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs bg-secondary text-foreground/40 border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
