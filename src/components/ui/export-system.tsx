"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Code, 
  Mail,
  Share2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  User,
  Building,
  BarChart3,
  Settings,
  Eye,
  Copy,
  Smartphone,
  Tablet,
  Monitor,
  Printer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExportData {
  organizationName: string;
  sector: string;
  evaluationDate: string;
  overallScore: number;
  principleScores: Array<{ principle: string; score: number }>;
  riskAnalysis: Array<{ risk: string; level: string; mitigation: string }>;
  recommendations: Array<{ title: string; priority: string; description: string }>;
  complianceStatus: string;
  nextEvaluation: string;
}

interface ExportSystemProps {
  data: ExportData;
  className?: string;
}

export function ExportSystem({ data, className }: ExportSystemProps) {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [showEmailOptions, setShowEmailOptions] = useState(false);

  const exportFormats = [
    {
      id: "pdf",
      name: "PDF",
      description: "Reporte completo en formato PDF optimizado para impresión",
      icon: <FileText className="h-5 w-5" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
      features: ["Gráficos interactivos", "Marcas de agua", "Firma digital", "Optimizado para impresión"]
    },
    {
      id: "excel",
      name: "Excel",
      description: "Hoja de cálculo con datos detallados y tablas dinámicas",
      icon: <FileSpreadsheet className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      features: ["Tablas dinámicas", "Gráficos actualizables", "Filtros avanzados", "Fórmulas automáticas"]
    },
    {
      id: "json",
      name: "JSON",
      description: "Datos estructurados para integración con sistemas",
      icon: <Code className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      features: ["API ready", "Estructura anidada", "Metadatos completos", "Validación de esquema"]
    },
    {
      id: "csv",
      name: "CSV",
      description: "Valores separados por comas para análisis de datos",
      icon: <FileSpreadsheet className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      features: ["Compatible con Excel", "Importación rápida", "Formato estándar", "Compresión optimizada"]
    }
  ];

  const toggleFormat = (formatId: string) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const generatePDF = async () => {
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { url: "/exports/report.pdf", size: "2.4 MB" };
  };

  const generateExcel = async () => {
    // Simulate Excel generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { url: "/exports/report.xlsx", size: "1.8 MB" };
  };

  const generateJSON = async () => {
    // Simulate JSON generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { url: "/exports/report.json", size: "856 KB" };
  };

  const generateCSV = async () => {
    // Simulate CSV generation
    await new Promise(resolve => setTimeout(resolve, 800));
    return { url: "/exports/report.csv", size: "432 KB" };
  };

  const handleExport = async () => {
    if (selectedFormats.length === 0) return;

    setIsExporting(true);
    setExportProgress(0);

    const totalFormats = selectedFormats.length;
    let completedFormats = 0;

    for (const formatId of selectedFormats) {
      switch (formatId) {
        case "pdf":
          await generatePDF();
          break;
        case "excel":
          await generateExcel();
          break;
        case "json":
          await generateJSON();
          break;
        case "csv":
          await generateCSV();
          break;
      }
      
      completedFormats++;
      setExportProgress((completedFormats / totalFormats) * 100);
    }

    setIsExporting(false);
    setExportComplete(true);
    
    setTimeout(() => {
      setExportComplete(false);
      setSelectedFormats([]);
      setExportProgress(0);
    }, 3000);
  };

  const handleEmailExport = async () => {
    if (!emailAddress) return;

    setIsExporting(true);
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExporting(false);
    setShowEmailOptions(false);
    setEmailAddress("");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Reporte de Cumplimiento IA",
        text: "Reporte de evaluación de cumplimiento del Reglamento de IA",
        url: window.location.href
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const downloadFile = (formatId: string) => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = `/exports/report.${formatId}`;
    link.download = `compliance-report-${data.organizationName}.${formatId}`;
    link.click();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Sistema de Exportación
                </CardTitle>
                <p className="text-gray-600 mt-1">
                  Exporte su reporte en múltiples formatos
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <BarChart3 className="h-3 w-3 mr-1" />
                {data.overallScore}% Cumplimiento
              </Badge>
              <Badge variant="outline" className="border-green-300 text-green-700">
                <CheckCircle className="h-3 w-3 mr-1" />
                Evaluación Completa
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Export Summary */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">{data.organizationName}</h4>
              <p className="text-sm text-gray-600">{data.sector}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Fecha</h4>
              <p className="text-sm text-gray-600">{data.evaluationDate}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Puntuación</h4>
              <p className="text-sm text-gray-600">{data.overallScore}%</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Próxima Evaluación</h4>
              <p className="text-sm text-gray-600">{data.nextEvaluation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Format Selection */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-blue-600" />
            <span>Seleccionar Formatos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportFormats.map((format) => (
              <motion.div
                key={format.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedFormats.includes(format.id) 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleFormat(format.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${format.bgColor} rounded-lg flex items-center justify-center`}>
                        <div className={format.color}>{format.icon}</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{format.name}</h4>
                          {selectedFormats.includes(format.id) && (
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          {format.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {format.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleExport}
                disabled={selectedFormats.length === 0 || isExporting}
                className="gradient-primary text-white px-6 py-2"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Exportando...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar ({selectedFormats.length})
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowEmailOptions(!showEmailOptions)}
                className="flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Enviar por Email</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Compartir</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Monitor className="h-4 w-4" />
              <Tablet className="h-4 w-4" />
              <Smartphone className="h-4 w-4" />
              <span>Compatible con todos los dispositivos</span>
            </div>
          </div>

          {/* Progress Bar */}
          <AnimatePresence>
            {isExporting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progreso de exportación</span>
                    <span className="font-medium text-gray-900">{Math.round(exportProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${exportProgress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Options */}
          <AnimatePresence>
            {showEmailOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <input
                      type="email"
                      placeholder="Ingrese su correo electrónico"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button
                      onClick={handleEmailExport}
                      disabled={!emailAddress || isExporting}
                      className="gradient-primary text-white"
                    >
                      Enviar
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {exportComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-900">Exportación Completada</h4>
                      <p className="text-green-700 text-sm">
                        Sus archivos han sido generados exitosamente y están listos para descargar.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedFormats.map((formatId) => (
                      <Button
                        key={formatId}
                        variant="outline"
                        size="sm"
                        onClick={() => downloadFile(formatId)}
                        className="flex items-center space-x-1"
                      >
                        <Download className="h-3 w-3" />
                        <span>Descargar {formatId.toUpperCase()}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Preview Options */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-purple-600" />
            <span>Vista Previa</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <FileText className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">PDF</h4>
              <p className="text-sm text-gray-600">Reporte completo con gráficos</p>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <FileSpreadsheet className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">Excel</h4>
              <p className="text-sm text-gray-600">Datos para análisis detallado</p>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Code className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900">JSON</h4>
              <p className="text-sm text-gray-600">Datos estructurados para API</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}