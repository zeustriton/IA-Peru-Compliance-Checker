import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  children?: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function InfoCard({
  title,
  description,
  icon,
  badge,
  badgeVariant = "default",
  children,
  className = "",
  hover = true
}: InfoCardProps) {
  return (
    <Card className={`${hover ? "hover:shadow-lg transition-shadow" : ""} ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}