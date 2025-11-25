import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield } from "lucide-react";
import { InfoCard } from "./InfoCard";

interface Riesgo {
  tipo: "prohibido" | "alto";
  titulo: string;
  items: string[];
}

interface RiesgoCardProps {
  riesgo: Riesgo;
}

export function RiesgoCard({ riesgo }: RiesgoCardProps) {
  const isProhibido = riesgo.tipo === "prohibido";
  
  return (
    <Card className={`${isProhibido ? "border-red-200 bg-red-50" : "border-orange-200 bg-orange-50"}`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${isProhibido ? "text-red-700" : "text-orange-700"}`}>
          {isProhibido ? (
            <AlertTriangle className="h-5 w-5" />
          ) : (
            <Shield className="h-5 w-5" />
          )}
          {riesgo.titulo}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm text-gray-700 space-y-2">
          {riesgo.items.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface RiesgosGridProps {
  riesgos: Riesgo[];
  columns?: number;
}

export function RiesgosGrid({ riesgos, columns = 2 }: RiesgosGridProps) {
  return (
    <div className={`grid md:grid-cols-${columns} gap-6`}>
      {riesgos.map((riesgo, index) => (
        <RiesgoCard key={index} riesgo={riesgo} />
      ))}
    </div>
  );
}