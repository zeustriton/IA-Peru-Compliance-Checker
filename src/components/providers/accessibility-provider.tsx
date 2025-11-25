"use client";

import * as React from "react";
import { useEffect, useState, useCallback } from "react";

interface AccessibilityContextType {
  announceToScreenReader: (message: string, priority?: "polite" | "assertive") => void;
  focusFirstElement: (selector?: string) => void;
  trapFocus: (container: HTMLElement | null) => void;
  releaseFocus: () => void;
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  toggleReducedMotion: () => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  setAriaLabel: (element: HTMLElement, label: string) => void;
  setAriaDescribedBy: (element: HTMLElement, descriptionId: string) => void;
  validateColorContrast: (foreground: string, background: string) => boolean;
  getKeyboardNavigationHelp: () => { key: string; description: string }[];
}

const AccessibilityContext = React.createContext<AccessibilityContextType | null>(null);

export function useAccessibility() {
  const context = React.useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [previousActiveElement, setPreviousActiveElement] = useState<HTMLElement | null>(null);
  const focusContainerRef = React.useRef<HTMLElement | null>(null);
  const announcementRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check for user's accessibility preferences
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrastQuery = window.matchMedia("(prefers-contrast: high)");
    
    setReducedMotion(motionQuery.matches);
    setHighContrast(contrastQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);
    contrastQuery.addEventListener("change", handleContrastChange);

    // Create comprehensive skip links
    const createSkipLinks = () => {
      const skipLinksContainer = document.createElement("div");
      skipLinksContainer.className = "skip-links";
      
      const skipLinks = [
        { href: "#main-content", text: "Saltar al contenido principal" },
        { href: "#navigation", text: "Saltar a la navegación" },
        { href: "#footer", text: "Saltar al pie de página" }
      ];

      skipLinks.forEach(link => {
        const skipLink = document.createElement("a");
        skipLink.href = link.href;
        skipLink.textContent = link.text;
        skipLink.className = "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
        skipLinksContainer.appendChild(skipLink);
      });

      document.body.insertBefore(skipLinksContainer, document.body.firstChild);
    };

    createSkipLinks();

    // Add semantic landmarks if they don't exist
    const addLandmarks = () => {
      const main = document.querySelector("main") || document.querySelector('[role="main"]');
      if (main && !main.id) {
        main.id = "main-content";
      }

      const nav = document.querySelector("nav") || document.querySelector('[role="navigation"]');
      if (nav && !nav.id) {
        nav.id = "navigation";
      }

      const footer = document.querySelector("footer") || document.querySelector('[role="contentinfo"]');
      if (footer && !footer.id) {
        footer.id = "footer";
      }
    };

    addLandmarks();

    // Create live region for announcements
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    liveRegion.id = "accessibility-announcements";
    document.body.appendChild(liveRegion);
    announcementRef.current = liveRegion;

    // Handle comprehensive keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          if (focusContainerRef.current) {
            releaseFocus();
          }
          break;
        case "Tab":
          // Enhanced tab handling with focus indicators
          document.body.classList.add("keyboard-navigation");
          break;
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove("keyboard-navigation");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleMouseDown);

    // Clean up
    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      contrastQuery.removeEventListener("change", handleContrastChange);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
      
      const skipLinks = document.querySelector(".skip-links");
      if (skipLinks && skipLinks.parentNode) {
        skipLinks.parentNode.removeChild(skipLinks);
      }
      
      if (liveRegion && liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion);
      }
    };
  }, []);

  const announceToScreenReader = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    if (!announcementRef.current) return;

    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }, []);

  const focusFirstElement = useCallback((selector?: string) => {
    const element = selector 
      ? document.querySelector(selector) as HTMLElement
      : document.querySelector("h1, h2, h3, button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])") as HTMLElement;
    
    if (element) {
      element.focus();
      announceToScreenReader(`Enfocado en: ${element.textContent || element.tagName}`);
    }
  }, [announceToScreenReader]);

  const trapFocus = useCallback((container: HTMLElement | null) => {
    if (!container) return;

    setPreviousActiveElement(document.activeElement as HTMLElement);
    focusContainerRef.current = container;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), details, summary'
    ) as NodeListOf<HTMLElement>;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    
    // Focus first element after a small delay to ensure proper focus management
    setTimeout(() => {
      firstElement?.focus();
    }, 100);
  }, []);

  const releaseFocus = useCallback(() => {
    if (focusContainerRef.current) {
      focusContainerRef.current.removeEventListener("keydown", () => {});
      focusContainerRef.current = null;
    }
    
    if (previousActiveElement) {
      previousActiveElement.focus();
      setPreviousActiveElement(null);
    }
  }, [previousActiveElement]);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion(!reducedMotion);
    document.documentElement.classList.toggle("reduce-motion");
    announceToScreenReader(`Movimiento reducido ${!reducedMotion ? 'activado' : 'desactivado'}`);
  }, [reducedMotion, announceToScreenReader]);

  const toggleHighContrast = useCallback(() => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("high-contrast");
    announceToScreenReader(`Alto contraste ${!highContrast ? 'activado' : 'desactivado'}`);
  }, [highContrast, announceToScreenReader]);

  const toggleLargeText = useCallback(() => {
    setLargeText(!largeText);
    document.documentElement.classList.toggle("large-text");
    announceToScreenReader(`Texto grande ${!largeText ? 'activado' : 'desactivado'}`);
  }, [largeText, announceToScreenReader]);

  const setAriaLabel = useCallback((element: HTMLElement, label: string) => {
    element.setAttribute("aria-label", label);
  }, []);

  const setAriaDescribedBy = useCallback((element: HTMLElement, descriptionId: string) => {
    element.setAttribute("aria-describedby", descriptionId);
  }, []);

  const validateColorContrast = useCallback((foreground: string, background: string): boolean => {
    // Simple contrast ratio calculation (would use a proper library in production)
    const getLuminance = (color: string): number => {
      // Convert hex to RGB
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      // Calculate luminance
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      return luminance;
    };

    const fgLuminance = getLuminance(foreground);
    const bgLuminance = getLuminance(background);
    
    const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05);
    
    return contrast >= 4.5; // WCAG AA standard
  }, []);

  const getKeyboardNavigationHelp = useCallback(() => {
    return [
      { key: "Tab", description: "Navegar entre elementos interactivos" },
      { key: "Shift + Tab", description: "Navegar hacia atrás" },
      { key: "Enter", description: "Activar botones y enlaces" },
      { key: "Space", description: "Activar botones y casillas" },
      { key: "Escape", description: "Cerrar diálogos y menús" },
      { key: "Alt + M", description: "Alternar movimiento reducido" },
      { key: "Alt + C", description: "Alternar alto contraste" },
      { key: "Alt + L", description: "Alternar texto grande" },
      { key: "Alt + H", description: "Mostrar ayuda de accesibilidad" }
    ];
  }, []);

  const value: AccessibilityContextType = {
    announceToScreenReader,
    focusFirstElement,
    trapFocus,
    releaseFocus,
    reducedMotion,
    highContrast,
    largeText,
    toggleReducedMotion,
    toggleHighContrast,
    toggleLargeText,
    setAriaLabel,
    setAriaDescribedBy,
    validateColorContrast,
    getKeyboardNavigationHelp
  };

  return (
    <AccessibilityContext.Provider value={value}>
      <div className={`accessibility-provider ${reducedMotion ? "reduce-motion" : ""} ${highContrast ? "high-contrast" : ""} ${largeText ? "large-text" : ""}`}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}