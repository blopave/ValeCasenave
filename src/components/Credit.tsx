import { getTranslations } from "next-intl/server";
import styles from "./Credit.module.css";

export async function Credit() {
  const t = await getTranslations("Credit");

  return (
    <aside className={styles.credit} aria-label={t("aria")}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.lab}>↳ {t("lab")}</span>
          <span className={styles.meta}>{t("meta")}</span>
        </div>

        <a
          href="https://blopavela.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logoLink}
          aria-label={t("linkAria")}
        >
          <span className={styles.logo}>blo pa/</span>
          <span className={styles.arrow} aria-hidden>
            ↗
          </span>
        </a>
      </div>
    </aside>
  );
}
