import { getTranslations } from "next-intl/server";
import styles from "./Empresas.module.css";

const richEm = { em: (chunks: React.ReactNode) => <em>{chunks}</em> };

export async function Empresas() {
  const t = await getTranslations("Empresas");

  return (
    <section className={styles.empresas}>
      <a
        className={`${styles.emp} ${styles.utopia}`}
        href="https://www.instagram.com/utopiainspira/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.num}>{t("utopiaNum")}</span>
        <span className={styles.kicker}>{t("utopiaKicker")}</span>
        <h3 className={styles.name}>
          {t("utopiaNamePart")}
          <em>{t("utopiaNameEm")}</em>
        </h3>
        <p className={styles.mission}>{t.rich("utopiaMission", richEm)}</p>
        <ul className={styles.meta}>
          <li>{t("utopiaMeta0")}</li>
          <li>{t("utopiaMeta1")}</li>
          <li>{t.rich("utopiaMeta2", richEm)}</li>
        </ul>
        <span className={styles.cta}>
          <span>{t("utopiaCta")}</span>
          <span className={styles.arrow}>↗</span>
        </span>
      </a>
      <a
        className={`${styles.emp} ${styles.elevate}`}
        href="https://www.instagram.com/elevateideaslatam/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.num}>{t("elevateNum")}</span>
        <span className={styles.kicker}>{t("elevateKicker")}</span>
        <h3 className={styles.name}>
          {t("elevateNamePart")}
          <em>{t("elevateNameEm")}</em>
        </h3>
        <p className={styles.mission}>{t.rich("elevateMission", richEm)}</p>
        <ul className={styles.meta}>
          <li>{t("elevateMeta0")}</li>
          <li>{t.rich("elevateMeta1", richEm)}</li>
          <li>{t.rich("elevateMeta2", richEm)}</li>
        </ul>
        <span className={styles.cta}>
          <span>{t("elevateCta")}</span>
          <span className={styles.arrow}>↗</span>
        </span>
      </a>
    </section>
  );
}
