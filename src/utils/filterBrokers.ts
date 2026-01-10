import type { Broker } from "../types/broker";
import type { BrokerFilters } from "../types/filters";

/**
 * filterBrokers filters a list of brokers based on the given filters.
 * @param brokers - The full list of brokers
 * @param filters - The filter object
 * @returns The filtered list of brokers
 */
export const filterBrokers = (
  brokers: Broker[],
  filters: BrokerFilters,
): Broker[] => {
  return brokers.filter((b) => {
    const search = filters.search.toLowerCase();

    // Text search: name, country, regulators
    if (
      search &&
      !(
        b.name.toLowerCase().includes(search) ||
        b.country.toLowerCase().includes(search) ||
        b.regulators.join(" ").toLowerCase().includes(search)
      )
    )
      return false;

    // Trader type filters
    if (filters.traderType === "beginner" && !b.beginnerFriendly) return false;
    if (filters.traderType === "scalper" && !b.scalpingAllowed) return false;

    // Account type filter
    if (filters.accountType && !b.accountTypes.includes(filters.accountType))
      return false;

    // Minimum deposit filter
    if (filters.minDepositMax !== null && b.minDeposit > filters.minDepositMax)
      return false;

    // Asset filters (forex, crypto, commodities, etc.)
    for (const key in filters.assets) {
      if (
        filters.assets[key as keyof typeof filters.assets] &&
        !b.assets[key as keyof typeof b.assets]
      )
        return false;
    }

    // Platform filters (MT4, MT5, cTrader)
    for (const key in filters.platforms) {
      if (
        filters.platforms[key as keyof typeof filters.platforms] &&
        !b.platforms[key as keyof typeof b.platforms]
      )
        return false;
    }

    // Minimum trust score
    if (filters.minTrustScore !== null && b.trustScore < filters.minTrustScore)
      return false;

    // Country and region filters
    if (filters.country && b.country !== filters.country) return false;
    if (!filters.country && filters.region && b.region !== filters.region)
      return false;

    // If none of the filters blocked it, include the broker
    return true;
  });
};
