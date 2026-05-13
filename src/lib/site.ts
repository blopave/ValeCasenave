import { routing } from "@/i18n/routing";

export const BASE_URL = "https://valecasenave.com";

export const urlFor = (locale: string) =>
  locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`;
