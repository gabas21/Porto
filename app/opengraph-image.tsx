import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// Image metadata
export const alt = "Bagas Aditya Anugrah Ramadhan — Frontend Developer & Creative UI Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Read Bagas's profile picture from public folder
  let base64Avatar = "";
  try {
    const avatarPath = path.join(process.cwd(), "public", "bagas.jpg");
    const buffer = fs.readFileSync(avatarPath);
    base64Avatar = `data:image/jpeg;base64,${buffer.toString("base64")}`;
  } catch {
    // Fallback if file read fails
    base64Avatar = "";
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px 64px",
          backgroundColor: "#08090D",
          color: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(250, 204, 21, 0.22), transparent 45%), radial-gradient(circle at 10% 85%, rgba(56, 189, 248, 0.15), transparent 45%)",
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
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#FACC15",
                boxShadow: "0 0 20px #FACC15",
              }}
            />
            <span
              style={{
                fontSize: 26,
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
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              fontSize: 16,
              fontWeight: 600,
              color: "#E4E4E7",
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

        {/* Center Hero with Avatar and Headline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "42px",
            marginTop: "12px",
            marginBottom: "12px",
          }}
        >
          {/* Real Profile Photo with Gold Ring */}
          {base64Avatar && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={base64Avatar}
                alt="Bagas Aditya"
                style={{
                  width: "165px",
                  height: "165px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #FACC15",
                  boxShadow: "0 0 36px rgba(250, 204, 21, 0.4), 0 16px 32px rgba(0,0,0,0.8)",
                }}
              />
            </div>
          )}

          {/* Headline & Badges */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              flex: 1,
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                fontSize: 20,
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
                fontSize: 48,
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-1.2px",
                color: "#FFFFFF",
              }}
            >
              Engineering High-Performance Digital Experiences with Substance.
            </div>

            {/* Tech Chips */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: "4px",
              }}
            >
              {["Next.js 16", "React 19", "TypeScript", "Three.js WebGL", "Tailwind CSS"].map(
                (tech) => (
                  <div
                    key={tech}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.14)",
                      fontSize: 16,
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
        </div>

        {/* Bottom Credentials Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
          }}
        >
          {/* Proven Track Record Info */}
          <div
            style={{
              display: "flex",
              gap: "28px",
              fontSize: 18,
              color: "#A1A1AA",
              fontWeight: 500,
            }}
          >
            <span>📍 Samarinda, Indonesia</span>
            <span>🏛️ Bappelitbangda & Inspektorat</span>
            <span>⚡ 98+ Projects Delivered</span>
          </div>

          {/* Real Vercel Domain */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#FACC15",
              letterSpacing: "0.5px",
            }}
          >
            porto-bagas-app.vercel.app ↗
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
