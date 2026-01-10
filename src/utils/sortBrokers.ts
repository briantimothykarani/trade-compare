import type { Broker } from "../types/broker";
import type { SortOption } from "../types/filters";

/**
 * sortBrokers sorts brokers according to a sort option
 * @param brokers - The array of brokers to sort
 * @param sort - The sort option
 * @returns The sorted array of brokers
 */
export const sortBrokers = (brokers: Broker[], sort: SortOption): Broker[] => {
  // Make a copy to avoid mutating original array
  const list = [...brokers];

  switch (sort) {
    case "trust-desc":
      return list.sort((a, b) => b.trustScore - a.trustScore); // highest trust first
    case "deposit-asc":
      return list.sort((a, b) => a.minDeposit - b.minDeposit); // lowest deposit first
    case "deposit-desc":
      return list.sort((a, b) => b.minDeposit - a.minDeposit); // highest deposit first
    default:
      return list; // fallback: return unsorted
  }
};
