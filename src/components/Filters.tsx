/*import { useState } from "react";
import type { BrokerFilters } from "../types/filters";

interface Props {
  filters: BrokerFilters;
  setFilters: (f: BrokerFilters) => void;
}

const Filters = ({ filters, setFilters }: Props) => {
  // Local state to toggle hidden filters
  const [showHidden, setShowHidden] = useState(false);

  // --- Helper functions ---
  // Toggle a boolean filter (like platform or asset)
  const toggleBooleanFilter = (key: keyof typeof filters.platforms) => {
    setFilters({
      ...filters,
      platforms: {
        ...filters.platforms,
        [key]: !filters.platforms[key],
      },
    });
  };

  const toggleTraderType = (type: BrokerFilters["traderType"]) => {
    setFilters({
      ...filters,
      traderType: filters.traderType === type ? null : type,
    });
  };

  const toggleAccountType = (type: BrokerFilters["accountType"]) => {
    setFilters({
      ...filters,
      accountType: filters.accountType === type ? null : type,
    });
  };

  return (
    <div className="my-4">
      //--- Main filters --- 
      <div className="flex justify-center flex-wrap gap-2">
        // Trader type buttons 
        <button
          className={`px-3 py-1 rounded-full ${
            filters.traderType === "beginner"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => toggleTraderType("beginner")}
        >
          Beginner {filters.traderType === "beginner" && "✕"}
        </button>
        <button
          className={`px-3 py-1 rounded-full ${
            filters.traderType === "scalper"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => toggleTraderType("scalper")}
        >
          Scalper {filters.traderType === "scalper" && "✕"}
        </button>
        //Account type buttons
        <button
          className={`px-3 py-1 rounded-full ${
            filters.accountType === "cent"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => toggleAccountType("cent")}
        >
          Cent {filters.accountType === "cent" && "✕"}
        </button>
        <button
          className={`px-3 py-1 rounded-full ${
            filters.accountType === "ecn"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => toggleAccountType("ecn")}
        >
          ECN {filters.accountType === "ecn" && "✕"}
        </button>
      </div>
      // Hidden filters toggle button
      <div className="flex justify-center">
        <button
          className="mt-2  px-4 py-2 bg-gray-300 rounded"
          onClick={() => setShowHidden(!showHidden)}
        >
          {showHidden ? "Hide advanced filters" : "Show advanced filters"}
        </button>
      </div>
      //Hidden filters
      {showHidden && (
        <div className="mt-2 flex justify-center flex-wrap gap-2">
          // Platforms 
          {Object.keys(filters.platforms).map((key) => {
            const k = key as keyof typeof filters.platforms;
            return (
              <button
                key={k}
                className={`px-3 py-1 rounded-full ${
                  filters.platforms[k]
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => toggleBooleanFilter(k)}
              >
                {k.toUpperCase()} {filters.platforms[k] && "✕"}
              </button>
            );
          })}
          // Minimum deposit
          <div className="flex items-center gap-2">
            <label>Max Deposit: ${filters.minDepositMax ?? 10000000}</label>
            <input
              type="range"
              min={5}
              max={10000000}
              step={50}
              value={filters.minDepositMax ?? 10000000}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minDepositMax: Number(e.target.value),
                })
              }
              className="w-48"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;

import { useState } from "react";
import type { BrokerFilters } from "../types/filters";

interface Props {
  filters: BrokerFilters;
  setFilters: (f: BrokerFilters) => void;
}

type ActiveFilter =
  | "assets"
  | "traders"
  | "accounts"
  | "platforms"
  | "advanced"
  | null;

const Filters = ({ filters, setFilters }: Props) => {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(null);


  const toggleAsset = (key: keyof BrokerFilters["assets"]) => {
    setFilters({
      ...filters,
      assets: {
        ...filters.assets,
        [key]: !filters.assets[key],
      },
    });
  };

  const togglePlatform = (key: keyof BrokerFilters["platforms"]) => {
    setFilters({
      ...filters,
      platforms: {
        ...filters.platforms,
        [key]: !filters.platforms[key],
      },
    });
  };

  const toggleTraderType = (type: BrokerFilters["traderType"]) => {
    setFilters({
      ...filters,
      traderType: filters.traderType === type ? null : type,
    });
  };

  const toggleAccountType = (type: BrokerFilters["accountType"]) => {
    setFilters({
      ...filters,
      accountType: filters.accountType === type ? null : type,
    });
  };

  const mainBtnClass = (key: ActiveFilter) =>
    `px-4 py-2 rounded ${
      activeFilter === key ? "bg-blue-600 text-white" : "bg-gray-200"
    }`;


  return (
    <div className="my-4 space-y-4">
      <div className="flex justify-center flex-wrap gap-2">
        <button
          className={mainBtnClass("assets")}
          onClick={() => setActiveFilter("assets")}
        >
          Assets
        </button>
        <button
          className={mainBtnClass("traders")}
          onClick={() => setActiveFilter("traders")}
        >
          Traders
        </button>
        <button
          className={mainBtnClass("accounts")}
          onClick={() => setActiveFilter("accounts")}
        >
          Accounts
        </button>
        <button
          className={mainBtnClass("platforms")}
          onClick={() => setActiveFilter("platforms")}
        >
          Platforms
        </button>
        <button
          className={mainBtnClass("advanced")}
          onClick={() => setActiveFilter("advanced")}
        >
          Advanced
        </button>
      </div>

        <div className="flex justify-center flex-wrap gap-2">
          {Object.keys(filters.assets).map((key) => {
            const k = key as keyof BrokerFilters["assets"];
            return (
              <button
                key={k}
                className={`px-3 py-1 rounded-full ${
                  filters.assets[k] ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => toggleAsset(k)}
              >
                {k.toUpperCase()} {filters.assets[k] && "✕"}
              </button>
            );
          })}
        </div>
      )}

      {activeFilter === "traders" && (
        <div className="flex justify-center flex-wrap gap-2">
          {(["beginner", "day", "swing", "scalper"] as const).map((type) => (
            <button
              key={type}
              className={`px-3 py-1 rounded-full ${
                filters.traderType === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => toggleTraderType(type)}
            >
              {type.toUpperCase()} {filters.traderType === type && "✕"}
            </button>
          ))}
        </div>
      )}

      {activeFilter === "accounts" && (
        <div className="flex justify-center flex-wrap gap-2">
          {(["cent", "commission", "spread-only", "ecn"] as const).map(
            (type) => (
              <button
                key={type}
                className={`px-3 py-1 rounded-full ${
                  filters.accountType === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => toggleAccountType(type)}
              >
                {type.toUpperCase()} {filters.accountType === type && "✕"}
              </button>
            ),
          )}
        </div>
      )}

      {activeFilter === "platforms" && (
        <div className="flex justify-center flex-wrap gap-2">
          {Object.keys(filters.platforms).map((key) => {
            const k = key as keyof BrokerFilters["platforms"];
            return (
              <button
                key={k}
                className={`px-3 py-1 rounded-full ${
                  filters.platforms[k]
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => togglePlatform(k)}
              >
                {k.toUpperCase()} {filters.platforms[k] && "✕"}
              </button>
            );
          })}
        </div>
      )}

      {activeFilter === "advanced" && (
        <div className="flex justify-center items-center gap-4">
          <label className="font-medium">
            Max Deposit: ${filters.minDepositMax ?? 10000000}
          </label>
          <input
            type="range"
            min={5}
            max={10000000}
            step={50}
            value={filters.minDepositMax ?? 10000000}
            onChange={(e) =>
              setFilters({
                ...filters,
                minDepositMax: Number(e.target.value),
              })
            }
            className="w-60"
          />
        </div>
      )}
    </div>
  );
};

export default Filters;
*/

import { useEffect, useState } from "react";
import type { BrokerFilters } from "../types/filters";

interface Props {
  filters: BrokerFilters;
  setFilters: (f: BrokerFilters) => void;
}

/**
 * UI-only state
 * Controls which filter SECTIONS are open
 */
const Filters = ({ filters, setFilters }: Props) => {
  const [open, setOpen] = useState({
    assets: false,
    traders: false,
    accounts: false,
    platforms: false,
    advanced: false,
  });

  /* ============================================================
     AUTO-OPEN SECTIONS WHEN FILTERS ARE SET
     (important for URL restore, refresh, saved searches)
  ============================================================ */
  useEffect(() => {
    setOpen((prev) => ({
      assets: prev.assets || Object.values(filters.assets).some(Boolean),
      platforms:
        prev.platforms || Object.values(filters.platforms).some(Boolean),
      traders: prev.traders || filters.traderType !== null,
      accounts: prev.accounts || filters.accountType !== null,
      advanced: prev.advanced || filters.minDepositMax !== null,
    }));
  }, [filters]);

  /* ============================================================
     URL → FILTERS (ON FIRST LOAD ONLY)
  ============================================================ */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const assets = { ...filters.assets };
    params.getAll("asset").forEach((a) => {
      if (a in assets) assets[a as keyof typeof assets] = true;
    });

    const platforms = { ...filters.platforms };
    params.getAll("platform").forEach((p) => {
      if (p in platforms) platforms[p as keyof typeof platforms] = true;
    });

    setFilters({
      ...filters,
      traderType: params.get("trader") as BrokerFilters["traderType"],
      accountType: params.get("account") as BrokerFilters["accountType"],
      minDepositMax: params.get("deposit")
        ? Number(params.get("deposit"))
        : null,
      assets,
      platforms,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ============================================================
     FILTERS → URL (SYNC)
  ============================================================ */
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.traderType) params.set("trader", filters.traderType);
    if (filters.accountType) params.set("account", filters.accountType);
    if (filters.minDepositMax !== null)
      params.set("deposit", String(filters.minDepositMax));

    Object.entries(filters.assets).forEach(([k, v]) => {
      if (v) params.append("asset", k);
    });

    Object.entries(filters.platforms).forEach(([k, v]) => {
      if (v) params.append("platform", k);
    });

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
  }, [filters]);

  /* ============================================================
     HELPERS
  ============================================================ */

  const toggleSection = (key: keyof typeof open) =>
    setOpen({ ...open, [key]: !open[key] });

  const toggleAsset = (key: keyof BrokerFilters["assets"]) =>
    setFilters({
      ...filters,
      assets: { ...filters.assets, [key]: !filters.assets[key] },
    });

  const togglePlatform = (key: keyof BrokerFilters["platforms"]) =>
    setFilters({
      ...filters,
      platforms: { ...filters.platforms, [key]: !filters.platforms[key] },
    });

  const toggleTraderType = (type: BrokerFilters["traderType"]) =>
    setFilters({
      ...filters,
      traderType: filters.traderType === type ? null : type,
    });

  const toggleAccountType = (type: BrokerFilters["accountType"]) =>
    setFilters({
      ...filters,
      accountType: filters.accountType === type ? null : type,
    });

  /* ============================================================
     CLEAR SECTION / CLEAR ALL
  ============================================================ */

  const clearSection = (section: keyof typeof open) => {
    switch (section) {
      case "assets":
        setFilters({
          ...filters,
          assets: {
            forex: false,
            futures: false,
            commodities: false,
            indices: false,
            crypto: false,
            stocks: false,
          },
        });
        break;
      case "platforms":
        setFilters({
          ...filters,
          platforms: { mt4: false, mt5: false, ctrader: false },
        });
        break;
      case "traders":
        setFilters({ ...filters, traderType: null });
        break;
      case "accounts":
        setFilters({ ...filters, accountType: null });
        break;
      case "advanced":
        setFilters({ ...filters, minDepositMax: null });
        break;
    }
  };

  const clearAll = () => {
    setFilters({
      search: "",
      traderType: null,
      accountType: null,
      minDepositMax: null,
      minTrustScore: null,
      region: null,
      country: null,
      assets: {
        forex: false,
        futures: false,
        commodities: false,
        indices: false,
        crypto: false,
        stocks: false,
      },
      platforms: {
        mt4: false,
        mt5: false,
        ctrader: false,
      },
    });

    setOpen({
      assets: false,
      traders: false,
      accounts: false,
      platforms: false,
      advanced: false,
    });
  };

  /* ============================================================
     COUNTERS (derived from filters)
  ============================================================ */

  const assetCount = Object.values(filters.assets).filter(Boolean).length;
  const platformCount = Object.values(filters.platforms).filter(Boolean).length;
  const traderCount = filters.traderType ? 1 : 0;
  const accountCount = filters.accountType ? 1 : 0;
  const advancedCount = filters.minDepositMax !== null ? 1 : 0;

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div className="my-4 space-y-4">
      {/* ===== MAIN BUTTONS ===== */}
      <div className="flex justify-center flex-wrap gap-2">
        <MainButton
          label="Assets"
          count={assetCount}
          open={open.assets}
          onClick={() => toggleSection("assets")}
        />
        <MainButton
          label="Traders"
          count={traderCount}
          open={open.traders}
          onClick={() => toggleSection("traders")}
        />
        <MainButton
          label="Accounts"
          count={accountCount}
          open={open.accounts}
          onClick={() => toggleSection("accounts")}
        />
        <MainButton
          label="Platforms"
          count={platformCount}
          open={open.platforms}
          onClick={() => toggleSection("platforms")}
        />
        <MainButton
          label="Advanced"
          count={advancedCount}
          open={open.advanced}
          onClick={() => toggleSection("advanced")}
        />

        <button
          onClick={clearAll}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear All
        </button>
      </div>

      {/* ===== ASSETS ===== */}
      {open.assets && (
        <Section clear={() => clearSection("assets")}>
          {Object.keys(filters.assets).map((key) => {
            const k = key as keyof BrokerFilters["assets"];
            return (
              <Chip
                key={k}
                active={filters.assets[k]}
                onClick={() => toggleAsset(k)}
                label={k}
              />
            );
          })}
        </Section>
      )}

      {/* ===== TRADERS ===== */}
      {open.traders && (
        <Section clear={() => clearSection("traders")}>
          {(["beginner", "day", "swing", "scalper"] as const).map((t) => (
            <Chip
              key={t}
              active={filters.traderType === t}
              onClick={() => toggleTraderType(t)}
              label={t}
            />
          ))}
        </Section>
      )}

      {/* ===== ACCOUNTS ===== */}
      {open.accounts && (
        <Section clear={() => clearSection("accounts")}>
          {(["cent", "commission", "spread-only", "ecn"] as const).map((a) => (
            <Chip
              key={a}
              active={filters.accountType === a}
              onClick={() => toggleAccountType(a)}
              label={a}
            />
          ))}
        </Section>
      )}

      {/* ===== PLATFORMS ===== */}
      {open.platforms && (
        <Section clear={() => clearSection("platforms")}>
          {Object.keys(filters.platforms).map((key) => {
            const k = key as keyof BrokerFilters["platforms"];
            return (
              <Chip
                key={k}
                active={filters.platforms[k]}
                onClick={() => togglePlatform(k)}
                label={k}
              />
            );
          })}
        </Section>
      )}

      {/* ===== ADVANCED ===== */}
      {open.advanced && (
        <Section clear={() => clearSection("advanced")}>
          <label>Max Deposit: ${filters.minDepositMax ?? 10000000}</label>
          <input
            type="range"
            min={5}
            max={10000000}
            step={50}
            value={filters.minDepositMax ?? 10000000}
            onChange={(e) =>
              setFilters({ ...filters, minDepositMax: Number(e.target.value) })
            }
          />
        </Section>
      )}
    </div>
  );
};

/* ============================================================
   SMALL REUSABLE UI COMPONENTS
============================================================ */

const MainButton = ({
  label,
  count,
  open,
  onClick,
}: {
  label: string;
  count: number;
  open: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded ${
      open ? "bg-blue-600 text-white" : "bg-gray-200"
    }`}
  >
    {label} {count > 0 && `(${count})`}
  </button>
);

const Section = ({
  children,
  clear,
}: {
  children: React.ReactNode;
  clear: () => void;
}) => (
  <>
    <div className="flex justify-end">
      <button onClick={clear} className="text-sm text-red-500">
        Clear
      </button>
    </div>
    <div className="flex justify-center flex-wrap gap-2">{children}</div>
  </>
);

const Chip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full ${
      active ? "bg-blue-500 text-white" : "bg-gray-200"
    }`}
  >
    {label.toUpperCase()} {active && "✕"}
  </button>
);

export default Filters;
