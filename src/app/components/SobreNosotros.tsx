import ownerPhoto from "../../assets/equipo.png";

export function SobreNosotros() {
  return (
    <section
      id="nosotros"
      style={{
        backgroundColor: "#FAFAF8",
        padding: "96px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "72px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Photo */}
        <div style={{ flexShrink: 0 }}>
          <img
            src={ownerPhoto}
            alt="Juli y Nacho, fundadores de Solución Viajera"
            style={{
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
              boxShadow: "0 8px 32px rgba(236,118,22,0.12), 0 2px 8px rgba(0,0,0,0.06)",
            }}
          />
        </div>

        {/* Text content */}
        <div style={{ flex: 1, minWidth: "260px", maxWidth: "520px" }}>
          {/* Label */}
          <span
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#ec7616",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Quiénes somos
          </span>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "#111110",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: "0 0 20px 0",
            }}
          >
            Detrás de cada viaje,<br />hay personas reales.
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              color: "#5A5A58",
              lineHeight: 1.65,
              margin: "0 0 12px 0",
            }}
          >
            Somos <strong style={{ color: "#111110", fontWeight: 600 }}>Juli y Nacho</strong>, y estamos detrás de Solución Viajera. Te ayudamos a encontrar el viaje ideal y te acompañamos en todo el proceso.
          </p>
          <p
            style={{
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              color: "#5A5A58",
              lineHeight: 1.65,
              margin: "0 0 32px 0",
            }}
          >
            No somos una plataforma ni un algoritmo — somos una agencia de personas que viajan, conocen los destinos y saben lo que necesitás para disfrutar sin preocupaciones.
          </p>

          {/* CTA removed */}
        </div>
      </div>
    </section>
  );
}