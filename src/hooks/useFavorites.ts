import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => {
    const s = localStorage.getItem("favorites");
    if (s) setFavs(JSON.parse(s));
  }, []);
  const toggle = (id: string) => {
    const n = favs.includes(id) ? favs.filter((i) => i !== id) : [...favs, id];
    setFavs(n);
    localStorage.setItem("favorites", JSON.stringify(n));
  };
  return { favs, toggle };
};
