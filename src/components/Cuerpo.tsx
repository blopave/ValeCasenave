"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./Cuerpo.module.css";

const richEm = { em: (chunks: React.ReactNode) => <em>{chunks}</em> };

export function Cuerpo() {
  const t = useTranslations("Cuerpo");
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
    <section ref={sectionRef} className={styles.cuerpo}>
      <div ref={bgRef} className={styles.bg}>
        <Image
          src="/photos/IMG_3136.JPG"
          alt={t("imgAlt")}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "50% 35%" }}
        />
      </div>
      <div className={styles.label}>{t("label")}</div>
      <div className={styles.stats}>
        <span>{t.rich("stat0", richEm)}</span>
        <span>{t("stat1")}</span>
        <span>{t("stat2")}</span>
      </div>
      <div className={styles.title}>
        <span className={styles.line1}>{t("line1")}</span>
        <span className={styles.line2}>{t("line2")}</span>
        <span className={styles.firma}>{t.rich("firma", richEm)}</span>
      </div>
    </section>
  );
}
