import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  AlertTriangle, 
  Shield, 
  XCircle,
  CheckCircle,
  Eye,
  Lock,
  Users,
  Target,
  Building,
  Heart,
  Brain,
  FileText,
  Info,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { riesgosDetallados } from "./riesgosDetallados";

interface RiesgoDetalleCardProps {
  riesgo: typeof riesgosDetallados[0];
}

function RiesgoDetalleCard({ riesgo }: RiesgoDetalleCardProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const isProhibido = riesgo.tipo === "prohibido";

  return (
    <Card className={`${isProhibido ? "border-red-200 bg-red-50" : "border-orange-200 bg-orange-50"} shadow-lg`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-3 ${isProhibido ? "text-red-700" : "text-orange-700"}`}>
          {isProhibido ? (
            <XCircle className="h-6 w-6" />
          ) : (
            <Shield className="h-6 w-6" />
          )}
          <div>
            <h3 className="text-xl">{riesgo.titulo}</h3>
            <Badge variant="outline" className="mt-2">
              {riesgo.articulo}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription className="text-base">
          {riesgo.descripcion}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {isProhibido ? (
              <XCircle className="h-5 w-5 text-red-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            )}
            <span className={`font-semibold ${isProhibido ? "text-red-700" : "text-orange-700"}`}>
              {isProhibido ? "USO COMPLETAMENTE PROHIBIDO" : "USO CON RESTRICCIONES Y CONTROLES"}
            </span>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Categorías Específicas:
            </h4>
            <div className="space-y-3">
              {riesgo.items.map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {isProhibido ? (
                        <XCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                      <span className="font-medium text-sm">{item.titulo}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {expandedItems.has(index) ? "▲" : "▼"}
                    </span>
                  </button>
                  {expandedItems.has(index) && (
                    <div className="px-3 pb-3 pt-0">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {item.descripcion}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {riesgo.excepciones && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Excepciones y Consideraciones:
              </h4>
              <p className="text-sm text-blue-800">
                {riesgo.excepciones}
              </p>
            </div>
          )}

          {riesgo.requisitos && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Requisitos Obligatorios:
              </h4>
              <p className="text-sm text-green-800">
                {riesgo.requisitos}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function RiesgosDetalladosGrid() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Clasificación Detallada de Riesgos
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Análisis completo de las categorías de riesgo establecidas en el reglamento 
          para el uso de sistemas basados en Inteligencia Artificial
        </p>
      </div>

      <div className="grid md:grid-cols-1 gap-8">
        {riesgosDetallados.map((riesgo, index) => (
          <RiesgoDetalleCard key={index} riesgo={riesgo} />
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <ExternalLink className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Evaluación de Riesgos Obligatoria
              </h3>
              <p className="text-blue-800 mb-4">
                Todo desarrollador o implementador que considere necesario puede solicitar 
                a la SGTD una consulta para determinar si el sistema basado en IA 
                se encuentra dentro de los supuestos de uso indebido o riesgo alto.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Para Consulta</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Descripción técnica del sistema</li>
                    <li>• Análisis de impacto en derechos</li>
                    <li>• Medidas de mitigación propuestas</li>
                    <li>• Plan de implementación</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Proceso de Evaluación</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Revisión técnica por expertos</li>
                    <li>• Análisis de impacto normativo</li>
                    <li>• Recomendaciones específicas</li>
                    <li>• Dictamen vinculante</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}