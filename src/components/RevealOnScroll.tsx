"use client";

import { useEffect } from "react";

/**
 * Global reveal-on-scroll. Add `data-reveal` to any element to fade-up on
 * intersection. Mounts once at root.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) =>
      io.observe(el)
    );
    return () => io.disconnect();
  }, []);
  return null;
}
