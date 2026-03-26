export interface Package {
  id: number;
  name: string;
  destination: string;
  location: string;
  tag: string;
  nights: number;
  transport: string;
  hotel: string;
  meals: string;
  price: string;
  priceNote: string;
  image: string;
  chips: string[];
  summary: string;
}

export const ALL_PACKAGES: Package[] = [
  // ── CÓRDOBA ──────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Villa Carlos Paz",
    destination: "Córdoba",
    location: "Córdoba, Argentina",
    tag: "Lago & aventura",
    nights: 4,
    transport: "Bus cama",
    hotel: "Hotel 3★ con desayuno",
    meals: "Desayuno incluido",
    price: "$189.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1601159484524-897bf2a3a63b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3Jkb2JhJTIwQXJnZW50aW5hJTIwc2llcnJhcyUyMGxha2UlMjByZXNvcnQlMjB0b3VyaXNtfGVufDF8fHx8MTc3NDQ2MjAxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    chips: ["Bus", "Hotel", "Desayuno"],
    summary: "Descansá a orillas del lago San Roque con actividades acuáticas, sierras y una animada vida nocturna. Ideal para parejas y familias.",
  },
  {
    id: 2,
    name: "Valle de Calamuchita",
    destination: "Córdoba",
    location: "Córdoba, Argentina",
    tag: "Naturaleza & relax",
    nights: 5,
    transport: "Bus cama",
    hotel: "Cabaña con cocina",
    meals: "Sin comidas",
    price: "$214.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1709674392764-5482159131e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNaW5hJTIwQ2xhdmVybyUyMHJpdmVyJTIwQXJnZW50aW5hJTIwc2NlbmljfGVufDF8fHx8MTc3NDQ0ODg4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    chips: ["Bus", "Cabaña"],
    summary: "Cabaña privada en plena naturaleza serrana. Río, cascadas, senderismo y total tranquilidad a pocos kilómetros de Villa General Belgrano.",
  },
  {
    id: 3,
    name: "Alta Gracia",
    destination: "Córdoba",
    location: "Córdoba, Argentina",
    tag: "Historia & cultura",
    nights: 3,
    transport: "Bus semidirecto",
    hotel: "Hotel 4★ con desayuno",
    meals: "Desayuno incluido",
    price: "$156.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1647286432641-1b7262ce4942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbmlhbCUyMHRvd24lMjBjaHVyY2glMjBoaXN0b3JpYyUyMGFyZ2VudGluYSUyMHRvdXJpc218ZW58MXx8fHwxNzc0NDQ4ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    chips: ["Bus", "Hotel", "Desayuno"],
    summary: "Explorá la estancia jesuítica y la ciudad natal del Che Guevara. Un destino cultural e histórico a solo 36 km de la capital cordobesa.",
  },
  // ── BRASIL ───────────────────────────────────────────────────────────
  {
    id: 4,
    name: "Río de Janeiro",
    destination: "Brasil",
    location: "Río de Janeiro, Brasil",
    tag: "Playa & cultura",
    nights: 7,
    transport: "Vuelo directo",
    hotel: "Hotel 4★ frente al mar",
    meals: "Desayuno incluido",
    price: "$890.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1566296942542-b15c4da81c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCcmF6aWwlMjBSaW8lMjBkZSUyMEphbmVpcm8lMjBiZWFjaCUyMGNhcm5pdmFsJTIwdHJvcGljYWx8ZW58MXx8fHwxNzc0NDUxMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    chips: ["Vuelo", "Hotel", "Desayuno"],
    summary: "Cristo Redentor, Ipanema, la Selva Tijuca y la magia del carnaval. Una semana en la ciudad maravilhosa con hotel frente al Atlántico.",
  },
  {
    id: 5,
    name: "Florianópolis",
    destination: "Brasil",
    location: "Santa Catarina, Brasil",
    tag: "Playas paradisíacas",
    nights: 6,
    transport: "Vuelo con escala",
    hotel: "Apart hotel 3★",
    meals: "Sin comidas",
    price: "$720.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1080&q=80",
    chips: ["Vuelo", "Hotel"],
    summary: "La isla de la magia: 42 playas, dunas, lagunas y surf de clase mundial. Apart hotel con cocina propia para mayor libertad y comodidad.",
  },
  // ── MENDOZA ───────────────────────────────────────────────────────────
  {
    id: 6,
    name: "Ciudad de Mendoza",
    destination: "Mendoza",
    location: "Mendoza, Argentina",
    tag: "Vino & montañas",
    nights: 4,
    transport: "Vuelo directo",
    hotel: "Hotel boutique 4★",
    meals: "Desayuno incluido",
    price: "$390.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1765574781828-72d66b29f531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZW5kb3phJTIwQXJnZW50aW5hJTIwdmluZXlhcmQlMjB3aW5lJTIwbW91bnRhaW5zfGVufDF8fHx8MTc3NDQ1MTE1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    chips: ["Vuelo", "Hotel", "Desayuno"],
    summary: "Bodegas boutique, el Aconcagua de fondo y una gastronomía de primer nivel. Mendoza es el destino perfecto para los amantes del vino y la montaña.",
  },
  {
    id: 7,
    name: "Mendoza & Bodegas",
    destination: "Mendoza",
    location: "Mendoza, Argentina",
    tag: "Tour enológico",
    nights: 5,
    transport: "Bus cama",
    hotel: "Hotel 3★ + tour bodegas",
    meals: "Desayuno incluido",
    price: "$310.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=1080&q=80",
    chips: ["Bus", "Hotel", "Desayuno", "Tour"],
    summary: "Recorrido guiado por las principales bodegas de Luján de Cuyo y Maipú, con degustación de malbec y almuerzo en viñedo incluido.",
  },
  // ── BARILOCHE ────────────────────────────────────────────────────────
  {
    id: 8,
    name: "San Carlos de Bariloche",
    destination: "Bariloche",
    location: "Río Negro, Argentina",
    tag: "Lagos & nieve",
    nights: 5,
    transport: "Vuelo directo",
    hotel: "Hotel 4★ con vista al lago",
    meals: "Media pensión",
    price: "$580.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1768777406446-643fc73cabc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYXJpbG9jaGUlMjBQYXRhZ29uaWElMjBsYWtlJTIwbW91bnRhaW5zJTIwc25vdyUyMEFyZ2VudGluYXxlbnwxfHx8fDE3NzQ0NTExNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    chips: ["Vuelo", "Hotel", "Comidas"],
    summary: "Lagos de aguas turquesas, montañas nevadas y el mejor chocolate del país. Hotel con vista directa al Nahuel Huapi y media pensión incluida.",
  },
  {
    id: 9,
    name: "Circuito Chico Bariloche",
    destination: "Bariloche",
    location: "Río Negro, Argentina",
    tag: "Trekking & naturaleza",
    nights: 4,
    transport: "Bus cama",
    hotel: "Cabaña con vista",
    meals: "Sin comidas",
    price: "$420.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1080&q=80",
    chips: ["Bus", "Cabaña"],
    summary: "El circuito más icónico de la Patagonia: Cerro Campanario, Bahía López y Puerto Blest. Cabaña privada con vistas panorámicas a la cordillera.",
  },
  // ── SALTA ─────────────────────────────────────────────────────────────
  {
    id: 10,
    name: "Salta & Jujuy",
    destination: "Salta",
    location: "Salta, Argentina",
    tag: "Cultura & paisajes",
    nights: 5,
    transport: "Vuelo directo",
    hotel: "Hotel colonial 4★",
    meals: "Desayuno incluido",
    price: "$460.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1647286433362-12120e6f3f38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYWx0YSUyMEFyZ2VudGluYSUyMGNvbG9uaWFsJTIwY2l0eSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3NDQ1MTE2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    chips: ["Vuelo", "Hotel", "Desayuno"],
    summary: "Quebrada de Humahuaca, Salinas Grandes y la arquitectura colonial del Cabildo. Un viaje de colores, cultura andina y gastronomía del norte.",
  },
  // ── MAR DEL PLATA ────────────────────────────────────────────────────
  {
    id: 11,
    name: "Mar del Plata",
    destination: "Mar del Plata",
    location: "Buenos Aires, Argentina",
    tag: "Playa & casino",
    nights: 4,
    transport: "Bus cama",
    hotel: "Apart hotel 3★ frente al mar",
    meals: "Sin comidas",
    price: "$198.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1766412976610-7e7e0f85a066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXIlMjBkZWwlMjBQbGF0YSUyMEFyZ2VudGluYSUyMGJlYWNoJTIwb2NlYW4lMjByZXNvcnR8ZW58MXx8fHwxNzc0NDUxMTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    chips: ["Bus", "Hotel"],
    summary: "La ciudad de las diagonales: playa, gastronomía de mariscos, casino y el puerto. Apart hotel a metros del mar con acceso directo a la playa.",
  },
  // ── IGUAZÚ ─────────────────────────────────────────────────────────────
  {
    id: 12,
    name: "Cataratas del Iguazú",
    destination: "Iguazú",
    location: "Misiones, Argentina",
    tag: "Naturaleza única",
    nights: 3,
    transport: "Vuelo directo",
    hotel: "Hotel 4★ frente a las cataratas",
    meals: "Desayuno incluido",
    price: "$510.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1560449841-6601310db367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJZ3VhenUlMjBGYWxscyUyMEFyZ2VudGluYSUyMHdhdGVyZmFsbCUyMGp1bmdsZXxlbnwxfHx8fDE3NzQ0NTExNjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    chips: ["Vuelo", "Hotel", "Desayuno"],
    summary: "Una de las siete maravillas naturales del mundo. Hotel premium dentro del parque nacional con acceso exclusivo a las pasarelas de la Garganta del Diablo.",
  },
  // ── USHUAIA ────────────────────────────────────────────────────────────
  {
    id: 13,
    name: "Ushuaia – Fin del Mundo",
    destination: "Ushuaia",
    location: "Tierra del Fuego, Argentina",
    tag: "Aventura extrema",
    nights: 5,
    transport: "Vuelo directo",
    hotel: "Hotel 4★ vista al canal",
    meals: "Media pensión",
    price: "$680.000",
    priceNote: "por persona",
    image:
      "https://images.unsplash.com/photo-1620145423438-efb8f276e248?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVc2h1YWlhJTIwVGllcnJhJTIwZGVsJTIwRnVlZ28lMjBBcmdlbnRpbmElMjBlbmQlMjBvZiUyMHdvcmxkfGVufDF8fHx8MTc3NDQ1MTE3MHww&ixlib=rb-4.1.0&q=80&w=1080",
    chips: ["Vuelo", "Hotel", "Comidas"],
    summary: "El fin del mundo como nunca lo viste: glaciares, el Parque Nacional Tierra del Fuego y el legendario tren del fin del mundo. Media pensión incluida.",
  },
];

export const POPULAR_DESTINATIONS = [
  "Córdoba",
  "Mendoza",
  "Brasil",
  "Bariloche",
  "Salta",
  "Mar del Plata",
  "Iguazú",
  "Ushuaia",
  "Buenos Aires",
  "El Calafate",
];