import { Card, CardContent } from "@/components/ui/card";
import { Scale } from "lucide-react";
import { InfoCard } from "./InfoCard";

interface Principio {
  nombre: string;
  descripcion?: string;
  articulo?: string;
}

interface PrincipiosGridProps {
  principios: Principio[];
  columns?: number;
  showIcon?: boolean;
}

export function PrincipiosGrid({ 
  principios, 
  columns = 2, 
  showIcon = true 
}: PrincipiosGridProps) {
  return (
    <div className={`grid md:grid-cols-${columns} gap-4`}>
      {principios.map((principio, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {showIcon && (
                <Scale className="h-5 w-5 text-blue-600 flex-shrink-0" />
              )}
              <div className="flex-1">
                <span className="font-medium">{principio.nombre}</span>
                {principio.descripcion && (
                  <p className="text-sm text-gray-600 mt-1">{principio.descripcion}</p>
                )}
                {principio.articulo && (
                  <p className="text-xs text-gray-500 mt-1">{principio.articulo}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface PrincipioCardProps {
  principio: Principio;
  index?: number;
  showNumber?: boolean;
}

export function PrincipioCard({ principio, index, showNumber = false }: PrincipioCardProps) {
  return (
    <InfoCard
      title={showNumber ? `${index}. ${principio.nombre}` : principio.nombre}
      description={principio.descripcion}
      icon={<Scale className="h-5 w-5 text-blue-600" />}
      badge={principio.articulo}
      badgeVariant="outline"
    />
  );
}