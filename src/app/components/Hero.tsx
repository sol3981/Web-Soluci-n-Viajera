import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import brasilImg from "../../assets/brasil.png";
import mendozaImg from "../../assets/mendoza.png";
import bariloche from "../../assets/bariloche.png";
import { POPULAR_DESTINATIONS } from "../data/packages";

const ACCENT = "#ec7616";
const ACCENT_DARK = "#c95d0e";
const FF = "'Satoshi', 'Inter', sans-serif";

const PERSONAS_OPTIONS = [
  "1 persona",
  "2 personas",
  "3 personas",
  "4+ personas",
];

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DAY_NAMES = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

function formatDate(date: Date): string {
  const months = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ];
  return `${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// ── Mini Calendar ─────────────────────────────────────────────────────
interface MiniCalendarProps {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
  onClose: () => void;
}

function MiniCalendar({ selectedDate, onSelect, onClose }: MiniCalendarProps) {
  const today = new Date();
  const [vm, setVm] = useState(
    selectedDate ? selectedDate.getMonth() : today.getMonth()
  );
  const [vy, setVy] = useState(
    selectedDate ? selectedDate.getFullYear() : today.getFullYear()
  );

  const daysInMonth = new Date(vy, vm + 1, 0).getDate();
  const firstDay = new Date(vy, vm, 1).getDay();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const isPast = (d: number) =>
    new Date(vy, vm, d) < todayStart;

  const isSelected = (d: number) =>
    !!selectedDate &&
    d === selectedDate.getDate() &&
    vm === selectedDate.getMonth() &&
    vy === selectedDate.getFullYear();

  const isToday = (d: number) =>
    d === today.getDate() &&
    vm === today.getMonth() &&
    vy === today.getFullYear();

  const prevMonth = () => {
    if (vm === 0) { setVm(11); setVy((y) => y - 1); }
    else setVm((m) => m - 1);
  };
  const nextMonth = () => {
    if (vm === 11) { setVm(0); setVy((y) => y + 1); }
    else setVm((m) => m + 1);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: 0,
        zIndex: 300,
        backgroundColor: "#fff",
        border: "1px solid #E0E0DA",
        borderRadius: "10px",
        boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
        padding: "18px",
        width: "292px",
        minWidth: "292px",
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px",
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: "none",
            border: "1px solid #E8E8E4",
            borderRadius: "6px",
            cursor: "pointer",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            color: "#3A3A38",
            transition: "border-color 0.15s",
          }}
        >
          <ChevronLeft size={14} />
        </button>
        <span
          style={{
            fontFamily: FF,
            fontSize: "13px",
            fontWeight: 700,
            color: "#111110",
            letterSpacing: "-0.01em",
          }}
        >
          {MONTH_NAMES[vm]} {vy}
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: "none",
            border: "1px solid #E8E8E4",
            borderRadius: "6px",
            cursor: "pointer",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            color: "#3A3A38",
            transition: "border-color 0.15s",
          }}
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day names */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: "8px",
        }}
      >
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontFamily: FF,
              fontSize: "10px",
              fontWeight: 600,
              color: "#9A9A94",
              padding: "4px 0",
              letterSpacing: "0.04em",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
        }}
      >
        {cells.map((d, i) => {
          const past = d !== null && isPast(d);
          const sel = d !== null && isSelected(d);
          const tod = d !== null && isToday(d);
          return (
            <div
              key={i}
              onClick={() => {
                if (d && !past) {
                  onSelect(new Date(vy, vm, d));
                  onClose();
                }
              }}
              style={{
                textAlign: "center",
                padding: "7px 2px",
                borderRadius: "6px",
                cursor: d && !past ? "pointer" : "default",
                backgroundColor: sel ? ACCENT : "transparent",
                color: !d
                  ? "transparent"
                  : sel
                  ? "#fff"
                  : past
                  ? "#D8D8D2"
                  : "#3A3A38",
                fontFamily: FF,
                fontSize: "12px",
                fontWeight: sel || tod ? 700 : 400,
                border: tod && !sel ? `1.5px solid ${ACCENT}` : "1.5px solid transparent",
                transition: "background-color 0.12s",
              }}
            >
              {d ?? ""}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {selectedDate && (
        <div
          style={{
            marginTop: "14px",
            paddingTop: "12px",
            borderTop: "1px solid #F0F0EA",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: FF,
              fontSize: "11px",
              color: "#6B6B66",
            }}
          >
            {formatDate(selectedDate)}
          </span>
          <button
            onClick={() => {
              onSelect(null as unknown as Date);
              onClose();
            }}
            style={{
              background: "none",
              border: "none",
              fontFamily: FF,
              fontSize: "11px",
              color: "#9A9A94",
              cursor: "pointer",
              padding: 0,
              textDecoration: "underline",
            }}
          >
            Limpiar
          </button>
        </div>
      )}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────
export function Hero() {
  const navigate = useNavigate();

  // Destination autocomplete
  const [destino, setDestino] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const destinoRef = useRef<HTMLDivElement>(null);
  const destinoInputRef = useRef<HTMLInputElement>(null);

  // Calendar
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // People dropdown
  const [personas, setPersonas] = useState("2 personas");
  const [showPersonas, setShowPersonas] = useState(false);
  const personasRef = useRef<HTMLDivElement>(null);

  // Click-outside handler
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        destinoRef.current &&
        !destinoRef.current.contains(e.target as Node)
      )
        setShowSuggestions(false);
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      )
        setShowCalendar(false);
      if (
        personasRef.current &&
        !personasRef.current.contains(e.target as Node)
      )
        setShowPersonas(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const suggestions = POPULAR_DESTINATIONS.filter((d) =>
    destino.length === 0
      ? true
      : d.toLowerCase().includes(destino.toLowerCase())
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destino) params.set("destino", destino);
    if (selectedDate) params.set("fecha", formatDate(selectedDate));
    params.set("personas", personas);
    navigate(`/resultados?${params.toString()}`);
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAFAF8",
        display: "flex",
        alignItems: "center",
        paddingTop: "72px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 40px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* ── Left Column ─────────────────────────────────────── */}
        <div style={{ paddingTop: "20px" }}>
          {/* Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
            }}
          >
            <div style={{ width: "24px", height: "1px", backgroundColor: ACCENT }} />
            <span
              style={{
                fontFamily: FF,
                fontSize: "11px",
                fontWeight: 500,
                color: ACCENT,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Agencia de Viajes
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: FF,
              fontSize: "clamp(48px, 5.8vw, 76px)",
              fontWeight: 700,
              color: "#111110",
              lineHeight: 1.0,
              marginBottom: "28px",
              letterSpacing: "-0.04em",
            }}
          >
            Tu próximo
            <br />
            viaje empieza{" "}
            <span style={{ color: ACCENT }}>acá.</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: FF,
              fontSize: "16px",
              fontWeight: 400,
              color: "#6B6B66",
              lineHeight: 1.65,
              maxWidth: "400px",
              marginBottom: "40px",
            }}
          >
            Paquetes completos con vuelo o bus, hotel y traslados.
            Consultá hoy y salí cuando quieras.
          </p>

          {/* ── Search Card ──────────────────────────────────── */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #E0E0DA",
              borderRadius: "4px",
              marginBottom: "20px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              overflow: "visible",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                position: "relative",
              }}
              className="search-grid"
            >
              {/* ── Destination field ── */}
              <div
                ref={destinoRef}
                style={{
                  padding: "18px 20px",
                  borderRight: "1px solid #E8E8E4",
                  position: "relative",
                  cursor: "text",
                }}
                onClick={() => {
                  setShowSuggestions(true);
                  destinoInputRef.current?.focus();
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "5px",
                  }}
                >
                  <MapPin size={12} color={ACCENT} />
                  <span
                    style={{
                      fontFamily: FF,
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#111110",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Destino
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <input
                    ref={destinoInputRef}
                    type="text"
                    placeholder="¿A dónde querés ir?"
                    value={destino}
                    onChange={(e) => {
                      setDestino(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    style={{
                      fontFamily: FF,
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "#3A3A38",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      width: "100%",
                      padding: 0,
                    }}
                  />
                  {destino && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDestino("");
                        setShowSuggestions(true);
                        destinoInputRef.current?.focus();
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "2px",
                        display: "flex",
                        color: "#9A9A94",
                        flexShrink: 0,
                      }}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      right: 0,
                      zIndex: 300,
                      backgroundColor: "#fff",
                      border: "1px solid #E0E0DA",
                      borderRadius: "8px",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                      overflow: "hidden",
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div
                      style={{
                        padding: "8px 14px 4px",
                        fontFamily: FF,
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "#9A9A94",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Destinos populares
                    </div>
                    {suggestions.map((s) => (
                      <div
                        key={s}
                        onClick={() => {
                          setDestino(s);
                          setShowSuggestions(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 14px",
                          cursor: "pointer",
                          transition: "background-color 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.backgroundColor =
                            "#FFF8F3")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.backgroundColor =
                            "transparent")
                        }
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "6px",
                            backgroundColor: "#FFF3E8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <MapPin size={12} color={ACCENT} />
                        </div>
                        <span
                          style={{
                            fontFamily: FF,
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#111110",
                          }}
                        >
                          {s}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Date field ── */}
              <div
                ref={calendarRef}
                style={{
                  padding: "18px 20px",
                  borderRight: "1px solid #E8E8E4",
                  position: "relative",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => {
                  setShowCalendar((v) => !v);
                  setShowSuggestions(false);
                  setShowPersonas(false);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "5px",
                  }}
                >
                  <Calendar size={12} color={ACCENT} />
                  <span
                    style={{
                      fontFamily: FF,
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#111110",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Fecha de salida
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: FF,
                    fontSize: "13px",
                    fontWeight: 400,
                    color: selectedDate ? "#3A3A38" : "#AEADA9",
                    display: "block",
                  }}
                >
                  {selectedDate ? formatDate(selectedDate) : "Seleccioná fecha"}
                </span>

                {/* Calendar popover */}
                {showCalendar && (
                  <MiniCalendar
                    selectedDate={selectedDate}
                    onSelect={(d) => setSelectedDate(d)}
                    onClose={() => setShowCalendar(false)}
                  />
                )}
              </div>

              {/* ── People field ── */}
              <div
                ref={personasRef}
                style={{
                  padding: "18px 20px",
                  position: "relative",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => {
                  setShowPersonas((v) => !v);
                  setShowSuggestions(false);
                  setShowCalendar(false);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "5px",
                  }}
                >
                  <Users size={12} color={ACCENT} />
                  <span
                    style={{
                      fontFamily: FF,
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#111110",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Personas
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FF,
                      fontSize: "13px",
                      color: "#3A3A38",
                    }}
                  >
                    {personas}
                  </span>
                  <ChevronDown
                    size={13}
                    color="#9A9A94"
                    style={{
                      transform: showPersonas ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* People dropdown */}
                {showPersonas && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      right: 0,
                      zIndex: 300,
                      backgroundColor: "#fff",
                      border: "1px solid #E0E0DA",
                      borderRadius: "8px",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                      overflow: "hidden",
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {PERSONAS_OPTIONS.map((opt) => (
                      <div
                        key={opt}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPersonas(opt);
                          setShowPersonas(false);
                        }}
                        style={{
                          padding: "11px 16px",
                          cursor: "pointer",
                          fontFamily: FF,
                          fontSize: "13px",
                          fontWeight: personas === opt ? 600 : 400,
                          color: personas === opt ? ACCENT : "#3A3A38",
                          backgroundColor:
                            personas === opt ? "#FFF8F3" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          transition: "background-color 0.1s",
                        }}
                        onMouseEnter={(e) => {
                          if (personas !== opt)
                            (e.currentTarget as HTMLElement).style.backgroundColor =
                              "#FAFAF8";
                        }}
                        onMouseLeave={(e) => {
                          if (personas !== opt)
                            (e.currentTarget as HTMLElement).style.backgroundColor =
                              "transparent";
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              backgroundColor:
                                personas === opt ? "#FFF3E8" : "#F4F3EF",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Users
                              size={11}
                              color={personas === opt ? ACCENT : "#6B6B66"}
                            />
                          </div>
                          {opt}
                        </div>
                        {personas === opt && (
                          <div
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: ACCENT,
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA button */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #E8E8E4" }}>
              <button
                onClick={handleSearch}
                style={{
                  width: "100%",
                  backgroundColor: ACCENT,
                  color: "#FAFAF8",
                  border: "none",
                  padding: "13px 24px",
                  cursor: "pointer",
                  fontFamily: FF,
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0em",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    ACCENT_DARK)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    ACCENT)
                }
              >
                <Search size={14} />
                Buscar viaje
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "36px", marginTop: "40px" }}>
            {[
              { number: "+2.400", label: "Viajeros satisfechos" },
              { number: "+80", label: "Destinos disponibles" },
              { number: "8 años", label: "de experiencia" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#111110",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: FF,
                    fontSize: "11px",
                    color: "#9A9A94",
                    marginTop: "5px",
                    fontWeight: 400,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column – Image composition ─────────────────── */}
        <div
          style={{
            position: "relative",
            height: "clamp(480px, 65vh, 700px)",
            alignSelf: "center",
          }}
        >
          {/* Multi-image grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "10px",
            }}
          >
            {/* Brasil — large left */}
            <div
              onClick={() => navigate("/resultados?destino=Brasil")}
              style={{
                gridColumn: "1",
                gridRow: "1 / 3",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector("img");
                if (img) img.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector("img");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <img
                src={brasilImg}
                alt="Brasil"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: ACCENT,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: FF,
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Brasil
                </span>
              </div>
            </div>

            {/* Mendoza — top right */}
            <div
              onClick={() => navigate("/resultados?destino=Mendoza")}
              style={{
                gridColumn: "2",
                gridRow: "1",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector("img");
                if (img) img.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector("img");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <img
                src={mendozaImg}
                alt="Mendoza"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: ACCENT,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: FF,
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Mendoza
                </span>
              </div>
            </div>

            {/* Bariloche — bottom right */}
            <div
              onClick={() => navigate("/resultados?destino=Bariloche")}
              style={{
                gridColumn: "2",
                gridRow: "2",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector("img");
                if (img) img.style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                const img = (e.currentTarget as HTMLElement).querySelector("img");
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <img
                src={bariloche}
                alt="Bariloche"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: ACCENT,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: FF,
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Bariloche
                </span>
              </div>
            </div>
          </div>

          {/* Passport Stamp Seal */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              zIndex: 10,
              width: "110px",
              height: "110px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 110 110"
              width="110"
              height="110"
              style={{ position: "absolute", inset: 0 }}
            >
              <circle
                cx="55" cy="55" r="50"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1.5"
                strokeDasharray="3 4"
                opacity="0.85"
              />
              <circle
                cx="55" cy="55" r="43"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1"
                opacity="0.5"
              />
              <path id="topArc" d="M 15,55 A 40,40 0 0,1 95,55" fill="none" />
              <text
                style={{
                  fontSize: "7.5px",
                  fontFamily: "'Satoshi','Inter',sans-serif",
                  fontWeight: 700,
                  fill: ACCENT,
                  letterSpacing: "0.18em",
                }}
              >
                <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                  PRECIO GARANTIZADO
                </textPath>
              </text>
              <path id="bottomArc" d="M 15,55 A 40,40 0 0,0 95,55" fill="none" />
              <text
                style={{
                  fontSize: "7.5px",
                  fontFamily: "'Satoshi','Inter',sans-serif",
                  fontWeight: 700,
                  fill: ACCENT,
                  letterSpacing: "0.18em",
                }}
              >
                <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
                  SOLUCIÓN VIAJERA
                </textPath>
              </text>
              <circle cx="55" cy="16" r="1.8" fill={ACCENT} opacity="0.7" />
              <circle cx="55" cy="94" r="1.8" fill={ACCENT} opacity="0.7" />
              <line x1="28" y1="51" x2="82" y2="51" stroke={ACCENT} strokeWidth="0.8" opacity="0.4" />
              <line x1="28" y1="60" x2="82" y2="60" stroke={ACCENT} strokeWidth="0.8" opacity="0.4" />
            </svg>
            <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
              <div
                style={{
                  fontFamily: FF,
                  fontSize: "17px",
                  fontWeight: 700,
                  color: ACCENT,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                ✈
              </div>
              <div
                style={{
                  fontFamily: FF,
                  fontSize: "8.5px",
                  fontWeight: 700,
                  color: ACCENT,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: "3px",
                  opacity: 0.85,
                }}
              >
                Sin cargos
                <br />
                ocultos
              </div>
            </div>
          </div>

          {/* Decorative border */}
          <div
            style={{
              position: "absolute",
              top: "-16px",
              right: "-16px",
              width: "100px",
              height: "100px",
              border: "1px solid rgba(236,118,22,0.2)",
              borderRadius: "2px",
              zIndex: -1,
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-top: 40px !important;
          }
          .search-grid {
            grid-template-columns: 1fr !important;
          }
          .search-grid > div {
            border-right: none !important;
            border-bottom: 1px solid #E8E8E4;
          }
          .search-grid > div:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
