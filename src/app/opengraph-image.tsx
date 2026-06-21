import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

// Open Graph image untuk preview saat dibagikan (WA, LinkedIn, X, dll).
export const alt = "PUFA Law — Excellence in Law";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A0808",
          backgroundImage:
            "linear-gradient(135deg, #1A0808 0%, #7A0A18 55%, #B01020 100%)",
          color: "#F5EFE0",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: "2px solid rgba(201,168,76,0.5)",
          }}
        />
        <div
          style={{
            fontSize: 40,
            letterSpacing: 8,
            color: "#C9A84C",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          PUFA LAW
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Excellence in Law
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(245,239,224,0.7)",
            marginTop: 28,
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          Organisasi hukum terkemuka — pengalaman eksklusif & pelayanan profesional.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 64,
            fontSize: 22,
            color: "rgba(245,239,224,0.55)",
          }}
        >
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
