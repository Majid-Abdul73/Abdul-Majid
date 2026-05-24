"use client";

// import NavBar from "@/components/NavBar";
import { Code2, Server, Layout, Bot, Box, ArrowRight, Smartphone, Target, X, Send, CheckCircle, ChevronDown, Loader2, } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { DbService } from "@/services/db.service";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DbCourse {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  price: string;
  status: string;
  tags: string;
}

// ─── Icon Mapping ─────────────────────────────────────────────────────────────

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

const categories = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];

// ─── Enroll Modal ────────────────────────────────────────────────────────────

interface EnrollModalProps {
  course: DbCourse | null;
  onClose: () => void;
}

function EnrollModal({ course, onClose }: EnrollModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormData({ name: "", email: "", phone: "", experience: "", message: "" });
    setSubmitted(false);
    setError("");
  }, [course]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setShowScrollBtn(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 10);
    }
  };

  useEffect(() => {
    if (course) {
      const t = setTimeout(checkScroll, 120);
      return () => clearTimeout(t);
    }
  }, [course, submitted]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;
    setSubmitting(true);
    setError("");
    try {
      await DbService.insert("enrollments", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        course: course.title,
        message: formData.message,
        status: "new",
      });
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3500);
    } catch (err: any) {
      console.error("Enrollment submission failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-card border border-border shadow-2xl shadow-black flex flex-col max-h-[92vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="px-8 pt-8 pb-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
              {course.level}
            </span>
            <span className="text-xs text-foreground/40">{course.duration} · {course.price}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-foreground leading-tight">
            Enroll in <span className="text-primary">{course.title}</span>
          </h2>
          <p className="text-foreground/50 text-sm mt-1.5">
            Complete the form below and we&apos;ll get in touch to confirm your spot.
          </p>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="overflow-y-auto hide-scrollbar flex-1 px-8 py-6"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-16 h-16 bg-primary/20 text-primary flex items-center justify-center rounded-full mb-5">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">You&apos;re Enrolled! 🎉</h3>
              <p className="text-foreground/60 text-sm max-w-xs">
                Thanks for signing up for <strong className="text-foreground">{course.title}</strong>. We&apos;ll reach out within 24 hours with next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="enroll-name" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text" id="enroll-name" name="name" required
                  value={formData.name} onChange={handleChange} placeholder="John Doe"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="enroll-email" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  type="email" id="enroll-email" name="email" required
                  value={formData.email} onChange={handleChange} placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="enroll-phone" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Phone Number <span className="text-primary">*</span>
                </label>
                <input
                  type="tel" id="enroll-phone" name="phone" required
                  value={formData.phone} onChange={handleChange} placeholder="+233 XX XXX XXXX"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="enroll-experience" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Your Current Experience Level <span className="text-primary">*</span>
                </label>
                <select
                  id="enroll-experience" name="experience" required
                  value={formData.experience} onChange={handleChange}
                  className="w-full px-4 py-3 bg-card border border-border text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="" disabled>Select your level</option>
                  <option value="Complete Beginner">Complete Beginner</option>
                  <option value="Some Knowledge">Some Knowledge</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label htmlFor="enroll-message" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Questions or Comments <span className="text-foreground/30">(optional)</span>
                </label>
                <textarea
                  id="enroll-message" name="message" rows={3}
                  value={formData.message} onChange={handleChange}
                  placeholder="Any questions about the course, schedule, or payment options..."
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-foreground font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
                {submitting ? "Submitting..." : "Submit Enrollment"}
              </button>

              <p className="text-center text-xs text-foreground/30 pb-2">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>

        {showScrollBtn && !submitted && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-5 right-5 w-9 h-9 bg-primary text-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce z-10"
            aria-label="Scroll to bottom"
          >
            <ChevronDown size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

let cachedCourses: DbCourse[] | null = null;

export default function CoursesPage() {
  const [courses, setCourses] = useState<DbCourse[]>(cachedCourses || []);
  const [loading, setLoading] = useState(!cachedCourses);
  const [filter, setFilter] = useState("All");
  const [enrollCourse, setEnrollCourse] = useState<DbCourse | null>(null);

  useEffect(() => {
    if (cachedCourses) return;
    
    const fetchCourses = async () => {
      try {
        const data = await DbService.getAll("courses", {
          order: { column: "created_at", ascending: true },
        }) as unknown as DbCourse[];
        cachedCourses = data || [];
        setCourses(cachedCourses);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (filter === "All") return true;
    if (course.level === "All Levels") return true;
    return course.level === filter;
  });

  // Only show filter tabs that have matching courses
  const availableFilters = categories.filter(
    (cat) => cat === "All" || courses.some((c) => c.level === cat || c.level === "All Levels")
  );

  return (
    <>
      {/* <NavBar /> */}

      <main className="min-h-screen bg-background pb-24">

        {/* Hero Banner */}
        <div className="w-full min-h-[40vh] flex items-center justify-center border-b border-border py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-left mt-16 lg:mt-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6 leading-tight">
                Level Up Your <span className="text-primary">Skills</span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed font-medium max-w-2xl">
                Whether you are just starting out or mastering advanced system architecture, we have a structured program designed to accelerate your career.
              </p>
            </div>
            <div className="flex-1 w-full relative aspect-square lg:aspect-[4/3] max-w-lg mx-auto overflow-hidden border border-border shadow-2xl shadow-primary/10 lg:ml-auto">
              <Image
                src="/img/img1.jpg"
                alt="Courses and Training"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="flex flex-col gap-8 lg:gap-12">

            {/* Filters */}
            <div className="w-full">
              <div className="flex flex-col sm:flex-row items-start justify-start gap-4 pb-6 border-b border-border">
                <div className="flex flex-row gap-3 overflow-x-auto hide-scrollbar w-full pb-2 sm:pb-0">
                  {availableFilters.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-6 py-2.5 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                        filter === cat
                          ? "bg-primary text-foreground shadow-lg shadow-primary/20"
                          : "bg-secondary text-foreground/60 hover:bg-foreground/10 hover:text-foreground border border-border"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 size={36} className="animate-spin text-primary" />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-24 text-foreground/30">
                <p className="text-sm">No courses found. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredCourses.map((course) => {
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
                      <div className="absolute -top-3.5 right-6 z-10">
                        <span
                          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md ${
                            isAvailable ? "bg-primary text-foreground" : "bg-zinc-700 text-foreground/80"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>

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

                      <button
                        disabled={!isAvailable}
                        onClick={() => isAvailable && setEnrollCourse(course)}
                        className={`w-full flex items-center justify-center gap-2 py-3.5 font-semibold transition-all duration-300 border ${
                          isAvailable
                            ? "bg-secondary text-foreground border-border hover:bg-primary hover:text-foreground hover:border-primary cursor-pointer"
                            : "bg-black/20 text-foreground/30 border-white/5 cursor-not-allowed"
                        }`}
                      >
                        {isAvailable ? "Enroll Now" : "Coming Soon"}
                        {isAvailable && <ArrowRight size={17} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </main>

      <EnrollModal course={enrollCourse} onClose={() => setEnrollCourse(null)} />
    </>
  );
}
