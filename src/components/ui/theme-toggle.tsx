"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sun, 
  Moon, 
  Monitor,
  Palette,
  Sparkles
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="w-9 px-0">
        <Monitor className="h-4 w-4" />
      </Button>
    );
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Claro";
      case "dark":
        return "Oscuro";
      default:
        return "Sistema";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hover:bg-gray-100">
          <div className="relative">
            {getThemeIcon()}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="flex items-center space-x-2">
          <Palette className="h-4 w-4" />
          <span>Tema</span>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <div>
            <div className="font-medium">Claro</div>
            <div className="text-xs text-gray-500">Modo día brillante</div>
          </div>
          {theme === "light" && (
            <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <Moon className="h-4 w-4 text-blue-500" />
          <div>
            <div className="font-medium">Oscuro</div>
            <div className="text-xs text-gray-500">Modo noche relajante</div>
          </div>
          {theme === "dark" && (
            <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <Monitor className="h-4 w-4 text-gray-500" />
          <div>
            <div className="font-medium">Sistema</div>
            <div className="text-xs text-gray-500">Seguir preferencias</div>
          </div>
          {theme === "system" && (
            <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="flex items-center space-x-3 cursor-pointer text-xs text-gray-500">
          <Sparkles className="h-3 w-3" />
          <span>Tema guardado automáticamente</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}