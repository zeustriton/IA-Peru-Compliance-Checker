"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  CheckSquare, 
  Users, 
  Shield, 
  Target, 
  Lightbulb,
  AlertTriangle,
  Scale,
  FileText,
  ArrowRight,
  Brain,
  Globe,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  BarChart3,
  Eye,
  Moon,
  Sun
} from "lucide-react";
import CheckerComponent from "@/components/checker/CheckerComponent";
import { 
  ArticulosDetalladosGrid, 
  PrincipiosDetalladosGrid, 
  RiesgosDetalladosGrid, 
  SectoresDetalladosGrid,
  DisclaimerComponent
} from "@/components/decreto";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [showChecker, setShowChecker] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll progress indicator
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChecker = () => {
    setShowChecker(true);
  };

  if (showChecker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50">
          <div 
            className="h-full gradient-primary transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Enhanced Header */}
        <header className="sticky top-0 z-40 glass border-b backdrop-blur-lg bg-white/80">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse-slow" />
                  <Brain className="relative h-9 w-9 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                    Checker de Cumplimiento IA
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">
                    Decreto Supremo N° 115-2025-PCM
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <ThemeToggle />
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowChecker(false)}
                  className="hover:bg-gray-100"
                >
                  Volver al Inicio
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        <div className="container mx-auto py-8">
          <CheckerComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50">
        <div 
          className="h-full gradient-primary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 glass border-b backdrop-blur-lg bg-white/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse-slow" />
                <Brain className="relative h-9 w-9 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                  Checker de Cumplimiento IA
                </h1>
                <p className="text-xs text-gray-600 font-medium">
                  Decreto Supremo N° 115-2025-PCM
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
                <ThemeToggle />
              
              <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 font-medium">
                Ley N° 31814
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="responsive-py px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full filter blur-3xl animate-float" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/10 rounded-full filter blur-3xl animate-float animation-delay-200" />
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-amber-400/10 rounded-full filter blur-3xl animate-float animation-delay-400" />
        </div>

        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 hover-lift">
              <Sparkles className="h-4 w-4" />
              <span>Herramienta Profesional de Cumplimiento</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-gradient-primary">Reglamento de</span>
              <br />
              <span className="text-gradient-accent">Inteligencia Artificial</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Evaluación integral del cumplimiento del Reglamento de la Ley N° 31814 que promueve el uso 
              de la inteligencia artificial en favor del desarrollo económico y social del país
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={scrollToChecker}
                size="lg"
                className="gradient-primary text-white px-8 py-4 text-lg font-medium hover-lift group"
              >
                Iniciar Evaluación de Cumplimiento
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-medium border-2 hover:bg-gray-50"
              >
                <Eye className="mr-2 h-5 w-5" />
                Ver Demostración
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift">
                <div className="text-3xl font-bold text-blue-600 mb-2">36</div>
                <div className="text-sm text-gray-600">Artículos</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift">
                <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Principios</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift">
                <div className="text-3xl font-bold text-amber-600 mb-2">5</div>
                <div className="text-sm text-gray-600">Sectores</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Cumplimiento</div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 p-1 rounded-xl h-auto">
              <TabsTrigger 
                value="inicio" 
                className="data-[state=active]:gradient-primary data-[state=active]:text-white text-gray-600 hover:text-gray-800 p-3 rounded-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center space-y-1">
                  <Brain className="h-5 w-5" />
                  <span className="text-xs font-medium">Inicio</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="articulos" 
                className="data-[state=active]:gradient-primary data-[state=active]:text-white text-gray-600 hover:text-gray-800 p-3 rounded-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center space-y-1">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs font-medium">Artículos</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="principios" 
                className="data-[state=active]:gradient-primary data-[state=active]:text-white text-gray-600 hover:text-gray-800 p-3 rounded-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center space-y-1">
                  <Scale className="h-5 w-5" />
                  <span className="text-xs font-medium">Principios</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="riesgos" 
                className="data-[state=active]:gradient-primary data-[state=active]:text-white text-gray-600 hover:text-gray-800 p-3 rounded-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center space-y-1">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-xs font-medium">Riesgos</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="sectores" 
                className="data-[state=active]:gradient-primary data-[state=active]:text-white text-gray-600 hover:text-gray-800 p-3 rounded-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center space-y-1">
                  <Users className="h-5 w-5" />
                  <span className="text-xs font-medium">Sectores</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inicio" className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="group hover:shadow-2xl transition-all duration-500 hover-lift border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Objeto del Reglamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      Establecer disposiciones para el desarrollo, implementación y uso de sistemas 
                      basados en Inteligencia Artificial de manera segura, ética, sostenible, 
                      transparente, replicable, responsable e inclusiva.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Alto impacto
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 hover-lift border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Ámbito de Aplicación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                        Entidades de Administración Pública
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                        Empresas del Estado (FONAFE)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                        Sector privado y sociedad civil
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                        Academia y ciudadanos
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-purple-600 text-sm font-medium">
                        <Globe className="h-4 w-4 mr-1" />
                        Alcance nacional
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-2xl transition-all duration-500 hover-lift border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Excepciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mr-2" />
                        Uso personal de IA
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mr-2" />
                        Defensa y seguridad nacional
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-amber-400 rounded-full mr-2" />
                        Con principios fundamentales
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-amber-600 text-sm font-medium">
                        <Zap className="h-4 w-4 mr-1" />
                        Aplicaciones específicas
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="articulos" className="space-y-8 animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  <span className="inline-flex items-center gap-3">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    Explora los Artículos del Reglamento
                  </span>
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Haz clic en cada artículo para ver el contenido completo y su aplicación práctica
                </p>
              </div>
              <ArticulosDetalladosGrid />
            </TabsContent>

            <TabsContent value="principios" className="space-y-8 animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  <span className="inline-flex items-center gap-3">
                    <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    Principios Rectores de IA
                  </span>
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Los 12 principios fundamentales con requisitos y ejemplos prácticos
                </p>
              </div>
              <PrincipiosDetalladosGrid />
            </TabsContent>

            <TabsContent value="riesgos" className="space-y-8 animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  <span className="inline-flex items-center gap-3">
                    <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    Clasificación de Riesgos
                  </span>
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Uso indebido (prohibido) y riesgo alto (regulado)
                </p>
              </div>
              <RiesgosDetalladosGrid />
            </TabsContent>

            <TabsContent value="sectores" className="space-y-8 animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  <span className="inline-flex items-center gap-3">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    Sectores Regulados
                  </span>
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Información específica por sector con responsabilidades y alcances
                </p>
              </div>
              <SectoresDetalladosGrid />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Separator className="my-16 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Enhanced Disclaimer Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
        <div className="container mx-auto">
          <DisclaimerComponent />
        </div>
      </section>

      {/* Enhanced Checker Section */}
      <section id="checker" className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="h-4 w-4" />
              <span>Herramienta Profesional</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="text-gradient-primary">Evaluador de Cumplimiento</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Responda las siguientes preguntas para evaluar el nivel de cumplimiento 
              de su organización con el Reglamento de Inteligencia Artificial del Perú
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="gradient-primary p-8 text-white">
                <CardTitle className="text-3xl text-center mb-4">
                  Iniciar Evaluación de Cumplimiento
                </CardTitle>
                <CardDescription className="text-blue-100 text-center text-lg">
                  La evaluación tomará aproximadamente 15-20 minutos y generará un reporte personalizado
                </CardDescription>
              </div>
              
              <CardContent className="p-10">
                <div className="space-y-10">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center group">
                      <div className="gradient-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <CheckSquare className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-gray-900">Preguntas Específicas</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Evaluación basada en los artículos y principios del reglamento con casos prácticos
                      </p>
                    </div>
                    
                    <div className="text-center group">
                      <div className="gradient-secondary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <BarChart3 className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-gray-900">Resultados Personalizados</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Hoja de ruta adaptada a su sector y nivel de cumplimiento con métricas claras
                      </p>
                    </div>
                    
                    <div className="text-center group">
                      <div className="gradient-accent w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Award className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-gray-900">Recomendaciones Prácticas</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Acciones concretas y priorizadas para lograr el cumplimiento normativo
                      </p>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-600">Proceso de Evaluación</span>
                      <span className="text-sm font-medium text-blue-600">100% Completo</span>
                    </div>
                    <Progress value={100} className="h-3" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg"
                      className="gradient-primary text-white px-12 py-5 text-lg font-semibold hover-lift group"
                      onClick={scrollToChecker}
                    >
                      Comenzar Evaluación
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="lg"
                      className="px-12 py-5 text-lg font-semibold border-2 hover:bg-gray-50"
                    >
                      <FileText className="mr-3 h-6 w-6" />
                      Ver Guía Rápida
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}