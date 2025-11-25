"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info, ExternalLink, Shield, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DisclaimerComponent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="relative overflow-hidden border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-orange-50/80 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
      
      <CardContent className="relative p-8">
        <div className="flex items-start gap-6">
          {/* Icono principal animado */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 rounded-full animate-pulse-slow" />
              <AlertTriangle className="relative h-8 w-8 text-amber-600 animate-float" />
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            {/* Título principal */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-amber-600" />
                <h3 className="text-2xl font-bold text-amber-900">
                  ⚠️ CLÁUSULA DE EXENCIÓN DE RESPONSABILIDAD (DISCLAIMER)
                </h3>
              </div>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" />
            </div>
            
            {/* Contenido del disclaimer */}
            <div className={`space-y-6 transition-all duration-500 ${expanded ? 'opacity-100' : 'opacity-90'}`}>
              {/* Sección 1 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <BookOpen className="h-5 w-5 text-amber-700" />
                  </div>
                  <h4 className="text-lg font-semibold text-amber-900">
                    1. Naturaleza Académica:
                  </h4>
                </div>
                <p className="text-amber-800 leading-relaxed pl-14 border-l-2 border-amber-200 hover:border-amber-300 transition-colors">
                  El presente desarrollo de software es un ejercicio de simulación teórica y análisis técnico, 
                  elaborado con fines estrictamente pedagógicos para ilustrar la aplicación de la normativa peruana 
                  en Inteligencia Artificial. No constituye una auditoría oficial, denuncia, ni dictamen vinculante 
                  sobre la gestión de las entidades mencionadas.
                </p>
              </div>
              
              {/* Sección 2 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <Info className="h-5 w-5 text-amber-700" />
                  </div>
                  <h4 className="text-lg font-semibold text-amber-900">
                    2. Fuentes de Información (OSINT):
                  </h4>
                </div>
                <p className="text-amber-800 leading-relaxed pl-14 border-l-2 border-amber-200 hover:border-amber-300 transition-colors">
                  Todo el análisis se fundamenta exclusiva y únicamente en información de acceso público 
                  (aplicaciones en tiendas oficiales, manuales de usuario, normativa vigente y estándares internacionales). 
                  No se ha utilizado, consultado ni revelado información confidencial, reservada o privilegiada 
                  derivada de vínculos laborales pasados o presentes del autor.
                </p>
              </div>
              
              {/* Sección 3 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <User className="h-5 w-5 text-amber-700" />
                  </div>
                  <h4 className="text-lg font-semibold text-amber-900">
                    3. Opinión Personal:
                  </h4>
                </div>
                <p className="text-amber-800 leading-relaxed pl-14 border-l-2 border-amber-200 hover:border-amber-300 transition-colors">
                  El código fuente, las opiniones, interpretaciones y conclusiones vertidas en este texto son a título 
                  estrictamente personal del autor en su capacidad de investigador independiente. No representan la 
                  postura oficial, visión ni políticas de mi actual empleador, ni de ninguna entidad del Estado Peruano.
                </p>
              </div>
              
              {/* Autor */}
              <div className="mt-8 p-6 bg-gradient-to-r from-amber-100/50 to-orange-100/50 rounded-xl border border-amber-200/50">
                <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-amber-900 mb-2">Autor:</h5>
                        <p className="text-amber-800 font-medium">Kepler Blacklock</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-300 text-amber-700 hover:bg-amber-100 hover:border-amber-400 transition-all"
                        asChild
                      >
                        <a 
                          href="https://www.linkedin.com/in/robertopuyo/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          LinkedIn
                        </a>
                      </Button>
                    </div>
              </div>
            </div>
            
            {/* Footer informativo */}
            <div className="mt-8 pt-6 border-t border-amber-300/50">
              <div className="flex items-start gap-3 p-4 bg-amber-100/30 rounded-lg">
                <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700 leading-relaxed">
                  Esta aplicación es una herramienta de referencia educativa y no sustituye el asesoramiento legal profesional. 
                  El uso de esta herramienta es bajo su propia responsabilidad y discreción.
                </p>
              </div>
            </div>
            
            {/* Botón de expansión */}
            <div className="flex justify-center pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="text-amber-700 hover:text-amber-900 hover:bg-amber-100/50 transition-all"
              >
                {expanded ? 'Mostrar menos' : 'Mostrar más detalles'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}