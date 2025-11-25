"use client";

import * as React from "react";
import { ThemeToggleClient } from "@/components/ui/theme-toggle-client";

interface LayoutContentProps {
  children: React.ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 -z-10" />
        {children}
      </main>
      
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Columna 1 - Información principal */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Checker IA Perú</h3>
                  <p className="text-sm text-muted-foreground">Decreto Supremo N° 115-2025-PCM</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Herramienta profesional para la evaluación del cumplimiento del Reglamento 
                de Inteligencia Artificial del Perú, basada en la Ley N° 31814.
              </p>
            </div>
            
            {/* Columna 2 - Enlaces rápidos */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Enlaces Rápidos</h4>
              <nav className="space-y-2">
                <a 
                  href="#articulos" 
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Artículos del Reglamento
                </a>
                <a 
                  href="#principios" 
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Principios Rectores
                </a>
                <a 
                  href="#riesgos" 
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clasificación de Riesgos
                </a>
                <a 
                  href="#sectores" 
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sectores Regulados
                </a>
              </nav>
            </div>
            
            {/* Columna 3 - Autor y contacto */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Autor</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">KB</span>
                  </div>
                  <div>
                    <p className="font-medium">Roberto Puyó</p>
                    <p className="text-sm text-muted-foreground">Kepler Blacklock</p>
                  </div>
                </div>
                <a 
                  href="https://www.linkedin.com/in/robertopuyo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Copyright y disclaimer */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground text-center md:text-left">
                <p>© 2025 Checker de Cumplimiento IA Perú. Todos los derechos reservados.</p>
                <p className="mt-1">Desarrollado por <strong>Roberto Puyó - Kepler Blacklock</strong></p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <span>Ley N° 31814</span>
                <span>•</span>
                <span>Decreto Supremo N° 115-2025-PCM</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}