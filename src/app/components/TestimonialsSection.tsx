const testimonials = [
  {
    id: 1,
    quote:
      "Organizaron cada detalle de nuestro viaje a Brasil. Fue una experiencia perfecta de principio a fin.",
    author: "Valentina R.",
    city: "Rosario, Argentina",
    trip: "Brasil — 7 noches",
  },
  {
    id: 2,
    quote:
      "Por fin una agencia que escucha lo que uno quiere y no solo ofrece paquetes genéricos. Recomendados al 100%.",
    author: "Martín G.",
    city: "Córdoba, Argentina",
    trip: "Patagonia — 9 noches",
  },
  {
    id: 3,
    quote:
      "Viajamos en familia a Cancún y todo salió impecable. Los chicos de Solución Viajera son muy profesionales.",
    author: "Lucía M.",
    city: "Mendoza, Argentina",
    trip: "Cancún — 8 noches",
  },
];

export function TestimonialsSection() {
  return (
    <section
      style={{
        backgroundColor: "#FAFAF8",
        padding: "96px 0",
        borderTop: "1px solid #E8E8E4",
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
              Testimonios
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
            Lo que dicen nuestros viajeros
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #E8E8E4",
                padding: "36px",
                borderRadius: "12px",
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontFamily: "'Satoshi', 'Inter', sans-serif",
                  fontSize: "48px",
                  fontWeight: 900,
                  color: "#ec7616",
                  lineHeight: 0.8,
                  marginBottom: "20px",
                  opacity: 0.3,
                  letterSpacing: "-0.04em",
                }}
              >
                "
              </div>

              <p
                style={{
                  fontFamily: "'Satoshi', 'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#3A3A38",
                  lineHeight: 1.75,
                  margin: "0 0 28px",
                }}
              >
                {t.quote}
              </p>

              <div style={{ borderTop: "1px solid #F0F0EA", paddingTop: "20px" }}>
                <div
                  style={{
                    fontFamily: "'Satoshi', 'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#111110",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t.author}
                </div>
                <div
                  style={{
                    fontFamily: "'Satoshi', 'Inter', sans-serif",
                    fontSize: "12px",
                    color: "#9A9A94",
                    fontWeight: 400,
                    marginTop: "2px",
                  }}
                >
                  {t.city}
                </div>
                <div
                  style={{
                    fontFamily: "'Satoshi', 'Inter', sans-serif",
                    fontSize: "10px",
                    color: "#ec7616",
                    fontWeight: 600,
                    marginTop: "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {t.trip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}