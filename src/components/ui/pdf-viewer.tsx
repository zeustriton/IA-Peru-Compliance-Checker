"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Search,
  FileText,
  Eye,
  Maximize2,
  RotateCw,
  Bookmark,
  Share2,
  Printer,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PDFViewerProps {
  pdfUrl?: string;
  title?: string;
  className?: string;
}

export function PDFViewerComponent({ 
  pdfUrl = "/decreto-supremo-115-2025-pcm.pdf", 
  title = "Decreto Supremo N° 115-2025-PCM",
  className 
}: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulate PDF content (in real app, would use react-pdf or similar)
  const pdfContent = {
    pages: Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      content: `Contenido de la página ${i + 1} del Decreto Supremo N° 115-2025-PCM`,
      sections: [
        { title: "Artículo " + (i * 3 + 1), content: "Disposiciones generales..." },
        { title: "Artículo " + (i * 3 + 2), content: "Definiciones y alcance..." },
        { title: "Artículo " + (i * 3 + 3), content: "Procedimientos y requisitos..." }
      ]
    }))
  };

  useEffect(() => {
    setTotalPages(pdfContent.pages.length);
  }, []);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const toggleBookmark = () => {
    setBookmarks(prev => 
      prev.includes(currentPage) 
        ? prev.filter(p => p !== currentPage)
        : [...prev, currentPage]
    );
  };

  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    // In real app, would download the actual PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title + ".pdf";
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const currentPageData = pdfContent.pages[currentPage - 1];

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {/* Header */}
      <Card className="mb-4 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {title}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Reglamento de la Ley N° 31814
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {totalPages} páginas
              </Badge>
              {bookmarks.includes(currentPage) && (
                <Badge variant="outline" className="border-amber-300 text-amber-700">
                  <Bookmark className="h-3 w-3 mr-1" />
                  Marcado
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Toolbar */}
      <Card className="mb-4 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {/* Navigation Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Anterior</span>
              </Button>
              
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">
                  {currentPage}
                </span>
                <span className="text-sm text-gray-500">/</span>
                <span className="text-sm text-gray-600">{totalPages}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1"
              >
                <span>Siguiente</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(scale * 100)}%
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={scale >= 3}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {/* Action Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSearch(!showSearch)}
                className={showSearch ? "bg-blue-100 text-blue-800" : ""}
              >
                <Search className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleBookmark}
                className={bookmarks.includes(currentPage) ? "bg-amber-100 text-amber-800" : ""}
              >
                <Bookmark className={`h-4 w-4 ${bookmarks.includes(currentPage) ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={rotate}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar en el documento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* PDF Content */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <div 
              className="bg-white shadow-2xl rounded-lg overflow-hidden"
              style={{ 
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease',
                maxWidth: '800px',
                width: '100%'
              }}
            >
              {/* Page Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-blue-100">Página {currentPage} de {totalPages}</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Page Content */}
              <div className="p-8 space-y-6">
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Página {currentPage}
                  </h4>
                  <p className="text-gray-600">
                    {currentPageData.content}
                  </p>
                </div>

                <Separator className="my-6" />

                {/* Sections */}
                <div className="space-y-6">
                  {currentPageData.sections.map((section, index) => (
                    <div key={index} className="space-y-3">
                      <h5 className="text-lg font-semibold text-gray-900">
                        {section.title}
                      </h5>
                      <p className="text-gray-600 leading-relaxed">
                        {section.content}
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-700">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                          laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Page Footer */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Decreto Supremo N° 115-2025-PCM</span>
                    <span>Página {currentPage}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Quick Navigation */}
      <Card className="mt-4 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Navegación rápida:
            </div>
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className="w-8 h-8 p-0"
                >
                  {i + 1}
                </Button>
              ))}
              {totalPages > 10 && (
                <span className="text-sm text-gray-500">...</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}