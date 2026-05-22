"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Shield, Mail } from "lucide-react";
import AdminSidebar, { AdminView } from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminEnrollments, { Enrollment } from "@/components/admin/AdminEnrollments";
import AdminHireRequests, { HireRequest } from "@/components/admin/AdminHireRequests";
import AdminCourses, { Course } from "@/components/admin/AdminCourses";
import AdminBlogs, { BlogPost } from "@/components/admin/AdminBlogs";
import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/services/auth.service";

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await AuthService.signIn(email, password);
    } catch (err: any) {
      setError(err.message || "Incorrect credentials. Try again.");
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className={`relative w-full max-w-sm transition-all duration-300 ${shaking ? "animate-pulse" : ""}`}>
        {/* Card */}
        <div className="bg-card border border-border p-8 shadow-2xl shadow-black">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Shield size={26} className="text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-foreground text-center mb-1">Admin Access</h1>
          <p className="text-foreground/40 text-sm text-center mb-8">Portfolio Management Panel</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="admin@example.com"
                  autoFocus
                  required
                  className={`w-full pl-9 pr-4 py-3 bg-secondary border text-foreground text-sm placeholder-white/25 focus:outline-none focus:ring-1 transition-colors ${
                    error ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/20" : "border-border focus:border-primary focus:ring-primary/20"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground/50 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter admin password"
                  required
                  className={`w-full pl-9 pr-10 py-3 bg-secondary border text-foreground text-sm placeholder-white/25 focus:outline-none focus:ring-1 transition-colors ${
                    error ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/20" : "border-border focus:border-primary focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/70 transition-colors"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-foreground font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:active:scale-100"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { DbService } from "@/services/db.service";

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [view, setView] = useState<AdminView>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Data state (fetched from Supabase)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [hireRequests, setHireRequests] = useState<HireRequest[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      try {
        const [fetchedEnrollments, fetchedHireRequests, fetchedCourses, fetchedBlogs] = await Promise.all([
          DbService.getAll("enrollments", { order: { column: "created_at", ascending: false } }),
          DbService.getAll("hire_requests", { order: { column: "created_at", ascending: false } }),
          DbService.getAll("courses", { order: { column: "created_at", ascending: false } }),
          DbService.getAll("blogs", { order: { column: "created_at", ascending: false } })
        ]);
        
        setEnrollments(fetchedEnrollments?.map((e: any) => ({ ...e, date: e.created_at })) || []);
        setHireRequests(fetchedHireRequests?.map((h: any) => ({ ...h, date: h.created_at })) || []);
        setCourses((fetchedCourses as any[]) || []);
        // Map read_time → readTime and use date or created_at
        setBlogs(fetchedBlogs?.map((b: any) => ({
          ...b,
          readTime: b.read_time || "",
          date: b.date || new Date(b.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        })) || []);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setDataLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await AuthService.signOut();
    setView("dashboard");
  };

  if (authLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground/50">Checking Authentication...</div>;

  if (!user) return <LoginScreen />;

  if (dataLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground/50">Loading live data...</div>;

  // Badge counts: only "new" items
  const counts = {
    enrollments: enrollments.filter((e) => e.status === "new").length,
    hire: hireRequests.filter((h) => h.status === "new").length,
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar
        view={view}
        setView={setView}
        onLogout={handleLogout}
        counts={counts}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-background backdrop-blur border-b border-border px-6 lg:px-8 py-4 flex items-center gap-4">
          <div className="lg:hidden w-8" /> {/* spacer for mobile menu button */}
          <div className="flex-1">
            <p className="text-foreground/30 text-xs uppercase tracking-widest font-bold">
              {view === "dashboard" && "Dashboard"}
              {view === "enrollments" && "Enrollments"}
              {view === "hire" && "Hire Requests"}
              {view === "courses" && "Courses"}
              {view === "blogs" && "Blog Posts"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {counts.enrollments + counts.hire > 0 && (
              <span className="px-2.5 py-1 bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                {counts.enrollments + counts.hire} new
              </span>
            )}
            <div className="w-8 h-8 bg-primary/20 text-primary flex items-center justify-center text-xs font-black">
              A
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="px-6 lg:px-8 py-8">
          {view === "dashboard" && (
            <AdminDashboard
              enrollments={enrollments}
              hireRequests={hireRequests}
              courses={courses}
              setView={(v) => setView(v)}
            />
          )}
          {view === "enrollments" && (
            <AdminEnrollments
              enrollments={enrollments}
              setEnrollments={setEnrollments}
            />
          )}
          {view === "hire" && (
            <AdminHireRequests
              hireRequests={hireRequests}
              setHireRequests={setHireRequests}
            />
          )}
          {view === "courses" && (
            <AdminCourses
              courses={courses}
              setCourses={setCourses}
            />
          )}
          {view === "blogs" && (
            <AdminBlogs
              blogs={blogs}
              setBlogs={setBlogs}
            />
          )}
        </div>
      </main>
    </div>
  );
}
