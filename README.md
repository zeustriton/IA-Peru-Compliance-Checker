# IA-Peru-Compliance-Checker

Herramienta profesional para evaluar el cumplimiento del Reglamento de Inteligencia Artificial del Perú, basada en el Decreto Supremo N° 115-2025-PCM y la Ley N° 31814.

## 🚀 Características

- **📋 Wizard Guiado**: Evaluación paso a paso del cumplimiento normativo
- **📊 Dashboard Analítico**: Visualización interactiva de resultados y tendencias
- **📄 PDF Viewer**: Consulta integrada del decreto y normativas
- **💾 Export System**: Múltiples formatos (PDF, Excel, JSON) para reportes
- **🎨 Design Moderno**: UI/UX profesional con animaciones fluidas
- **♿ Accesibilidad Total**: WCAG 2.1 AA compliant
- **🌓 Tema Claro/Oscuro**: Persistencia de preferencias
- **📱 Responsive Design**: Optimizado para todos los dispositivos
- **⚡ Performance Optimizado**: Lazy loading y code splitting

## 🏗️ Tecnologías

- **Frontend**: Next.js 15, TypeScript 5, Tailwind CSS 4
- **UI Components**: shadcn/ui con Framer Motion
- **Charts**: Recharts para visualizaciones interactivas
- **Icons**: Lucide React
- **Styling**: Sistema de diseño con tokens personalizados
- **Accessibility**: WCAG 2.1 AA compliance

## 📋 Contenido Basado en el Decreto

La aplicación está basada estrictamente en el contenido del PDF proporcionado:

- **Decreto Supremo N° 115-2025-PCM**: Reglamento de la Ley N° 31814
- **36 Artículos**: Evaluación detallada de cada artículo
- **12 Principios Rectores**: Verificación de cumplimiento ético
- **5 Sectores Regulados**: Análisis por sector específico
- **Clasificación de Riesgos**: Uso indebido y riesgo alto

## 🎯 Funcionalidades Principales

### Evaluación de Cumplimiento
- Formularios guiados para recolección de datos
- Validación en tiempo real
- Puntuación automática de cumplimiento
- Recomendaciones personalizadas

### Visualización y Análisis
- Dashboard con KPIs y métricas
- Gráficos interactivos de tendencias
- Análisis de brechas y áreas de mejora
- Reportes detallados por categoría

### Herramientas Adicionales
- Visor de PDF con navegación avanzada
- Sistema de exportación múltiple
- Búsqueda y filtrado de contenido
- Marcadores y notas personalizadas

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/TU_USERNAME/IA-Peru-Compliance-Checker.git
cd IA-Peru-Compliance-Checker

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Construir para producción
npm run build
```

### Variables de Entorno
```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Configurar variables necesarias
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📱 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

### Docker
```bash
# Construir imagen
docker build -t ia-compliance-checker .

# Ejecutar contenedor
docker run -p 3000:3000 ia-compliance-checker
```

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Ejecutar linting
npm run lint

# Ejecutar type checking
npm run type-check
```

## 📄 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js 15
│   ├── layout.tsx         # Layout principal con providers
│   ├── page.tsx           # Página principal
│   ├── metadata.ts         # Metadata para SEO
│   └── globals.css         # Estilos globales
├── components/
│   ├── ui/                 # Componentes UI shadcn/ui
│   ├── decreto/            # Componentes del reglamento
│   ├── checker/            # Componentes del evaluador
│   └── layout/             # Componentes del layout
├── lib/                   # Utilidades y helpers
├── hooks/                 # Hooks personalizados
└── types/                 # Definiciones TypeScript
```

## 🔧 Configuración

### Tailwind CSS
- Sistema de diseño con tokens personalizados
- Gradientes profesionales y animaciones
- Modo oscuro/claro con persistencia

### TypeScript
- Configuración estricta
- Tipado completo de componentes
- Validación de tipos en tiempo real

## 📊 Métricas y Monitorización

- **Performance**: Lighthouse score > 95
- **Accesibilidad**: WCAG 2.1 AA compliance
- **SEO**: Metadata completa y structured data
- **Bundle Size**: Optimizado para producción

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Realizar cambios con commits descriptivos
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT.

## 👥 Autor

**Roberto Puyó - Kepler Blacklock**
- LinkedIn: https://www.linkedin.com/in/robertopuyo/
- Especialista en Inteligencia Artificial y Cumplimiento Normativo

## 🙏 Agradecimientos

- Basado en el Decreto Supremo N° 115-2025-PCM
- Desarrollado con Next.js 15 y tecnologías modernas
- Diseñado siguiendo los más altos estándares de accesibilidad

---

⚠️ **CLÁUSULA DE EXENCIÓN DE RESPONSABILIDAD (DISCLAIMER):**

1. **Naturaleza Académica**: El presente desarrollo de software es un ejercicio de simulación teórica y análisis técnico, elaborado con fines estrictamente pedagógicos para ilustrar la aplicación de la normativa peruana en Inteligencia Artificial. No constituye una auditoría oficial, denuncia, ni dictamen vinculante sobre la gestión de las entidades mencionadas.

2. **Fuentes de Información (OSINT)**: Todo el análisis se fundamenta exclusiva y únicamente en información de acceso público (aplicaciones en tiendas oficiales, manuales de usuario, normativa vigente y estándares internacionales). No se ha utilizado, consultado ni revelado información confidencial, reservada o privilegiada derivada de vínculos laborales pasados o presentes del autor.

3. **Opinión Personal**: El código fuente, las opiniones, interpretaciones y conclusiones vertidas en este texto son a título estrictamente personal del autor en su capacidad de investigador independiente. No representan la postura oficial, visión ni políticas de mi actual empleador, ni de ninguna entidad del Estado Peruano.

**Autor: Kepler Blacklock**