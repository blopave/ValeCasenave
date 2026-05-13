import { getTranslations } from "next-intl/server";
import styles from "./Empresas.module.css";
import { richEm } from "@/lib/rich";

export async function Empresas() {
  const t = await getTranslations("Empresas");

  return (
    <section className={styles.empresas}>
      {/* ───── UTOPÍA ───── */}
      <a
        className={`${styles.emp} ${styles.utopia}`}
        href="https://www.instagram.com/utopiainspira/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("utopiaAria")}
      >
        <span className={styles.num}>{t("utopiaNum")}</span>
        <span className={styles.kicker}>{t("utopiaKicker")}</span>
        <span className={styles.code} aria-hidden>
          G / 84
        </span>

        <h3 className={styles.name}>
          {t("utopiaNamePart")}
          <em>{t("utopiaNameEm")}</em>
        </h3>

        <p className={styles.mission}>{t.rich("utopiaMission", richEm)}</p>

        <div className={styles.block}>
          <span className={styles.blockLab}>↳ {t("utopiaDoLab")}</span>
          <ul className={styles.list}>
            <li>{t.rich("utopiaDo0", richEm)}</li>
            <li>{t.rich("utopiaDo1", richEm)}</li>
            <li>{t.rich("utopiaDo2", richEm)}</li>
            <li>{t.rich("utopiaDo3", richEm)}</li>
          </ul>
        </div>

        <div className={styles.values}>
          <span className={styles.blockLab}>↳ {t("utopiaValuesLab")}</span>
          <p className={styles.valuesText}>
            {t.rich("utopiaValues", richEm)}
          </p>
        </div>

        <span className={styles.cta}>
          <span>{t("utopiaCta")}</span>
          <span className={styles.arrow} aria-hidden>
            ↗
          </span>
        </span>
      </a>

      {/* ───── ELEVATE IDEAS ───── */}
      <a
        className={`${styles.emp} ${styles.elevate}`}
        href="https://www.instagram.com/elevateideaslatam/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("elevateAria")}
      >
        <span className={styles.num}>{t("elevateNum")}</span>
        <span className={styles.kicker}>{t("elevateKicker")}</span>
        <span className={styles.code} aria-hidden>
          P 90-8 C
        </span>

        <h3 className={styles.name}>
          {t("elevateNamePart")}
          <em>{t("elevateNameEm")}</em>
        </h3>

        <p className={styles.mission}>{t.rich("elevateMission", richEm)}</p>

        <div className={styles.block}>
          <span className={styles.blockLab}>↳ {t("elevateDoLab")}</span>
          <p className={styles.verbs}>{t.rich("elevateDo", richEm)}</p>
        </div>

        <div className={styles.values}>
          <span className={styles.blockLab}>↳ {t("elevateTerritoriesLab")}</span>
          <p className={styles.territories}>
            {t.rich("elevateTerritories", richEm)}
          </p>
        </div>

        <span className={styles.cta}>
          <span>{t("elevateCta")}</span>
          <span className={styles.arrow} aria-hidden>
            ↗
          </span>
        </span>
      </a>
    </section>
  );
}
