export interface Principio {
  nombre: string;
  descripcion?: string;
  articulo?: string;
}

export interface Articulo {
  titulo: string;
  descripcion: string;
  icon: string;
  color?: string;
}

export interface Riesgo {
  tipo: "prohibido" | "alto";
  titulo: string;
  items: string[];
}

export interface Sector {
  id: string;
  nombre: string;
  descripcion: string;
  icon: string;
  color: string;
}

export interface Pregunta {
  id: string;
  categoria: string;
  texto: string;
  articulo: string;
  obligatoria: boolean;
}

export interface Respuesta {
  preguntaId: string;
  respuesta: string;
  observaciones?: string;
}