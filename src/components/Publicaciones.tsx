import { getTranslations } from "next-intl/server";
import styles from "./Publicaciones.module.css";
import { richEm } from "@/lib/rich";

type Idx = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type GroupKey = "deporte" | "impacto" | "produccion";

const groups: { key: GroupKey; accent: string; indices: Idx[] }[] = [
  { key: "deporte", accent: "cyan", indices: [0, 1, 2] },
  { key: "impacto", accent: "magenta", indices: [3, 4, 5, 6] },
  { key: "produccion", accent: "yellow", indices: [7, 8, 9] },
];

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

      {groups.map((g) => (
        <div
          key={g.key}
          className={styles.group}
          data-accent={g.accent}
          data-reveal
        >
          <header className={styles.groupHead}>
            <span className={styles.groupKicker}>
              ↳ {t(`group_${g.key}` as `group_${GroupKey}`)}
            </span>
            <span className={styles.groupCount}>
              {String(g.indices.length).padStart(2, "0")} · piezas
            </span>
          </header>
          <ol className={styles.toc}>
            {g.indices.map((i) => {
              const url = t(`item${i}Url` as `item${Idx}Url`);
              const external = url.startsWith("http");
              const year = t(`item${i}Year` as `item${Idx}Year`);
              return (
                <li key={i}>
                  <a
                    href={url}
                    className={styles.row}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-disabled={url === "#" ? "true" : undefined}
                  >
                    <span className={styles.num} aria-hidden>
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <span className={styles.title}>
                      {t.rich(`item${i}Title` as `item${Idx}Title`, richEm)}
                    </span>
                    <span className={styles.outlet}>
                      {t(`item${i}Outlet` as `item${Idx}Outlet`)}
                    </span>
                    <span className={styles.year}>{year}</span>
                    <span className={styles.arrowR} aria-hidden>
                      ↗
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </section>
  );
}
