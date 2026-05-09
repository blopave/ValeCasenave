"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./Loader.module.css";

export function Loader() {
  const t = useTranslations("Loader");
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);
  const [removed, setRemoved] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("loading");
    const root = rootRef.current;
    requestAnimationFrame(() => root?.classList.add(styles.in));

    const start = performance.now();
    const duration = 1300;
    let raf = 0;
    let goneTimer = 0;
    let removeTimer = 0;

    const step = (t: number) => {
      const k = Math.min(1, (t - start) / duration);
      // ease-out cubic — desaceleración natural hacia 100
      const ease = 1 - Math.pow(1 - k, 3);
      setN(Math.round(ease * 100));
      if (k < 1) {
        raf = requestAnimationFrame(step);
      } else {
        goneTimer = window.setTimeout(() => {
          setGone(true);
          document.body.classList.remove("loading");
        }, 280);
        removeTimer = window.setTimeout(() => setRemoved(true), 1500);
      }
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(goneTimer);
      clearTimeout(removeTimer);
      document.body.classList.remove("loading");
    };
  }, []);

  if (removed) return null;

  return (
    <div
      ref={rootRef}
      className={`${styles.loader} ${gone ? styles.gone : ""}`}
      aria-hidden="true"
    >
      <div className={styles.bars}>
        <div className={`${styles.bar} ${styles.c}`} />
        <div className={`${styles.bar} ${styles.m}`} />
        <div className={`${styles.bar} ${styles.y}`} />
        <div className={`${styles.bar} ${styles.k}`} />
      </div>
      <div className={styles.meta}>
        <div className={styles.label}>{t("label")}</div>
        <div className={styles.counter}>{String(n).padStart(3, "0")}</div>
        <div className={styles.status}>{t("status")}</div>
      </div>
    </div>
  );
}
