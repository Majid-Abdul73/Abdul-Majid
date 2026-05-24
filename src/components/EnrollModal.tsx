"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, CheckCircle, ChevronDown, Loader2 } from "lucide-react";
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

interface EnrollModalProps {
  course: Course | null;
  onClose: () => void;
}

export default function EnrollModal({ course, onClose }: EnrollModalProps) {
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
      console.error("Error details:", JSON.stringify(err, null, 2));
      console.error("Error type:", typeof err);
      console.error("Error keys:", Object.keys(err));
      const errorMessage = err?.message || err?.error_description || "Something went wrong. Please try again.";
      setError(errorMessage);
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
