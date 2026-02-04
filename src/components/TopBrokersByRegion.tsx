// Updated: dismissible, re-open, height matches table
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
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
  pinnedBrokers: _pinned,
  compareBrokers: _compare,
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
          <p className="text-xs text-gray-500 mt-2">
            {REGULATION_WARNINGS[region]}
          </p>
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
