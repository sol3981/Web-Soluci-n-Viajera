import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft, MapPin, Moon, Bus, Plane, Building2,
  UtensilsCrossed, CheckCircle2, MessageCircle, ArrowRight,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ALL_PACKAGES, Package } from "../data/packages";

const ACCENT = "#ec7616";
const ACCENT_DARK = "#c95d0e";
const FF = "'Satoshi', 'Inter', sans-serif";

const CHIP_ICONS: Record<string, React.ReactNode> = {
  Bus: <Bus size={14} />,
  Vuelo: <Plane size={14} />,
  Hotel: <Building2 size={14} />,
  Cabaña: <Building2 size={14} />,
  Desayuno: <UtensilsCrossed size={14} />,
  Comidas: <UtensilsCrossed size={14} />,
  "Media pensión": <UtensilsCrossed size={14} />,
  Tour: <MapPin size={14} />,
};

const INCLUDES: Record<string, string[]> = {
  Bus: ["Traslado en bus cama ida y vuelta", "Asiento reclinable con servicio a bordo"],
  Vuelo: ["Vuelo de ida y vuelta incluido", "Equipaje de bodega incluido"],
  Hotel: ["Alojamiento en hotel según categoría", "Check-in y check-out estándar"],
  Cabaña: ["Alojamiento en cabaña privada", "Cocina equipada para uso exclusivo"],
  Desayuno: ["Desayuno diario incluido", "Servicio en el comedor del hotel"],
  Comidas: ["Media pensión o pensión completa", "Desayuno y cena incluidos"],
  "Media pensión": ["Desayuno y cena incluidos", "Variedad de opciones gastronómicas"],
  Tour: ["Tour guiado en español", "Entrada a atracciones incluida"],
};

export function PackageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pkg: Package | undefined = ALL_PACKAGES.find((p) => p.id === Number(id));

  if (!pkg) {
    return (
      <div style={{ fontFamily: FF, backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px" }}>
          <h2 style={{ fontFamily: FF, fontSize: "24px", fontWeight: 700, color: "#111110", letterSpacing: "-0.03em" }}>
            Paquete no encontrado
          </h2>
          <Link to="/resultados" style={{ color: ACCENT, fontFamily: FF, fontSize: "14px" }}>
            Ver todos los paquetes
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const whatsappMsg = encodeURIComponent(
    `Hola! Me interesa el paquete "${pkg.name}" (${pkg.destination}, ${pkg.nights} noches, ${pkg.price} ${pkg.priceNote}). ¿Podés darme más información?`
  );
  const whatsappUrl = `https://wa.me/5493426261318?text=${whatsappMsg}`;

  const related = ALL_PACKAGES.filter(
    (p) => p.destination === pkg.destination && p.id !== pkg.id
  ).slice(0, 3);

  return (
    <div style={{ fontFamily: FF, backgroundColor: "#FAFAF8", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />

      {/* ── Hero image ─────────────────────────────────────────────── */}
      <div style={{ position: "relative", height: "clamp(320px, 50vh, 520px)", marginTop: 0 }}>
        <img
          src={pkg.image}
          alt={pkg.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute", top: "90px", left: "40px",
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: "100px",
            color: "#fff", fontFamily: FF, fontSize: "13px", cursor: "pointer",
            padding: "8px 16px", transition: "background 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.65)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.45)")}
        >
          <ArrowLeft size={13} /> Volver
        </button>

        {/* Tag */}
        <div style={{ position: "absolute", top: "90px", right: "40px", backgroundColor: ACCENT, color: "#fff", fontFamily: FF, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "2px" }}>
          {pkg.tag}
        </div>

        {/* Title over image */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 40px 36px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <MapPin size={13} color="rgba(255,255,255,0.7)" />
              <span style={{ fontFamily: FF, fontSize: "13px", color: "rgba(255,255,255,0.8)", fontWeight: 400 }}>
                {pkg.location}
              </span>
            </div>
            <h1 style={{ fontFamily: FF, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, margin: 0 }}>
              {pkg.name}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 40px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "48px", alignItems: "start" }} className="detail-grid">

          {/* Left column */}
          <div>
            {/* Summary */}
            <p style={{ fontFamily: FF, fontSize: "17px", color: "#3A3A38", lineHeight: 1.7, marginBottom: "36px", marginTop: 0 }}>
              {pkg.summary}
            </p>

            {/* Quick facts */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px", marginBottom: "40px" }}>
              <FactCard icon={<Moon size={18} color={ACCENT} />} label="Duración" value={`${pkg.nights} noches`} />
              <FactCard icon={<Bus size={18} color={ACCENT} />} label="Traslado" value={pkg.transport} />
              <FactCard icon={<Building2 size={18} color={ACCENT} />} label="Alojamiento" value={pkg.hotel} />
              <FactCard icon={<UtensilsCrossed size={18} color={ACCENT} />} label="Comidas" value={pkg.meals} />
            </div>

            {/* What's included */}
            <h2 style={{ fontFamily: FF, fontSize: "20px", fontWeight: 700, color: "#111110", letterSpacing: "-0.025em", marginBottom: "20px" }}>
              ¿Qué incluye el paquete?
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
              {pkg.chips.map((chip) => (
                <div key={chip} style={{ display: "flex", gap: "14px" }}>
                  <div style={{ width: "36px", height: "36px", backgroundColor: "#FFF4EB", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: ACCENT }}>
                    {CHIP_ICONS[chip] ?? <CheckCircle2 size={14} />}
                  </div>
                  <div>
                    <div style={{ fontFamily: FF, fontSize: "14px", fontWeight: 600, color: "#111110", marginBottom: "4px" }}>{chip}</div>
                    {(INCLUDES[chip] ?? []).map((line) => (
                      <div key={line} style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "2px" }}>
                        <CheckCircle2 size={11} color={ACCENT} style={{ marginTop: "3px", flexShrink: 0 }} />
                        <span style={{ fontFamily: FF, fontSize: "12px", color: "#6B6B66" }}>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div style={{ backgroundColor: "#F4F3EF", borderRadius: "6px", padding: "20px", borderLeft: `3px solid ${ACCENT}` }}>
              <p style={{ fontFamily: FF, fontSize: "13px", color: "#5A5A58", margin: 0, lineHeight: 1.6 }}>
                <strong style={{ color: "#111110" }}>Nota importante:</strong> Los precios son por persona en base doble. Consulte disponibilidad y condiciones de pago con nuestros asesores. Los paquetes pueden incluir servicios adicionales según la temporada.
              </p>
            </div>
          </div>

          {/* Right column: Price card */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div style={{ backgroundColor: "#fff", border: "1px solid #E8E8E4", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              {/* Price header */}
              <div style={{ backgroundColor: "#111110", padding: "24px 24px 20px" }}>
                <div style={{ fontFamily: FF, fontSize: "11px", color: "#9A9A94", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
                  Precio desde
                </div>
                <div style={{ fontFamily: FF, fontSize: "40px", fontWeight: 700, color: "#FAFAF8", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {pkg.price}
                </div>
                <div style={{ fontFamily: FF, fontSize: "12px", color: "#9A9A94", marginTop: "4px" }}>
                  {pkg.priceNote} · base doble
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                  <DetailRow label="Destino" value={pkg.destination} />
                  <DetailRow label="Duración" value={`${pkg.nights} noches`} />
                  <DetailRow label="Traslado" value={pkg.transport} />
                  <DetailRow label="Alojamiento" value={pkg.hotel} />
                  <DetailRow label="Comidas" value={pkg.meals} />
                </div>

                {/* Chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px", paddingTop: "16px", borderTop: "1px solid #F0F0EA" }}>
                  {pkg.chips.map((chip) => (
                    <span key={chip} style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: FF, fontSize: "10px", fontWeight: 500, color: "#5A5A58", backgroundColor: "#F4F3EF", padding: "4px 9px", borderRadius: "100px" }}>
                      {CHIP_ICONS[chip] ?? null}{chip}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", backgroundColor: ACCENT, color: "#fff", fontFamily: FF, fontSize: "14px", fontWeight: 600, padding: "14px 0", borderRadius: "4px", textDecoration: "none", transition: "background-color 0.2s", boxSizing: "border-box" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = ACCENT_DARK)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = ACCENT)}
                >
                  <MessageCircle size={16} />
                  Consultar viaje
                </a>

                <p style={{ fontFamily: FF, fontSize: "11px", color: "#9A9A94", textAlign: "center", margin: "12px 0 0" }}>
                  Respuesta en menos de 24 hs. Sin compromiso.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related packages */}
        {related.length > 0 && (
          <div style={{ marginTop: "64px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
              <h2 style={{ fontFamily: FF, fontSize: "22px", fontWeight: 700, color: "#111110", letterSpacing: "-0.03em", margin: 0 }}>
                Más paquetes a {pkg.destination}
              </h2>
              <Link
                to={`/resultados?destino=${encodeURIComponent(pkg.destination)}`}
                style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: FF, fontSize: "13px", color: ACCENT, textDecoration: "none", fontWeight: 500 }}
              >
                Ver todos <ArrowRight size={13} />
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }} className="related-grid">
              {related.map((rel) => <RelatedCard key={rel.id} pkg={rel} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────
function FactCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ backgroundColor: "#fff", border: "1px solid #E8E8E4", borderRadius: "8px", padding: "16px" }}>
      <div style={{ marginBottom: "8px" }}>{icon}</div>
      <div style={{ fontFamily: FF, fontSize: "10px", color: "#9A9A94", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontFamily: FF, fontSize: "13px", color: "#111110", fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
      <span style={{ fontFamily: FF, fontSize: "12px", color: "#9A9A94" }}>{label}</span>
      <span style={{ fontFamily: FF, fontSize: "12px", color: "#111110", fontWeight: 500, textAlign: "right" }}>{value}</span>
    </div>
  );
}

function RelatedCard({ pkg }: { pkg: Package }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={`/paquete/${pkg.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{ backgroundColor: "#fff", border: "1px solid #E8E8E4", borderRadius: "8px", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s", boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.1)" : "none", transform: hovered ? "translateY(-2px)" : "none" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: "relative", height: "160px" }}>
          <img src={pkg.image} alt={pkg.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", top: "10px", left: "10px", backgroundColor: ACCENT, color: "#fff", fontFamily: FF, fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: "2px" }}>{pkg.tag}</div>
        </div>
        <div style={{ padding: "16px" }}>
          <div style={{ fontFamily: FF, fontSize: "15px", fontWeight: 700, color: "#111110", letterSpacing: "-0.02em", marginBottom: "6px" }}>{pkg.name}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: FF, fontSize: "18px", fontWeight: 700, color: "#111110", letterSpacing: "-0.03em" }}>{pkg.price}</span>
            <span style={{ fontFamily: FF, fontSize: "10px", color: "#9A9A94" }}>{pkg.priceNote}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── useState import ────────────────────────────────────────────────────────────
import { useState } from "react";
