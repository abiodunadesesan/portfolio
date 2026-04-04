"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  
  // Track actual mouse coords instantly
  const mouse = useRef({ x: 0, y: 0 });
  // Lerp tracking for the ring
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    // Show cursor when inside window bounds
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Move dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let rafId: number;
    const render = () => {
      // Lerp ring towards mouse
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // Don't render on mobile
  }

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[1000] overflow-hidden"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      {/* Lagging Ring */}
      <div 
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-violet-500/50 mix-blend-difference will-change-transform dark:border-violet-400/60"
      />
      {/* Instant Dot */}
      <div 
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-violet-600 mix-blend-difference will-change-transform dark:bg-violet-300"
      />
    </div>
  );
}
