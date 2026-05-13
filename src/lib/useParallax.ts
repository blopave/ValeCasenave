"use client";

import { useEffect, type RefObject } from "react";

/**
 * Parallax de fondo: a más scroll, más translate. Intensity es px que se mueve
 * el bg entre la entrada y la salida del viewport.
 */
export function useParallaxBg(
  sectionRef: RefObject<HTMLElement | null>,
  bgRef: RefObject<HTMLElement | null>,
  intensity: number = 160
) {
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const tick = () => {
      const r = section.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const p = r.top / innerHeight;
        bg.style.transform = `translate3d(0, ${p * intensity}px, 0) scale(1.08)`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionRef, bgRef, intensity]);
}

/**
 * Parallax por elemento: cada nodo se mueve a una velocidad propia según data-speed.
 * data-speed=1 → se mueve igual que el scroll (queda más arriba al bajar).
 * data-speed=-1 → se mueve contra el scroll (queda más abajo, "flota").
 * data-speed=0.4 → suave hacia arriba.
 */
export function useParallaxLayers(
  rootRef: RefObject<HTMLElement | null>,
  selector: string = "[data-speed]",
  intensity: number = 220
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;

    let raf = 0;
    const tick = () => {
      const r = root.getBoundingClientRect();
      const progress = (r.top - innerHeight) / (r.height + innerHeight);
      els.forEach((el) => {
        const s = parseFloat(el.dataset.speed ?? "0.3");
        const offset = progress * intensity * s;
        const rot = parseFloat(el.dataset.rot ?? "0");
        el.style.transform = `translate3d(0, ${offset}px, 0) rotate(${rot}deg)`;
      });
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [rootRef, selector, intensity]);
}
