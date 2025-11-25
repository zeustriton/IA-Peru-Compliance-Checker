import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProgresoProps {
  current: number;
  total: number;
  category?: string;
  showPercentage?: boolean;
  showBadges?: boolean;
}

export function ProgresoChecker({ 
  current, 
  total, 
  category, 
  showPercentage = true,
  showBadges = true 
}: ProgresoProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="space-y-3">
          {showBadges && (
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-sm">
                Pregunta {current} de {total}
              </Badge>
              {category && (
                <Badge variant="outline" className="text-sm">
                  {category}
                </Badge>
              )}
            </div>
          )}
          <Progress value={percentage} className="h-2" />
          {showPercentage && (
            <div className="text-center text-sm text-gray-600">
              {percentage.toFixed(0)}% completado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ProgresoSimpleProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
}

export function ProgresoSimple({ 
  value, 
  max = 100, 
  label, 
  color = "blue" 
}: ProgresoSimpleProps) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
}