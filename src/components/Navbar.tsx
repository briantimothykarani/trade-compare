import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem("theme") as Theme | null;
  return saved ?? "dark"; // ✅ dark mode default
};

const Navbar = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="font-bold text-blue-500 text-xl">
          Trade Compare
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/education" className="text-red-500 hover:text-blue-500">
            Education
          </Link>

          {/* 🌙 / ☀️ Theme Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? (
              <Moon size={20} className="text-white" />
            ) : (
              <Sun size={20} className="text-yellow-500" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
