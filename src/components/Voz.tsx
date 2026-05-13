"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./Voz.module.css";
import { richEm } from "@/lib/rich";
import { useParallaxBg } from "@/lib/useParallax";

const ediciones = [
  { year: "2024", name: "TEDxPaseoSantaLucía", city: "Monterrey" },
  { year: "2023", name: "TEDxPaseoSantaLucía", city: "Monterrey" },
  { year: "2022", name: "TEDxPaseoSantaLucía", city: "Monterrey" },
  { year: "2022", name: "TEDxLaCondesa", city: "CDMX" },
  { year: "2020", name: "TEDxPolanco", city: "CDMX" },
  { year: "2019", name: "TEDxGualeguaychú", city: "AR" },
  { year: "2018", name: "TEDxIbero", city: "CDMX" },
  { year: "2017", name: "TEDxCuauhtémoc", city: "CDMX" },
  { year: "2016", name: "TEDxCuauhtémoc", city: "CDMX" },
  { year: "2015", name: "TEDxCuauhtémoc Mujeres", city: "CDMX" },
  { year: "2015", name: "TEDxBogotá", city: "CO" },
  { year: "2015", name: "TEDxCuauhtémoc", city: "CDMX" },
  { year: "2014", name: "TEDxCuauhtémoc", city: "CDMX" },
];

export function Voz() {
  const t = useTranslations("Voz");
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  useParallaxBg(sectionRef, bgRef, 200);

  return (
    <section ref={sectionRef} className={styles.voz}>
      <div ref={bgRef} className={styles.bg}>
        <Image
          src="/photos/tedx/auditorio-rojo.jpg"
          alt={t("imgAlt")}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "50% 38%" }}
          priority={false}
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

      <aside className={styles.ediciones} aria-label={t("edicionesLab")}>
        <div className={styles.edHead}>
          <span className={styles.edLab}>{t("edicionesLab")}</span>
          <span className={styles.edRange}>2014 — 2024</span>
        </div>
        <ol className={styles.edList}>
          {ediciones.map((e, i) => (
            <li key={i} className={styles.edItem}>
              <span className={styles.edYear}>{e.year}</span>
              <span className={styles.edName}>{e.name}</span>
              <span className={styles.edCity}>{e.city}</span>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}
