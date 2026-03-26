import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useSearchParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft, MapPin, Calendar, Users, Search,
  Bus, Plane, Building2, UtensilsCrossed, X, ChevronDown,
  Moon, ArrowRight, SlidersHorizontal, ArrowUpDown, Check,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ALL_PACKAGES, POPULAR_DESTINATIONS, Package } from "../data/packages";

const ACCENT = "#ec7616";
const ACCENT_DARK = "#c95d0e";
const FF = "'Satoshi', 'Inter', sans-serif";

const CHIP_ICONS: Record<string, React.ReactNode> = {
  Bus: <Bus size={11} />,
  Vuelo: <Plane size={11} />,
  Hotel: <Building2 size={11} />,
  Cabaña: <Building2 size={11} />,
  Desayuno: <UtensilsCrossed size={11} />,
  Comidas: <UtensilsCrossed size={11} />,
  "Media pensión": <UtensilsCrossed size={11} />,
  Tour: <MapPin size={11} />,
};

const PERSONAS_OPTIONS = [
  { value: "1 persona", label: "1 persona" },
  { value: "2 personas", label: "2 personas" },
  { value: "3 personas", label: "3 personas" },
  { value: "4+ personas", label: "4+ personas" },
];

// ── Filter definitions ────────────────────────────────────────────────────────
type FilterKey = "transporte" | "duracion" | "alojamiento" | "precio";
// Multi-select: each key maps to an array of selected values
type ActiveFilters = Partial<Record<FilterKey, string[]>>;
type SortKey = "relevancia" | "precio_asc" | "precio_desc";

const FILTER_CONFIG: {
  key: FilterKey;
  label: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "transporte",
    label: "Transporte",
    options: [
      { value: "bus", label: "Bus" },
      { value: "avion", label: "Avión" },
    ],
  },
  {
    key: "duracion",
    label: "Duración",
    options: [
      { value: "3", label: "3 noches" },
      { value: "4", label: "4 noches" },
      { value: "5", label: "5 noches" },
      { value: "7", label: "7 noches" },
    ],
  },
  {
    key: "alojamiento",
    label: "Alojamiento",
    options: [
      { value: "hotel", label: "Hotel" },
      { value: "cabana", label: "Cabaña" },
      { value: "resort", label: "Resort" },
    ],
  },
  {
    key: "precio",
    label: "Precio",
    options: [
      { value: "economico", label: "Económico" },
      { value: "medio", label: "Medio" },
      { value: "premium", label: "Premium" },
    ],
  },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Más populares" },
  { value: "precio_asc", label: "Menor precio" },
  { value: "precio_desc", label: "Mayor precio" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/\D/g, ""), 10) || 0;
}

function matchesFilters(pkg: Package, filters: ActiveFilters): boolean {
  // Transporte: package must match ANY of the selected values (OR logic)
  if (filters.transporte && filters.transporte.length > 0) {
    const hasMatch = filters.transporte.some((v) => {
      if (v === "bus") return pkg.chips.includes("Bus");
      if (v === "avion") return pkg.chips.includes("Vuelo");
      return false;
    });
    if (!hasMatch) return false;
  }

  // Duración: match ANY selected night count
  if (filters.duracion && filters.duracion.length > 0) {
    if (!filters.duracion.some((v) => pkg.nights === parseInt(v, 10))) return false;
  }

  // Alojamiento: match ANY selected type
  if (filters.alojamiento && filters.alojamiento.length > 0) {
    const h = pkg.hotel.toLowerCase();
    const hasMatch = filters.alojamiento.some((v) => {
      if (v === "hotel") return h.includes("hotel");
      if (v === "cabana") return h.includes("cabaña") || pkg.chips.includes("Cabaña");
      if (v === "resort") return h.includes("resort");
      return false;
    });
    if (!hasMatch) return false;
  }

  // Precio: match ANY selected range
  if (filters.precio && filters.precio.length > 0) {
    const n = parsePrice(pkg.price);
    const hasMatch = filters.precio.some((v) => {
      if (v === "economico") return n <= 250000;
      if (v === "medio") return n > 250000 && n <= 550000;
      if (v === "premium") return n > 550000;
      return false;
    });
    if (!hasMatch) return false;
  }

  return true;
}

function applySort(packages: Package[], sort: SortKey): Package[] {
  const copy = [...packages];
  if (sort === "precio_asc") return copy.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  if (sort === "precio_desc") return copy.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  return copy;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const [y, m, d] = dateStr.split("-");
    const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return `${d} ${months[parseInt(m) - 1]} ${y}`;
  } catch {
    return dateStr;
  }
}

function getOptionLabel(key: FilterKey, value: string): string {
  const group = FILTER_CONFIG.find((f) => f.key === key);
  return group?.options.find((o) => o.value === value)?.label ?? value;
}

// ── Portal Popover ────────────────────────────────────────────────────────────
interface PopoverRect { top: number; left: number; width: number; }

function Popover({
  anchor,
  onClose,
  children,
}: {
  anchor: PopoverRect | null;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    // slight delay so the trigger click doesn't immediately close it
    const t = setTimeout(() => document.addEventListener("mousedown", handle), 50);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handle); };
  }, [onClose]);

  if (!anchor) return null;

  return createPortal(
    <div
      ref={popoverRef}
      style={{
        position: "fixed",
        top: anchor.top + 8,
        left: anchor.left,
        minWidth: Math.max(anchor.width, 220),
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)",
        zIndex: 9999,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {children}
    </div>,
    document.body
  );
}

// ── Filter Popover Button ─────────────────────────────────────────────────────
function FilterPopover({
  filterKey,
  label,
  options,
  selected,
  onToggle,
  onClear,
}: {
  filterKey: FilterKey;
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (key: FilterKey, value: string) => void;
  onClear: (key: FilterKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<PopoverRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const isActive = selected.length > 0;

  const handleOpen = useCallback(() => {
    if (!btnRef.current) return;
    if (open) { setOpen(false); setRect(null); return; }
    const r = btnRef.current.getBoundingClientRect();
    setRect({ top: r.bottom, left: r.left, width: r.width });
    setOpen(true);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setRect(null);
  }, []);

  // Label shown on the button
  const buttonLabel = isActive
    ? selected.map((v) => getOptionLabel(filterKey, v)).join(", ")
    : label;

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button
        ref={btnRef}
        onClick={handleOpen}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 14px",
          backgroundColor: isActive ? "#FFF4EB" : "#fff",
          border: `1px solid ${isActive ? ACCENT : "#E0E0DA"}`,
          borderRadius: "100px",
          fontFamily: FF,
          fontSize: "13px",
          fontWeight: isActive ? 600 : 400,
          color: isActive ? ACCENT : "#3A3A38",
          cursor: "pointer",
          whiteSpace: "nowrap",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          transition: "border-color 0.15s, background-color 0.15s",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "140px" }}>
          {buttonLabel}
        </span>
        {isActive ? (
          <span
            onClick={(e) => { e.stopPropagation(); onClear(filterKey); handleClose(); }}
            style={{ lineHeight: 0, display: "flex", alignItems: "center", color: ACCENT, flexShrink: 0 }}
          >
            <X size={12} />
          </span>
        ) : (
          <ChevronDown
            size={13}
            color="#9A9A94"
            style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}
          />
        )}
      </button>

      {open && (
        <Popover anchor={rect} onClose={handleClose}>
          <div style={{ padding: "8px 0" }}>
            <div style={{ padding: "10px 16px 6px", fontFamily: FF, fontSize: "10px", fontWeight: 600, color: "#9A9A94", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {label}
            </div>
            {options.map((opt) => {
              const checked = selected.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 16px",
                    cursor: "pointer",
                    backgroundColor: checked ? "#FFF9F5" : "transparent",
                    transition: "background-color 0.1s",
                  }}
                  onMouseEnter={(e) => { if (!checked) (e.currentTarget as HTMLElement).style.backgroundColor = "#F8F7F3"; }}
                  onMouseLeave={(e) => { if (!checked) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                >
                  {/* Custom checkbox */}
                  <span
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "4px",
                      border: checked ? `2px solid ${ACCENT}` : "2px solid #D0D0CA",
                      backgroundColor: checked ? ACCENT : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "border-color 0.15s, background-color 0.15s",
                    }}
                    onClick={() => onToggle(filterKey, opt.value)}
                  >
                    {checked && <Check size={11} color="#fff" strokeWidth={3} />}
                  </span>
                  <span
                    style={{ fontFamily: FF, fontSize: "13px", color: checked ? "#111110" : "#3A3A38", fontWeight: checked ? 600 : 400, flex: 1 }}
                    onClick={() => onToggle(filterKey, opt.value)}
                  >
                    {opt.label}
                  </span>
                </label>
              );
            })}
            {selected.length > 0 && (
              <div style={{ padding: "8px 16px 10px", borderTop: "1px solid #F0F0EA", marginTop: "4px" }}>
                <button
                  onClick={() => { onClear(filterKey); handleClose(); }}
                  style={{ background: "none", border: "none", fontFamily: FF, fontSize: "12px", color: "#9A9A94", cursor: "pointer", padding: 0, textDecoration: "underline" }}
                >
                  Borrar selección
                </button>
              </div>
            )}
          </div>
        </Popover>
      )}
    </div>
  );
}

// ── Sort Dropdown ─────────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<PopoverRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const currentLabel = SORT_OPTIONS.find((o) => o.value === value)?.label ?? "Ordenar";
  const isActive = value !== "relevancia";

  const handleOpen = () => {
    if (!btnRef.current) return;
    if (open) { setOpen(false); setRect(null); return; }
    const r = btnRef.current.getBoundingClientRect();
    setRect({ top: r.bottom, left: r.left, width: r.width });
    setOpen(true);
  };

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button
        ref={btnRef}
        onClick={handleOpen}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 14px",
          backgroundColor: isActive ? "#FFF4EB" : "#fff",
          border: `1px solid ${isActive ? ACCENT : "#E0E0DA"}`,
          borderRadius: "100px",
          fontFamily: FF,
          fontSize: "13px",
          fontWeight: isActive ? 600 : 400,
          color: isActive ? ACCENT : "#3A3A38",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "border-color 0.15s, background-color 0.15s",
        }}
      >
        <ArrowUpDown size={13} color={isActive ? ACCENT : "#9A9A94"} />
        {currentLabel}
        <ChevronDown size={13} color={isActive ? ACCENT : "#9A9A94"} style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </button>

      {open && (
        <Popover anchor={rect} onClose={() => { setOpen(false); setRect(null); }}>
          <div style={{ padding: "6px 0" }}>
            {SORT_OPTIONS.map((opt) => {
              const selected = value === opt.value;
              return (
                <button
                  key={opt.value}
                  onMouseDown={(e) => { e.preventDefault(); onChange(opt.value); setOpen(false); setRect(null); }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: selected ? "#FFF4EB" : "none",
                    border: "none",
                    padding: "10px 16px",
                    fontFamily: FF,
                    fontSize: "13px",
                    color: selected ? ACCENT : "#3A3A38",
                    fontWeight: selected ? 600 : 400,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                  onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.backgroundColor = "#F8F7F3"; }}
                  onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                >
                  {opt.label}
                  {selected && <Check size={13} color={ACCENT} />}
                </button>
              );
            })}
          </div>
        </Popover>
      )}
    </div>
  );
}

// ── Search Panel ─────────────────────────────────────────────────────────────
function SearchPanel({
  initialDestino, initialFecha, initialPersonas, onSearch,
}: {
  initialDestino: string; initialFecha: string; initialPersonas: string;
  onSearch: (d: string, f: string, p: string) => void;
}) {
  const [destino, setDestino] = useState(initialDestino);
  const [fecha, setFecha] = useState(initialFecha);
  const [personas, setPersonas] = useState(initialPersonas);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPersonasDropdown, setShowPersonasDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const personasRef = useRef<HTMLDivElement>(null);

  const suggestions = POPULAR_DESTINATIONS.filter((d) =>
    d.toLowerCase().includes(destino.toLowerCase())
  );

  useEffect(() => {
    setDestino(initialDestino);
    setFecha(initialFecha);
    setPersonas(initialPersonas);
  }, [initialDestino, initialFecha, initialPersonas]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) && !inputRef.current?.contains(e.target as Node)) setShowSuggestions(false);
      if (personasRef.current && !personasRef.current.contains(e.target as Node)) setShowPersonasDropdown(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const inputStyle: React.CSSProperties = { width: "100%", border: "none", outline: "none", background: "transparent", fontFamily: FF, fontSize: "14px", color: "#111110" };
  const fieldWrapStyle: React.CSSProperties = { flex: 1, minWidth: "160px", display: "flex", flexDirection: "column", gap: "4px", padding: "12px 16px", borderRight: "1px solid #E8E8E4", position: "relative" };
  const labelStyle: React.CSSProperties = { fontFamily: FF, fontSize: "10px", fontWeight: 600, color: "#9A9A94", letterSpacing: "0.08em", textTransform: "uppercase" };

  return (
    <div style={{ backgroundColor: "#fff", border: "1px solid #E0E0DA", borderRadius: "6px", display: "flex", alignItems: "stretch", overflow: "visible", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", flexWrap: "wrap" }}>
      {/* Destino */}
      <div style={{ ...fieldWrapStyle, minWidth: "200px", flexGrow: 2 }}>
        <label style={labelStyle}>Destino</label>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MapPin size={14} color={ACCENT} />
          <input ref={inputRef} style={inputStyle} placeholder="¿A dónde querés ir?" value={destino}
            onChange={(e) => { setDestino(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)} />
          {destino && (
            <button onClick={() => { setDestino(""); inputRef.current?.focus(); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#9A9A94", padding: 0, lineHeight: 0 }}>
              <X size={12} />
            </button>
          )}
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div ref={suggestionsRef} style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, backgroundColor: "#fff", border: "1px solid #E0E0DA", borderRadius: "6px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 300, overflow: "hidden" }}>
            <div style={{ padding: "8px 0" }}>
              {(destino ? suggestions : POPULAR_DESTINATIONS).map((sug) => (
                <button key={sug} onMouseDown={(e) => { e.preventDefault(); setDestino(sug); setShowSuggestions(false); }}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 16px", fontFamily: FF, fontSize: "13px", color: "#3A3A38", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F8F7F3")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}>
                  <MapPin size={12} color="#9A9A94" />{sug}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fecha */}
      <div style={{ ...fieldWrapStyle, minWidth: "160px" }}>
        <label style={labelStyle}>Fecha de salida</label>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Calendar size={14} color={ACCENT} />
          <input type="date" style={{ ...inputStyle, colorScheme: "light" }} value={fecha}
            min={new Date().toISOString().split("T")[0]} onChange={(e) => setFecha(e.target.value)} />
        </div>
      </div>

      {/* Personas */}
      <div ref={personasRef} style={{ ...fieldWrapStyle, minWidth: "150px", borderRight: "none", cursor: "pointer" }}
        onClick={() => setShowPersonasDropdown(!showPersonasDropdown)}>
        <label style={{ ...labelStyle, cursor: "pointer" }}>Personas</label>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Users size={14} color={ACCENT} />
            <span style={{ fontFamily: FF, fontSize: "14px", color: personas ? "#111110" : "#9A9A94" }}>
              {personas || "¿Cuántos viajan?"}
            </span>
          </div>
          <ChevronDown size={13} color="#9A9A94" style={{ transition: "transform 0.2s", transform: showPersonasDropdown ? "rotate(180deg)" : "none" }} />
        </div>
        {showPersonasDropdown && (
          <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, backgroundColor: "#fff", border: "1px solid #E0E0DA", borderRadius: "6px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 300, overflow: "hidden" }}>
            {PERSONAS_OPTIONS.map((opt) => (
              <button key={opt.value} onMouseDown={(e) => { e.preventDefault(); setPersonas(opt.value); setShowPersonasDropdown(false); }}
                style={{ width: "100%", textAlign: "left", background: personas === opt.value ? "#FFF4EB" : "none", border: "none", padding: "10px 16px", fontFamily: FF, fontSize: "13px", color: personas === opt.value ? ACCENT : "#3A3A38", fontWeight: personas === opt.value ? 600 : 400, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
                onMouseEnter={(e) => { if (personas !== opt.value) (e.currentTarget as HTMLElement).style.backgroundColor = "#F8F7F3"; }}
                onMouseLeave={(e) => { if (personas !== opt.value) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}>
                <Users size={12} color={personas === opt.value ? ACCENT : "#9A9A94"} />{opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search button */}
      <button onClick={() => onSearch(destino, fecha, personas)}
        style={{ backgroundColor: ACCENT, color: "#fff", border: "none", borderRadius: "0 5px 5px 0", padding: "0 28px", fontFamily: FF, fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "background-color 0.2s", minWidth: "140px", justifyContent: "center", flexShrink: 0 }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = ACCENT_DARK)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = ACCENT)}>
        <Search size={15} />Buscar
      </button>
    </div>
  );
}

// ── Active Chip ───────────────────────────────────────────────────────────────
function ActiveChip({ icon, label, onRemove }: { icon?: React.ReactNode; label: string; onRemove: () => void }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", backgroundColor: "#FFF4EB", border: "1px solid #FDD9B5", borderRadius: "100px", padding: "5px 10px", fontFamily: FF, fontSize: "12px", color: "#5A3000", fontWeight: 500 }}>
      {icon}
      {label}
      <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: "#9A6030", lineHeight: 0, padding: "0 0 0 2px" }}>
        <X size={11} />
      </button>
    </span>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function ResultadosPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const destino = params.get("destino") || "";
  const fecha = params.get("fecha") || "";
  const personas = params.get("personas") || "";

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [sortBy, setSortBy] = useState<SortKey>("relevancia");

  // 1. Filter by destination
  const byDestination = destino
    ? ALL_PACKAGES.filter(
        (p) =>
          p.destination.toLowerCase().includes(destino.toLowerCase()) ||
          destino.toLowerCase().includes(p.destination.toLowerCase())
      )
    : ALL_PACKAGES;

  const noExactMatch = byDestination.length === 0 && destino !== "";
  const basePackages = byDestination.length > 0 ? byDestination : ALL_PACKAGES;

  // 2. Apply dropdown filters
  const filteredPackages = basePackages.filter((p) => matchesFilters(p, activeFilters));

  // 3. Sort
  const displayPackages = applySort(filteredPackages, sortBy);

  const hasSearchFilters = !!(destino || fecha || personas);
  const hasDropdownFilters = Object.values(activeFilters).some((arr) => arr && arr.length > 0);
  const hasAnyActive = hasSearchFilters || hasDropdownFilters || sortBy !== "relevancia";

  function handleSearch(d: string, f: string, p: string) {
    const next = new URLSearchParams();
    if (d) next.set("destino", d);
    if (f) next.set("fecha", f);
    if (p) next.set("personas", p);
    setParams(next);
  }

  function removeSearchFilter(key: string) {
    const next = new URLSearchParams(params);
    next.delete(key);
    setParams(next);
  }

  // Toggle a single value in a filter's array
  function toggleFilter(key: FilterKey, value: string) {
    setActiveFilters((prev) => {
      const current = prev[key] ?? [];
      const exists = current.includes(value);
      const next = exists ? current.filter((v) => v !== value) : [...current, value];
      if (next.length === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: next };
    });
  }

  function clearFilter(key: FilterKey) {
    setActiveFilters((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }

  function clearAllFilters() {
    setParams(new URLSearchParams());
    setActiveFilters({});
    setSortBy("relevancia");
  }

  return (
    <div style={{ fontFamily: FF, backgroundColor: "#FAFAF8", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />

      {/* ── Dark Hero ────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#111110", paddingTop: "96px", paddingBottom: "48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <button onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#9A9A94", fontFamily: FF, fontSize: "13px", cursor: "pointer", padding: 0, marginBottom: "28px", transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9A9A94")}>
            <ArrowLeft size={14} /> Volver al inicio
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <div style={{ width: "20px", height: "1px", backgroundColor: ACCENT }} />
            <span style={{ fontFamily: FF, fontSize: "11px", fontWeight: 500, color: ACCENT, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Catálogo de paquetes
            </span>
          </div>

          <h1 style={{ fontFamily: FF, fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 700, color: "#FAFAF8", letterSpacing: "-0.04em", lineHeight: 1.05, margin: 0, marginBottom: "32px" }}>
            {destino
              ? <>Viajes a <span style={{ color: ACCENT }}>{destino}</span></>
              : <>Todos los <span style={{ color: ACCENT }}>destinos</span></>}
          </h1>

          <SearchPanel initialDestino={destino} initialFecha={fecha} initialPersonas={personas} onSearch={handleSearch} />
        </div>
      </div>

      {/* ── Filter bar ───────────────────────────────────────────── */}
      <div style={{ boxShadow: "0 1px 0 0 rgba(0,0,0,0.08)", backgroundColor: "#fff", position: "sticky", top: "72px", zIndex: 50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", padding: "12px 0" }} className="filter-bar">

            {/* Label */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0, marginRight: "4px" }}>
              <SlidersHorizontal size={14} color="#9A9A94" />
              <span style={{ fontFamily: FF, fontSize: "12px", color: "#9A9A94", fontWeight: 500, whiteSpace: "nowrap" }}>
                Filtrar:
              </span>
            </div>

            {/* Filter popovers */}
            {FILTER_CONFIG.map((filter) => (
              <FilterPopover
                key={filter.key}
                filterKey={filter.key}
                label={filter.label}
                options={filter.options}
                selected={activeFilters[filter.key] ?? []}
                onToggle={toggleFilter}
                onClear={clearFilter}
              />
            ))}

            {/* Divider */}
            <div style={{ width: "1px", height: "24px", background: "rgba(0,0,0,0.1)", flexShrink: 0, marginLeft: "4px" }} />

            {/* Sort */}
            <SortDropdown value={sortBy} onChange={setSortBy} />

            {/* Clear all */}
            {hasAnyActive && (
              <button
                onClick={clearAllFilters}
                style={{ background: "none", border: "none", fontFamily: FF, fontSize: "12px", color: "#9A9A94", cursor: "pointer", padding: "6px 8px", whiteSpace: "nowrap", marginLeft: "4px", transition: "color 0.15s", flexShrink: 0 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#111110")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9A9A94")}
              >
                Limpiar todo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 40px 80px" }}>

        {/* Active chips + count */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: FF, fontSize: "14px", color: "#6B6B66" }}>
              <strong style={{ color: "#111110" }}>{displayPackages.length}</strong>{" "}
              {displayPackages.length === 1 ? "paquete encontrado" : "paquetes encontrados"}
            </span>

            {/* URL-based chips */}
            {destino && <ActiveChip icon={<MapPin size={11} />} label={destino} onRemove={() => removeSearchFilter("destino")} />}
            {fecha && <ActiveChip icon={<Calendar size={11} />} label={formatDate(fecha)} onRemove={() => removeSearchFilter("fecha")} />}
            {personas && <ActiveChip icon={<Users size={11} />} label={personas} onRemove={() => removeSearchFilter("personas")} />}

            {/* One chip per selected filter value */}
            {(Object.entries(activeFilters) as [FilterKey, string[]][]).flatMap(([key, vals]) =>
              vals.map((val) => (
                <ActiveChip
                  key={`${key}-${val}`}
                  label={getOptionLabel(key, val)}
                  onRemove={() => toggleFilter(key, val)}
                />
              ))
            )}
          </div>
        </div>

        {/* No destination match notice */}
        {noExactMatch && (
          <div style={{ backgroundColor: "#FFF4EB", border: "1px solid #FDD9B5", borderRadius: "6px", padding: "14px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Search size={14} color={ACCENT} />
            <p style={{ fontFamily: FF, fontSize: "13px", color: "#5A3000", margin: 0 }}>
              No encontramos paquetes exactos para <strong>"{destino}"</strong>. Mostrando todos los destinos disponibles.
            </p>
          </div>
        )}

        {/* Empty state */}
        {displayPackages.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 0" }}>
            <div style={{ width: "56px", height: "56px", backgroundColor: "#F4F3EF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Search size={22} color="#9A9A94" />
            </div>
            <h3 style={{ fontFamily: FF, fontSize: "18px", fontWeight: 700, color: "#111110", letterSpacing: "-0.02em", margin: "0 0 8px" }}>
              Sin resultados para estos filtros
            </h3>
            <p style={{ fontFamily: FF, fontSize: "14px", color: "#9A9A94", margin: "0 0 24px" }}>
              Intentá con otra combinación de filtros o borrá alguno.
            </p>
            <button onClick={clearAllFilters}
              style={{ backgroundColor: ACCENT, color: "#fff", border: "none", borderRadius: "4px", padding: "12px 24px", fontFamily: FF, fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Cards grid */}
        {displayPackages.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }} className="results-grid">
            {displayPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}

        {/* CTA banner */}
        <div style={{ marginTop: "72px", backgroundColor: "#111110", borderRadius: "8px", padding: "48px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: FF, fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: "#FAFAF8", letterSpacing: "-0.03em", margin: 0, marginBottom: "8px" }}>
              ¿No encontrás lo que buscás?
            </h2>
            <p style={{ fontFamily: FF, fontSize: "14px", color: "#9A9A94", margin: 0 }}>
              Armamos paquetes a medida para cualquier destino y fecha.
            </p>
          </div>
          <a href="https://wa.me/5493426261318?text=Hola!%20Quiero%20consultarles%20por%20sus%20viajes!"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: ACCENT, color: "#fff", fontFamily: FF, fontSize: "14px", fontWeight: 600, padding: "14px 28px", borderRadius: "3px", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0, transition: "background-color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = ACCENT_DARK)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = ACCENT)}>
            Consultar viaje a medida
          </a>
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .results-grid { grid-template-columns: 1fr !important; }
        }
        .filter-bar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

// ── Package Card ──────────────────────────────────────────────────────────────
function PackageCard({ pkg }: { pkg: Package }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={`/paquete/${pkg.id}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{ backgroundColor: "#fff", border: "1px solid #E8E8E4", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", transition: "box-shadow 0.25s, transform 0.25s", boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.11)" : "none", transform: hovered ? "translateY(-3px)" : "translateY(0)", height: "100%" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: "relative", height: "220px", flexShrink: 0, overflow: "hidden" }}>
          <img src={pkg.image} alt={pkg.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s", transform: hovered ? "scale(1.04)" : "scale(1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: ACCENT, color: "#fff", fontFamily: FF, fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "2px" }}>
            {pkg.tag}
          </div>
          <div style={{ position: "absolute", bottom: "12px", right: "12px", backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: FF, fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "100px", display: "flex", alignItems: "center", gap: "4px" }}>
            <Moon size={10} />{pkg.nights} noches
          </div>
          <div style={{ position: "absolute", bottom: "12px", left: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={11} color="rgba(255,255,255,0.8)" />
            <span style={{ fontFamily: FF, fontSize: "11px", color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{pkg.location}</span>
          </div>
        </div>

        <div style={{ padding: "20px 20px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: FF, fontSize: "18px", fontWeight: 700, color: "#111110", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "8px" }}>
            {pkg.name}
          </div>
          <p style={{ fontFamily: FF, fontSize: "13px", color: "#6B6B66", lineHeight: 1.6, margin: "0 0 14px", flex: 1 }}>
            {pkg.summary}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
            {pkg.chips.map((chip) => (
              <span key={chip} style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: FF, fontSize: "10px", fontWeight: 500, color: "#5A5A58", backgroundColor: "#F4F3EF", padding: "4px 9px", borderRadius: "100px" }}>
                {CHIP_ICONS[chip] ?? null}{chip}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px", borderTop: "1px solid #F0F0EA", paddingTop: "16px" }}>
            <div>
              <div style={{ fontFamily: FF, fontSize: "24px", fontWeight: 700, color: "#111110", letterSpacing: "-0.03em", lineHeight: 1 }}>{pkg.price}</div>
              <div style={{ fontFamily: FF, fontSize: "10px", color: "#9A9A94", marginTop: "3px" }}>{pkg.priceNote}</div>
            </div>
            <span style={{ fontFamily: FF, fontSize: "12px", fontWeight: 600, color: "#fff", backgroundColor: hovered ? ACCENT_DARK : ACCENT, padding: "10px 16px", borderRadius: "3px", display: "flex", alignItems: "center", gap: "6px", transition: "background-color 0.2s", flexShrink: 0 }}>
              Ver detalles <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
