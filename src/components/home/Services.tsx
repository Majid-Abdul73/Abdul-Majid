import Image from "next/image";
import { Code2, GraduationCap, Briefcase } from "lucide-react";

const servicesLeft = [
  {
    icon: GraduationCap,
    title: "University Final Year Projects",
    description: "End-to-end support for final year students — from concept and system design to implementation and documentation.",
    tags: ["Software Engineering", "Robotics/IoT", "Documentation"],
  },
  {
    icon: Code2,
    title: "Software Development",
    description: "Scalable web and mobile app solutions using modern frameworks.",
    tags: ["Next.js", "Node.js", "React Native"],
  },
];

const servicesRight = [
  {
    icon: GraduationCap,
    title: "Classes & Training",
    description: "Structured learning programs for all levels — from coding & robotics for kids to professional frontend, backend, and fullstack development.",
    tags: ["Coding for Kids", "Frontend Dev", "Backend Dev"],
  },
  {
    icon: Briefcase,
    title: "IT Consulting",
    description: "A wide range of general services to support your business operations and architecture.",
    tags: ["System Design", "Cloud"],
  },
];

function ServiceCard({ icon: Icon, title, description, tags }: {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <div className="group p-4 border border-border bg-card hover:border-primary/50 hover:bg-muted hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex-1 flex flex-col justify-center cursor-default">
      <div className="w-14 h-14 flex items-center justify-center mb-6 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-foreground transition-all duration-300">
        <Icon size={28} />
      </div>
      <h3 className="font-bold text-2xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-6 text-foreground/50 group-hover:text-foreground/70 transition-colors duration-300">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs border bg-secondary text-foreground/40 border-border group-hover:border-primary/30 group-hover:text-foreground/70 transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-8 lg:py-12 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-primary"></span>
            <span className="text-foreground text-sm font-bold uppercase tracking-widest">
              Core Services
            </span>
            <span className="h-px w-12 bg-primary"></span>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {servicesLeft.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          {/* Middle Column (Image) */}
          <div className="relative w-full h-[360px] lg:h-full min-h-[360px] overflow-hidden">
            <Image
              // src="/bg/about-us.png"
              src={"/img/img21.jpg"}
              alt="Team working together"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {servicesRight.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
