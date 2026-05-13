"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./Nav.module.css";

const labelOf: Record<string, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

export function Nav() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Idioma / Language / Idioma">
      <div className={styles.langSwitch}>
        <div className={styles.langToggle}>
          {routing.locales.map((loc, i) => {
            const active = loc === locale;
            return (
              <span key={loc} className={styles.langItem}>
                {active ? (
                  <span
                    className={`${styles.langOpt} ${styles.active}`}
                    aria-current="page"
                  >
                    {labelOf[loc] ?? loc.toUpperCase()}
                  </span>
                ) : (
                  <Link
                    href={pathname}
                    locale={loc}
                    className={styles.langOpt}
                  >
                    {labelOf[loc] ?? loc.toUpperCase()}
                  </Link>
                )}
                {i < routing.locales.length - 1 && (
                  <span className={styles.langSep} aria-hidden>
                    /
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
