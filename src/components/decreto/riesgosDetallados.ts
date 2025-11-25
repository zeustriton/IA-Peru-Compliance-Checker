export const riesgosDetallados = [
  {
    tipo: "prohibido" as const,
    titulo: "Uso Indebido (Prohibido)",
    descripcion: "Sistemas de IA cuyo uso está completamente prohibido por representar un riesgo inaceptable para los derechos fundamentales y el bienestar de las personas.",
    articulo: "Artículo 23",
    items: [
      {
        titulo: "Influencia engañosa o manipulativa",
        descripcion: "Usar técnicas subliminales o deliberadamente engañosas que afecten la capacidad de decisión de una persona de manera consciente e informada, aprovechando vulnerabilidades cognitivas, emocionales o socioeconómicas."
      },
      {
        titulo: "Capacidad letal autónoma",
        descripcion: "Sistemas que pueden tomar decisiones sin supervisión humana y generar daño físico o afectar la vida e integridad de personas en el ámbito civil."
      },
      {
        titulo: "Vigilancia masiva sin base legal",
        descripcion: "Sistemas de vigilancia que no cuentan con fundamentación legal o que generan impacto desproporcionado en el ejercicio de derechos fundamentales."
      },
      {
        titulo: "Análisis de datos sensibles discriminatorio",
        descripcion: "Analizar, clasificar o inferir datos biométricos para deducir origen racial, opiniones políticas, afiliación sindical, convicciones religiosas, vida sexual u orientación sexual con fines discriminatorios."
      },
      {
        titulo: "Identificación biométrica en tiempo real",
        descripcion: "Realizar identificación biométrica para categorización de personas en espacios públicos, salvo: verificación biométrica para autenticación de identidad digital o investigación preliminar de delitos graves."
      },
      {
        titulo: "Predicción criminal basada en perfiles",
        descripcion: "Predecir que una persona física cometerá un delito basándose en la elaboración de perfiles o evaluación de rasgos de personalidad."
      }
    ],
    excepciones: "Los sistemas utilizados para apoyar la evaluación humana sobre implicación criminal no se consideran indebidos si se basan en hechos objetivos verificables directamente relacionados con actividad delictiva existente y cuentan con mecanismos de supervisión humana, transparencia y auditabilidad."
  },
  {
    tipo: "alto" as const,
    titulo: "Riesgo Alto (Regulado)",
    descripcion: "Sistemas de IA que suponen un riesgo para la vida humana, dignidad, libertad y derechos fundamentales, pero pueden ser utilizados bajo condiciones y controles específicos.",
    articulo: "Artículo 24",
    items: [
      {
        titulo: "Gestión de activos críticos nacionales",
        descripcion: "Sistemas que gestionan infraestructura esencial como energía, telecomunicaciones, salud, transporte, agua y banca."
      },
      {
        titulo: "Evaluación educativa de NNA",
        descripcion: "Sistemas que realizan evaluación en procesos de niños, niñas y adolescentes en el sector educativo, incluyendo acceso a centros educativos, evaluación de resultados, identificación de comportamientos prohibidos."
      },
      {
        titulo: "Procesos de selección y contratación",
        descripcion: "Sistemas que determinan procesos de selección, evaluación, contratación y cese de trabajadores o postulantes, así como establecimiento de condiciones laborales."
      },
      {
        titulo: "Focalización de programas sociales",
        descripcion: "Sistemas que determinan acceso, evaluación, orden de priorización y/o cese de prestación de programas sociales y/o focalización de hogares."
      },
      {
        titulo: "Evaluación crediticia",
        descripcion: "Sistemas que determinan evaluación crediticia de personas, salvo cuando el uso es para detección de fraude financiero."
      },
      {
        titulo: "Acceso a servicios de salud",
        descripcion: "Sistemas que determinan acceso a servicios de salud y servicios complementarios que afectan la vida y bienestar de las personas."
      },
      {
        titulo: "Diagnóstico y manejo médico",
        descripcion: "Sistemas que orientan tamizaje, evaluación, sugerencia de diagnóstico, manejo o pronóstico del estado de salud que puedan tener impacto significativo en bienestar físico o mental."
      },
      {
        titulo: "Inferencia de emociones",
        descripcion: "Sistemas que infieren emociones de personas en entornos de trabajo y centros educativos, excepto cuando están destinados a instalación por motivos médicos o de seguridad."
      }
    ],
    requisitos: "Estos sistemas deben contar con medidas de seguridad, supervisión humana adecuada, transparencia algorítmica y mecanismos de rendición de cuentas para minimizar riesgos."
  }
];