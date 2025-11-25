import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Checker de Cumplimiento IA Perú | Decreto Supremo N° 115-2025-PCM",
    template: "%s | Checker IA Perú"
  },
  description: "Herramienta profesional para evaluar el cumplimiento del Reglamento de la Ley N° 31814 que promueve el uso responsable de la inteligencia artificial en favor del desarrollo económico y social del Perú",
  keywords: [
    "Inteligencia Artificial",
    "Decreto Supremo 115-2025-PCM", 
    "Ley 31814",
    "Compliance IA",
    "Reglamento IA Perú",
    "Transformación Digital",
    "Gobierno Digital",
    "Ética en IA",
    "Sistemas basados en IA",
    "Kepler Blacklock",
    "Roberto Puyó"
  ],
  authors: [{ 
    name: "Roberto Puyó - Kepler Blacklock",
    url: "https://www.linkedin.com/in/robertopuyo/"
  }],
  creator: "Roberto Puyó - Kepler Blacklock",
  publisher: "Kepler Blacklock",
  icons: {
    icon: "/logo.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://checker-ia-peru.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Checker de Cumplimiento IA Perú | Decreto Supremo N° 115-2025-PCM",
    description: "Evaluación profesional del cumplimiento del Reglamento de Inteligencia Artificial del Perú. Herramienta basada en el Decreto Supremo N° 115-2025-PCM",
    type: "website",
    locale: "es_PE",
    siteName: "Checker IA Perú",
    url: "https://checker-ia-peru.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Checker de Cumplimiento IA Perú - Evaluación de Reglamento de Inteligencia Artificial"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Checker de Cumplimiento IA Perú",
    description: "Evaluación profesional del cumplimiento del Reglamento de Inteligencia Artificial del Perú",
    site: "@keplerblacklock",
    creator: "@keplerblacklock",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};