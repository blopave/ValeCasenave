"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./Manifesto.module.css";

const palette = [
  { bg: "#0E0E10", fg: "#F2EDE5", em: "#FFD400" },
  { bg: "#00B6D9", fg: "#0E0E10", em: "#E91E8C" },
  { bg: "#FFD400", fg: "#0E0E10", em: "#00C766" },
  { bg: "#E91E8C", fg: "#F2EDE5", em: "#00B6D9" },
];

const lerp = (a: number, b: number, k: number) => Math.round(a + (b - a) * k);
const hex = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

const richEm = { em: (chunks: React.ReactNode) => <em>{chunks}</em> };

export function Manifesto() {
  const t = useTranslations("Manifesto");
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const emsRef = useRef<HTMLElement[]>([]);
  const progRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const onScroll = () => {
      const y = scrollY;
      const r = section.getBoundingClientRect();
      const top = y + r.top;
      const h = section.offsetHeight - innerHeight;
      if (y < top - 1 || y > top + h) return;

      const tNorm = Math.max(0, Math.min(1, (y - top) / h));
      const idx = Math.min(palette.length - 1, Math.floor(tNorm * palette.length));
      const next = Math.min(palette.length - 1, idx + 1);
      const seg = tNorm * palette.length - idx;

      const a = hex(palette[idx].bg);
      const b = hex(palette[next].bg);
      const af = hex(palette[idx].fg);
      const bf = hex(palette[next].fg);
      const ae = hex(palette[idx].em);
      const be = hex(palette[next].em);

      pin.style.background = `rgb(${lerp(a[0], b[0], seg)},${lerp(a[1], b[1], seg)},${lerp(a[2], b[2], seg)})`;
      pin.style.color = `rgb(${lerp(af[0], bf[0], seg)},${lerp(af[1], bf[1], seg)},${lerp(af[2], bf[2], seg)})`;
      const emColor = `rgb(${lerp(ae[0], be[0], seg)},${lerp(ae[1], be[1], seg)},${lerp(ae[2], be[2], seg)})`;
      emsRef.current.forEach((el) => {
        if (el) el.style.color = emColor;
      });

      const wordT = Math.min(1, tNorm / 0.4);
      const wordIdx = Math.min(
        wordsRef.current.length - 1,
        Math.floor(wordT * wordsRef.current.length)
      );
      wordsRef.current.forEach((w, i) =>
        w?.classList.toggle(styles.on, i <= wordIdx)
      );
      progRef.current.forEach((p, i) =>
        p?.classList.toggle(styles.on, i === idx)
      );
    };

    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const setWord = (i: number) => (el: HTMLSpanElement | null) => {
    if (el) wordsRef.current[i] = el;
  };
  const setEm = (i: number) => (el: HTMLElement | null) => {
    if (el) emsRef.current[i] = el;
  };
  const setProg = (i: number) => (el: HTMLSpanElement | null) => {
    if (el) progRef.current[i] = el;
  };

  // Build em-tracked rich rendering: each em gets a ref so we can lerp its color
  const richWord = (i: number) => ({
    em: (chunks: React.ReactNode) => <em ref={setEm(i)}>{chunks}</em>,
  });

  return (
    <section ref={sectionRef} className={styles.manifesto}>
      <div ref={pinRef} className={styles.pin}>
        <div className={styles.progress}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} ref={setProg(i)}>
              {t(`progress${i}` as `progress${0 | 1 | 2 | 3}`)}
            </span>
          ))}
        </div>
        <h2 className={styles.h2}>
          <span ref={setWord(0)} className={styles.word}>
            {t.rich("word0", richWord(0))}
          </span>
          <span ref={setWord(1)} className={styles.word}>
            {t.rich("word1", richWord(1))}
          </span>
          <span ref={setWord(2)} className={styles.word}>
            {t.rich("word2", richEm)}
          </span>
          <span ref={setWord(3)} className={styles.word}>
            {t.rich("word3", richWord(2))}
          </span>
        </h2>
      </div>
    </section>
  );
}
