"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./About.module.css";
import { richEm } from "@/lib/rich";

export function About() {
  const t = useTranslations("About");
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const p = (r.top - innerHeight / 2) / innerHeight;
        el.style.transform = `translate3d(0, ${p * -40}px, 0)`;
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.about}>
      <span className={styles.pantone} aria-hidden>
        {t("pantoneCode")}
      </span>

      <div className={styles.grid}>
        <div className={styles.label} data-reveal>
          <span>{t("label")}</span>
          <em>{t("kicker")}</em>
        </div>

        <div className={styles.photoWrap} data-reveal>
          <div className={styles.photoFrame} aria-hidden />
          <div className={styles.photoBlock} aria-hidden />
          <div ref={photoRef} className={styles.photo}>
            <Image
              src="/photos/DSC02829.jpg"
              alt={t("imgAlt")}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className={styles.copy} data-reveal>
          {t.rich("copyLine1", richEm)}
          <br />
          {t.rich("copyLine2", richEm)}
          <br />
          <span className={styles.ink}>{t("copyLine3")}</span>
        </div>

        <aside className={styles.ficha} data-reveal>
          <span className={styles.fichaLab}>{t("fichaLab")}</span>
          <dl className={styles.fichaList}>
            <div className={styles.fichaRow}>
              <dt>{t("fichaOrigenK")}</dt>
              <dd>{t.rich("fichaOrigenV", richEm)}</dd>
            </div>
            <div className={styles.fichaRow}>
              <dt>{t("fichaAdopcionK")}</dt>
              <dd>{t.rich("fichaAdopcionV", richEm)}</dd>
            </div>
            <div className={styles.fichaRow}>
              <dt>{t("fichaOperacionK")}</dt>
              <dd>{t.rich("fichaOperacionV", richEm)}</dd>
            </div>
            <div className={styles.fichaRow}>
              <dt>{t("fichaIdiomasK")}</dt>
              <dd>{t.rich("fichaIdiomasV", richEm)}</dd>
            </div>
          </dl>
        </aside>

        <div className={styles.bridge} data-reveal>
          <span>{t("bridge0")}</span>
          <span>{t("bridge1")}</span>
          <span>{t.rich("bridge2", richEm)}</span>
        </div>

        <div className={styles.formacion} data-reveal>
          <span className={styles.formacionLab}>{t("formacionLab")}</span>
          <span>{t.rich("formacion0", richEm)}</span>
          <span>{t.rich("formacion1", richEm)}</span>
          <span>{t.rich("formacion2", richEm)}</span>
          <span>{t.rich("formacion3", richEm)}</span>
        </div>
      </div>
    </section>
  );
}
