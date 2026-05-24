"use client";

import { useState, useEffect, useRef } from "react";
import { Tag, Clock, BookOpen, X, ChevronRight } from "lucide-react";
import { DbService } from "@/services/db.service";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  published: boolean;
};

// ─── Modal Component ─────────────────────────────────────────────────────────
function BlogModal({ post, onClose }: { post: BlogPost | null; onClose: () => void }) {
  useEffect(() => {
    if (post) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [post]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-card border border-border shadow-2xl shadow-black flex flex-col max-h-[90vh] overflow-hidden rounded-md animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-secondary/80 text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto hide-scrollbar flex-1">
          {/* Header Area */}
          <div className="px-6 sm:px-10 pt-12 pb-8 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <Tag size={12} />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-foreground/40 font-medium">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4">
              {post.title}
            </h2>
            
            <div className="flex items-center gap-3 text-sm text-foreground/50">
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} />
                Published in {post.date}
              </span>
            </div>
          </div>

          {/* Article Body */}
          <div className="px-6 sm:px-10 py-10 text-foreground/80 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
            {post.content}
          </div>
          
          {/* Footer Area */}
          <div className="px-6 sm:px-10 py-6 border-t border-border bg-muted/30 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-primary text-foreground font-semibold hover:bg-primary/90 transition-colors rounded-sm"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await DbService.getAll("blogs", {
          order: { column: "created_at", ascending: false }
        }) as unknown as BlogPost[];
        // Only show published posts
        setPosts(data.filter(post => post.published));
      } catch (err: any) {
        setError(err.message || "Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <section id="blog" className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                Writing
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
                Writing & Thinking
              </h2>
              <p className="mt-4 text-foreground/50 text-lg max-w-2xl">
                Thoughts on engineering, architecture, and career growth.
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20 text-foreground/30">
              <BookOpen size={36} className="mx-auto mb-3 opacity-30 animate-pulse" />
              <p className="text-sm">Loading blog posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20 text-red-400">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-20 text-foreground/30">
              <BookOpen size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No blog posts found.</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group p-6 bg-card border border-border hover:border-primary/50 hover:bg-muted transition-all duration-300 flex flex-col text-left focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-secondary border border-border text-foreground/70 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-colors">
                      <Tag size={11} />
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-foreground font-bold text-xl leading-snug mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-foreground/60 text-sm leading-relaxed flex-1 mb-8">
                    {post.excerpt}
                  </p>

                  <div className="w-full pt-4 border-t border-border flex items-center justify-between text-xs text-foreground/40 mt-auto">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock size={13} />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                      Read Article <ChevronRight size={14} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Render Modal */}
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  );
}
