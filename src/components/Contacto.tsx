import { getTranslations } from "next-intl/server";
import styles from "./Contacto.module.css";

export async function Contacto() {
  const t = await getTranslations("Contacto");

  return (
    <section className={styles.contact}>
      <div className={styles.top}>
        <span>{t("top0")}</span>
        <span>{t("top1")}</span>
      </div>
      <h2 className={styles.h2}>
        {t("h2Part")}
        <em>{t("h2Em")}</em>
      </h2>
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
        <a href="#">{t("linkX")}</a>
        <a href="mailto:hola@valecasenave.com">{t("linkEmail")}</a>
      </div>
    </section>
  );
}
