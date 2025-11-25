import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Scale, 
  Shield, 
  AlertTriangle,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Lock,
  Heart,
  Brain,
  Target,
  FileText,
  Award
} from "lucide-react";
import { useState } from "react";

interface PrincipioDetalle {
  nombre: string;
  descripcion: string;
  articulo: string;
  icon: React.ReactNode;
  color: string;
  requisitos?: string[];
  ejemplos?: string[];
}

const principiosDetallados: PrincipioDetalle[] = [
  {
    nombre: "No discriminación",
    descripcion: "En las fases del desarrollo, implementación y uso de un sistema basado en IA, se implementan medidas para prevenir, mitigar y corregir la generación, el reforzamiento o la perpetuación de resultados discriminatorios o sesgados.",
    articulo: "Artículo 7.a",
    icon: <Users className="h-5 w-5" />,
    color: "blue",
    requisitos: [
      "Análisis de sesgos en datos de entrenamiento",
      "Evaluación de impacto en grupos vulnerables",
      "Mecanismos de corrección algorítmica",
      "Auditorías periódicas de imparcialidad"
    ],
    ejemplos: [
      "Sistemas de contratación que evalúan candidatos sin sesgos de género o raza",
      "Plataformas de crédito que no discriminan por origen étnico",
      "Sistemas de reconocimiento facial equitativos para todos los tonos de piel"
    ]
  },
  {
    nombre: "Privacidad de datos personales",
    descripcion: "Es el respeto de manera irrestricta a la privacidad y la protección de datos personales en el desarrollo, implementación y uso de la IA, estableciendo medidas técnicas, organizativas y legales para preservar la seguridad de los datos personales.",
    articulo: "Artículo 7.b",
    icon: <Lock className="h-5 w-5" />,
    color: "purple",
    requisitos: [
      "Anonimización y minimización de datos",
      "Consentimiento informado para tratamiento de datos",
      "Medidas de seguridad criptográfica",
      "Políticas de retención y eliminación de datos"
    ],
    ejemplos: [
      "Asistentes de voz que procesan datos localmente",
      "Sistemas de salud con cifrado de información médica",
      "Plataformas educativas que protegen datos de estudiantes"
    ]
  },
  {
    nombre: "Protección de derechos fundamentales",
    descripcion: "Se garantiza el respeto y protección de los derechos fundamentales en el desarrollo, implementación y uso de sistemas basados en IA, priorizando el bienestar humano conforme a la Constitución Política del Perú.",
    articulo: "Artículo 7.c",
    icon: <Shield className="h-5 w-5" />,
    color: "green",
    requisitos: [
      "Evaluación de impacto en derechos humanos",
      "Mecanismos de apelación y revisión humana",
      "Transparencia en decisiones que afectan derechos",
      "Supervisión humana en decisiones críticas"
    ],
    ejemplos: [
      "Sistemas judiciales con revisión humana obligatoria",
      "Plataformas de contenido con protección de libertad de expresión",
      "Sistemas de vigilancia con autorización judicial"
    ]
  },
  {
    nombre: "Respeto del derecho de autor",
    descripcion: "En las fases del desarrollo, implementación y uso de un sistema basado en IA, se deben respetar los derechos de autor, tanto morales como patrimoniales, y de los creadores respecto de sus obras originales.",
    articulo: "Artículo 7.d",
    icon: <FileText className="h-5 w-5" />,
    color: "orange",
    requisitos: [
      "Verificación de licencias de entrenamiento",
      "Atribución adecuada de contenido generado",
      "Respeto a derechos de propiedad intelectual",
      "Mecanismos de detección de plagio"
    ],
    ejemplos: [
      "Sistemas de generación de imágenes con entrenamiento ético",
      "Plataformas de música que respetan derechos de autor",
      "Herramientas de escritura que citan fuentes originales"
    ]
  },
  {
    nombre: "Seguridad, proporcionalidad y fiabilidad",
    descripcion: "Los sistemas basados en IA deben ser fiables y seguros durante todo su desarrollo implementación y uso para que funcionen adecuadamente y minimicen los riesgos. La aplicación de salvaguardias debe ser proporcional al nivel de riesgo.",
    articulo: "Artículo 7.e",
    icon: <Shield className="h-5 w-5" />,
    color: "red",
    requisitos: [
      "Evaluación de riesgos y vulnerabilidades",
      "Pruebas de robustez y resistencia",
      "Mecanismos de fallback y recuperación",
      "Documentación de limitaciones y fallos"
    ],
    ejemplos: [
      "Sistemas médicos con diagnósticos de respaldo",
      "Vehículos autónomos con modos de seguridad",
      "Sistemas financieros con verificación humana"
    ]
  },
  {
    nombre: "Sensibilización y educación en IA",
    descripcion: "Se promueve la alfabetización digital y el desarrollo de habilidades relacionadas con el diseño, desarrollo, implementación y uso de sistemas basado en IA, así como la concienciación sobre su uso e impacto.",
    articulo: "Artículo 7.f",
    icon: <Brain className="h-5 w-5" />,
    color: "cyan",
    requisitos: [
      "Programas educativos en IA",
      "Capacitación continua del personal",
      "Divulgación pública sobre capacidades y límites",
      "Formación en ética de IA"
    ],
    ejemplos: [
      "Cursos de IA en currículos educativos",
      "Talleres para ciudadanos sobre uso seguro de IA",
      "Programas de capacitación empresarial en IA"
    ]
  },
  {
    nombre: "Sostenibilidad",
    descripcion: "Se analizan y evalúan de manera integral las repercusiones humanas, sociales, económicas, culturales y ambientales, asegurando que estén alineadas con los Objetivos de Desarrollo Sostenible.",
    articulo: "Artículo 7.g",
    icon: <Target className="h-5 w-5" />,
    color: "green",
    requisitos: [
      "Evaluación de impacto ambiental",
      "Optimización del consumo energético",
      "Análisis de impacto social y económico",
      "Contribución a ODS de la ONU"
    ],
    ejemplos: [
      "Datacenters con energía renovable",
      "Sistemas de IA para agricultura sostenible",
      "Plataformas que reducen huella de carbono"
    ]
  },
  {
    nombre: "Supervisión Humana",
    descripcion: "Los sistemas basados en IA deben estar sujetos a supervisión humana, asegurando que sus decisiones sean éticas, justas y respetuosas de los derechos fundamentales.",
    articulo: "Artículo 7.h",
    icon: <Eye className="h-5 w-5" />,
    color: "blue",
    requisitos: [
      "Interfaces de supervisión humana",
      "Capacidad de intervención y corrección",
      "Validación de calidad de datos",
      "Procedimientos de emergencia"
    ],
    ejemplos: [
      "Sistemas de trading con supervisión humana",
      "Plataformas de contenido con moderación humana",
      "Sistemas de diagnóstico con revisión médica"
    ]
  },
  {
    nombre: "Transparencia",
    descripcion: "Los sistemas basados en IA deben ser claros, explicables y accesibles, garantizando que los procesos, algoritmos y decisiones sean comprensibles para usuarios, implementadores y autoridades.",
    articulo: "Artículo 7.i",
    icon: <Eye className="h-5 w-5" />,
    color: "indigo",
    requisitos: [
      "Documentación técnica accesible",
      "Explicabilidad de decisiones",
      "Información sobre datos utilizados",
      "Mecanismos de auditoría"
    ],
    ejemplos: [
      "Sistemas de crédito que explican decisiones",
      "Plataformas de recomendación con transparencia",
      "Herramientas de IA con documentación abierta"
    ]
  },
  {
    nombre: "Rendición de Cuentas",
    descripcion: "Los actores involucrados en el desarrollo, implementación y uso de sistemas basados en IA asumen responsabilidad por sus acciones y decisiones, debiendo garantizar mecanismos que permitan identificar, evaluar y responder por los impactos generados.",
    articulo: "Artículo 7.j",
    icon: <Award className="h-5 w-5" />,
    color: "purple",
    requisitos: [
      "Asignación clara de responsabilidades",
      "Mecanismos de reclamación y reparación",
      "Auditorías externas independientes",
      "Reportes periódicos de impacto"
    ],
    ejemplos: [
      "Empresas con políticas de responsabilidad en IA",
      "Sistemas gubernamentales con rendición de cuentas",
      "Plataformas con canales de reclamación efectivos"
    ]
  },
  {
    nombre: "Desarrollo ético para una IA responsable",
    descripcion: "Se promueve un enfoque ético para definir que en el desarrollo, implementación y uso de los sistemas basado en IA se garantice el respeto de los derechos humanos, la dignidad y el bienestar colectivo.",
    articulo: "Artículo 7.k",
    icon: <Heart className="h-5 w-5" />,
    color: "pink",
    requisitos: [
      "Comités de ética de IA",
      "Evaluaciones de impacto ético",
      "Códigos de conducta para desarrolladores",
      "Consultas con partes interesadas"
    ],
    ejemplos: [
      "Laboratorios de IA con comités éticos",
      "Empresas con códigos éticos de IA",
      "Proyectos con evaluación de impacto social"
    ]
  },
  {
    nombre: "Estándares de seguridad basados en riesgos",
    descripcion: "Busca una comprensión profunda de los riesgos específicos y sus implicancias en el desarrollo, implementación y uso de los sistemas basados en IA, identificando amenazas, vulnerabilidades y posibles consecuencias negativas.",
    articulo: "Artículo 7.l",
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "orange",
    requisitos: [
      "Análisis detallado de riesgos",
      "Evaluación de probabilidad e impacto",
      "Medidas de mitigación específicas",
      "Planes de respuesta a incidentes"
    ],
    ejemplos: [
      "Sistemas de IA con evaluación de riesgos continua",
      "Plataformas con planes de respuesta a incidentes",
      "Herramientas con análisis de vulnerabilidades"
    ]
  }
];

interface PrincipioCardProps {
  principio: PrincipioDetalle;
  index: number;
}

function PrincipioCard({ principio, index }: PrincipioCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className={`text-${principio.color}-600`}>
            {principio.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg">{principio.nombre}</h3>
            <Badge variant="outline" className="mt-1 text-xs">
              {principio.articulo}
            </Badge>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? "Ver menos" : "Ver más"}
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed mb-4">
          {principio.descripcion}
        </p>
        
        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top duration-300">
            {principio.requisitos && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Requisitos Clave:
                </h4>
                <ul className="space-y-1">
                  {principio.requisitos.map((req, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {principio.ejemplos && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  Ejemplos Prácticos:
                </h4>
                <ul className="space-y-1">
                  {principio.ejemplos.map((ej, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      {ej}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function PrincipiosDetalladosGrid() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Principios Rectores Detallados
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Los 12 principios fundamentales que rigen el desarrollo, implementación y uso 
          de sistemas basados en Inteligencia Artificial en el Perú
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {principiosDetallados.map((principio, index) => (
          <PrincipioCard key={index} principio={principio} index={index} />
        ))}
      </div>
    </div>
  );
}