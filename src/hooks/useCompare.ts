import { useState, useEffect } from "react";

export const useCompare = () => {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("compare");
    if (saved) setIds(JSON.parse(saved));
  }, []);

  const toggle = (id: string) => {
    const next = ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id];

    setIds(next);
    localStorage.setItem("compare", JSON.stringify(next));
  };

  const clear = () => {
    setIds([]);
    localStorage.removeItem("compare");
  };

  return { ids, toggle, clear };
};
