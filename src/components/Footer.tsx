import { getTranslations } from "next-intl/server";
import styles from "./Footer.module.css";

const swatches = [
  "var(--color-cyan)",
  "var(--color-magenta)",
  "var(--color-yellow)",
  "var(--color-green)",
  "var(--color-pantone)",
  "var(--color-paper)",
];

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className={styles.footer}>
      <span>{t("left")}</span>
      <div className={styles.pant} aria-hidden>
        {swatches.map((bg, i) => (
          <span key={i} style={{ background: bg }} />
        ))}
      </div>
      <span>{t("right")}</span>
    </footer>
  );
}
