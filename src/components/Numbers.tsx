"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./Numbers.module.css";

type Item = {
  prefix: string;
  count: number;
  size: "big" | "m1" | "m2" | "s";
  labelKey: number;
};

const items: Item[] = [
  { prefix: "+", count: 400, size: "big", labelKey: 0 },
  { prefix: "+", count: 15, size: "m1", labelKey: 1 },
  { prefix: "×", count: 9, size: "m2", labelKey: 2 },
  { prefix: "×", count: 5, size: "s", labelKey: 3 },
];

function Counter({ prefix, target }: { prefix: string; target: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t0 = performance.now();
          const dur = 1400;
          const step = (t: number) => {
            const k = Math.min(1, (t - t0) / dur);
            const ease = 1 - Math.pow(1 - k, 3);
            el.querySelector("span[data-n]")!.textContent = String(
              Math.round(target * ease)
            );
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div ref={ref} className={styles.n}>
      <span className={styles.plus}>{prefix}</span>
      <span data-n>0</span>
    </div>
  );
}

export function Numbers() {
  const t = useTranslations("Numbers");

  return (
    <section className={styles.nums}>
      <div className={styles.head}>
        <div className={styles.lab} data-reveal>
          {t("lab")}
        </div>
        <h3 className={styles.h3} data-reveal>
          {t("h3Line1")}
          <br />
          <em>{t("h3Emphasis")}</em>.
        </h3>
      </div>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <div
            key={i}
            className={`${styles.item} ${styles[item.size]}`}
            data-reveal
          >
            <Counter prefix={item.prefix} target={item.count} />
            <div className={styles.l}>
              {t(`item${item.labelKey}Label0` as `item${0 | 1 | 2 | 3}Label0`)}
              <br />
              {t(`item${item.labelKey}Label1` as `item${0 | 1 | 2 | 3}Label1`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
