"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./Nav.module.css";

const sectionKeys = [
  "hero",
  "about",
  "manifesto",
  "numbers",
  "cuerpo",
  "voz",
  "empresas",
  "pubs",
  "contacto",
] as const;

export function Nav() {
  const tNav = useTranslations("Nav");
  const tSections = useTranslations("SideRail");
  const locale = useLocale();
  const pathname = usePathname();
  const [activeIdx, setActiveIdx] = useState(0);
  const [total, setTotal] = useState(9);

  useEffect(() => {
    const update = () => {
      const sections = document.querySelectorAll("section");
      setTotal(sections.length);
      let curSec = 0;
      sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top < window.innerHeight * 0.5) {
          curSec = i;
        }
      });
      setActiveIdx(curSec);
    };
    addEventListener("scroll", update, { passive: true });
    update();
    return () => removeEventListener("scroll", update);
  }, []);

  const progress = `${String(activeIdx + 1).padStart(2, "0")} / ${String(
    total
  ).padStart(2, "0")}`;
  const sectionName = tSections(sectionKeys[activeIdx] ?? "hero");

  return (
    <nav className={styles.nav}>
      <div className={styles.col}>
        <span className={styles.dot} aria-hidden />
        <span>{tNav("brand")}</span>
      </div>
      <div className={styles.col}>
        <span className={styles.section}>{sectionName}</span>
        <span aria-hidden className={styles.sep}>
          ·
        </span>
        <span>{progress}</span>
        <span aria-hidden className={styles.sep}>
          ·
        </span>
        <span className={styles.langs}>
          {locale === "es" ? (
            <>
              <span className={styles.active}>ES</span>
              <span aria-hidden>·</span>
              <Link href={pathname} locale="en">
                EN
              </Link>
            </>
          ) : (
            <>
              <Link href={pathname} locale="es">
                ES
              </Link>
              <span aria-hidden>·</span>
              <span className={styles.active}>EN</span>
            </>
          )}
        </span>
      </div>
    </nav>
  );
}
