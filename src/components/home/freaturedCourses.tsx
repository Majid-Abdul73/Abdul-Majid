"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Bot, Layout, Server, Code2, Smartphone, Box, Target, Loader2 } from "lucide-react";
import { DbService } from "@/services/db.service";

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  status: string;
  tags: string;
}

function getIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("robot") || t.includes("kids")) return Bot;
  if (t.includes("frontend") || t.includes("ui")) return Layout;
  if (t.includes("backend") || t.includes("server")) return Server;
  if (t.includes("fullstack") || t.includes("bootcamp")) return Code2;
  if (t.includes("mobile")) return Smartphone;
  if (t.includes("system") || t.includes("architecture")) return Box;
  return Target;
}

export default function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await DbService.getAll("courses", {
          order: { column: "created_at", ascending: true },
        }) as unknown as Course[];
        // Show only first 3 Available courses on homepage
        const available = data.filter((c) => c.status === "Available").slice(0, 3);
        setCourses(available.length > 0 ? available : data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section
      className="py-12 border-t border-border relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/bg/bg5.jpeg")' }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px] z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">
              Education
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-foreground">
              Featured Courses
            </h2>
            <p className="mt-4 text-foreground/50 text-lg">
              Structured programs designed to accelerate your career, whether you&apos;re starting out or mastering advanced architecture.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-border text-foreground font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all w-fit"
          >
            View All Courses <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 text-foreground/30">
            <p className="text-sm">No courses available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course) => {
              const Icon = getIcon(course.title);
              const isAvailable = course.status === "Available";
              const tags = course.tags
                ? course.tags.split(",").map((t) => t.trim()).filter(Boolean)
                : [];

              return (
                <div
                  key={course.id}
                  className="group relative bg-card border border-border p-8 hover:border-primary/50 hover:bg-muted transition-all duration-300 flex flex-col"
                >
                  {/* Status Badge */}
                  <div className="absolute -top-3.5 right-6 z-10">
                    <span
                      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md ${
                        isAvailable ? "bg-primary text-foreground" : "bg-zinc-700 text-foreground/80"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  {/* Icon + Meta */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-foreground transition-all duration-300">
                      <Icon size={28} />
                    </div>
                    <div className="flex flex-col items-end gap-1.5 text-right">
                      <span className="px-3 py-1 text-xs font-semibold bg-secondary border border-border text-foreground/70">
                        {course.level}
                      </span>
                      <span className="text-xs text-foreground/40 font-medium tracking-wide">
                        {course.duration}
                      </span>
                      <span className="text-sm font-extrabold text-primary">
                        {course.price}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {course.title}
                  </h3>

                  <p className="text-foreground/50 text-sm leading-relaxed mb-8 flex-grow">
                    {course.description}
                  </p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs border border-border bg-secondary text-foreground/40 group-hover:border-primary/30 group-hover:text-foreground/70 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href="/courses"
                    className={`w-full flex items-center justify-center gap-2 py-3.5 font-semibold transition-all duration-300 border ${
                      isAvailable
                        ? "bg-secondary text-foreground border-border hover:bg-primary hover:text-foreground hover:border-primary"
                        : "bg-black/20 text-foreground/30 border-white/5 cursor-not-allowed pointer-events-none"
                    }`}
                  >
                    {isAvailable ? "Enroll Now" : "Coming Soon"}
                    {isAvailable && <ArrowRight size={17} />}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
