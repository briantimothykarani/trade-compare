/*import { useState } from "react";
import brokers from "../data/brokers.json";
import { filterBrokers } from "../utils/filterBrokers";
import { sortBrokers } from "../utils/sortBrokers";
import type { BrokerFilters } from "../types/filters";
import type { SortOption } from "../types/sort";
import SearchBar from "../components/SearchBar";
import BrokerTable from "../components/BrokerTable";
import Filters from "../components/Filters";

const BrokersPage = () => {
  const [filters, setFilters] = useState<BrokerFilters>({
    search: "",
    traderType: null,
    accountType: null,
    minDepositMax: null,
    assets: {
      forex: false,
      futures: false,
      commodities: false,
      indices: false,
      crypto: false,
      stocks: false,
    },
    platforms: { mt4: false, mt5: false, ctrader: false },
    minTrustScore: null,
    region: null,
    country: null,
  });

  const [sort, setSort] = useState<SortOption>("trust-desc");

  const filtered = filterBrokers(brokers as any, filters);
  const sorted = sortBrokers(filtered, sort);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <div className="flex justify-center py-10 text-4xl md:text-5xl font-bold">
        <span className="text-blue-500 font-mono">Search ,</span>
        <span className="text-red-500 mx-2">Compare</span>
        <span className="text-blue-500 font-mono">, Trade</span>
      </div>
      <SearchBar
        value={filters.search}
        onChange={(v) => setFilters({ ...filters, search: v })}
      />

      <div className="max-w-7xl mx-auto px-4">
        <Filters filters={filters} setFilters={setFilters} />
        <BrokerTable brokers={sorted} />
      </div>
    </div>
  );
};

export default BrokersPage;
import { useState } from "react";
import { motion } from "framer-motion";

import brokers from "../data/brokers.json";
import { filterBrokers } from "../utils/filterBrokers";
import { sortBrokers } from "../utils/sortBrokers";

import type { BrokerFilters } from "../types/filters";
import type { SortOption } from "../types/sort";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import BrokerTable from "../components/BrokerTable";
import Filters from "../components/Filters";
import MarketOverview from "../components/MarketOverview";
import TopBrokersByRegion from "../components/TopBrokersByRegion";
const BrokersPage = () => {
  const [filters, setFilters] = useState<BrokerFilters>({
    search: "",
    traderType: null,
    accountType: null,
    minDepositMax: null,
    assets: {
      forex: false,
      futures: false,
      commodities: false,
      indices: false,
      crypto: false,
      stocks: false,
    },
    platforms: { mt4: false, mt5: false, ctrader: false },
    minTrustScore: null,
    region: null,
    country: null,
  });

  const [sort, setSort] = useState<SortOption>("trust-desc");

  const filtered = filterBrokers(brokers as any, filters);
  const sorted = sortBrokers(filtered, sort);

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <MarketOverview />
      <div className="flex justify-center py-10 text-4xl md:text-5xl font-bold">
        <span className="text-blue-500 font-mono">Search ,</span>
        <span className="text-red-500 mx-2">Compare</span>
        <span className="text-blue-500 font-mono">, Trade</span>
      </div>
      <SearchBar
        value={filters.search}
        onChange={(v) => setFilters({ ...filters, search: v })}
      />
      <Filters filters={filters} setFilters={setFilters} />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <BrokerTable brokers={sorted} />
        </div>

        <TopBrokersByRegion />
      </div>
      <Footer />
    </motion.div>
  );
};

export default BrokersPage;
*/
import { useState } from "react";
import { motion } from "framer-motion";

import brokersData from "../data/brokers.json";
import { filterBrokers } from "../utils/filterBrokers";
import { sortBrokers } from "../utils/sortBrokers";

import type { BrokerFilters } from "../types/filters";
import type { SortOption } from "../types/sort";

import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import BrokerTable from "../components/BrokerTable";
import Filters from "../components/Filters";
import MarketOverview from "../components/MarketOverview";
import TopBrokersByRegion from "../components/TopBrokersByRegion";

const BrokersPage = () => {
  const [filters, setFilters] = useState<BrokerFilters>({
    search: "",
    traderType: null,
    accountType: null,
    minDepositMax: null,
    assets: {
      forex: false,
      futures: false,
      commodities: false,
      indices: false,
      crypto: false,
      stocks: false,
    },
    platforms: { mt4: false, mt5: false, ctrader: false },
    minTrustScore: null,
    region: null,
    country: null,
  });

  const [sort, setSort] = useState<SortOption>("trust-desc");

  // ✅ ALWAYS arrays
  const filtered = filterBrokers(brokersData as any[], filters) ?? [];
  const sorted = sortBrokers(filtered, sort) ?? [];

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <MarketOverview />

      <div className="flex justify-center py-10 text-4xl md:text-5xl font-bold">
        <span className="text-blue-500 font-mono">Search ,</span>
        <span className="text-red-500 mx-2">Compare</span>
        <span className="text-blue-500 font-mono">, Trade</span>
      </div>

      <SearchBar
        value={filters.search}
        onChange={(v) => setFilters({ ...filters, search: v })}
      />

      <Filters filters={filters} setFilters={setFilters} />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {/* ✅ CORRECT PROP */}
          <BrokerTable brokers={sorted} />
        </div>

        <TopBrokersByRegion />
      </div>

      <Footer />
    </motion.div>
  );
};

export default BrokersPage;
