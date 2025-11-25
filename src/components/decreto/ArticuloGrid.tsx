import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { InfoCard } from "./InfoCard";

interface Articulo {
  titulo: string;
  descripcion: string;
  icon?: React.ReactNode;
  color?: string;
}

interface ArticuloGridProps {
  articulos: Articulo[];
  showIcon?: boolean;
}

export function ArticuloGrid({ articulos, showIcon = true }: ArticuloGridProps) {
  return (
    <div className="grid gap-4">
      {articulos.map((articulo, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {showIcon && articulo.icon && (
                <articulo.icon className="h-5 w-5 text-blue-600" />
              )}
              {articulo.titulo}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{articulo.descripcion}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface ArticuloCardProps {
  articulo: Articulo;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

export function ArticuloCard({ articulo, badge, badgeVariant = "default" }: ArticuloCardProps) {
  return (
    <InfoCard
      title={articulo.titulo}
      description={articulo.descripcion}
      icon={articulo.icon}
      badge={badge}
      badgeVariant={badgeVariant}
    />
  );
}