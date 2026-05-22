"use client";

import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      <div className="text-[12rem] font-black text-white/5 leading-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        404
      </div>
      
      <div className="w-20 h-20 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-8">
        <Search size={40} />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
        Page Not Found
      </h1>
      
      <p className="text-foreground/60 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
        <button
          onClick={() => window.history.back()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-secondary text-foreground font-semibold border border-border hover:bg-foreground/10 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
        
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-foreground font-semibold hover:bg-primary/90 transition-all duration-300"
        >
          <Home size={18} />
          Go Home
        </Link>
      </div>
    </div>
  );
}
