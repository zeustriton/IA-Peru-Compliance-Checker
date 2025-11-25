import { 
  BookOpen, 
  Users, 
  Target, 
  Lightbulb,
  AlertTriangle,
  Shield,
  Heart,
  Building,
  GraduationCap,
  Globe
} from "lucide-react";

export const principiosData = [
  {
    nombre: "No discriminación",
    descripcion: "Implementar medidas para prevenir, mitigar y corregir resultados discriminatorios o sesgados",
    articulo: "Artículo 7 - No discriminación"
  },
  {
    nombre: "Privacidad de datos personales",
    descripcion: "Respeto irrestricto a la privacidad y protección de datos personales en el desarrollo y uso de IA",
    articulo: "Artículo 7 - Privacidad de datos personales"
  },
  {
    nombre: "Protección de derechos fundamentales",
    descripcion: "Garantizar el respeto y protección de los derechos fundamentales en sistemas basados en IA",
    articulo: "Artículo 7 - Protección de derechos fundamentales"
  },
  {
    nombre: "Respeto del derecho de autor",
    descripcion: "Respetar los derechos de autor y derechos conexos en las fases de desarrollo e implementación",
    articulo: "Artículo 7 - Respeto del derecho de autor"
  },
  {
    nombre: "Seguridad, proporcionalidad y fiabilidad",
    descripcion: "Los sistemas de IA deben ser fiables y seguros durante todo su ciclo de vida",
    articulo: "Artículo 7 - Seguridad, proporcionalidad y fiabilidad"
  },
  {
    nombre: "Sensibilización y educación en IA",
    descripcion: "Promover la alfabetización digital y el desarrollo de habilidades relacionadas con IA",
    articulo: "Artículo 7 - Sensibilización y educación en IA"
  },
  {
    nombre: "Sostenibilidad",
    descripcion: "Analizar y evaluar las repercusiones humanas, sociales, económicas y ambientales",
    articulo: "Artículo 7 - Sostenibilidad"
  },
  {
    nombre: "Supervisión Humana",
    descripcion: "Los sistemas de IA deben estar sujetos a supervisión humana adecuada",
    articulo: "Artículo 7 - Supervisión Humana"
  },
  {
    nombre: "Transparencia",
    descripcion: "Los sistemas de IA deben ser claros, explicables y accesibles para los usuarios",
    articulo: "Artículo 7 - Transparencia"
  },
  {
    nombre: "Rendición de Cuentas",
    descripcion: "Los actores involucrados asumen responsabilidad por sus acciones y decisiones",
    articulo: "Artículo 7 - Rendición de Cuentas"
  },
  {
    nombre: "Desarrollo ético para una IA responsable",
    descripcion: "Promover un enfoque ético que garantice el respeto de los derechos humanos",
    articulo: "Artículo 7 - Desarrollo ético"
  },
  {
    nombre: "Estándares de seguridad basados en riesgos",
    descripcion: "Comprensión profunda de los riesgos específicos y sus implicancias",
    articulo: "Artículo 7 - Estándares de seguridad"
  }
];

export const articulosData = [
  {
    titulo: "Título I",
    descripcion: "Disposiciones Generales (Arts. 1-7)",
    icon: "BookOpen"
  },
  {
    titulo: "Título II",
    descripcion: "Gobernanza para el Desarrollo y Uso de IA (Arts. 8-12)",
    icon: "Users"
  },
  {
    titulo: "Título III",
    descripcion: "Formación de Capacidades y Desarrollo Innovador (Arts. 13-16)",
    icon: "Lightbulb"
  },
  {
    titulo: "Título IV",
    descripcion: "Financiamiento, Incentivos y Medidas Proactivas (Arts. 17-21)",
    icon: "Target"
  },
  {
    titulo: "Título V",
    descripcion: "Riesgos, Transparencia y Privacidad (Arts. 22-25)",
    icon: "AlertTriangle"
  }
];

export const riesgosData = [
  {
    tipo: "prohibido" as const,
    titulo: "Uso Indebido (Prohibido)",
    items: [
      "Influencia engañosa o manipulativa",
      "Capacidad letal autónoma",
      "Vigilancia masiva sin base legal",
      "Análisis de datos sensibles con fines discriminatorios",
      "Identificación biométrica en tiempo real",
      "Predicción criminal basada en perfiles"
    ]
  },
  {
    tipo: "alto" as const,
    titulo: "Riesgo Alto (Regulado)",
    items: [
      "Gestión de activos críticos nacionales",
      "Evaluación educativa de NNA",
      "Procesos de selección y contratación",
      "Focalización de programas sociales",
      "Evaluación crediticia",
      "Acceso a servicios de salud"
    ]
  }
];

export const sectoresData = [
  {
    id: "publico",
    nombre: "Sector Público",
    descripcion: "Entidades gubernamentales y empresas del Estado",
    icon: "Building",
    color: "blue"
  },
  {
    id: "privado",
    nombre: "Sector Privado",
    descripcion: "Empresas y organizaciones comerciales",
    icon: "Target",
    color: "green"
  },
  {
    id: "academia",
    nombre: "Academia",
    descripcion: "Instituciones educativas y centros de investigación",
    icon: "GraduationCap",
    color: "purple"
  },
  {
    id: "salud",
    nombre: "Salud",
    descripcion: "Instituciones de salud y servicios médicos",
    icon: "Heart",
    color: "red"
  },
  {
    id: "defensa",
    nombre: "Defensa y Seguridad",
    descripcion: "Fuerzas armadas y policiales con excepciones",
    icon: "Shield",
    color: "orange"
  },
  {
    id: "sociedad",
    nombre: "Sociedad Civil",
    descripcion: "Organizaciones no gubernamentales y ciudadanos",
    icon: "Globe",
    color: "cyan"
  }
];