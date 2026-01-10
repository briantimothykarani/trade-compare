export interface BrokerFilters {
  search: string; // Text search (matches broker name, country, or regulators)

  // Trader type filter
  traderType: "beginner" | "day" | "swing" | "scalper" | null;

  // Account type filter
  accountType: "cent" | "commission" | "spread-only" | "ecn" | null;

  // Maximum deposit allowed
  minDepositMax: number | null;

  // Assets the broker offers
  assets: {
    forex: boolean;
    futures: boolean;
    commodities: boolean;
    indices: boolean;
    crypto: boolean;
    stocks: boolean;
  };

  // Platforms the broker supports
  platforms: {
    mt4: boolean;
    mt5: boolean;
    ctrader: boolean;
  };

  // Minimum trust score (1-5)
  minTrustScore: number | null;

  // Filter by region or specific country
  region: string | null;
  country: string | null;
}

// SortOption defines the allowed ways to sort brokers
export type SortOption = "trust-desc" | "deposit-asc" | "deposit-desc";
