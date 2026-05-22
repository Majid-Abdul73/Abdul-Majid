"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle } from "lucide-react";
import { DbService } from "@/services/db.service";

const bookingOptions = [
  { id: "consultation", label: "Free 30-min Consultation" },
  { id: "mentorship", label: "Mentorship Session" },
  { id: "workshop", label: "Workshop / Training" },
  { id: "freelance", label: "Freelance Project" },
  { id: "coaching", label: "Career Coaching" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await DbService.insert("hire_requests", {
        name: form.name,
        email: form.email,
        service: form.type,
        budget: "",
        details: form.message,
        status: "new",
      });
      setSent(true);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="mt-4 text-foreground/50 text-lg max-w-2xl">
            Whether you need a consultant, a mentor, a speaker, or a developer —
            reach out and let&apos;s figure out the best path forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-foreground font-bold text-xl mb-6">
                Contact Details
              </h3>
              <ul className="space-y-5">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@yourname.dev",
                    href: "mailto:hello@yourname.dev",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+233 50 000 0000",
                    href: "tel:+233500000000",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Accra, Ghana (Remote-first)",
                    href: null,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-foreground/30 text-xs mb-0.5">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="text-foreground text-sm hover:text-primary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-foreground text-sm">{value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Book a call CTA */}
            <div className="p-6 bg-primary/5 border border-primary/20">
              <Calendar size={24} className="text-primary mb-3" />
              <h4 className="text-foreground font-bold mb-2">
                Book a Call Directly
              </h4>
              <p className="text-foreground/50 text-sm mb-4">
                Skip the form — pick a time that works for you on my calendar.
              </p>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
              >
                Open Calendar
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/[0.03] border border-primary/30">
                <CheckCircle size={48} className="text-primary mb-4" />
                <h3 className="text-foreground font-bold text-2xl mb-2">
                  Message Sent!
                </h3>
                <p className="text-foreground/50">
                  Thanks for reaching out. I&apos;ll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-8 bg-white/[0.03] border border-white/[0.08]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-foreground/50 text-sm mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-foreground/50 text-sm mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-foreground/50 text-sm mb-2"
                  >
                    What can I help with?
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                  >
                    <option value="" className="bg-black">
                      Select an option...
                    </option>
                    {bookingOptions.map((opt) => (
                      <option key={opt.id} value={opt.id} className="bg-black">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-foreground/50 text-sm mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, challenge, or what you're looking for..."
                    className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder-white/20 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-foreground font-semibold hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
