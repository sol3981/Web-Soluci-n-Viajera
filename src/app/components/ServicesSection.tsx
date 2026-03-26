import { useState } from "react";
import { Plane, Car, Ship, Building2, Check, ArrowRight } from "lucide-react";

const services = [
  {
    id: "hotel",
    icon: Building2,
    label: "Hotel",
    tag: "Alojamiento",
    description: "Alojamiento seleccionado por destino, estilo y presupuesto.",
    detail: "Hoteles · Apartamentos · Resorts",
  },
  {
    id: "vuelo",
    icon: Plane,
    label: "Vuelo",
    tag: "Aéreo",
    description: "Pasajes nacionales e internacionales al mejor precio.",
    detail: "Cabotaje · Internacional · Chárter",
  },
  {
    id: "traslados",
    icon: Car,
    label: "Traslados",
    tag: "Terrestre",
    description: "Coordinamos cada traslado: aeropuerto, hotel y excursiones.",
    detail: "Aeropuerto · Bus · Remís privado",
  },
  {
    id: "crucero",
    icon: Ship,
    label: "Crucero",
    tag: "Marítimo",
    description: "Cruceros por el Caribe, Mediterráneo y la Antártida.",
    detail: "Caribe · Mediterráneo · Antártida",
  },
];

export function ServicesSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="servicios"
      style={{
        backgroundColor: "#F7F6F2",
        padding: "120px 0 112px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        {/* Header — centered */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "560px",
            margin: "0 auto 96px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <div style={{ width: "20px", height: "1px", backgroundColor: "#ec7616" }} />
            <span
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#ec7616",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Nuestros Servicios
            </span>
            <div style={{ width: "20px", height: "1px", backgroundColor: "#ec7616" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "clamp(36px, 4vw, 52px)",
              fontWeight: 700,
              color: "#111110",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
            }}
          >
            Tu viaje,{" "}
            <span style={{ color: "#ec7616" }}>a medida</span>
          </h2>

          <p
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              color: "#787872",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Armamos el paquete completo o te ayudamos solo con lo que necesitás.
          </p>
        </div>

        {/* Service Items with connecting path */}
        <div style={{ position: "relative" }} className="services-outer">

          {/* Segmented connecting lines — one per gap between icons */}
          {[0, 1, 2].map((i) => {
            const leftId = services[i].id;
            const rightId = services[i + 1].id;
            const isActive = hovered === leftId || hovered === rightId;
            return (
              <div
                key={`seg-${i}`}
                className="connecting-line"
                style={{
                  position: "absolute",
                  top: "43px",
                  left: `calc(${i * 25 + 12.5}% + 46px)`,
                  width: "calc(25% - 92px)",
                  height: "1.5px",
                  backgroundColor: isActive ? "#ec7616" : "rgba(200,196,188,0.35)",
                  opacity: isActive ? 1 : 1,
                  transition: "background-color 0.25s ease",
                  zIndex: 0,
                  pointerEvents: "none",
                  borderRadius: "2px",
                }}
              />
            );
          })}

          {/* Four columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0",
              position: "relative",
              zIndex: 1,
            }}
            className="services-grid"
          >
            {services.map((service) => {
              const Icon = service.icon;
              const isHovered = hovered === service.id;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHovered(service.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "0 28px",
                    cursor: "default",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: "88px",
                      height: "88px",
                      borderRadius: "50%",
                      backgroundColor: isHovered ? "rgba(236,118,22,0.14)" : "rgba(236,118,22,0.07)",
                      border: isHovered
                        ? "1.5px solid rgba(236,118,22,0.35)"
                        : "1.5px solid rgba(236,118,22,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "32px",
                      transition: "all 0.28s ease",
                      boxShadow: isHovered
                        ? "0 8px 28px rgba(236,118,22,0.20), 0 0 0 7px rgba(236,118,22,0.06)"
                        : "0 0 0 0px transparent",
                      transform: isHovered ? "scale(1.10)" : "scale(1)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      size={32}
                      color={isHovered ? "#ec7616" : "#E8956A"}
                      strokeWidth={1.5}
                      style={{ transition: "color 0.28s ease" }}
                    />
                  </div>

                  {/* Tag */}
                  <span
                    style={{
                      fontFamily: "'Satoshi', 'Inter', sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: isHovered ? "#ec7616" : "#AEADA8",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                      transition: "color 0.2s",
                      display: "block",
                    }}
                  >
                    {service.tag}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Satoshi', 'Inter', sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#111110",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.1,
                      margin: "0 0 14px",
                    }}
                  >
                    {service.label}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Satoshi', 'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#9A9A94",
                      lineHeight: 1.65,
                      margin: "0 0 20px",
                      maxWidth: "200px",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Detail pill */}
                  <div
                    style={{
                      display: "inline-block",
                      padding: "5px 12px",
                      borderRadius: "100px",
                      backgroundColor: isHovered ? "rgba(236,118,22,0.08)" : "#ECEAE4",
                      transition: "background-color 0.25s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Satoshi', 'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 500,
                        color: isHovered ? "#ec7616" : "#A8A8A0",
                        letterSpacing: "0.01em",
                        whiteSpace: "nowrap",
                        transition: "color 0.25s",
                      }}
                    >
                      {service.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "#D8D6CE",
            margin: "80px auto 64px",
          }}
        />

        {/* Bottom trust bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {[
            "Sin costos ocultos",
            "Asesoramiento personalizado",
            "Atención durante todo el viaje",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  backgroundColor: "rgba(236, 118, 22, 0.10)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Check size={10} color="#ec7616" strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "'Satoshi', 'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#787872",
                }}
              >
                {item}
              </span>
            </div>
          ))}

          <a
            href="https://wa.me/5493426261318?text=Hola!%20Quiero%20consultarles%20por%20sus%20viajes!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#ec7616",
              textDecoration: "none",
              borderBottom: "1px solid rgba(236,118,22,0.3)",
              paddingBottom: "1px",
              marginLeft: "4px",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "#ec7616")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "rgba(236,118,22,0.3)")
            }
          >
            Consultar mi viaje
            <ArrowRight size={13} strokeWidth={2} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .connecting-line {
            display: none !important;
          }
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 48px 0 !important;
          }
        }
        @media (max-width: 520px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}