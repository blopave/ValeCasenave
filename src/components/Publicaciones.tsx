import { getTranslations } from "next-intl/server";
import styles from "./Publicaciones.module.css";

const richEm = { em: (chunks: React.ReactNode) => <em>{chunks}</em> };

const indices = [0, 1, 2, 3, 4, 5] as const;

export async function Publicaciones() {
  const t = await getTranslations("Publicaciones");

  return (
    <section className={styles.pubs}>
      <div className={styles.head}>
        <div className={styles.lab} data-reveal>
          {t("lab")}
        </div>
        <h3 className={styles.h3} data-reveal>
          {t.rich("h3", richEm)}
        </h3>
      </div>
      <ol className={styles.toc}>
        {indices.map((i) => (
          <li key={i} data-reveal>
            <span className={styles.num}>
              {String(i + 1).padStart(3, "0")}
            </span>
            <span className={styles.title}>
              {t.rich(`item${i}Title` as `item${typeof i}Title`, richEm)}
            </span>
            <span className={styles.outlet}>
              {t(`item${i}Outlet` as `item${typeof i}Outlet`)}
            </span>
            <span className={styles.year}>
              {t(`item${i}Year` as `item${typeof i}Year`)}
            </span>
            <span className={styles.arrowR}>↗</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
