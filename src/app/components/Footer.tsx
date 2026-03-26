import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import logoImg from "../../assets/logosv.png";

export function Footer() {
  const navColumns = [
    {
      title: "Destinos",
      links: ["Córdoba", "Mendoza", "Patagonia", "Buenos Aires", "Cancún", "Brasil"],
    },
    {
      title: "Servicios",
      links: ["Vuelos", "Hoteles", "Cruceros", "Traslados en Bus", "Paquetes a medida"],
    },
    {
      title: "Empresa",
      links: ["Sobre Nosotros", "Cómo trabajamos", "Blog de viajes", "Términos y condiciones"],
    },
  ];

  return (
    <footer
      id="contacto"
      style={{
        backgroundColor: "#111110",
        color: "#FAFAF8",
      }}
    >
      {/* CTA Banner */}
      <div
        style={{
          borderColor: "#1E1E1C",
          borderStyle: "solid",
          borderWidth: "0 0 1px 0",
          padding: "72px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img
              src={logoImg}
              alt="Solución Viajera"
              style={{
                width: "64px",
                height: "64px",
                objectFit: "contain",
                flexShrink: 0,
                opacity: 0.95,
              }}
            />
            <div>
            <p
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#ec7616",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              ¿Tenés un viaje en mente?
            </p>
            <h2
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "clamp(32px, 3.5vw, 48px)",
                fontWeight: 700,
                color: "#FAFAF8",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Empezá a planear{" "}
              <span style={{ color: "#ec7616" }}>
                tu aventura
              </span>
            </h2>
            </div>
          </div>

          <a
            href="https://wa.me/5493426261318?text=Hola!%20Quiero%20consultarles%20por%20sus%20viajes!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#111110",
              backgroundColor: "#FAFAF8",
              padding: "14px 32px",
              textDecoration: "none",
              letterSpacing: "0em",
              borderRadius: "2px",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "#ec7616";
              el.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "#FAFAF8";
              el.style.color = "#111110";
            }}
          >
            Consultar viaje
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "72px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "48px",
          }}
          className="footer-grid"
        >
          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontFamily: "'Satoshi', 'Inter', sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#FAFAF8",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                Solución<span style={{ color: "#ec7616" }}>Viajera</span>
              </div>
            </div>

            <p
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "#787872",
                lineHeight: 1.75,
                maxWidth: "280px",
                marginBottom: "32px",
              }}
            >Agencia de viajes especializada en experiencias personalizadas. Más de 8 años coordinando y diseñando momentos únicos.</p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { icon: MapPin, text: "San Martin 2347 - Oficina 38, Santa Fe, Santa Fe 3000" },
                { icon: Phone, text: "+54 351 000-0000" },
                { icon: Mail, text: "hola@solucionviajera.com" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
                  >
                    <Icon
                      size={13}
                      color="#ec7616"
                      style={{ marginTop: "2px", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontFamily: "'Satoshi', 'Inter', sans-serif",
                        fontSize: "12px",
                        color: "#787872",
                        fontWeight: 400,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nav Columns */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: "'Satoshi', 'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#FAFAF8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                  lineHeight: 1,
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link} style={{ marginBottom: "10px" }}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "'Satoshi', 'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#787872",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "#ec7616")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "#787872")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid #1E1E1C",
          padding: "24px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              color: "#444440",
            }}
          >
            © 2026 Solución Viajera. Todos los derechos reservados.
          </span>

          <span
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              color: "#444440",
            }}
          >
            Creado por{" "}
            <a
              href="https://amarilloestudiocreativo.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#f5c518",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Amarillo Estudio Creativo
            </a>
          </span>

          {/* Social Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {[
              { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/solucionviajeraok/" },
              { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/Soluci%C3%B3n-Viajera/61555795760271/#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "#444440",
                  transition: "color 0.2s",
                  display: "flex",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#ec7616")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#444440")
                }
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 520px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}