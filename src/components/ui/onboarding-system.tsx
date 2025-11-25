"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Brain,
  FileText,
  BarChart3,
  Users,
  Settings,
  Lightbulb,
  ArrowRight,
  Play,
  Skip,
  Target,
  Shield,
  Eye,
  Zap,
  Award,
  BookOpen,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibility } from "@/components/providers/accessibility-provider";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  action?: () => void;
  actionText?: string;
  tips?: string[];
  interactive?: boolean;
}

interface OnboardingSystemProps {
  onComplete?: () => void;
  skipOnboarding?: boolean;
  className?: string;
}

export function OnboardingSystem({ 
  onComplete, 
  skipOnboarding = false, 
  className 
}: OnboardingSystemProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>({});
  const [isMinimized, setIsMinimized] = useState(false);
  const { announceToScreenReader, trapFocus, releaseFocus } = useAccessibility();

  const onboardingSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Bienvenido al Checker de Cumplimiento IA",
      description: "Su herramienta profesional para evaluar el cumplimiento del Reglamento de Inteligencia Artificial del Perú",
      icon: <Brain className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Comencemos su evaluación!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              En pocos minutos, evaluaremos el cumplimiento de su organización 
              con el Decreto Supremo N° 115-2025-PCM.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Preciso</h4>
              <p className="text-sm text-gray-600">Evaluación basada en la normativa vigente</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Seguro</h4>
              <p className="text-sm text-gray-600">Sus datos están protegidos y confidenciales</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Rápido</h4>
              <p className="text-sm text-gray-600">Resultados en menos de 5 minutos</p>
            </div>
          </div>
        </div>
      ),
      tips: [
        "Puede navegar usando las flechas del teclado",
        "Todos los campos son opcionales para comenzar",
        "Puede guardar su progreso y continuar más tarde"
      ]
    },
    {
      id: "features",
      title: "Características Principales",
      description: "Conozca las herramientas disponibles para su evaluación",
      icon: <Settings className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Wizard Guiado</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Asistente paso a paso para completar su evaluación
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dashboard Analítico</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Visualización interactiva de sus resultados
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Evaluación por Sectores</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Análisis específico según su sector de actividad
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Eye className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Visor de PDF</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Consulte el decreto directamente en la plataforma
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
      tips: [
        "Cada característica está diseñada para facilitar su evaluación",
        "Puede acceder a todas las herramientas desde el menú principal"
      ]
    },
    {
      id: "evaluation",
      title: "Proceso de Evaluación",
      description: "Cómo funciona nuestra metodología de evaluación",
      icon: <BarChart3 className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Información Básica</h4>
                <p className="text-sm text-gray-600">
                  Datos generales de su organización y contexto
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Evaluación de Principios</h4>
                <p className="text-sm text-gray-600">
                  Análisis de los 12 principios rectores del reglamento
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 font-bold">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Análisis de Riesgos</h4>
                <p className="text-sm text-gray-600">
                  Identificación y evaluación de riesgos asociados
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">4</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Resultados y Plan</h4>
                <p className="text-sm text-gray-600">
                  Reporte detallado y recomendaciones específicas
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Tip Importante</h4>
                <p className="text-blue-800 text-sm mt-1">
                  El proceso completo toma aproximadamente 15-20 minutos. 
                  Puede guardar su progreso en cualquier momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      tips: [
        "Sea honesto en sus respuestas para obtener resultados precisos",
        "No hay respuestas correctas o incorrectas, solo evaluación"
      ]
    },
    {
      id: "ready",
      title: "¿Listo para Comenzar?",
      description: "Inicie su evaluación de cumplimiento ahora mismo",
      icon: <Play className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Está listo para empezar!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Ha completado el tutorial. Ahora puede comenzar su evaluación 
              de cumplimiento con confianza.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Recursos</h4>
                <p className="text-sm text-gray-600">
                  Acceda a documentación y guías
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <HelpCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Ayuda</h4>
                <p className="text-sm text-gray-600">
                  Soporte técnico disponible 24/7
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
      action: () => {
        setIsCompleted(true);
        onComplete?.();
      },
      actionText: "Comenzar Evaluación",
      tips: [
        "Recuerde que puede volver a este tutorial en cualquier momento",
        "Su progreso se guardará automáticamente"
      ]
    }
  ];

  useEffect(() => {
    // Check if user has already completed onboarding
    const savedProgress = localStorage.getItem('onboarding-completed');
    if (savedProgress === 'true' || skipOnboarding) {
      setIsCompleted(true);
    }
  }, [skipOnboarding]);

  useEffect(() => {
    // Announce current step to screen readers
    const currentStepData = onboardingSteps[currentStep];
    announceToScreenReader(`Paso ${currentStep + 1} de ${onboardingSteps.length}: ${currentStepData.title}`);
  }, [currentStep, announceToScreenReader]);

  const handleNext = useCallback(() => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setUserProgress(prev => ({ ...prev, [onboardingSteps[currentStep].id]: true }));
    }
  }, [currentStep, onboardingSteps]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    setIsCompleted(true);
    localStorage.setItem('onboarding-completed', 'true');
    onComplete?.();
  }, [onComplete]);

  const handleComplete = useCallback(() => {
    setIsCompleted(true);
    localStorage.setItem('onboarding-completed', 'true');
    onComplete?.();
  }, [onComplete]);

  const currentStepData = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  if (isCompleted) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 ${className}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Onboarding Modal */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${isMinimized ? 'h-auto' : ''}`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    {currentStepData.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{currentStepData.title}</h2>
                    <p className="text-blue-100 text-sm">{currentStepData.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronLeft className={`h-4 w-4 transition-transform ${isMinimized ? 'rotate-90' : ''}`} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                    className="text-white hover:bg-white/20"
                  >
                    <Skip className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Paso {currentStep + 1} de {onboardingSteps.length}</span>
                  <span>{Math.round(progress)}% completado</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/30" />
              </div>
            </div>
            
            {/* Content */}
            <AnimatePresence mode="wait">
              {!isMinimized && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 max-h-[60vh] overflow-y-auto"
                >
                  {currentStepData.content}
                  
                  {/* Tips Section */}
                  {showTips && currentStepData.tips && (
                    <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-start space-x-3">
                        <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-900">Consejos útiles</h4>
                          <ul className="mt-2 space-y-1">
                            {currentStepData.tips?.map((tip, index) => (
                              <li key={index} className="text-sm text-amber-800 flex items-start">
                                <span className="mr-2">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Footer */}
            {!isMinimized && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Anterior</span>
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTips(!showTips)}
                      className="text-gray-600"
                    >
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {currentStepData.action ? (
                    <Button
                      onClick={currentStepData.action}
                      className="gradient-primary text-white flex items-center space-x-2"
                    >
                      <span>{currentStepData.actionText}</span>
                      <Play className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="gradient-primary text-white flex items-center space-x-2"
                    >
                      <span>Siguiente</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to trigger onboarding
export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const startOnboarding = useCallback(() => {
    setShowOnboarding(true);
  }, []);

  const completeOnboarding = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  return {
    showOnboarding,
    startOnboarding,
    completeOnboarding
  };
}