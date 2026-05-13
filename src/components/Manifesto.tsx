"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./Manifesto.module.css";
import { richEm } from "@/lib/rich";

const palette = [
  { bg: "#F2EDE5", fg: "#0E0E10", em: "#E91E8C" },
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
const rgb = (a: [number, number, number], b: [number, number, number], k: number) =>
  `rgb(${lerp(a[0], b[0], k)},${lerp(a[1], b[1], k)},${lerp(a[2], b[2], k)})`;
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

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

    let raf = 0;
    const tick = () => {
      const y = scrollY;
      const r = section.getBoundingClientRect();
      const top = y + r.top;
      const h = section.offsetHeight - innerHeight;
      if (y < top - innerHeight || y > top + h + innerHeight) {
        raf = 0;
        return;
      }

      const tNorm = clamp01((y - top) / h);

      // Lerp color usando segmentos entre paletas
      const segCount = palette.length - 1;
      const segFloat = tNorm * segCount;
      const idx = Math.min(segCount - 1, Math.floor(segFloat));
      const seg = segFloat - idx;

      const a = hex(palette[idx].bg);
      const b = hex(palette[idx + 1].bg);
      const af = hex(palette[idx].fg);
      const bf = hex(palette[idx + 1].fg);
      const ae = hex(palette[idx].em);
      const be = hex(palette[idx + 1].em);

      pin.style.background = rgb(a, b, seg);
      pin.style.color = rgb(af, bf, seg);
      const emColor = rgb(ae, be, seg);
      emsRef.current.forEach((el) => {
        if (el) el.style.color = emColor;
      });

      // Reveal de palabras: cada palabra arranca en un anchor distinto,
      // ramp suave de 14% del scroll. Las 4 palabras revelan en el primer 70%.
      const anchors = [0.05, 0.22, 0.4, 0.55];
      const ramp = 0.14;
      wordsRef.current.forEach((w, i) => {
        if (!w) return;
        const op = clamp01((tNorm - anchors[i]) / ramp);
        const min = 0.08;
        w.style.opacity = String(min + (1 - min) * op);
        w.style.transform = `translate3d(0, ${(1 - op) * 18}px, 0)`;
      });

      // Progress dots: se prenden suavemente según cercanía al segmento
      progRef.current.forEach((p, i) => {
        if (!p) return;
        const dist = Math.abs(segFloat - i);
        const on = Math.max(0, 1 - dist);
        p.style.opacity = String(0.35 + on * 0.65);
        p.style.transform = `translateX(${(1 - on) * -8}px)`;
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
