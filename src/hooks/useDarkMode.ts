import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setOn(true);
    }
  }, []);
  const toggle = () => {
    const d = document.documentElement.classList.toggle("dark");
    localStorage.theme = d ? "dark" : "light";
    setOn(d);
  };
  return { on, toggle };
};
