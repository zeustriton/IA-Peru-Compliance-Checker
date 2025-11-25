import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoCard } from "./InfoCard";

interface Sector {
  id: string;
  nombre: string;
  descripcion: string;
  icon: React.ReactNode;
  color: string;
}

interface SectorCardProps {
  sector: Sector;
  selected?: boolean;
  onClick?: () => void;
}

export function SectorCard({ sector, selected = false, onClick }: SectorCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-lg ${
        selected 
          ? 'ring-2 ring-blue-600 bg-blue-50' 
          : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className={`text-${sector.color}-600 mb-3 flex justify-center`}>
          {sector.icon}
        </div>
        <h3 className="font-semibold mb-2">{sector.nombre}</h3>
        <p className="text-sm text-gray-600">{sector.descripcion}</p>
        {selected && (
          <Badge className="mt-3 bg-blue-600">Seleccionado</Badge>
        )}
      </CardContent>
    </Card>
  );
}

interface SectoresGridProps {
  sectores: Sector[];
  columns?: number;
  selectedSector?: string;
  onSectorSelect?: (sectorId: string) => void;
}

export function SectoresGrid({ 
  sectores, 
  columns = 3, 
  selectedSector,
  onSectorSelect 
}: SectoresGridProps) {
  return (
    <div className={`grid md:grid-cols-${columns} gap-4`}>
      {sectores.map((sector) => (
        <SectorCard
          key={sector.id}
          sector={sector}
          selected={selectedSector === sector.id}
          onClick={() => onSectorSelect?.(sector.id)}
        />
      ))}
    </div>
  );
}