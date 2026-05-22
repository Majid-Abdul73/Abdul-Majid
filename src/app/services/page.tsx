"use client";

import { Code2, Server, Smartphone, Palette, Database, Cloud, GraduationCap, Users, Briefcase, Mic2 } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Building fast, accessible, and beautiful web interfaces with React, Next.js, and TypeScript.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Designing robust APIs and server-side systems with Node.js, Go, and cloud-native patterns.",
    tags: ["Node.js", "REST", "GraphQL"],
  },
  {
    icon: Database,
    title: "System Design",
    description:
      "Architecting scalable, resilient systems. From database modeling to microservices and event-driven patterns.",
    tags: ["Microservices", "DDD", "Event-Driven"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications using React Native for iOS and Android.",
    tags: ["React Native", "Expo", "iOS/Android"],
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    description:
      "CI/CD pipelines, containerization with Docker & Kubernetes, and cloud infrastructure on AWS and GCP.",
    tags: ["Docker", "AWS", "CI/CD"],
  },
  {
    icon: Palette,
    title: "UI/UX Consulting",
    description:
      "Translating user research into clean, intuitive interfaces and polished design systems.",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    icon: GraduationCap,
    title: "Training & Workshops",
    description:
      "Intensive programs on software engineering, system design, interview prep, and career growth.",
    tags: ["1-on-1", "Cohorts", "Live Sessions"],
  },
  {
    icon: Users,
    title: "Mentorship & Coaching",
    description:
      "Personalized guidance to help junior and mid-level engineers fast-track their career trajectory.",
    tags: ["Career Growth", "Code Review", "Roadmaps"],
  },
  {
    icon: Briefcase,
    title: "Freelance & Collaboration",
    description:
      "Available for contract work, startup MVPs, technical leadership, and open source collaboration.",
    tags: ["Contract", "MVP", "Open Source"],
  },
  {
    icon: Mic2,
    title: "Speaking & Lectures",
    description:
      "Conference talks, guest lectures at universities, webinars and panel discussions on tech topics.",
    tags: ["Conferences", "Universities", "Webinars"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-6 bg-white/[0.03] border border-white/[0.08] hover:border-primary/40 hover:bg-secondary transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-foreground font-bold text-lg mb-2">
                  {service.title}
                </h3>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
