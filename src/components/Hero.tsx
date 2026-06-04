"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./Hero.module.css";

const cardRotations: Record<string, number> = {
  yellow: -1.6,
  ink: 2.6,
  cyan: -3,
  green: 5,
  humanae: -1.5,
};

export function Hero() {
  const t = useTranslations("Hero");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const els = hero.querySelectorAll<HTMLElement>("[data-parallax]");
    let pmx = 0;
    let pmy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      pmx = (e.clientX - r.width / 2) / r.width;
      pmy = (e.clientY - r.height / 2) / r.height;
    };

    const tick = () => {
      els.forEach((el) => {
        const d = parseFloat(el.dataset.depth ?? "0.1");
        const key = el.dataset.parallax ?? "";
        const rot = cardRotations[key] ?? 0;
        el.style.transform = `translate3d(${pmx * 30 * d}px, ${
          pmy * 30 * d
        }px, 0) rotate(${rot}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };

    hero.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      <div className={styles.stage}>
        <div
          className={styles.humanaeCard}
          data-parallax="humanae"
          data-depth="0.05"
        >
          <div className={styles.ph}>
            <Image
              src="/photos/humanae.jpg"
              alt={t("imgAlt")}
              fill
              sizes="(max-width: 900px) 160px, 300px"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className={styles.nameblock}>
          <div className={styles.cards} aria-hidden="true">
            <div
              className={`${styles.card} ${styles.ink}`}
              data-parallax="ink"
              data-depth="0.14"
            >
              <span className={styles.lab}>K / 100</span>
            </div>
            <div
              className={`${styles.card} ${styles.green}`}
              data-parallax="green"
              data-depth="0.10"
            >
              <span className={styles.lab}>R / 698</span>
            </div>
            <div
              className={`${styles.card} ${styles.yellow}`}
              data-parallax="yellow"
              data-depth="0.06"
            >
              <span className={styles.lab}>L / 102</span>
            </div>
            <div
              className={`${styles.card} ${styles.cyan}`}
              data-parallax="cyan"
              data-depth="0.18"
            >
              <span className={styles.lab}>V / 563</span>
            </div>
          </div>
          <h1 className={styles.h1}>
            <span className={styles.vale}>{t("valeWord")}</span>
            <span className={styles.case}>
              {t("casePart")}
              <em>{t("navePart")}</em>
            </span>
          </h1>
        </div>
      </div>

      <div className={styles.bot}>
        <div className={styles.role}>
          {t("roleLine1")}
          <br />
          {t("roleLine2")}
          <br />
          <em>{t("roleEmphasis")}</em>.
        </div>
        <div className={styles.meta}>
          {t("metaLine1")}
          <br />
          {t("metaLine2")}
          <br />
          {t("metaLine3")}
        </div>
        <div className={styles.scrollCta}>
          <div>
            {t("scroll")}{" "}
            <span
              style={{
                display: "inline-block",
                width: 32,
                height: 1,
                background: "currentColor",
              }}
            />{" "}
            ↓
          </div>
        </div>
      </div>
    </section>
  );
}
