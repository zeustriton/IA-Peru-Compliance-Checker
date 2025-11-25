// Componentes reutilizables para el Decreto Supremo N° 115-2025-PCM
// Todos los componentes están diseñados para ser utilizados en diferentes secciones de la aplicación

export { InfoCard } from "./InfoCard";
export { PrincipiosGrid, PrincipioCard } from "./PrincipiosGrid";
export { ArticuloGrid, ArticuloCard } from "./ArticuloGrid";
export { RiesgoCard, RiesgosGrid } from "./RiesgosGrid";
export { SectorCard, SectoresGrid } from "./SectoresGrid";
export { ProgresoChecker, ProgresoSimple } from "./ProgresoChecker";

// Componentes detallados con contenido completo del decreto
export { ArticulosDetalladosGrid } from "./ArticulosDetallados";
export { PrincipiosDetalladosGrid } from "./PrincipiosDetallados";
export { RiesgosDetalladosGrid } from "./RiesgosDetallados";
export { SectoresDetalladosGrid } from "./SectoresDetallados";

// Componentes adicionales
export { DisclaimerComponent } from "./DisclaimerComponent";

// Mapa de iconos
export { iconMap } from "./iconMap";

// Tipos y interfaces para los componentes
export type { 
  Principio, 
  Articulo, 
  Riesgo, 
  Sector 
} from "./types";

// Datos por defecto para los componentes del decreto
export { 
  principiosData,
  articulosData,
  riesgosData,
  sectoresData
} from "./data";

// Datos detallados del decreto
export { articulosDetallados } from "./articulosDetallados";
export { riesgosDetallados } from "./riesgosDetallados";
export { sectoresDetallados } from "./sectoresDetallados";