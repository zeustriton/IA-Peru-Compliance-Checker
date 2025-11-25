"use client";

import Head from "next/head";

interface StructuredDataProps {
  type: "WebPage" | "Article" | "Organization" | "Person";
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "WebPage":
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": data.name || "Checker de Cumplimiento IA Perú",
          "description": data.description || "Herramienta profesional para evaluar el cumplimiento del Reglamento de Inteligencia Artificial del Perú",
          "url": data.url || "https://checker-ia-peru.vercel.app",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Checker de Cumplimiento IA",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "PEN"
            }
          },
          "provider": {
            "@type": "Organization",
            "name": "Kepler Blacklock",
            "url": "https://www.linkedin.com/in/robertopuyo/"
          },
          "datePublished": data.datePublished || "2025-01-01",
          "dateModified": data.dateModified || new Date().toISOString().split('T')[0],
          "inLanguage": "es-PE",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Checker IA Perú",
            "url": "https://checker-ia-peru.vercel.app"
          }
        };

      case "Article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.headline || "Reglamento de Inteligencia Artificial del Perú",
          "description": data.description || "Análisis completo del Decreto Supremo N° 115-2025-PCM",
          "author": {
            "@type": "Person",
            "name": "Roberto Puyó",
            "url": "https://www.linkedin.com/in/robertopuyo/"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Kepler Blacklock",
            "logo": {
              "@type": "ImageObject",
              "url": "https://checker-ia-peru.vercel.app/logo.svg"
            }
          },
          "datePublished": data.datePublished || "2025-01-01",
          "dateModified": data.dateModified || new Date().toISOString().split('T')[0],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://checker-ia-peru.vercel.app"
          }
        };

      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": data.name || "Kepler Blacklock",
          "url": data.url || "https://www.linkedin.com/in/robertopuyo/",
          "logo": data.logo || "https://checker-ia-peru.vercel.app/logo.svg",
          "description": data.description || "Consultor especializado en Inteligencia Artificial y cumplimiento normativo",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "professional",
            "url": "https://www.linkedin.com/in/robertopuyo/"
          },
          "sameAs": [
            "https://www.linkedin.com/in/robertopuyo/"
          ]
        };

      case "Person":
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": data.name || "Roberto Puyó",
          "alternateName": "Kepler Blacklock",
          "url": data.url || "https://www.linkedin.com/in/robertopuyo/",
          "jobTitle": data.jobTitle || "Especialista en Inteligencia Artificial",
          "description": data.description || "Experto en cumplimiento normativo de IA y transformación digital",
          "sameAs": [
            "https://www.linkedin.com/in/robertopuyo/"
          ]
        };

      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2)
      }}
    />
  );
}