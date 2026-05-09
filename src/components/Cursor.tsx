"use client";

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = ref.current;
    if (!cur) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      cur.style.left = rx + "px";
      cur.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    };

    const matchSelectors = "a, button, [data-cursor]";
    const onEnter = () => cur.classList.add(styles.big);
    const onLeave = () => cur.classList.remove(styles.big);
    const els = document.querySelectorAll(matchSelectors);
    els.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return <div ref={ref} className={styles.cur} aria-hidden="true" />;
}
