import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

const WA_NUMBER = "5493426261318";
const WA_MESSAGE = "Hola! Quiero consultarles por sus viajes!";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const ACCENT = "#ec7616";
const WA_GREEN = "#25D366";
const WA_GREEN_DARK = "#1DAA56";
const FF = "'Satoshi', 'Inter', sans-serif";

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "10px",
      }}
    >
      {/* Tooltip / bubble */}
      {!dismissed && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            backgroundColor: "#fff",
            border: "1px solid #E0E0DA",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            padding: "12px 14px",
            maxWidth: "230px",
            opacity: tooltipVisible || hovered ? 1 : 0,
            transform: tooltipVisible || hovered ? "translateY(0) scale(1)" : "translateY(6px) scale(0.97)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
            pointerEvents: tooltipVisible || hovered ? "auto" : "none",
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: FF,
                fontSize: "12px",
                fontWeight: 700,
                color: "#111110",
                margin: 0,
                marginBottom: "3px",
                letterSpacing: "-0.01em",
              }}
            >
              ¿Necesitás ayuda?
            </p>
            <p
              style={{
                fontFamily: FF,
                fontSize: "11px",
                color: "#6B6B66",
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              Chateá con nosotros por WhatsApp, te respondemos al instante.
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              color: "#AEADA9",
              display: "flex",
              flexShrink: 0,
              marginTop: "-2px",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#111110")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#AEADA9")
            }
            aria-label="Cerrar"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        onMouseEnter={() => {
          setHovered(true);
          setTooltipVisible(true);
        }}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          backgroundColor: hovered ? WA_GREEN_DARK : WA_GREEN,
          boxShadow: hovered
            ? "0 8px 28px rgba(37,211,102,0.45)"
            : "0 4px 20px rgba(37,211,102,0.32)",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition:
            "background-color 0.2s, box-shadow 0.2s, transform 0.2s",
          textDecoration: "none",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {/* Pulse ring */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `2px solid ${WA_GREEN}`,
            animation: "wa-pulse 2.4s ease-out infinite",
            opacity: 0,
          }}
        />
        {/* WhatsApp SVG icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 3C9.373 3 4 8.373 4 15c0 2.385.67 4.61 1.833 6.497L4 29l7.74-1.808A11.947 11.947 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm-3.637 7.136c-.23-.513-.473-.524-.692-.533-.18-.008-.384-.007-.588-.007s-.537.077-.818.384c-.281.307-1.073 1.048-1.073 2.556s1.098 2.964 1.251 3.168c.153.204 2.12 3.38 5.222 4.603 2.583 1.02 3.104.816 3.664.765.56-.05 1.806-.738 2.062-1.451.255-.713.255-1.323.178-1.451-.076-.128-.281-.204-.588-.357-.307-.153-1.806-.89-2.087-.993-.281-.101-.486-.153-.69.154-.204.306-.792.993-.97 1.197-.178.204-.357.23-.664.077-.306-.154-1.294-.477-2.466-1.52-.911-.812-1.527-1.815-1.705-2.121-.178-.307-.019-.473.134-.625.137-.137.307-.357.46-.536.153-.178.204-.307.306-.511.102-.204.051-.383-.025-.536-.077-.153-.672-1.671-.92-2.284z"
            fill="white"
          />
        </svg>
      </a>

      <style>{`
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
