"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, CheckCircle, ChevronDown } from "lucide-react";
import { DbService } from "@/services/db.service";

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Hire({ isOpen, onClose }: HireModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowScrollButton(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 10);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Check after modal opens and content renders
      const timer = setTimeout(checkScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, submitted]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await DbService.insert("hire_requests", formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", service: "", budget: "", details: "" });
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting hire request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-card border border-border p-6 sm:p-10 shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-foreground mb-2">Hire Me</h2>
          <p className="text-foreground/50 text-sm">Fill out the form below to discuss your project.</p>
        </div>

        <div 
          className="overflow-y-auto pr-2 hide-scrollbar flex-1"
          ref={scrollContainerRef}
          onScroll={checkScroll}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-primary/20 text-primary flex items-center justify-center rounded-full mb-6">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Request Sent!</h3>
              <p className="text-foreground/60">I will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+233 20 123 4567"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Service Required
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-card border border-border text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="" disabled>Select a service</option>
                  <option value="Final Year Project">University Final Year Project</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Courses & Training">Courses & Training</option>
                  <option value="IT Consulting">IT Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Estimated Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-card border border-border text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="" disabled>Select a budget range</option>
                  <option value="<$1k">Less than GHS 1,000</option>
                  <option value="$1k-$5k">GHS 1,000 - GHS 5,000</option>
                  <option value="$5k-$10k">GHS 5,000 - GHS 10,000</option>
                  <option value="$10k+">GHS 10,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-foreground/70 mb-1.5">
                  Project Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  required
                  rows={4}
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-foreground font-semibold hover:bg-primary/90 transition-all duration-200 mt-2"
              >
                <Send size={18} />
                Send Request
              </button>
            </form>
          )}
        </div>
        
        {/* Scroll to bottom button */}
        {showScrollButton && !submitted && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-6 right-6 w-10 h-10 bg-primary text-foreground rounded-full flex items-center justify-center shadow-lg shadow-black hover:bg-primary/90 hover:scale-110 transition-all z-10 animate-bounce"
            aria-label="Scroll to bottom"
          >
            <ChevronDown size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
