import { Plane, Bus, Building2, Coffee, Utensils, Moon, ArrowUpRight } from "lucide-react";

const packages = [
  {
    id: 1,
    destination: "Cancún, México",
    region: "Caribe",
    price: "USD 890",
    priceLabel: "por persona",
    nights: 7,
    inclusions: [
      { icon: Plane, label: "Vuelo incluido" },
      { icon: Building2, label: "Hotel 4★" },
      { icon: Coffee, label: "Desayuno" },
    ],
    image:
      "https://images.unsplash.com/photo-1773802352708-ede62ced59bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYW5jdW4lMjBNZXhpY28lMjByZXNvcnQlMjBiZWFjaCUyMHR1cnF1b2lzZXxlbnwxfHx8fDE3NzQ0NDEwMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Más vendido",
    salida: "Salida: Cada viernes",
  },
  {
    id: 2,
    destination: "Río de Janeiro, Brasil",
    region: "Sudamérica",
    price: "USD 650",
    priceLabel: "por persona",
    nights: 5,
    inclusions: [
      { icon: Plane, label: "Vuelo incluido" },
      { icon: Building2, label: "Hotel 3★" },
      { icon: Coffee, label: "Desayuno" },
    ],
    image:
      "https://images.unsplash.com/photo-1680697080676-78d6b6036e11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSaW8lMjBkZSUyMEphbmVpcm8lMjBCcmF6aWwlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3NDQ0MTAyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: null,
    salida: "Salida: Todos los meses",
  },
  {
    id: 3,
    destination: "Patagonia, Argentina",
    region: "Sur de América",
    price: "USD 780",
    priceLabel: "por persona",
    nights: 8,
    inclusions: [
      { icon: Bus, label: "Bus cama" },
      { icon: Building2, label: "Hotel 3★" },
      { icon: Utensils, label: "Media pensión" },
    ],
    image:
      "https://images.unsplash.com/photo-1765044219073-493bb5a4f2ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXRhZ29uaWElMjBUb3JyZXMlMjBkZWwlMjBQYWluZSUyMGRyYW1hdGljJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3NDQ0MTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Salida grupal",
    salida: "Salida: Enero y Febrero",
  },
  {
    id: 4,
    destination: "Buenos Aires, Argentina",
    region: "Argentina",
    price: "$185.000",
    priceLabel: "por persona",
    nights: 4,
    inclusions: [
      { icon: Bus, label: "Bus cama" },
      { icon: Building2, label: "Hotel 3★" },
      { icon: Coffee, label: "Desayuno" },
    ],
    image:
      "https://images.unsplash.com/photo-1758558236249-cb11e427907f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWVub3MlMjBBaXJlcyUyMGNpdHklMjBhcmNoaXRlY3R1cmUlMjBuaWdodxlbnwxfHx8fDE3NzQ0NDEwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: null,
    salida: "Salida: Todo el año",
  },
];

export function FeaturedPackages() {
  return (
    <section
      id="paquetes-destacados"
      style={{
        backgroundColor: "#FAFAF8",
        padding: "104px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        {/* Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "60px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div style={{ width: "24px", height: "1px", backgroundColor: "#ec7616" }} />
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
                Salidas programadas
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "clamp(34px, 3.8vw, 50px)",
                fontWeight: 700,
                color: "#111110",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                margin: "0 0 10px",
              }}
            >
              Paquetes con todo incluido
            </h2>
            <p
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#9A9A94",
                margin: 0,
              }}
            >
              Vuelo o bus · Hotel · Comidas · Traslados. Todo coordinado por nosotros.
            </p>
          </div>

          <a
            href="#destinos"
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "#3A3A38",
              textDecoration: "none",
              letterSpacing: "0em",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              borderBottom: "1px solid #D0D0CA",
              paddingBottom: "2px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ec7616")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#3A3A38")}
          >
            Ver todos los destinos
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
          className="packages-grid"
        >
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .packages-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .packages-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: (typeof packages)[0] }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #E8E8E4",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.10)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={pkg.image}
          alt={pkg.destination}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = "scale(1.04)")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.transform = "scale(1)")}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.30) 100%)",
          }}
        />

        {/* Nights badge – bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            padding: "4px 10px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Moon size={10} color="rgba(255,255,255,0.8)" strokeWidth={2} />
          <span
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "0.02em",
            }}
          >
            {pkg.nights} noches
          </span>
        </div>

        {/* Tag badge */}
        {pkg.tag && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: "#ec7616",
              padding: "4px 10px",
              borderRadius: "6px",
            }}
          >
            <span
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {pkg.tag}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Destination */}
        <div style={{ marginBottom: "14px" }}>
          <h3
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#111110",
              margin: "0 0 3px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {pkg.destination}
          </h3>
          <span
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "11px",
              color: "#AEADA8",
              fontWeight: 400,
            }}
          >
            {pkg.salida}
          </span>
        </div>

        {/* Inclusions */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "16px",
          }}
        >
          {pkg.inclusions.map((inc) => {
            const IncIcon = inc.icon;
            return (
              <div
                key={inc.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  backgroundColor: "#F4F3EF",
                  padding: "4px 9px",
                  borderRadius: "6px",
                }}
              >
                <IncIcon size={11} color="#787872" strokeWidth={2} />
                <span
                  style={{
                    fontFamily: "'Satoshi', 'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#787872",
                  }}
                >
                  {inc.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Price + CTA */}
        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid #F0F0EA",
            paddingTop: "16px",
          }}
        >
          {/* Price block */}
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                color: "#AEADA8",
                letterSpacing: "0.02em",
                marginBottom: "2px",
              }}
            >
              Precio desde
            </div>
            <div
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "26px",
                fontWeight: 700,
                color: "#111110",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {pkg.price}
            </div>
            <div
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                color: "#AEADA8",
              }}
            >
              {pkg.priceLabel}
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{
                flex: 1,
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: "#fff",
                backgroundColor: "#ec7616",
                border: "none",
                padding: "10px 14px",
                cursor: "pointer",
                borderRadius: "8px",
                transition: "background-color 0.2s",
                letterSpacing: "0em",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "#c95d0e")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "#ec7616")
              }
            >
              Reservar
            </button>
            <button
              style={{
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "#3A3A38",
                backgroundColor: "#F4F3EF",
                border: "none",
                padding: "10px 14px",
                cursor: "pointer",
                borderRadius: "8px",
                transition: "background-color 0.2s",
                letterSpacing: "0em",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "#E8E6E0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "#F4F3EF")
              }
            >
              Ver precio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}