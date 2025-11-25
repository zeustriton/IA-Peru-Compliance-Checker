"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  Shield,
  Scale,
  Users,
  Download,
  Eye,
  Calendar,
  Filter
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";

interface DashboardProps {
  data?: any;
  className?: string;
}

export function DashboardComponent({ data, className }: DashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [animatedValues, setAnimatedValues] = useState({});

  // Sample data for demonstration
  const complianceData = [
    { name: "Ene", cumplimiento: 65, target: 80 },
    { name: "Feb", cumplimiento: 72, target: 80 },
    { name: "Mar", cumplimiento: 78, target: 85 },
    { name: "Abr", cumplimiento: 82, target: 85 },
    { name: "May", cumplimiento: 85, target: 90 },
    { name: "Jun", cumplimiento: 88, target: 90 }
  ];

  const riskDistribution = [
    { name: "Bajo", value: 45, color: "#10b981" },
    { name: "Medio", value: 35, color: "#f59e0b" },
    { name: "Alto", value: 20, color: "#ef4444" }
  ];

  const principleCompliance = [
    { principle: "No discriminación", score: 92 },
    { principle: "Privacidad", score: 78 },
    { principle: "Transparencia", score: 85 },
    { principle: "Seguridad", score: 88 },
    { principle: "Rendición de cuentas", score: 76 }
  ];

  useEffect(() => {
    // Animate values on mount
    const timer = setTimeout(() => {
      setAnimatedValues({
        overallCompliance: 88,
        riskScore: 42,
        principlesMet: 11,
        recommendations: 5
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: "Cumplimiento General",
      value: animatedValues.overallCompliance || 0,
      unit: "%",
      icon: <Target className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: { value: 5, direction: "up" as const }
    },
    {
      title: "Puntuación de Riesgo",
      value: animatedValues.riskScore || 0,
      unit: "/100",
      icon: <Shield className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      trend: { value: 3, direction: "down" as const }
    },
    {
      title: "Principios Cumplidos",
      value: animatedValues.principlesMet || 0,
      unit: "/12",
      icon: <Scale className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      trend: { value: 2, direction: "up" as const }
    },
    {
      title: "Recomendaciones",
      value: animatedValues.recommendations || 0,
      unit: "activas",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      trend: { value: 1, direction: "down" as const }
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard de Cumplimiento</h2>
          <p className="text-gray-600 mt-1">Monitoreo y análisis en tiempo real</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-1">
            {["7d", "30d", "90d", "1y"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="h-8 px-3"
              >
                {period === "7d" && "7 días"}
                {period === "30d" && "30 días"}
                {period === "90d" && "90 días"}
                {period === "1y" && "1 año"}
              </Button>
            ))}
          </div>
          
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend.direction === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend.direction === "up" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="font-medium">{stat.trend.value}%</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">{stat.unit}</span>
                </div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
              
              <Progress 
                value={typeof stat.value === "number" ? stat.value : 0} 
                className="mt-4 h-2" 
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Trend */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Tendencia de Cumplimiento</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumplimiento" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-amber-600" />
              <span>Distribución de Riesgos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex justify-center space-x-6 mt-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Principles Compliance */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Scale className="h-5 w-5 text-purple-600" />
            <span>Cumplimiento por Principio</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {principleCompliance.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.principle}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{item.score}%</span>
                    <Badge 
                      variant={item.score >= 80 ? "default" : item.score >= 60 ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {item.score >= 80 ? "Excelente" : item.score >= 60 ? "Aceptable" : "Requiere mejora"}
                    </Badge>
                  </div>
                </div>
                <Progress value={item.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-green-600" />
            <span>Actividades Recientes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Evaluación completada - Sector Salud",
                description: "Nivel de cumplimiento: 92%",
                time: "Hace 2 horas",
                type: "success"
              },
              {
                title: "Nuevo principio implementado",
                description: "Transparencia algorítmica actualizada",
                time: "Hace 5 horas",
                type: "info"
              },
              {
                title: "Alerta de riesgo medio",
                description: "Sistema de recomendación requiere revisión",
                time: "Hace 1 día",
                type: "warning"
              },
              {
                title: "Reporte mensual generado",
                description: "Disponible para descarga en el portal",
                time: "Hace 2 días",
                type: "success"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === "success" ? "bg-green-500" :
                  activity.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}