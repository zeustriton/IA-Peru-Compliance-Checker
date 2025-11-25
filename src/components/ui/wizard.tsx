"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  Brain,
  Scale,
  Shield,
  Users,
  FileText,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface WizardComponentProps {
  steps: WizardStep[];
  onComplete: (data: any) => void;
  className?: string;
}

export function WizardComponent({ steps, onComplete, className }: WizardComponentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [wizardData, setWizardData] = useState<any>({});

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set(prev).add(currentStep));
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(wizardData);
    }
  }, [currentStep, steps.length, onComplete, wizardData]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleStepClick = useCallback((stepIndex: number) => {
    if (completedSteps.has(stepIndex) || stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  }, [completedSteps, currentStep]);

  const updateWizardData = useCallback((data: any) => {
    setWizardData(prev => ({ ...prev, ...data }));
  }, []);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Progress Header */}
      <Card className="mb-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Asistente de Evaluación</h2>
                <p className="text-gray-600">Paso {currentStep + 1} de {steps.length}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {Math.round(progress)}% Completado
            </Badge>
          </div>
          
          <Progress value={progress} className="h-3 mb-6" />
          
          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`flex-1 flex items-center justify-center p-3 rounded-lg transition-all duration-300 ${
                  index === currentStep
                    ? "bg-blue-100 text-blue-800 shadow-md"
                    : completedSteps.has(index)
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
                disabled={!completedSteps.has(index) && index > currentStep}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === currentStep
                      ? "bg-blue-600 text-white"
                      : completedSteps.has(index)
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}>
                    {completedSteps.has(index) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs opacity-75">{step.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  {steps[currentStep].icon}
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">
                    {steps[currentStep].title}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">
                    {steps[currentStep].description}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pb-8">
              {steps[currentStep].component}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <Card className="mt-8 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
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
            
            <div className="flex items-center space-x-4">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => handleStepClick(0)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Reiniciar
                </Button>
              )}
            </div>
            
            <Button
              onClick={handleNext}
              className="gradient-primary text-white flex items-center space-x-2"
            >
              <span>
                {currentStep === steps.length - 1 ? "Finalizar Evaluación" : "Siguiente"}
              </span>
              {currentStep === steps.length - 1 ? (
                <Check className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Predefined wizard steps for compliance checker
export const complianceWizardSteps: WizardStep[] = [
  {
    id: "basic-info",
    title: "Información Básica",
    description: "Datos generales de la organización",
    icon: <Users className="h-6 w-6 text-white" />,
    component: (
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">Información requerida</h4>
              <p className="text-blue-800 text-sm mt-1">
                Por favor, proporcione información básica sobre su organización para personalizar la evaluación.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Organización
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingrese el nombre"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sector de Actividad
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Seleccione un sector</option>
              <option value="public">Sector Público</option>
              <option value="private">Sector Privado</option>
              <option value="academic">Academia</option>
              <option value="ngo">ONG</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamaño de la Organización
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Seleccione el tamaño</option>
              <option value="small">Pequeña (1-50 empleados)</option>
              <option value="medium">Mediana (51-250 empleados)</option>
              <option value="large">Grande (251+ empleados)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uso Actual de IA
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Seleccione el nivel</option>
              <option value="none">Sin uso de IA</option>
              <option value="basic">Uso básico</option>
              <option value="intermediate">Uso intermedio</option>
              <option value="advanced">Uso avanzado</option>
            </select>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "principles",
    title: "Principios Rectores",
    description: "Evaluación de principios éticos",
    icon: <Scale className="h-6 w-6 text-white" />,
    component: (
      <div className="space-y-6">
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-start space-x-3">
            <Scale className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900">Principios Fundamentales</h4>
              <p className="text-purple-800 text-sm mt-1">
                Evalúe el cumplimiento de los 12 principios rectores establecidos en el reglamento.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {[
            "No discriminación",
            "Privacidad de datos personales",
            "Protección de derechos fundamentales",
            "Seguridad y fiabilidad",
            "Transparencia",
            "Rendición de cuentas"
          ].map((principle, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium text-sm">{index + 1}</span>
                </div>
                <span className="font-medium text-gray-900">{principle}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">No cumple</Button>
                <Button variant="outline" size="sm">Parcial</Button>
                <Button variant="outline" size="sm">Cumple</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "risks",
    title: "Análisis de Riesgos",
    description: "Identificación y evaluación de riesgos",
    icon: <Shield className="h-6 w-6 text-white" />,
    component: (
      <div className="space-y-6">
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900">Evaluación de Riesgos</h4>
              <p className="text-amber-800 text-sm mt-1">
                Identifique los riesgos asociados a sus sistemas de IA y evalúe su nivel de criticidad.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-red-200 bg-red-50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h5 className="font-semibold text-red-900">Riesgo Alto</h5>
                <p className="text-red-700 text-sm">Requiere acción inmediata</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• Sistemas críticos de infraestructura</li>
              <li>• Procesos de selección de personal</li>
              <li>• Evaluación crediticia</li>
            </ul>
          </Card>
          
          <Card className="p-6 border-amber-200 bg-amber-50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h5 className="font-semibold text-amber-900">Riesgo Medio</h5>
                <p className="text-amber-700 text-sm">Requiere monitoreo constante</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>• Sistemas de recomendación</li>
              <li>• Análisis de datos comerciales</li>
              <li>• Chatbots de servicio al cliente</li>
            </ul>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: "results",
    title: "Resultados y Recomendaciones",
    description: "Reporte final y plan de acción",
    icon: <FileText className="h-6 w-6 text-white" />,
    component: (
      <div className="space-y-6">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <Check className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900">Evaluación Completada</h4>
              <p className="text-green-800 text-sm mt-1">
                Su evaluación ha sido procesada. A continuación se presentan los resultados y recomendaciones.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">78%</div>
            <div className="text-sm text-gray-600">Nivel de Cumplimiento</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Principios Evaluados</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">5</div>
            <div className="text-sm text-gray-600">Recomendaciones Clave</div>
          </Card>
        </div>
        
        <Card className="p-6">
          <h5 className="font-semibold text-gray-900 mb-4">Próximos Pasos</h5>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-xs">1</span>
              </div>
              <span className="text-gray-700">Implementar políticas de privacidad de datos</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-xs">2</span>
              </div>
              <span className="text-gray-700">Establecer mecanismos de supervisión humana</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-xs">3</span>
              </div>
              <span className="text-gray-700">Documentar procesos de toma de decisiones</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }
];