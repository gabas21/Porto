import { ImageResponse } from "next/og";


// Image metadata
export const alt = "Bagas Aditya Anugrah Ramadhan — Frontend Developer & Creative UI Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          backgroundColor: "#090A0F",
          color: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(250, 204, 21, 0.18), transparent 45%), radial-gradient(circle at 15% 85%, rgba(56, 189, 248, 0.12), transparent 40%)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Brand Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "#FACC15",
                boxShadow: "0 0 20px #FACC15",
              }}
            />
            <span
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                textTransform: "uppercase",
              }}
            >
              BAGAS ADITYA<span style={{ color: "#FACC15" }}>.</span>
            </span>
          </div>

          {/* Status Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 22px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              fontSize: 17,
              fontWeight: 600,
              color: "#D4D4D8",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#22C55E",
                boxShadow: "0 0 12px #22C55E",
              }}
            />
            Available for Select Projects
          </div>
        </div>

        {/* Center Hero Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          {/* Eyebrow / Role */}
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#FACC15",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
            }}
          >
            Frontend Developer & Creative UI Engineer
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              maxWidth: "1020px",
              color: "#FFFFFF",
            }}
          >
            Engineering High-Performance Digital Experiences with Substance.
          </div>

          {/* Tech Stack Chips */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "8px",
            }}
          >
            {["Next.js 16", "React 19", "TypeScript", "Three.js WebGL", "Tailwind CSS"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#F4F4F5",
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom Credentials Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "26px",
          }}
        >
          {/* Proven Track Record Info */}
          <div
            style={{
              display: "flex",
              gap: "28px",
              fontSize: 19,
              color: "#A1A1AA",
              fontWeight: 500,
            }}
          >
            <span>📍 Samarinda, Indonesia</span>
            <span>🏛️ Bappelitbangda & Inspektorat</span>
            <span>⚡ 98+ Projects Delivered</span>
          </div>

          {/* Domain CTA */}
          <div
            style={{
              fontSize: 21,
              fontWeight: 700,
              color: "#FACC15",
              letterSpacing: "0.5px",
            }}
          >
            portfolio-bagas.vercel.app ↗
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
