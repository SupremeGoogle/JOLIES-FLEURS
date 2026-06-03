"use client";
import { useEffect } from "react";

// IntersectionObserver fallback for browsers without scroll-driven animations (Firefox)
export default function RevealInit() {
  useEffect(() => {
    if (CSS.supports("(animation-timeline: view()) and (animation-range: entry)")) return;

    const els = document.querySelectorAll<HTMLElement>(".reveal-fallback");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
