import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AccessibilityProvider } from "@/components/providers/accessibility-provider";
import { LayoutContent } from "@/components/layout/layout-content";
import { StructuredData } from "@/components/seo/structured-data";
import { metadata } from "./metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="es-PE" 
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <StructuredData 
          type="WebPage" 
          data={{
            name: "Checker de Cumplimiento IA Perú | Decreto Supremo N° 115-2025-PCM",
            description: "Herramienta profesional para evaluar el cumplimiento del Reglamento de la Ley N° 31814 que promueve el uso responsable de la inteligencia artificial en favor del desarrollo económico y social del Perú",
            url: "https://checker-ia-peru.vercel.app",
            datePublished: "2025-01-01",
            dateModified: new Date().toISOString().split('T')[0]
          }} 
        />
        
        <StructuredData 
          type="Organization" 
          data={{
            name: "Kepler Blacklock",
            url: "https://www.linkedin.com/in/robertopuyo/",
            description: "Consultor especializado en Inteligencia Artificial y cumplimiento normativo"
          }} 
        />
        
        <StructuredData 
          type="Person" 
          data={{
            name: "Roberto Puyó",
            alternateName: "Kepler Blacklock",
            url: "https://www.linkedin.com/in/robertopuyo/",
            jobTitle: "Especialista en Inteligencia Artificial",
            description: "Experto en cumplimiento normativo de IA y transformación digital"
          }} 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AccessibilityProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
          </AccessibilityProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}