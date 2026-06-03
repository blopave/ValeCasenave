"use client";

import { useTranslations } from "next-intl";
import styles from "./Contexto.module.css";
import { richEm } from "@/lib/rich";

export function Contexto() {
  const t = useTranslations("Contexto");

  return (
    <section className={styles.contexto}>
      <div className={styles.head}>
        <div className={styles.label} data-reveal>
          <span>{t("labelChap")}</span>
          <em>{t("labelText")}</em>
        </div>
        <h3 className={styles.h3} data-reveal>
          {t.rich("h3Line1", richEm)}
          <br />
          {t.rich("h3Line2", richEm)}
        </h3>
      </div>

      <div className={styles.grid}>
        <article className={`${styles.item} ${styles.big}`} data-reveal>
          <div className={styles.fig}>91<span className={styles.pct}>%</span></div>
          <p className={styles.cap}>{t.rich("stat0Cap", richEm)}</p>
          <a
            className={styles.src}
            href={t("stat0Url")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("stat0Src")} <span aria-hidden>↗</span>
          </a>
        </article>

        <article className={`${styles.item} ${styles.big}`} data-reveal>
          <div className={styles.fig}>80<span className={styles.pct}>%</span></div>
          <p className={styles.cap}>{t.rich("stat1Cap", richEm)}</p>
          <a
            className={styles.src}
            href={t("stat1Url")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("stat1Src")} <span aria-hidden>↗</span>
          </a>
        </article>

        <article className={styles.itemS} data-reveal>
          <div className={styles.figS}>16<span className={styles.pctS}>%</span></div>
          <p className={styles.capS}>{t.rich("stat2Cap", richEm)}</p>
        </article>

        <article className={styles.itemS} data-reveal>
          <div className={styles.figS}>2<span className={styles.pctS}>×</span></div>
          <p className={styles.capS}>{t.rich("stat3Cap", richEm)}</p>
        </article>

        <article className={styles.itemS} data-reveal>
          <div className={styles.figS}>+200<span className={styles.pctS}>%</span></div>
          <p className={styles.capS}>{t.rich("stat4Cap", richEm)}</p>
        </article>
      </div>

      <blockquote className={styles.quote} data-reveal>
        <span className={styles.mark}>&ldquo;</span>
        <p className={styles.qText}>{t.rich("quote", richEm)}</p>
        <a
          className={styles.qAttr}
          href={t("quoteUrl")}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("quoteAttr")} <span aria-hidden>↗</span>
        </a>
      </blockquote>
    </section>
  );
}
