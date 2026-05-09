import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Vale Casenave — Pantone 90-8 C";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#E91E8C",
          display: "flex",
          flexDirection: "column",
          padding: "64px 80px",
          color: "#F2EDE5",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        {/* top strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          <span>● {t("live")}</span>
          <span>VC · 2026</span>
        </div>

        {/* center stage: Pantone card + name */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 56,
            marginTop: 32,
          }}
        >
          {/* Pantone card */}
          <div
            style={{
              width: 220,
              height: 290,
              background: "#E5B5A0",
              border: "2px solid #0E0E10",
              display: "flex",
              flexDirection: "column",
              transform: "rotate(-2deg)",
            }}
          >
            <div style={{ flex: 1, background: "#C19888" }} />
            <div
              style={{
                background: "#F2EDE5",
                borderTop: "2px solid #0E0E10",
                color: "#0E0E10",
                padding: "10px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <span style={{ fontSize: 14, letterSpacing: 3, fontWeight: 600 }}>
                PANTONE® 90-8 C
              </span>
              <span style={{ fontSize: 9, letterSpacing: 4, opacity: 0.55 }}>
                HUMANAE · A. DASS
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontStyle: "italic",
                  marginTop: 4,
                  fontFamily: "Georgia, serif",
                }}
              >
                Vale Casenave
              </span>
            </div>
          </div>

          {/* Name massive */}
          <div
            style={{
              fontSize: 220,
              lineHeight: 0.86,
              letterSpacing: -10,
              fontFamily: "Georgia, serif",
              color: "#0E0E10",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Vale</span>
            <span style={{ fontStyle: "italic" }}>Casenave</span>
          </div>
        </div>

        {/* bottom strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          <span>{t("humanaeNote")}</span>
          <span>{t("coordsCdmx").split("—")[0].trim()} ↔ BSAS</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
