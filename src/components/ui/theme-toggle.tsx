import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeLanguage } from "@/contexts/ThemeLanguageContext";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}