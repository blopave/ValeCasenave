import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/About";
import { Contacto } from "@/components/Contacto";
import { Contexto } from "@/components/Contexto";
import { Credit } from "@/components/Credit";
import { Cuerpo } from "@/components/Cuerpo";
import { Cursor } from "@/components/Cursor";
import { Empresas } from "@/components/Empresas";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Loader } from "@/components/Loader";
import { Manifesto } from "@/components/Manifesto";
import { Nav } from "@/components/Nav";
import { Numbers } from "@/components/Numbers";
import { Publicaciones } from "@/components/Publicaciones";
import { Raiz } from "@/components/Raiz";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Voz } from "@/components/Voz";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <RevealOnScroll />

      <Hero />
      <About />
      <Manifesto />
      <Numbers />
      <Cuerpo />
      <Contexto />
      <Voz />
      <Empresas />
      <Publicaciones />
      <Raiz />
      <Contacto />
      <Credit />

      <Footer />
    </>
  );
}
