import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { urlFor } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
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
