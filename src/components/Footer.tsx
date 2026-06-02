import { getTranslations } from "next-intl/server";
import styles from "./Footer.module.css";

// Sello pantone: los 4 colores de la paleta + paper + ink
const swatches = [
  "var(--color-petroleo)",
  "var(--color-rosa)",
  "var(--color-limon)",
  "var(--color-menta)",
  "var(--color-paper)",
  "var(--color-ink)",
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
