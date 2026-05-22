"use client";

import { LayoutDashboard, Users, BookOpen, Briefcase, LogOut, Menu, X, ChevronRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export type AdminView = "dashboard" | "enrollments" | "hire" | "courses" | "blogs";

interface AdminSidebarProps {
  view: AdminView;
  setView: (v: AdminView) => void;
  onLogout: () => void;
  counts: { enrollments: number; hire: number };
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const navItems: { id: AdminView; label: string; icon: React.ElementType; badge?: keyof AdminSidebarProps["counts"] }[] = [
  { id: "dashboard",   label: "Dashboard",        icon: LayoutDashboard },
  { id: "enrollments", label: "Enrollments",       icon: BookOpen,    badge: "enrollments" },
  { id: "hire",        label: "Hire Requests",     icon: Briefcase,   badge: "hire" },
  { id: "courses",     label: "Courses",           icon: Users },
  { id: "blogs",       label: "Blog Posts",        icon: BookOpen },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-10 w-full" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-foreground/50 hover:text-foreground hover:bg-secondary transition-all duration-200"
    >
      {theme === "dark" ? (
        <>
          <Sun size={17} />
          Light Mode
        </>
      ) : (
        <>
          <Moon size={17} />
          Dark Mode
        </>
      )}
    </button>
  );
}


export default function AdminSidebar({
  view, setView, onLogout, counts, mobileOpen, setMobileOpen,
}: AdminSidebarProps) {
  const handleNav = (id: AdminView) => {
    setView(id);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary flex items-center justify-center text-foreground font-black text-sm">A</div>
          <div>
            <p className="text-foreground font-bold text-sm leading-none">Admin Panel</p>
            <p className="text-foreground/30 text-xs mt-0.5">Portfolio Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="text-white/25 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">Main Menu</p>
        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const active = view === id;
          const count = badge ? counts[badge] : 0;
          return (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 group ${
                active
                  ? "bg-primary/15 text-primary border-l-2 border-primary"
                  : "text-foreground/50 hover:text-foreground hover:bg-secondary border-l-2 border-transparent"
              }`}
            >
              <Icon size={17} className={active ? "text-primary" : "text-foreground/40 group-hover:text-foreground/70"} />
              <span className="flex-1 text-left">{label}</span>
              {count > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-primary text-foreground rounded-full min-w-[18px] text-center">
                  {count}
                </span>
              )}
              {active && <ChevronRight size={14} className="text-primary/60" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 py-5 border-t border-border flex flex-col gap-1">
        <ThemeToggle />
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[200] w-10 h-10 bg-card border border-border flex items-center justify-center text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 z-[150]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-[160] transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-card border-r border-border shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}
