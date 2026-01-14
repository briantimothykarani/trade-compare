/*import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, AlertTriangle } from "lucide-react";
import brokers from "../data/brokers.json";
import type { Broker } from "../types/broker";

const REGULATION_WARNINGS: Record<string, string> = {
  Europe:
    "EU residents trade CFDs under ESMA leverage restrictions. Capital at risk.",
  Oceania: "Australian brokers are regulated by ASIC. Leverage limits apply.",
  Asia: "Regulation varies by country. Investor protections may be limited.",
  "North America":
    "CFD trading may be restricted or unavailable in your country.",
  Global: "CFDs are complex instruments with a high risk of losing money.",
};

const fetchUserRegion = async (): Promise<string> => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    if (data.continent_code === "EU") return "Europe";
    if (data.continent_code === "OC") return "Oceania";
    if (data.continent_code === "AS") return "Asia";
    if (data.continent_code === "NA") return "North America";

    return "Global";
  } catch {
    return "Global";
  }
};

const getBadges = (b: Broker): string[] => {
  const badges: string[] = [];

  if (b.trustScore === 5) badges.push("Top Rated");
  if (b.beginnerFriendly) badges.push("Beginner Friendly");
  if (b.scalpingAllowed) badges.push("Scalping Allowed");
  if (b.regulators.length >= 2) badges.push("Well Regulated");

  return badges.slice(0, 3);
};

const ROTATION_INTERVAL = 6000; // ⏱ Auto-rotate every 6s

const TopBrokersByRegion = () => {
  const [region, setRegion] = useState("Detecting...");
  const [rotationIndex, setRotationIndex] = useState(0);
  const [showFiveStars, setShowFiveStars] = useState(false);

  useEffect(() => {
    fetchUserRegion().then(setRegion);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowFiveStars(true), 7000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationIndex((i) => i + 1);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const regionBrokers = useMemo(() => {
    return (brokers as Broker[])
      .filter((b) => b.region === region)
      .sort((a, b) => b.trustScore - a.trustScore);
  }, [region]);

  const fiveStarBrokers = useMemo(() => {
    if (!showFiveStars) return [];
    return (brokers as Broker[])
      .filter((b) => b.trustScore === 5 && b.region !== region)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [showFiveStars, region]);

  const finalList = [...regionBrokers, ...fiveStarBrokers];
  const visible = finalList.slice(rotationIndex, rotationIndex + 5);

  return (
    <aside className="w-120 lg:w-80 sticky top-24">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 border rounded-xl shadow-md p-4"
      >
        <h3 className="text-lg font-semibold mb-2">
          ⭐ Top Brokers in {region}
        </h3>

        <div className="flex gap-2 items-start text-xs text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded mb-4">
          <AlertTriangle size={14} />
          {REGULATION_WARNINGS[region] ?? REGULATION_WARNINGS.Global}
        </div>

        <ul className="space-y-4">
          <AnimatePresence>
            {visible.map((b, index) => (
              <motion.li
                key={b.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 border rounded-lg dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <img src={b.logo} className="h-6" />

                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{b.name}</span>
                      {index === 0 && (
                        <Crown size={14} className="text-yellow-500" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      Trust: {b.trustScore}★
                    </div>
                  </div>

                  <a
                    href={b.affiliateLink}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    Visit
                  </a>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {getBadges(b).map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="mt-4 text-center">
          <a
            href={`/brokers?region=${region}`}
            className="text-sm text-blue-500 hover:underline"
          >
            View all brokers in {region} →
          </a>
        </div>
      </motion.div>
    </aside>
  );
};

export default TopBrokersByRegion;
*/

// Updated: dismissible, re-open, height matches table
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Crown, X } from "lucide-react";
import brokers from "../data/brokers.json";
import type { Broker } from "../types/broker";

const REGULATION_WARNINGS: Record<string, string> = {
  Europe:
    "EU residents trade CFDs under ESMA leverage restrictions. Capital at risk.",
  Oceania: "Australian brokers are regulated by ASIC. Leverage limits apply.",
  Asia: "Regulation varies by country. Investor protections may be limited.",
  "North America":
    "CFD trading may be restricted or unavailable in your country.",
  Global: "CFDs are complex instruments with a high risk of losing money.",
};

const TopBrokersByRegion = ({
  pinnedBrokers,
  setPinnedBrokers,
  compareBrokers,
  setCompareBrokers,
}: any) => {
  const [region, setRegion] = useState("Detecting...");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.continent_code === "EU") setRegion("Europe");
        else if (data.continent_code === "OC") setRegion("Oceania");
        else if (data.continent_code === "AS") setRegion("Asia");
        else if (data.continent_code === "NA") setRegion("North America");
        else setRegion("Global");
      });
  }, []);

  const regionBrokers = useMemo(() => {
    return (brokers as Broker[])
      .filter((b) => b.region === region)
      .sort((a, b) => b.trustScore - a.trustScore);
  }, [region]);

  if (!visible)
    return (
      <div className="sticky top-24">
        <button
          className="text-sm px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
          onClick={() => setVisible(true)}
        >
          Re-open Top Brokers
        </button>
      </div>
    );

  return (
    <aside className="w-full lg:w-80 sticky top-24">
      <motion.div className="bg-white dark:bg-gray-800 border rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">⭐ Top Brokers in {region}</h3>
          <button onClick={() => setVisible(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto">
          {regionBrokers.map((b) => (
            <div
              key={b.id}
              className="p-3 border rounded-lg flex flex-col gap-2 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={b.logo} alt={b.name} className="h-6" />
                  <span className="font-medium">{b.name}</span>
                </div>
                <span className="font-semibold text-yellow-500">
                  {b.trustScore}★
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {b.beginnerFriendly && "Beginner Friendly, "}
                {b.scalpingAllowed && "Scalping Allowed"}
              </div>
              <a
                href={b.affiliateLink}
                target="_blank"
                className="text-xs text-blue-500 hover:underline"
              >
                Visit
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </aside>
  );
};

export default TopBrokersByRegion;
