import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const BASE_URL = "https://valecasenave.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const urlFor = (locale: string) =>
  locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  const canonical = urlFor(locale);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l === "es" ? "es-AR" : "en-US", urlFor(l)])
  );

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
      languages: { ...languages, "x-default": urlFor(routing.defaultLocale) },
    },
    openGraph: {
      title: "Vale Casenave",
      description: t("description"),
      url: canonical,
      siteName: "Vale Casenave",
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_AR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Vale Casenave",
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "design",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Meta" });
  const heroT = await getTranslations({ locale, namespace: "Hero" });

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vale Casenave",
    alternateName: "Valeria Casenave",
    jobTitle: heroT("roleEmphasis"),
    description: t("description"),
    url: urlFor(locale),
    image: `${BASE_URL}/photos/humanae.jpg`,
    nationality: { "@type": "Country", name: "Argentina" },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ciudad de México",
        addressRegion: "CDMX",
        addressCountry: "MX",
      },
    },
    sameAs: [
      "https://www.linkedin.com/in/valeria-casenave-3861434/",
      "https://www.instagram.com/utopiainspira/",
      "https://www.instagram.com/elevateideaslatam/",
    ],
    knowsAbout: [
      "Storytelling",
      "Speaker training",
      "TEDx",
      "Impact production",
      "Content strategy",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Universidad de Buenos Aires",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Tecnológico de Monterrey",
      },
      { "@type": "CollegeOrUniversity", name: "FLACSO México" },
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "Utopía",
        url: "https://www.instagram.com/utopiainspira/",
      },
      {
        "@type": "Organization",
        name: "Elevate Ideas",
        url: "https://www.instagram.com/elevateideaslatam/",
      },
    ],
  };

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
