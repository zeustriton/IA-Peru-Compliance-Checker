"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { motion } from "framer-motion";

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  delay?: number;
  animationType?: "fade" | "slide" | "scale" | "none";
}

export function LazyWrapper({
  children,
  fallback,
  rootMargin = "50px",
  threshold = 0.1,
  className,
  delay = 0,
  animationType = "fade"
}: LazyWrapperProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          setHasLoaded(true);
          
          // Apply delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setShouldRender(true);
            }, delay);
          } else {
            setShouldRender(true);
          }
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, threshold, hasLoaded, delay]);

  const getAnimationProps = () => {
    switch (animationType) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, ease: "easeOut" }
        };
      case "slide":
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: "easeOut" }
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.6, ease: "easeOut" }
        };
      default:
        return {};
    }
  };

  const defaultFallback = (
    <div className="space-y-4">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {shouldRender ? (
        animationType !== "none" ? (
          <motion.div {...getAnimationProps()}>
            <Suspense fallback={fallback || defaultFallback}>
              {children}
            </Suspense>
          </motion.div>
        ) : (
          <Suspense fallback={fallback || defaultFallback}>
            {children}
          </Suspense>
        )
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
}

// Advanced lazy wrapper for components with error boundaries
export function AdvancedLazyWrapper({
  children,
  fallback,
  errorFallback,
  rootMargin = "50px",
  threshold = 0.1,
  className,
  delay = 0,
  animationType = "fade",
  retryCount = 3
}: LazyWrapperProps & {
  errorFallback?: React.ReactNode;
  retryCount?: number;
}) {
  const [error, setError] = useState<Error | null>(null);
  const [retryAttempts, setRetryAttempts] = useState(0);

  const handleError = (err: Error) => {
    setError(err);
    setRetryAttempts(prev => prev + 1);
  };

  const handleRetry = () => {
    if (retryAttempts < retryCount) {
      setError(null);
      // Force re-render
      setRetryAttempts(prev => prev + 1);
    }
  };

  const defaultErrorFallback = (
    <div className="text-center p-8 border border-red-200 rounded-lg bg-red-50">
      <div className="text-red-600 mb-4">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-900 mb-2">
        Error al cargar el contenido
      </h3>
      <p className="text-red-700 mb-4">
        No se pudo cargar el componente. Por favor, inténtelo de nuevo.
      </p>
      {retryAttempts < retryCount && (
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Reintentar ({retryCount - retryAttempts} intentos restantes)
        </button>
      )}
    </div>
  );

  if (error) {
    return errorFallback || defaultErrorFallback;
  }

  return (
    <LazyWrapper
      fallback={fallback}
      rootMargin={rootMargin}
      threshold={threshold}
      className={className}
      delay={delay}
      animationType={animationType}
    >
      <div onError={handleError}>
        {children}
      </div>
    </LazyWrapper>
  );
}

// Hook for lazy loading images
export function useLazyImage(src: string, options?: {
  rootMargin?: string;
  threshold?: number;
}) {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoading(true);
          setError(null);
          
          const tempImg = new Image();
          tempImg.onload = () => {
            setImageSrc(src);
            setIsLoading(false);
          };
          tempImg.onerror = () => {
            setError("Failed to load image");
            setIsLoading(false);
          };
          tempImg.src = src;
          
          observer.unobserve(img);
        }
      },
      {
        rootMargin: options?.rootMargin || "50px",
        threshold: options?.threshold || 0.1
      }
    );

    observer.observe(img);

    return () => {
      observer.unobserve(img);
    };
  }, [src, options]);

  return {
    ref: imgRef,
    src: imageSrc,
    isLoading,
    error
  };
}

// Component for lazy loaded images
export function LazyImage({
  src,
  alt,
  className,
  fallback,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: React.ReactNode;
}) {
  const { ref, src: imageSrc, isLoading, error } = useLazyImage(src || "");

  if (error) {
    return fallback || (
      <div className={`flex items-center justify-center bg-gray-200 rounded-lg ${className}`}>
        <span className="text-gray-500">Error al cargar imagen</span>
      </div>
    );
  }

  if (isLoading) {
    return fallback || (
      <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
    );
  }

  return (
    <motion.img
      ref={ref}
      src={imageSrc}
      alt={alt}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      {...props}
    />
  );
}