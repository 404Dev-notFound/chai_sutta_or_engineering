"use client";
import { Moon, Sun, Terminal } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <Terminal className="text-engineering" />
          <span>CS<span className="text-chai">.</span>E</span>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="bg-engineering text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}