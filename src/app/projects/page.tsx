"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: "/img/img11.jpg",
    title: "DistroScale",
    description:
      "A multi-tenant SaaS platform for supply chain distribution management, serving 500+ merchants with real-time inventory and order tracking.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    type: "SaaS Platform",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    image: "/img/img12.jpg",
    title: "AgriConnect",
    description:
      "A mobile-first platform connecting rural farmers to markets and financial services. Finalist at MEST Africa Challenge.",
    tech: ["React Native", "Go", "PostgreSQL"],
    type: "Final Year Project",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    image: "/img/img13.jpg",
    title: "AuthKit",
    description:
      "Open source authentication library supporting OAuth2, JWT, and magic links for Node.js backends. 2k+ GitHub stars.",
    tech: ["TypeScript", "OAuth2", "JWT"],
    type: "Open Source",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    image: "/img/img14.jpg",
    title: "MentorFlow",
    description:
      "A booking and mentorship platform connecting software engineers with senior mentors for 1-on-1 sessions and career tracking.",
    tech: ["React Native", "Firebase", "Stripe"],
    type: "Mobile App",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    image: "/img/img15.jpg",
    title: "SystemDesignPro",
    description:
      "An interactive system design learning platform with real-world scenarios, diagrams, and interview preparation modules.",
    tech: ["Next.js", "D3.js", "Supabase"],
    type: "EdTech",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    image: "/img/img16.jpg",
    title: "DevMetrics",
    description:
      "A developer productivity dashboard aggregating GitHub, Jira, and Linear data into actionable engineering metrics.",
    tech: ["React", "Python", "GraphQL"],
    type: "Dev Tool",
    github: "#",
    live: "#",
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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

      gsap.from(projectsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Work
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-foreground">
            Notable Projects
          </h2>
          <p className="mt-4 text-foreground/50 text-lg max-w-2xl">
            A selection of production work, open source projects, and
            research-driven builds.
          </p>
        </div>

        {/* Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group relative p-6 border transition-all duration-300 flex flex-col ${
                project.featured
                  ? "bg-primary/5 border-primary/30 hover:border-primary/60"
                  : "bg-white/[0.03] border-white/[0.08] hover:border-border"
              }`}
            >
              {project.featured && (
                <span className="absolute top-4 right-4 px-2.5 py-1 text-xs bg-primary text-foreground font-semibold">
                  Featured
                </span>
              )}

              <div className="w-full h-40 mb-5 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="mb-4">
                <span className="text-xs text-primary/70 font-medium uppercase tracking-widest">
                  {project.type}
                </span>
                <h3 className="mt-1 text-foreground font-bold text-xl">
                  {project.title}
                </h3>
              </div>

              <p className="text-foreground/50 text-sm leading-relaxed flex-1 mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs bg-secondary text-foreground/40 border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground transition-colors"
                >
                  <GithubIcon className="w-[15px] h-[15px]" />
                  Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-primary transition-colors"
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
