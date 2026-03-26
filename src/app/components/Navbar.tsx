import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import logoImg from "../../assets/logosv.png";

const FF = "'Satoshi', 'Inter', sans-serif";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "Destinos", href: "#destinos", to: null },
    { label: "Paquetes", href: null, to: "/resultados" },
    { label: "Sobre Nosotros", href: "#nosotros", to: null },
    { label: "Contacto", href: "#contacto", to: null },
  ];

  const linkStyle = (isScrolled: boolean) => ({
    fontFamily: FF,
    fontSize: "14px",
    fontWeight: 400,
    color: isScrolled ? "#3A3A38" : "#111110",
    textDecoration: "none",
    letterSpacing: "-0.01em",
    transition: "color 0.2s",
  });

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        backgroundColor: scrolled || menuOpen ? "rgba(250,250,248,0.98)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
        className="navbar-inner"
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={logoImg}
            alt="Solución Viajera"
            style={{
              height: "30px",
              width: "auto",
              display: "block",
            }}
          />
          <span
            style={{
              fontFamily: FF,
              fontSize: "14px",
              fontWeight: 700,
              color: "#8A8880",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
            className="navbar-brand-text"
          >
            Solución Viajera
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="navbar-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                style={linkStyle(scrolled)}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ec7616")}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = scrolled ? "#3A3A38" : "#111110")
                }
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href!}
                style={linkStyle(scrolled)}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ec7616")}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = scrolled ? "#3A3A38" : "#111110")
                }
              >
                {link.label}
              </a>
            )
          )}

          <a
            href="https://wa.me/5493426261318?text=Hola!%20Quiero%20consultarles%20por%20sus%20viajes!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: FF,
              fontSize: "13px",
              fontWeight: 600,
              color: "#FAFAF8",
              backgroundColor: "#ec7616",
              padding: "9px 22px",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "background-color 0.2s",
              borderRadius: "2px",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "#c95d0e")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "#ec7616")}
          >
            Consultar viaje
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#111110",
            padding: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="navbar-mobile-menu"
          style={{
            backgroundColor: "#FAFAF8",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            padding: "20px 24px 28px",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: FF,
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#111110",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    display: "block",
                  }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href!}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: FF,
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#111110",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    display: "block",
                  }}
                >
                  {link.label}
                </a>
              )
            )}
            <a
              href="https://wa.me/5493426261318?text=Hola!%20Quiero%20consultarles%20por%20sus%20viajes!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: FF,
                fontSize: "14px",
                fontWeight: 600,
                color: "#FAFAF8",
                backgroundColor: "#ec7616",
                padding: "14px 22px",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                borderRadius: "2px",
                display: "block",
                marginTop: "20px",
                textAlign: "center",
                transition: "background-color 0.2s",
              }}
            >
              Consultar viaje
            </a>
          </nav>
        </div>
      )}

      <style>{`
        .navbar-inner {
          padding: 0 40px;
          height: 72px;
        }
        .navbar-desktop {
          display: flex;
        }
        .navbar-mobile-toggle {
          display: none;
        }
        .navbar-mobile-menu {
          display: none;
        }
        @media (max-width: 767px) {
          .navbar-inner {
            padding: 0 20px;
            height: 64px;
          }
          .navbar-brand-text {
            display: none;
          }
          .navbar-desktop {
            display: none !important;
          }
          .navbar-mobile-toggle {
            display: flex !important;
          }
          .navbar-mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
