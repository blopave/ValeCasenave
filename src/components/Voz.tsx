"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./Voz.module.css";

const richEm = { em: (chunks: React.ReactNode) => <em>{chunks}</em> };

export function Voz() {
  const t = useTranslations("Voz");
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;
    const onScroll = () => {
      const r = section.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const p = r.top / innerHeight;
        bg.style.transform = `translate3d(0, ${p * 80}px, 0) scale(1.05)`;
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.voz}>
      <div ref={bgRef} className={styles.bg}>
        <Image
          src="/photos/IMG_3537.JPG"
          alt={t("imgAlt")}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.label}>
        {t("labelChap")} <em>{t("labelChapNum")}</em> {t("labelText")}
      </div>
      <div className={styles.stats}>
        <span>{t.rich("stat0", richEm)}</span>
        <span>{t.rich("stat1", richEm)}</span>
        <span>{t("stat2")}</span>
        <span>{t("stat3")}</span>
      </div>
      <blockquote className={styles.quote}>
        <span className={styles.mark}>&ldquo;</span>
        <p className={styles.text}>{t.rich("quote", richEm)}</p>
        <span className={styles.attr}>{t("attr")}</span>
      </blockquote>
    </section>
  );
}
