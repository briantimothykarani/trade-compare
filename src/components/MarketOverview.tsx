/*import React from "react";

/const marketData = [
  // Commodities
  { name: "Gold", value: "+0.25%" },
  { name: "Silver", value: "+0.15%" },
  { name: "Oil", value: "-0.18%" },
  // Major Forex
  { name: "EUR/USD", value: "+0.12%" },
  { name: "GBP/USD", value: "-0.08%" },
  { name: "USD/JPY", value: "+0.07%" },
  // Minor Forex
  { name: "AUD/USD", value: "+0.05%" },
  { name: "NZD/USD", value: "-0.03%" },
  { name: "USD/CAD", value: "+0.02%" },
  // Indices
  { name: "S&P 500", value: "+0.40%" },
  { name: "NASDAQ", value: "+0.55%" },
  { name: "DOW", value: "+0.30%" },
];

const MarketTicker = () => {
  return (
    <div
      className="w-full overflow-hidden bg-gray-50 dark:bg-gray-800 border-b"
      style={{ height: "60px" }} // 3/4 navbar height
    >
      <div className="ticker flex items-center whitespace-nowrap">
        {[...marketData, ...marketData].map((item, index) => (
          <div key={index} className="flex items-center gap-2 px-6">
            <span className="font-semibold">{item.name}</span>
            <span
              className={`font-mono ${
                item.value.startsWith("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;
 */

import { useEffect, useState, useRef } from "react";

const API_KEY = "BFH2ULMKQAU9QIJF";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

type MarketItem = {
  name: string;
  value: number;
};

type SymbolConfig = {
  name: string;
  type: "fx" | "index" | "commodity";
  from?: string;
  to?: string;
  symbol?: string;
};

const SYMBOLS: SymbolConfig[] = [
  // Indices
  { name: "S&P 500", type: "index", symbol: "SPY" },
  { name: "NASDAQ", type: "index", symbol: "QQQ" },
  { name: "DOW", type: "index", symbol: "DIA" },

  // Major FX
  { name: "EUR/USD", type: "fx", from: "EUR", to: "USD" },
  { name: "GBP/USD", type: "fx", from: "GBP", to: "USD" },
  { name: "USD/JPY", type: "fx", from: "USD", to: "JPY" },
  { name: "USD/CHF", type: "fx", from: "USD", to: "CHF" },

  // Minor FX
  { name: "AUD/USD", type: "fx", from: "AUD", to: "USD" },
  { name: "NZD/USD", type: "fx", from: "NZD", to: "USD" },
  { name: "USD/CAD", type: "fx", from: "USD", to: "CAD" },
  { name: "EUR/JPY", type: "fx", from: "EUR", to: "JPY" },

  // Metals
  { name: "Gold", type: "commodity", from: "XAU", to: "USD" },
  { name: "Silver", type: "commodity", from: "XAG", to: "USD" },

  // Oil
  { name: "Oil (WTI)", type: "commodity", from: "WTI", to: "USD" },
];

const MarketTicker = () => {
  const [data, setData] = useState<MarketItem[]>([]);
  const pointer = useRef(0);

  const getCached = (key: string) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp > CACHE_TTL) return null;

    return parsed.value;
  };

  const setCached = (key: string, value: number) => {
    localStorage.setItem(key, JSON.stringify({ value, timestamp: Date.now() }));
  };

  const fetchSymbol = async (cfg: SymbolConfig): Promise<MarketItem | null> => {
    try {
      if (cfg.type === "fx") {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${cfg.from}&to_symbol=${cfg.to}&apikey=${API_KEY}`,
        );
        const json = await res.json();
        const series = json["Time Series FX (Daily)"];
        if (!series) return null;

        const [d1, d2] = Object.keys(series);
        const c1 = parseFloat(series[d1]["4. close"]);
        const c2 = parseFloat(series[d2]["4. close"]);
        return { name: cfg.name, value: +(((c1 - c2) / c2) * 100).toFixed(2) };
      }

      if (cfg.type === "index") {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${cfg.symbol}&apikey=${API_KEY}`,
        );
        const json = await res.json();
        return {
          name: cfg.name,
          value: parseFloat(json["Global Quote"]["10. change percent"]),
        };
      }

      if (cfg.type === "commodity") {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=COMMODITY_EXCHANGE_RATE&from_symbol=${cfg.from}&to_symbol=${cfg.to}&apikey=${API_KEY}`,
        );
        const json = await res.json();
        return {
          name: cfg.name,
          value: parseFloat(
            json["Realtime Currency Exchange Rate"]["8. Percent Change"],
          ),
        };
      }
    } catch {
      return null;
    }
    return null;
  };

  const update = async () => {
    const updated: MarketItem[] = [];

    for (let i = 0; i < SYMBOLS.length; i++) {
      const key = SYMBOLS[i].name;
      const cached = getCached(key);
      if (cached !== null) {
        updated.push({ name: key, value: cached });
      }
    }

    // Rotate – fetch only ONE symbol per minute
    const cfg = SYMBOLS[pointer.current];
    pointer.current = (pointer.current + 1) % SYMBOLS.length;

    const fresh = await fetchSymbol(cfg);
    if (fresh) {
      setCached(fresh.name, fresh.value);
      updated.push(fresh);
    }

    setData(updated);
  };

  useEffect(() => {
    update();
    const interval = setInterval(update, 60_000); // ✅ safe
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-50 dark:bg-gray-800 border-b h-[60px]">
      <div className="ticker flex items-center whitespace-nowrap">
        {[...data, ...data].map((item, idx) => (
          <div key={idx} className="px-6 flex gap-2">
            <span className="font-semibold">{item.name}</span>
            <span
              className={`font-mono ${
                item.value >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.value > 0 ? "+" : ""}
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;
