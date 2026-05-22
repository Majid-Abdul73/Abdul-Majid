"use client";

import { BookOpen, Briefcase, GraduationCap, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface Enrollment {
  id: string; name: string; email: string; phone: string;
  experience: string; course: string; message: string;
  date: string; status: "new" | "contacted" | "enrolled" | "declined";
}
interface HireRequest {
  id: string; name: string; email: string; service: string;
  budget: string; details: string; date: string;
  status: "new" | "in-progress" | "completed" | "declined";
}
interface Course {
  title: string; level: string; duration: string; price: string; status: string;
}

interface AdminDashboardProps {
  enrollments: Enrollment[];
  hireRequests: HireRequest[];
  courses: Course[];
  setView: (v: "enrollments" | "hire" | "courses") => void;
}

export default function AdminDashboard({ enrollments, hireRequests, courses, setView }: AdminDashboardProps) {
  const newEnrollments = enrollments.filter((e) => e.status === "new").length;
  const newHire = hireRequests.filter((h) => h.status === "new").length;
  const availableCourses = courses.filter((c) => c.status === "Available").length;

  const stats = [
    {
      label: "Total Enrollments",
      value: enrollments.length,
      sub: `${newEnrollments} new`,
      icon: BookOpen,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      action: () => setView("enrollments"),
    },
    {
      label: "Hire Requests",
      value: hireRequests.length,
      sub: `${newHire} new`,
      icon: Briefcase,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      action: () => setView("hire"),
    },
    {
      label: "Active Courses",
      value: availableCourses,
      sub: `${courses.length} total`,
      icon: GraduationCap,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      action: () => setView("courses"),
    },
    {
      label: "Conversion Rate",
      value: enrollments.length
        ? `${Math.round((enrollments.filter((e) => e.status === "enrolled").length / enrollments.length) * 100)}%`
        : "0%",
      sub: "of inquiries enrolled",
      icon: TrendingUp,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      action: null,
    },
  ];

  // Combine and sort recent activity
  const recent = [
    ...enrollments.map((e) => ({
      type: "enrollment" as const,
      name: e.name,
      detail: e.course,
      date: e.date,
      status: e.status,
    })),
    ...hireRequests.map((h) => ({
      type: "hire" as const,
      name: h.name,
      detail: h.service,
      date: h.date,
      status: h.status,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  const statusIcon = (status: string) => {
    if (status === "new") return <AlertCircle size={14} className="text-amber-400" />;
    if (status === "enrolled" || status === "completed") return <CheckCircle2 size={14} className="text-emerald-400" />;
    return <Clock size={14} className="text-blue-400" />;
  };

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      new: "New", contacted: "Contacted", enrolled: "Enrolled",
      declined: "Declined", "in-progress": "In Progress", completed: "Completed",
    };
    return map[status] ?? status;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard</h1>
        <p className="text-foreground/40 text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              onClick={() => s.action?.()}
              className={`bg-card border border-border p-6 transition-all duration-200 ${
                s.action ? "cursor-pointer hover:border-primary/40 hover:bg-muted" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${s.bg} ${s.color} flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
                {s.action && (
                  <span className="text-[10px] text-white/20 hover:text-foreground/50 transition-colors font-medium uppercase tracking-wider">
                    View →
                  </span>
                )}
              </div>
              <p className="text-3xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-foreground/50 text-xs mt-1 font-medium">{s.label}</p>
              <p className="text-white/25 text-xs mt-0.5">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-foreground font-bold text-sm uppercase tracking-widest">Recent Activity</h2>
          <span className="text-foreground/30 text-xs">{recent.length} entries</span>
        </div>

        {recent.length === 0 ? (
          <div className="py-16 text-center text-foreground/30 text-sm">No activity yet.</div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {recent.map((item, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-secondary transition-colors">
                <div
                  className={`w-8 h-8 flex items-center justify-center text-xs font-bold shrink-0 ${
                    item.type === "enrollment" ? "bg-emerald-400/10 text-emerald-400" : "bg-blue-400/10 text-blue-400"
                  }`}
                >
                  {item.type === "enrollment" ? "E" : "H"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-semibold truncate">{item.name}</p>
                  <p className="text-foreground/40 text-xs truncate">{item.detail}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {statusIcon(item.status)}
                  <span className="text-xs text-foreground/50">{statusLabel(item.status)}</span>
                </div>
                <span className="text-white/25 text-xs shrink-0">
                  {new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
