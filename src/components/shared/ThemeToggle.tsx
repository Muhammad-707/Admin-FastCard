import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="w-9 h-9 flex items-center justify-center rounded-full text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 active:scale-95 focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-[18px] h-[18px] text-amber-500 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-[18px] h-[18px] text-indigo-300 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}