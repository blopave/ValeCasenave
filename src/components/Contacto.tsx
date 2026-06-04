"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./Contacto.module.css";
import { richEm } from "@/lib/rich";

const EMAIL = "valeriacasenave@gmail.com";

export function Contacto() {
  const t = useTranslations("Contacto");
  const [times, setTimes] = useState({
    cdmx: "··:··",
    local: "··:··",
    zone: "···",
    same: false,
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const cdmxZone = "America/Mexico_City";
      const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const cdmxFmt = new Intl.DateTimeFormat("es-MX", {
        timeZone: cdmxZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const localFmt = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const cleanZone =
        userZone === cdmxZone
          ? "CDMX"
          : (userZone.split("/").pop() ?? userZone).replace(/_/g, " ");
      setTimes({
        cdmx: cdmxFmt.format(now),
        local: localFmt.format(now),
        zone: cleanZone,
        same: userZone === cdmxZone,
      });
    };
    update();
    const i = setInterval(update, 30_000);
    return () => clearInterval(i);
  }, []);

  const subject = encodeURIComponent(t("mailSubject"));
  const mailto = `mailto:${EMAIL}?subject=${subject}`;

  return (
    <section className={styles.contact}>
      <header className={styles.top}>
        <span className={styles.chap}>{t("top0")}</span>
        <div className={styles.clocks} aria-label={t("clocksAria")}>
          <span className={styles.clock}>
            <span className={styles.clockLab}>↳ CDMX · MX</span>
            <time className={styles.clockTime} suppressHydrationWarning>
              {times.cdmx}
            </time>
          </span>
          {!times.same && (
            <span className={styles.clock}>
              <span className={styles.clockLab}>↳ {times.zone}</span>
              <time className={styles.clockTime} suppressHydrationWarning>
                {times.local}
              </time>
            </span>
          )}
        </div>
      </header>

      <div className={styles.center}>
        <h2 className={styles.h2}>
          {t("h2Part")}
          <em>{t("h2Em")}</em>
        </h2>
        <aside className={styles.quote}>
          <span className={styles.qMark} aria-hidden>
            &ldquo;
          </span>
          <p className={styles.qText}>{t.rich("quote", richEm)}&rdquo;</p>
          <span className={styles.qAttr}>{t("quoteAttr")}</span>
        </aside>
      </div>

      <div className={styles.emailBlock}>
        <span className={styles.emailLab}>{t("emailLab")}</span>
        <a
          href={mailto}
          className={styles.email}
          aria-label={t("emailAria")}
        >
          {EMAIL}
        </a>
      </div>

      <footer className={styles.bottom}>
        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/in/valeria-casenave-3861434/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("linkLinkedIn")}
          </a>
          <a
            href="https://www.instagram.com/utopiainspira/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("linkInstagram")}
          </a>
        </div>
        <div className={styles.seal} aria-hidden>
          <span>{t("seal")}</span>
          <div className={styles.swatches}>
            <span style={{ background: "var(--color-cyan)" }} />
            <span style={{ background: "var(--color-yellow)" }} />
            <span style={{ background: "var(--color-paper)" }} />
            <span style={{ background: "var(--color-ink)" }} />
          </div>
        </div>
      </footer>
    </section>
  );
}
