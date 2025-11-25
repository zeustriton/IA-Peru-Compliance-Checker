import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Users, 
  Target, 
  Lightbulb,
  AlertTriangle,
  Shield,
  Heart,
  Building,
  GraduationCap,
  Globe,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { articulosDetallados } from "./articulosDetallados";

interface ArticuloDetalleProps {
  articulo: {
    numero: string;
    contenido: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

function ArticuloDetalle({ articulo, isExpanded, onToggle }: ArticuloDetalleProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-sm">{articulo.numero}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-sm text-gray-700 leading-relaxed">{articulo.contenido}</p>
        </div>
      )}
    </div>
  );
}

interface TituloDetalladoProps {
  titulo: {
    titulo: string;
    descripcion: string;
    articulos: Array<{
      numero: string;
      contenido: string;
    }>;
  };
  index: number;
}

export function TituloDetallado({ titulo, index }: TituloDetalladoProps) {
  const [expandedArticles, setExpandedArticles] = useState<Set<number>>(new Set());

  const toggleArticle = (articleIndex: number) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(articleIndex)) {
      newExpanded.delete(articleIndex);
    } else {
      newExpanded.add(articleIndex);
    }
    setExpandedArticles(newExpanded);
  };

  const iconMap = [
    <BookOpen key="book-open" className="h-5 w-5 text-blue-600" />,
    <Users key="users" className="h-5 w-5 text-blue-600" />,
    <Lightbulb key="lightbulb" className="h-5 w-5 text-blue-600" />,
    <Target key="target" className="h-5 w-5 text-blue-600" />,
    <AlertTriangle key="alert-triangle" className="h-5 w-5 text-blue-600" />
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {iconMap[index]}
          {titulo.titulo}
        </CardTitle>
        <CardDescription className="text-base">
          {titulo.descripcion}
        </CardDescription>
        <Badge variant="outline" className="w-fit">
          {titulo.articulos.length} artículos
        </Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full">
          <div className="space-y-3 pr-4">
            {titulo.articulos.map((articulo, articuloIndex) => (
              <ArticuloDetalle
                key={articuloIndex}
                articulo={articulo}
                isExpanded={expandedArticles.has(articuloIndex)}
                onToggle={() => toggleArticle(articuloIndex)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export function ArticulosDetalladosGrid() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Artículos Detallados del Reglamento
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore el contenido completo del Decreto Supremo N° 115-2025-PCM con acceso detallado 
          a cada artículo y sus disposiciones específicas
        </p>
      </div>
      
      {articulosDetallados.map((titulo, index) => (
        <TituloDetallado key={index} titulo={titulo} index={index} />
      ))}
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <ExternalLink className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Consulta el Documento Oficial
              </h3>
              <p className="text-blue-800 mb-4">
                Para acceder al texto completo del Decreto Supremo N° 115-2025-PCM y 
                la Ley N° 31814, visite el portal oficial del Estado Peruano.
              </p>
              <Button 
                variant="outline" 
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
                onClick={() => window.open('https://www.gob.pe/pcm', '_blank')}
              >
                Visitar Portal Oficial
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}