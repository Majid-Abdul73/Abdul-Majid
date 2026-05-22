"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Save, Tag, Clock, BookOpen } from "lucide-react";
import { DbService } from "@/services/db.service";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  published: boolean;
}

interface AdminBlogsProps {
  blogs: BlogPost[];
  setBlogs: (b: BlogPost[]) => void;
}

const CATEGORIES = [
  "System Design", "Interview Prep", "Architecture", "Frontend",
  "Backend", "Database", "Career", "DevOps", "Mobile",
];

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const emptyForm = (): Omit<BlogPost, "id"> => ({
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  category: "System Design",
  readTime: "",
  date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  published: true,
});

export default function AdminBlogs({ blogs, setBlogs }: AdminBlogsProps) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const openNew = () => {
    setForm(emptyForm());
    setEditId(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (b: BlogPost) => {
    setForm({
      title: b.title, slug: b.slug, content: b.content, excerpt: b.excerpt, category: b.category,
      readTime: b.readTime, date: b.date, published: b.published,
    });
    setEditId(b.id);
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      setError("Title, excerpt, and content are required.");
      return;
    }
    try {
      const slug = form.slug.trim() || generateSlug(form.title);
      const dataToSave = { ...form, slug };
      
      if (editId) {
        const updated = await DbService.update("blogs", editId, dataToSave) as unknown as BlogPost;
        setBlogs(blogs.map((b) => (b.id === editId ? { ...b, ...updated } : b)));
      } else {
        const inserted = await DbService.insert("blogs", dataToSave) as unknown as BlogPost;
        setBlogs([inserted, ...blogs]);
      }
      setShowForm(false);
      setEditId(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while saving.");
    }
  };

  const togglePublished = async (id: string) => {
    const blog = blogs.find((b) => b.id === id);
    if (!blog) return;
    try {
      await DbService.update("blogs", id, { published: !blog.published });
      setBlogs(blogs.map((b) => (b.id === id ? { ...b, published: !b.published } : b)));
    } catch (err) {
      console.error("Failed to toggle publish state:", err);
    }
  };

  const deleteBlog = async (id: string) => {
    if (confirm("Delete this blog post?")) {
      try {
        await DbService.delete("blogs", id);
        setBlogs(blogs.filter((b) => b.id !== id));
      } catch (err) {
        console.error("Failed to delete blog:", err);
      }
    }
  };

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Blog Posts</h1>
          <p className="text-foreground/40 text-sm mt-1">
            {blogs.filter((b) => b.published).length} published · {blogs.filter((b) => !b.published).length} drafts
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-foreground text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95 shrink-0"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title or category..."
        className="w-full max-w-sm px-4 py-2.5 bg-secondary border border-border text-foreground text-sm placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors"
      />

      {/* Blog Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-foreground/30">
          <BookOpen size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No blog posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className={`bg-card border p-5 flex flex-col gap-3 transition-colors ${
                b.published ? "border-border" : "border-border/40 opacity-60"
              }`}
            >
              {/* Category + Status */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  <Tag size={9} /> {b.category}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                    b.published
                      ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/30"
                      : "bg-zinc-600/40 text-foreground/50 border border-border"
                  }`}
                >
                  {b.published ? "Published" : "Draft"}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-foreground font-bold text-sm leading-snug flex-1">{b.title}</h3>

              {/* Excerpt */}
              <p className="text-foreground/40 text-xs leading-relaxed line-clamp-2">{b.excerpt}</p>

              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-foreground/30">
                <span className="flex items-center gap-1"><Clock size={10} />{b.readTime}</span>
                <span className="flex items-center gap-1"><BookOpen size={10} />{b.date}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border mt-auto">
                <button
                  onClick={() => togglePublished(b.id)}
                  className="text-xs text-foreground/40 hover:text-foreground transition-colors"
                  title={b.published ? "Set as Draft" : "Publish"}
                >
                  {b.published ? "Unpublish" : "Publish"}
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => openEdit(b)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-foreground/50 hover:text-foreground hover:bg-secondary border border-border transition-all"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(b.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-400/60 hover:text-red-400 hover:bg-red-400/10 border border-red-400/20 transition-all"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-card border border-border p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center bg-secondary text-foreground/50 hover:text-foreground transition-colors"
            >
              <X size={15} />
            </button>

            <h2 className="text-xl font-extrabold text-foreground mb-5">
              {editId ? "Edit Blog Post" : "New Blog Post"}
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Mastering React Server Components"
                  className="w-full px-3 py-2.5 bg-secondary border border-border text-foreground text-sm placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="e.g. mastering-react-server-components"
                  className="w-full px-3 py-2.5 bg-secondary border border-border text-foreground text-sm placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Excerpt *</label>
                <textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="A short summary of the post..."
                  className="w-full px-3 py-2.5 bg-secondary border border-border text-foreground text-sm placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Content *</label>
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write your blog post content here..."
                  className="w-full px-3 py-2.5 bg-secondary border border-border text-foreground text-sm placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2.5 bg-card border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Read Time + Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground/50 mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder="e.g. 8 min read"
                    className="w-full px-3 py-2.5 bg-secondary border border-border text-foreground text-sm placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/50 mb-1.5">Date</label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="e.g. May 2025"
                    className="w-full px-3 py-2.5 bg-secondary border border-border text-foreground text-sm placeholder-foreground/30 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Published toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="published" className="text-sm text-foreground/70 cursor-pointer">
                  Publish immediately
                </label>
              </div>

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
              >
                <Save size={15} />
                {editId ? "Save Changes" : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
