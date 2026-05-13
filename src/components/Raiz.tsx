"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./Raiz.module.css";
import { richEm } from "@/lib/rich";
import { useParallaxLayers } from "@/lib/useParallax";

export function Raiz() {
  const t = useTranslations("Raiz");
  const rootRef = useRef<HTMLElement>(null);
  useParallaxLayers(rootRef, "[data-speed]", 420);

  return (
    <section ref={rootRef} className={styles.raiz}>
      <header className={styles.head}>
        <div className={styles.label} data-reveal>
          <span>{t("labelChap")}</span>
          <em>{t("labelText")}</em>
        </div>
        <h3 className={styles.h3} data-reveal>
          {t.rich("h3", richEm)}
        </h3>
      </header>

      {/* Capa 1 — frase ancla "atraviesa todo" */}
      <p className={styles.quoteA} data-reveal data-speed="0.55">
        <span className={styles.qOpen}>&ldquo;</span>
        {t.rich("quoteA", richEm)}
      </p>

      {/* Foto 1 — caminando de espaldas, grande, derecha */}
      <figure className={styles.f1} data-speed="0.55" data-rot="2.4">
        <Image
          src="/photos/familia/caminando.jpg"
          alt={t("img0Alt")}
          fill
          sizes="(max-width: 900px) 90vw, 45vw"
          style={{ objectFit: "cover", objectPosition: "50% 30%" }}
        />
        <figcaption className={styles.cap}>{t.rich("cap0", richEm)}</figcaption>
      </figure>

      {/* Foto 2 — saltando cuerda, mediana, izquierda */}
      <figure className={styles.f2} data-speed="1.0" data-rot="-1.8">
        <Image
          src="/photos/familia/cuerda.jpg"
          alt={t("img1Alt")}
          fill
          sizes="(max-width: 900px) 90vw, 38vw"
          style={{ objectFit: "cover" }}
        />
        <figcaption className={styles.cap}>{t.rich("cap1", richEm)}</figcaption>
      </figure>

      {/* Capa de meta — Anita / Joaco como sello vertical */}
      <aside className={styles.metaCol} data-speed="0.45">
        <span className={styles.metaLab}>{t("metaLab")}</span>
        <span className={styles.metaLine}>{t("metaSimona")}</span>
        <span className={styles.metaLine}>{t("metaOctavio")}</span>
      </aside>

      {/* Frase media — Anita y Joaco / edad crítica */}
      <p className={styles.quoteB} data-reveal data-speed="0.4">
        {t.rich("quoteB", richEm)}
      </p>

      {/* Foto 3 — los tres acostados sonriendo, chica, centro-derecha */}
      <figure className={styles.f3} data-speed="1.3" data-rot="3.2">
        <Image
          src="/photos/familia/pasto.jpg"
          alt={t("img2Alt")}
          fill
          sizes="(max-width: 900px) 80vw, 30vw"
          style={{ objectFit: "cover" }}
        />
        <figcaption className={styles.cap}>{t.rich("cap2", richEm)}</figcaption>
      </figure>

      {/* Foto 4 — corriendo de frente, vertical chica, izquierda-baja */}
      <figure className={styles.f4} data-speed="1.5" data-rot="-2.4">
        <Image
          src="/photos/familia/corriendo.jpg"
          alt={t("img3Alt")}
          fill
          sizes="(max-width: 900px) 80vw, 26vw"
          style={{ objectFit: "cover", objectPosition: "50% 35%" }}
        />
        <figcaption className={styles.cap}>{t.rich("cap3", richEm)}</figcaption>
      </figure>

      {/* Declaración final — gran tipografía */}
      <div className={styles.closing} data-reveal>
        <p className={styles.closingText}>{t.rich("closing", richEm)}</p>
        <span className={styles.closingAttr}>{t("closingAttr")}</span>
      </div>
    </section>
  );
}
