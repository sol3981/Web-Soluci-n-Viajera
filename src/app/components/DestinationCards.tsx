import { useState } from "react";
import { Link } from "react-router";

const destinations = [
  {
    id: 1,
    name: "Córdoba",
    country: "Argentina",
    subtitle: "Sierras & cultura",
    packages: "14 paquetes",
    price: "desde $85.000",
    image:
      "https://images.unsplash.com/photo-1543198455-0320f7df42f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDJUMzJUIzcmRvYmElMjBBcmdlbnRpbmElMjBtb3VudGFpbnMlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzc0NDQxMDIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Brasil",
    country: "Brasil",
    subtitle: "Playas & carnaval",
    packages: "22 paquetes",
    price: "desde USD 650",
    image:
      "https://images.unsplash.com/photo-1680697080676-78d6b6036e11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSaW8lMjBkZSUyMEphbmVpcm8lMjBCcmF6aWwlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3NDQ0MTAyMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Mendoza",
    country: "Argentina",
    subtitle: "Vinos & montañas",
    packages: "9 paquetes",
    price: "desde $95.000",
    image:
      "https://images.unsplash.com/photo-1765850257842-fcf66573c543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZW5kb3phJTIwQXJnZW50aW5hJTIwd2luZSUyMHZpbmV5YXJkJTIwbW91bnRhaW5zfGVufDF8fHx8MTc3NDQ0MTAyMnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    name: "Cartagena",
    country: "Colombia",
    subtitle: "Colonial & Caribe",
    packages: "11 paquetes",
    price: "desde USD 720",
    image:
      "https://images.unsplash.com/photo-1770808564556-7bc511b893a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYXJ0YWdlbmElMjBDb2xvbWJpYSUyMGNvbG9yZnVsJTIwY29sb25pYWwlMjBjaXR5fGVufDF8fHx8MTc3NDQ0MTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    name: "Cruceros",
    country: "Caribe & Europa",
    subtitle: "Todo incluido en el mar",
    packages: "18 paquetes",
    price: "desde USD 990",
    image:
      "https://images.unsplash.com/photo-1649872646705-c1c41b1d5f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjcnVpc2UlMjBzaGlwJTIwb2NlYW4lMjBzdW5zZXR8ZW58MXx8fHwxNzc0NDQxMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    wide: true,
  },
];

export function DestinationCards() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="destinos"
      style={{
        backgroundColor: "#F3F2EE",
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
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
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
              Explorar
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
              margin: 0,
            }}
          >
            Paquetes por destino
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "340px 340px",
            gap: "12px",
          }}
          className="dest-grid"
        >
          {/* Card 1 – tall, 1 col, 2 rows */}
          <DestCard
            dest={destinations[0]}
            hovered={hoveredId === destinations[0].id}
            onHover={() => setHoveredId(destinations[0].id)}
            onLeave={() => setHoveredId(null)}
            style={{ gridColumn: "1", gridRow: "1 / 3" }}
          />

          {/* Card 2 – normal */}
          <DestCard
            dest={destinations[1]}
            hovered={hoveredId === destinations[1].id}
            onHover={() => setHoveredId(destinations[1].id)}
            onLeave={() => setHoveredId(null)}
            style={{ gridColumn: "2", gridRow: "1" }}
          />

          {/* Card 3 – normal */}
          <DestCard
            dest={destinations[2]}
            hovered={hoveredId === destinations[2].id}
            onHover={() => setHoveredId(destinations[2].id)}
            onLeave={() => setHoveredId(null)}
            style={{ gridColumn: "3", gridRow: "1" }}
          />

          {/* Card 4 – normal */}
          <DestCard
            dest={destinations[3]}
            hovered={hoveredId === destinations[3].id}
            onHover={() => setHoveredId(destinations[3].id)}
            onLeave={() => setHoveredId(null)}
            style={{ gridColumn: "4", gridRow: "1" }}
          />

          {/* Card 5 – wide, spans 3 cols */}
          <DestCard
            dest={destinations[4]}
            hovered={hoveredId === destinations[4].id}
            onHover={() => setHoveredId(destinations[4].id)}
            onLeave={() => setHoveredId(null)}
            style={{ gridColumn: "2 / 5", gridRow: "2" }}
            wide
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dest-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: auto !important;
          }
          .dest-grid > * {
            grid-column: auto !important;
            grid-row: auto !important;
            height: 280px !important;
          }
        }
        @media (max-width: 600px) {
          .dest-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function DestCard({
  dest,
  hovered,
  onHover,
  onLeave,
  style,
  wide,
}: {
  dest: (typeof destinations)[0];
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  style?: React.CSSProperties;
  wide?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: "12px",
        ...style,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Background Image */}
      <img
        src={dest.image}
        alt={dest.name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s ease",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.65) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.55) 100%)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: wide ? "28px 36px" : "24px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            {dest.subtitle}
          </div>
          <div
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: wide ? "28px" : "22px",
              fontWeight: 700,
              color: "#FAFAF8",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {dest.name}
          </div>
          {/* Price — always visible */}
          <div
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "12px",
              color: "rgba(255,255,255,0.85)",
              marginTop: "6px",
              fontWeight: 600,
              backgroundColor: "rgba(236,118,22,0.75)",
              display: "inline-block",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {dest.price}
          </div>
          {/* Packages count — on hover */}
          <div
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.6)",
              marginTop: "6px",
              fontWeight: 400,
              transition: "opacity 0.3s",
              opacity: hovered ? 1 : 0,
            }}
          >
            {dest.packages} disponibles
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "8px",
          }}
        >
          {/* Ver paquetes button — on hover */}
          <Link
            to={`/resultados?destino=${encodeURIComponent(dest.name)}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#fff",
              backgroundColor: "#ec7616",
              padding: "7px 14px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
              letterSpacing: "0em",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Ver paquetes
          </Link>
        </div>
      </div>
    </div>
  );
}