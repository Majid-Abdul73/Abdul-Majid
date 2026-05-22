"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot snaps instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      // Ring lags behind with lerp
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animateRing);
    };

    // Hover effect on interactive elements
    const onMouseEnterInteractive = () => {
      dot.classList.add("cursor-dot--active");
      ring.classList.add("cursor-ring--active");
    };
    const onMouseLeaveInteractive = () => {
      dot.classList.remove("cursor-dot--active");
      ring.classList.remove("cursor-ring--active");
    };

    const addListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select, label").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animateRing);
    addListeners();

    // Re-add listeners on DOM mutations (for dynamically added elements)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "var(--primary)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          transition: "width 0.2s, height 0.2s, background-color 0.2s",
          boxShadow: "0 0 8px 2px color-mix(in srgb, var(--primary) 60%, transparent)",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid color-mix(in srgb, var(--primary) 70%, transparent)",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
        }}
      />
      <style>{`
        .cursor-dot--active {
          width: 12px !important;
          height: 12px !important;
          background-color: var(--primary) !important;
        }
        .cursor-ring--active {
          width: 44px !important;
          height: 44px !important;
          border-color: var(--primary) !important;
        }
        @media (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
    </>
  );
}
