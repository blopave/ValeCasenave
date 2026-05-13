"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./Cuerpo.module.css";
import { richEm } from "@/lib/rich";
import { useParallaxBg } from "@/lib/useParallax";

export function Cuerpo() {
  const t = useTranslations("Cuerpo");
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  useParallaxBg(sectionRef, bgRef, 220);

  return (
    <section ref={sectionRef} className={styles.cuerpo}>
      <div ref={bgRef} className={styles.bg}>
        <Image
          src="/photos/IMG_3136.JPG"
          alt={t("imgAlt")}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "50% 30%" }}
        />
      </div>

      <div className={styles.topRow}>
        <div className={styles.label}>{t("label")}</div>
        <div className={styles.stats}>
          <span>{t.rich("stat0", richEm)}</span>
          <span>{t.rich("stat1", richEm)}</span>
          <span>{t.rich("stat2", richEm)}</span>
          <span>{t.rich("stat3", richEm)}</span>
        </div>
      </div>

      <aside className={styles.origen} data-reveal>
        <span className={styles.origenLab}>{t("origenLab")}</span>
        <h3 className={styles.origenHeadline}>{t.rich("origenHeadline", richEm)}</h3>
        <ul className={styles.origenList}>
          <li>
            <span>{t.rich("origen0a", richEm)}</span>
            <span>{t.rich("origen0b", richEm)}</span>
          </li>
          <li>
            <span>{t.rich("origen1a", richEm)}</span>
            <span>{t.rich("origen1b", richEm)}</span>
          </li>
          <li>
            <span>{t.rich("origen2a", richEm)}</span>
            <span>{t.rich("origen2b", richEm)}</span>
          </li>
        </ul>
        <p className={styles.origenNote}>{t.rich("origenNote", richEm)}</p>
      </aside>

      <div className={styles.title} data-reveal>
        <span className={styles.line1}>{t("line1")}</span>
        <span className={styles.line2}>{t("line2")}</span>
        <span className={styles.firma}>{t.rich("firma", richEm)}</span>
      </div>
    </section>
  );
}
