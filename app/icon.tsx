import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background:
            "radial-gradient(80% 80% at 30% 20%, rgba(139,92,246,0.95), rgba(17,17,21,0.95))",
          color: "white",
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: -1.2,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
        }}
      >
        ACA
      </div>
    ),
    size
  );
}

