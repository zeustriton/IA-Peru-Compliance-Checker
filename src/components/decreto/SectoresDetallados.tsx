import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Building, Users, Target, Lightbulb, Heart, Shield, Globe, GraduationCap,
  CheckCircle, AlertTriangle, BookOpen, ExternalLink, Award, Settings,
  Eye, Lock, FileText
} from "lucide-react";
import { useState } from "react";
import { sectoresDetallados } from "./sectoresDetallados";

interface SectorDetalleCardProps {
  sector: typeof sectoresDetallados[0];
}

function SectorDetalleCard({ sector }: SectorDetalleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const iconMap = {
    "🏛️": <Building className="h-8 w-8" />,
    "💼": <Target className="h-8 w-8" />,
    "🎓": <GraduationCap className="h-8 w-8" />,
    "🏥": <Heart className="h-8 w-8" />,
    "🛡️": <Shield className="h-8 w-8" />,
    "🌍": <Globe className="h-8 w-8" />
  };

  const colorMap = {
    blue: "text-blue-600",
    green: "text-green-600", 
    purple: "text-purple-600",
    red: "text-red-600",
    orange: "text-orange-600",
    cyan: "text-cyan-600"
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <div className={`${colorMap[sector.color as keyof typeof colorMap]}`}>
            {iconMap[sector.icono as keyof typeof iconMap]}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl">{sector.nombre}</h3>
            <Badge variant="outline" className="mt-2">
              {sector.id.toUpperCase()}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {sector.descripcion}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Alcance */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Alcance de Aplicación:
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
              {sector.alcance}
            </p>
          </div>

          {/* Responsabilidades */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Responsabilidades Clave:
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {sector.responsabilidades.map((resp, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-green-800">{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Artículos Relevantes */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Artículos Relevantes:
            </h4>
            <div className="flex flex-wrap gap-2">
              {sector.articulosRelevantes.map((articulo, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {articulo}
                </Badge>
              ))}
            </div>
          </div>

          {/* Excepciones - Expandido */}
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <h4 className="font-semibold text-orange-900 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Excepciones y Consideraciones Especiales
              </h4>
              <span className="text-orange-700">
                {isExpanded ? "▲" : "▼"}
              </span>
            </button>
            {isExpanded && (
              <div className="mt-3 p-4 bg-orange-100 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800 leading-relaxed">
                  {sector.excepciones}
                </p>
              </div>
            )}
          </div>

          {/* Recursos Adicionales */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Recursos y Herramientas
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-blue-800">Herramientas Técnicas</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Plataformas de evaluación de sesgos</li>
                  <li>• Herramientas de auditoría algorítmica</li>
                  <li>• Frameworks de IA ética</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-blue-800">Capacitación</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Cursos especializados por sector</li>
                  <li>• Certificaciones internacionales</li>
                  <li>• Comunidades de práctica</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SectoresDetalladosGrid() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Sectores y Ámbitos de Aplicación Detallados
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Información completa sobre responsabilidades, alcances y requisitos específicos 
          para cada sector regulado por el Decreto Supremo N° 115-2025-PCM
        </p>
      </div>

      <div className="grid md:grid-cols-1 gap-8">
        {sectoresDetallados.map((sector, index) => (
          <SectorDetalleCard key={index} sector={sector} />
        ))}
      </div>

      {/* Tarifa de Referencia Rápida */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Matriz de Cumplimiento por Sector
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Sector</th>
                  <th className="text-left p-2">Nivel de Exigencia</th>
                  <th className="text-left p-2">Supervisión Principal</th>
                  <th className="text-left p-2">Plazos de Implementación</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Público</td>
                  <td className="p-2"><Badge className="bg-red-100 text-red-800">Alta</Badge></td>
                  <td className="p-2">SGTD/PCM</td>
                  <td className="p-2">Inmediato</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Privado</td>
                  <td className="p-2"><Badge className="bg-orange-100 text-orange-800">Media-Alta</Badge></td>
                  <td className="p-2">Autorregulación + SGTD</td>
                  <td className="p-2">6-12 meses</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Academia</td>
                  <td className="p-2"><Badge className="bg-yellow-100 text-yellow-800">Media</Badge></td>
                  <td className="p-2">CONCYTEC + Instituciones</td>
                  <td className="p-2">12 meses</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Salud</td>
                  <td className="p-2"><Badge className="bg-red-100 text-red-800">Alta</Badge></td>
                  <td className="p-2">MINSA + SGTD</td>
                  <td className="p-2">3-6 meses</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Defensa</td>
                  <td className="p-2"><Badge className="bg-orange-100 text-orange-800">Media-Alta</Badge></td>
                  <td className="p-2">MINDEF + SGTD</td>
                  <td className="p-2">6 meses</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Sociedad Civil</td>
                  <td className="p-2"><Badge className="bg-green-100 text-green-800">Baja-Media</Badge></td>
                  <td className="p-2">Autorregulación</td>
                  <td className="p-2">12-18 meses</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}