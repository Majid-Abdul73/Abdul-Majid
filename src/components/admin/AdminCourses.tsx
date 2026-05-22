"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Save } from "lucide-react";
import { DbService } from "@/services/db.service";

export interface Course {
  id: string;
  title: string;
  level: string;
  duration: string;
  price: string;
  status: "Available" | "Coming Soon";
  tags: string;
}

interface AdminCoursesProps {
  courses: Course[];
  setCourses: (c: Course[]) => void;
}

const LEVELS = ["Beginner", "Intermediate", "Advanced", "All Levels"];

const emptyForm = (): Omit<Course, "id"> => ({
  title: "", level: "Beginner", duration: "", price: "", status: "Available", tags: "",
});

export default function AdminCourses({ courses, setCourses }: AdminCoursesProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [error, setError] = useState("");

  const openNew = () => {
    setForm(emptyForm());
    setEditId(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (c: Course) => {
    setForm({ title: c.title, level: c.level, duration: c.duration, price: c.price, status: c.status, tags: c.tags });
    setEditId(c.id);
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.duration.trim() || !form.price.trim()) {
      setError("Title, duration, and price are required.");
      return;
    }
    try {
      if (editId) {
        const updated = await DbService.update("courses", editId, form) as unknown as Course;
        setCourses(courses.map((c) => (c.id === editId ? { ...c, ...updated } : c)));
      } else {
        const inserted = await DbService.insert("courses", form) as unknown as Course;
        setCourses([...courses, inserted]);
      }
      setShowForm(false);
      setEditId(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while saving.");
    }
  };

  const toggleStatus = async (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (!course) return;
    const newStatus = course.status === "Available" ? "Coming Soon" : "Available";
    try {
      await DbService.update("courses", id, { status: newStatus });
      setCourses(courses.map((c) => c.id === id ? { ...c, status: newStatus } : c));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCourse = async (id: string) => {
    if (confirm("Delete this course?")) {
      try {
        await DbService.delete("courses", id);
        setCourses(courses.filter((c) => c.id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete course.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Courses</h1>
          <p className="text-foreground/40 text-sm mt-1">{courses.length} courses total</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95"
        >
          <Plus size={16} /> Add Course
        </button>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c.id} className="bg-card border border-border p-5 flex flex-col gap-3 hover:border-border transition-colors">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-foreground font-bold text-sm leading-snug flex-1">{c.title}</h3>
              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                c.status === "Available"
                  ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/30"
                  : "bg-zinc-600/40 text-foreground/50 border border-border"
              }`}>
                {c.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground/40">
              <span>{c.level}</span>
              <span>·</span>
              <span>{c.duration}</span>
              <span>·</span>
              <span className="text-primary font-semibold">{c.price}</span>
            </div>

            {c.tags && (
              <div className="flex flex-wrap gap-1.5">
                {c.tags.split(",").map((t) => t.trim()).filter(Boolean).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] bg-secondary border border-border text-foreground/40">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border">
              <button
                onClick={() => toggleStatus(c.id)}
                className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground transition-colors"
                title="Toggle availability"
              >
                {c.status === "Available"
                  ? <ToggleRight size={18} className="text-primary" />
                  : <ToggleLeft size={18} />
                }
                <span>{c.status === "Available" ? "Available" : "Coming Soon"}</span>
              </button>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => openEdit(c)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-foreground/50 hover:text-foreground hover:bg-secondary border border-border transition-all"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => deleteCourse(c.id)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-400/60 hover:text-red-400 hover:bg-red-400/10 border border-red-400/20 transition-all"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-md bg-card border border-border p-7 shadow-2xl">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center bg-secondary text-foreground/50 hover:text-foreground transition-colors"
            >
              <X size={15} />
            </button>
            <h2 className="text-xl font-extrabold text-foreground mb-5">
              {editId ? "Edit Course" : "Add New Course"}
            </h2>

            <div className="space-y-4">
              {[
                { label: "Course Title *", name: "title", placeholder: "e.g. Frontend Mastery" },
                { label: "Duration *", name: "duration", placeholder: "e.g. 12 Weeks" },
                { label: "Price *", name: "price", placeholder: "e.g. GHS 2,500" },
                { label: "Tags", name: "tags", placeholder: "React, Next.js, TypeScript (comma-separated)" },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className="block text-xs font-medium text-foreground/50 mb-1.5">{label}</label>
                  <input
                    type="text"
                    value={(form as Record<string, string>)[name]}
                    onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 bg-secondary border border-border text-foreground text-sm placeholder-white/25 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Level</label>
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="w-full px-3 py-2.5 bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Course["status"] })}
                  className="w-full px-3 py-2.5 bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="Available">Available</option>
                  <option value="Coming Soon">Coming Soon</option>
                </select>
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                <Save size={15} />
                {editId ? "Save Changes" : "Create Course"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
