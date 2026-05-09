import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://valecasenave.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const urlFor = (locale: string) =>
    locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`;

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l === "es" ? "es-AR" : "en-US", urlFor(l)])
  );

  return routing.locales.map((locale) => ({
    url: urlFor(locale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
