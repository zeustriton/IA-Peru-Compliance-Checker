"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Building,
  Users,
  GraduationCap,
  Shield,
  Heart,
  Target,
  FileText,
  ArrowRight
} from "lucide-react";

interface Pregunta {
  id: string;
  categoria: string;
  texto: string;
  articulo: string;
  obligatoria: boolean;
}

interface Respuesta {
  preguntaId: string;
  respuesta: string;
  observaciones?: string;
}

interface SectorInfo {
  id: string;
  nombre: string;
  descripcion: string;
  icon: React.ReactNode;
  color: string;
}

const sectores: SectorInfo[] = [
  {
    id: "publico",
    nombre: "Sector Público",
    descripcion: "Entidades de Administración Pública y empresas del Estado",
    icon: <Building className="h-6 w-6" />,
    color: "blue"
  },
  {
    id: "privado",
    nombre: "Sector Privado",
    descripcion: "Empresas y organizaciones comerciales",
    icon: <Target className="h-6 w-6" />,
    color: "green"
  },
  {
    id: "academia",
    nombre: "Academia",
    descripcion: "Instituciones educativas y centros de investigación",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "purple"
  },
  {
    id: "salud",
    nombre: "Salud",
    descripcion: "Instituciones de salud y servicios médicos",
    icon: <Heart className="h-6 w-6" />,
    color: "red"
  },
  {
    id: "defensa",
    nombre: "Defensa y Seguridad",
    descripcion: "Fuerzas armadas y policiales",
    icon: <Shield className="h-6 w-6" />,
    color: "orange"
  }
];

const preguntasBase: Pregunta[] = [
  // Título I - Disposiciones Generales
  {
    id: "p1",
    categoria: "Principios Fundamentales",
    texto: "¿Su organización garantiza el respeto de los derechos humanos en el desarrollo e implementación de sistemas de IA, priorizando el bienestar humano conforme a la Constitución Política del Perú?",
    articulo: "Artículo 7.c - Protección de derechos fundamentales: Se garantiza el respeto y protección de los derechos fundamentales en el desarrollo, implementación y uso de sistemas basados en IA, priorizando el bienestar humano conforme a la Constitución Política del Perú, las normas y tratados o acuerdos nacionales e internacionales.",
    obligatoria: true
  },
  {
    id: "p2",
    categoria: "Principios Fundamentales",
    texto: "¿Cuenta con medidas para prevenir, mitigar y corregir resultados discriminatorios o sesgados en sus sistemas de IA, evando cualquier forma de discriminación conforme a lo establecido en la Constitución?",
    articulo: "Artículo 7.a - No discriminación: En las fases del desarrollo, implementación y uso de un sistema basado en IA, se implementan medidas para prevenir, mitigar y corregir la generación, el reforzamiento o la perpetuación de resultados discriminatorios o sesgados. En consecuencia, se busca evitar cualquier forma de discriminación conforme lo establece la Constitución Política del Perú.",
    obligatoria: true
  },
  {
    id: "p3",
    categoria: "Principios Fundamentales",
    texto: "¿Implementa medidas técnicas, organizativas y legales para proteger la privacidad de datos personales en sus sistemas de IA, estableciendo medidas para preservar la seguridad y promover la transparencia?",
    articulo: "Artículo 7.b - Privacidad de datos personales: Es el respeto de manera irrestricta a la privacidad y la protección de datos personales en el desarrollo, implementación y uso de la IA, estableciendo medidas técnicas, organizativas y legales para preservar la seguridad de los datos personales, promover la transparencia de las condiciones del tratamiento de los datos personales y fortalecer la confianza digital.",
    obligatoria: true
  },
  {
    id: "p4",
    categoria: "Principios Fundamentales",
    texto: "¿Sus sistemas de IA son claros, explicables y accesibles, garantizando que los procesos, algoritmos y decisiones sean comprensibles para usuarios, implementadores y autoridades?",
    articulo: "Artículo 7.i - Transparencia: Los sistemas basados en IA, deben ser claros, explicables y accesibles, garantizando que los procesos, algoritmos y decisiones sean comprensibles para usuarios, implementadores, y autoridades. Esto incluye facilitar información sobre su funcionamiento, los datos utilizados, los criterios de decisión y los posibles sesgos, promoviendo la rendición de cuentas y la confianza pública.",
    obligatoria: true
  },
  {
    id: "p5",
    categoria: "Principios Fundamentales",
    texto: "¿Mantiene supervisión humana sobre las decisiones de sus sistemas de IA, asegurando que sus decisiones sean éticas, justas y respetuosas de los derechos fundamentales?",
    articulo: "Artículo 7.h - Supervisión Humana: Los sistemas basados en IA, deben estar sujetos a una supervisión humana, asegurando que sus decisiones sean éticas, justas y respetuosas de los derechos fundamentales, así como, garantizando la validación de la calidad de los datos utilizados para asegurar su precisión, integridad y representatividad. La intervención humana es necesaria para corregir, modificar o detener el funcionamiento de estos sistemas.",
    obligatoria: true
  },
  
  // Título II - Gobernanza
  {
    id: "p6",
    categoria: "Gobernanza",
    texto: "¿Su organización ha designado un responsable de la gobernanza de IA que pueda dirigir, evaluar y supervisar el uso y promoción del desarrollo de IA?",
    articulo: "Artículo 8 - Autoridad Nacional: Además de las acciones previstas en la Ley, son acciones de la PCM, a través de la SGTD, en su rol de Autoridad técnico-normativa a nivel nacional, responsable de dirigir, evaluar y supervisar el uso y la promoción del desarrollo de la IA, y las tecnologías emergentes, que incluye infraestructura basada en software, las siguientes: fomentar espacios de intercambio técnico, aprobar lineamientos, monitorear uso indebido, realizar seguimiento, promover intercambio, emitir opinión vinculante, supervisar cumplimiento, informar anualmente, brindar capacitación, articular con entidades, y desempeñar rol de punto de contacto nacional.",
    obligatoria: true
  },
  {
    id: "p7",
    categoria: "Gobernanza",
    texto: "¿Cuenta con un Comité de Gobierno y Transformación Digital (CGTD) o similar que lidere, dirija, evalúe y supervise los proyectos de sistemas basados en IA estratégicos?",
    articulo: "Artículo 9.3 - CGTD: Los Comités de Gobierno y Transformación Digital (CGTD) de las entidades de la Administración Pública son responsables de liderar, dirigir, evaluar y supervisar los proyectos de sistemas basados en IA estratégicos para la entidad, siguiendo lo dispuesto en el presente Reglamento y las normas vigentes en materia de gobierno y transformación digital, y otras complementarias que emita la SGTD de la PCM.",
    obligatoria: false
  },
  {
    id: "p8",
    categoria: "Gobernanza",
    texto: "¿Implementa estándares y buenas prácticas nacionales e internacionales aceptados para sistemas basados en IA, incluyendo gestión de datos, algoritmos y otros componentes?",
    articulo: "Artículo 20 - Estándares y buenas prácticas: 20.1 La SGTD promueve que los desarrolladores o implementadores de sistemas basados en IA, incorporen buenas prácticas, técnicas y estándares nacionales e internacionales aceptados y reconocidos por países y/o por organismos internacionales de normalización técnica que, sean referentes en la gestión de datos, algoritmos y otros componentes del sistema basado de IA. 20.2 La SGTD articula con el INACAL la aprobación de Normas Técnicas Peruanas que adopten estándares técnicos.",
    obligatoria: true
  },
  
  // Título III - Formación de Capacidades
  {
    id: "p9",
    categoria: "Capacidades",
    texto: "¿Su organización promueve la formación y capacitación en IA para su personal a través de cursos, programas, talleres y otras modalidades formativas?",
    articulo: "Artículo 13 - Formación de conocimientos y habilidades en IA: 13.1 La SGTD promueve y articula con las entidades de la Administración Pública, organizaciones de la sociedad civil, la academia y el sector privado, la identificación y provisión de cursos, programas, talleres y otras modalidades formativas para crear capacidades en IA, a través de la Plataforma Nacional de Talento Digital. 13.2 La SGTD articula con el Ministerio de Educación la promoción del uso responsable, ético, transparente e inclusivo de IA para desarrollo de las competencias estudiantiles.",
    obligatoria: false
  },
  {
    id: "p10",
    categoria: "Capacidades",
    texto: "¿Participa en comunidades de código abierto o redes de expertos en IA, promoviendo la creación y desarrollo de comunidades mediante desafíos de innovación y programas de mentoría?",
    articulo: "Artículo 21 - Fomento de comunidades de código abierto: 21.1 La SGTD, en articulación con el CONCYTEC, la academia y organizaciones del sector privado, fomenta la creación y desarrollo de comunidades o redes de desarrolladores de IA, de código abierto mediante desafíos de innovación, programas de mentoría, conferencias, encuentros, entre otros. 21.2 La SGTD promueve que los desarrolladores publiquen voluntariamente proyectos de código abierto que promuevan un entorno de innovación abierta y colaborativa.",
    obligatoria: false
  },
  
  // Título V - Riesgos
  {
    id: "p11",
    categoria: "Gestión de Riesgos",
    texto: "¿Ha evaluado si sus sistemas de IA podrían considerarse de uso indebido según el artículo 23, como influencia engañosa, capacidad letal autónoma, vigilancia masiva o análisis discriminatorio?",
    articulo: "Artículo 23 - Uso indebido de la IA: 23.1 Un sistema basado en IA, se considera de uso indebido, y por ende prohibido, cuando es destinado para: a) Influir de manera engañosa o manipulativa en la toma de decisiones de las personas; b) Generar capacidad letal autónoma; c) Realizar vigilancia masiva sin base legal; d) Analizar, clasificar o inferir datos sensibles de las personas para fines discriminatorios; e) Realizar identificación biométrica en tiempo real para categorización; f) Predecir que una persona física cometa un delito. 23.2 La SGTD establece mecanismos para monitorear el uso indebido.",
    obligatoria: true
  },
  {
    id: "p12",
    categoria: "Gestión de Riesgos",
    texto: "¿Sus sistemas de IA de alto riesgo cuentan con medidas de seguridad y supervisión adecuadas, como gestión de activos críticos, evaluación educativa de NNA o procesos de selección?",
    articulo: "Artículo 24 - Uso de sistemas de IA de riesgo alto: 24.1 El uso de un sistema basado en IA, se considera de riesgo alto cuando: a) Se usa para gestionar activos críticos nacionales que brindan soporte a servicios esenciales; b) Realizar evaluación en los procesos de niños, niñas y adolescentes; c) Determinar procesos de selección, evaluación, contratación y cese de trabajadores; d) Determinar acceso, evaluación y orden de priorización de programas sociales; e) Determinar evaluación crediticia; f) Determinar acceso a servicios de salud; g) Orienta tamizaje, evaluación o sugerencia de diagnóstico del estado de salud.",
    obligatoria: true
  },
  {
    id: "p13",
    categoria: "Gestión de Riesgos",
    texto: "¿Implementa mecanismos de transparencia algorítmica para sistemas de alto riesgo, informando al usuario sobre finalidad, funcionalidades principales y tipo de decisiones?",
    articulo: "Artículo 25 - Transparencia Algorítmica: 25.1 El desarrollador o implementador de un sistema basado en IA de riesgo alto debe establecer mecanismos para garantizar la transparencia algorítmica, permitiendo informar al usuario, de forma previa, clara y sencilla, sobre la finalidad o uso del sistema basado en IA, sus funcionalidades principales y el tipo de decisiones que puede tomar, con el objetivo de que el usuario comprenda cómo interactúa con él. 25.2 Entre los mecanismos se puede incluir etiquetado visible del sistema basado en IA.",
    obligatoria: true
  },
  {
    id: "p14",
    categoria: "Gestión de Riesgos",
    texto: "¿Etiqueta claramente los contenidos o servicios generados por IA, informando a los usuarios con antelación que el producto o servicio se opera con base a IA?",
    articulo: "Artículo 25.2 - Etiquetado visible: Entre los mecanismos se puede incluir, cuando sea relevante para la toma de decisión o interacción con el usuario, el etiquetado visible del sistema basado en IA, que informe a los usuarios con antelación, que el producto, servicio o contenido generado se opera con base a IA; salvo los casos en que la IA apoye procesos administrativos internos sin impacto directo en la toma de decisiones que afecten derechos o servicios a las personas.",
    obligatoria: true
  },
  
  // Protección de Grupos Vulnerables
  {
    id: "p15",
    categoria: "Protección",
    texto: "¿Sus sistemas de IA consideran plenamente las necesidades diferenciadas de mujeres, niñas, niños, adolescentes, adultos mayores, personas con discapacidad y grupos en situación de especial vulnerabilidad?",
    articulo: "Artículo 12 - Protección de Grupos Vulnerables en el desarrollo y uso de IA: Todos los servicios digitales soportados en sistemas basados en IA, deben considerar plenamente las necesidades diferenciadas de mujeres, niñas, niños y adolescentes, adultos mayores, personas con discapacidad y grupos en situación de especial vulnerabilidad, garantizando que estos sean seguros, sostenibles, estables e inclusivos digitalmente.",
    obligatoria: true
  }
];

export default function CheckerComponent() {
  const [paso, setPaso] = useState(0);
  const [sectorSeleccionado, setSectorSeleccionado] = useState<string>("");
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const preguntasFiltradas = sectorSeleccionado 
    ? preguntasBase.filter(p => {
        // Todas las preguntas aplican a todos los sectores, pero algunas son más relevantes
        return true;
      })
    : [];

  const progreso = preguntasFiltradas.length > 0 
    ? (Object.keys(respuestas).length / preguntasFiltradas.length) * 100 
    : 0;

  const handleRespuesta = (preguntaId: string, respuesta: string) => {
    setRespuestas(prev => ({
      ...prev,
      [preguntaId]: respuesta
    }));
  };

  const siguientePaso = () => {
    if (paso === 0 && !sectorSeleccionado) return;
    if (paso < preguntasFiltradas.length) {
      setPaso(paso + 1);
    } else {
      setShowResults(true);
    }
  };

  const pasoAnterior = () => {
    if (paso > 0) {
      setPaso(paso - 1);
    }
  };

  const calcularResultados = () => {
    const total = preguntasFiltradas.length;
    const respondidas = Object.keys(respuestas).length;
    const afirmativas = Object.values(respuestas).filter(r => r === "si").length;
    const negativas = Object.values(respuestas).filter(r => r === "no").length;
    const noAplica = Object.values(respuestas).filter(r => r === "no_aplica").length;
    
    const porcentajeCumplimiento = respondidas > 0 ? (afirmativas / respondidas) * 100 : 0;
    
    return {
      total,
      respondidas,
      afirmativas,
      negativas,
      noAplica,
      porcentajeCumplimiento
    };
  };

  const generarHojaRuta = () => {
    const resultados = calcularResultados();
    const recomendaciones: string[] = [];
    
    if (resultados.porcentajeCumplimiento < 30) {
      recomendaciones.push("URGENTE: Implementar un programa integral de cumplimiento normativo en IA");
      recomendaciones.push("Designar un responsable de gobernanza de IA de inmediato");
      recomendaciones.push("Realizar una evaluación completa de todos los sistemas de IA existentes");
    } else if (resultados.porcentajeCumplimiento < 60) {
      recomendaciones.push("Desarrollar políticas y procedimientos formales para IA");
      recomendaciones.push("Implementar programas de capacitación en IA y ética");
      recomendaciones.push("Establecer mecanismos de supervisión humana");
    } else if (resultados.porcentajeCumplimiento < 80) {
      recomendaciones.push("Fortalecer las medidas de transparencia y explicabilidad");
      recomendaciones.push("Implementar auditorías periódicas de sesgos algorítmicos");
      recomendaciones.push("Participar en comunidades de buenas prácticas");
    } else {
      recomendaciones.push("Mantener y mejorar las prácticas actuales");
      recomendaciones.push("Compartir buenas prácticas con otras organizaciones");
      recomendaciones.push("Considerar certificaciones internacionales");
    }
    
    // Recomendaciones específicas según sector
    if (sectorSeleccionado === "publico") {
      recomendaciones.push("Coordinar con la Secretaría de Gobierno y Transformación Digital (SGTD)");
      recomendaciones.push("Implementar el Marco de Gobierno Digital");
    } else if (sectorSeleccionado === "privado") {
      recomendaciones.push("Adoptar estándares internacionales como ISO/IEC 38507");
      recomendaciones.push("Considerar certificaciones de ética en IA");
    } else if (sectorSeleccionado === "salud") {
      recomendaciones.push("Cumplir con regulaciones específicas de datos de salud");
      recomendaciones.push("Implementar validación clínica para sistemas de IA médica");
    }
    
    return recomendaciones;
  };

  if (showResults) {
    const resultados = calcularResultados();
    const hojaRuta = generarHojaRuta();
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
            <CardTitle className="text-2xl">
              Resultados de la Evaluación
            </CardTitle>
            <CardDescription className="text-blue-100">
              Análisis de cumplimiento del Decreto Supremo N° 115-2025-PCM
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Resumen de Respuestas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total de preguntas:</span>
                      <span className="font-semibold">{resultados.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Respondidas:</span>
                      <span className="font-semibold">{resultados.respondidas}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Respuestas afirmativas:</span>
                      <span className="font-semibold">{resultados.afirmativas}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Respuestas negativas:</span>
                      <span className="font-semibold">{resultados.negativas}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>No aplica:</span>
                      <span className="font-semibold">{resultados.noAplica}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Nivel de Cumplimiento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {resultados.porcentajeCumplimiento.toFixed(1)}%
                    </div>
                    <Progress value={resultados.porcentajeCumplimiento} className="mb-4" />
                    <Badge 
                      variant={resultados.porcentajeCumplimiento >= 80 ? "default" : 
                               resultados.porcentajeCumplimiento >= 60 ? "secondary" : "destructive"}
                      className="text-sm px-3 py-1"
                    >
                      {resultados.porcentajeCumplimiento >= 80 ? "Alto" : 
                       resultados.porcentajeCumplimiento >= 60 ? "Medio" : "Bajo"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <ArrowRight className="h-6 w-6 text-green-600" />
                  Hoja de Ruta Recomendada
                </CardTitle>
                <CardDescription>
                  Acciones prioritarias para mejorar el cumplimiento normativo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hojaRuta.map((recomendacion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{recomendacion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowResults(false);
                  setPaso(0);
                  setSectorSeleccionado("");
                  setRespuestas({});
                }}
              >
                Nueva Evaluación
              </Button>
              <Button 
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Imprimir Resultados
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paso === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
            <CardTitle className="text-2xl">
              Evaluación de Cumplimiento - IA
            </CardTitle>
            <CardDescription className="text-blue-100">
              Seleccione su sector para comenzar la evaluación
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectores.map((sector) => (
                <Card 
                  key={sector.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    sectorSeleccionado === sector.id 
                      ? 'ring-2 ring-blue-600 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSectorSeleccionado(sector.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`text-${sector.color}-600 mb-3 flex justify-center`}>
                      {sector.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{sector.nombre}</h3>
                    <p className="text-sm text-gray-600">{sector.descripcion}</p>
                    {sectorSeleccionado === sector.id && (
                      <Badge className="mt-3 bg-blue-600">Seleccionado</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                size="lg"
                onClick={siguientePaso}
                disabled={!sectorSeleccionado}
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                Comenzar Evaluación
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const preguntaActual = preguntasFiltradas[paso - 1];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="text-sm">
              Pregunta {paso} de {preguntasFiltradas.length}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {preguntaActual.categoria}
            </Badge>
          </div>
          <Progress value={progreso} className="mb-4" />
          <CardTitle className="text-xl">
            {preguntaActual.texto}
          </CardTitle>
          <CardDescription>
            {preguntaActual.articulo}
            {preguntaActual.obligatoria && (
              <span className="text-red-600 ml-2">* Obligatoria</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <RadioGroup 
            value={respuestas[preguntaActual.id] || ""}
            onValueChange={(value) => handleRespuesta(preguntaActual.id, value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="si" id="si" />
              <Label htmlFor="si" className="flex items-center gap-2 cursor-pointer flex-1">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Sí</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="flex items-center gap-2 cursor-pointer flex-1">
                <XCircle className="h-5 w-5 text-red-600" />
                <span>No</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="no_aplica" id="no_aplica" />
              <Label htmlFor="no_aplica" className="flex items-center gap-2 cursor-pointer flex-1">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>No Aplica</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="otro" id="otro" />
              <Label htmlFor="otro" className="flex items-center gap-2 cursor-pointer flex-1">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Otro (Parcialmente/En progreso)</span>
              </Label>
            </div>
          </RadioGroup>

          <Separator className="my-6" />

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={pasoAnterior}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            
            <Button 
              onClick={siguientePaso}
              disabled={!respuestas[preguntaActual.id]}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              {paso === preguntasFiltradas.length ? "Ver Resultados" : "Siguiente"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}