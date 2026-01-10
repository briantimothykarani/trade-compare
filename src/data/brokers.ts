export interface Broker {
  id: string;
  name: string;
  slug: string;
  logo: string;

  regulators: string[];
  regulated: boolean;
  trustScore: number;

  minDeposit: number;
  maxLeverage: number;
  spreads: string;

  forex: boolean;
  indices: boolean;
  crypto: boolean;
  stocks: boolean;

  mt4: boolean;
  mt5: boolean;
  ctrader: boolean;

  beginnerFriendly: boolean;
  scalpingAllowed: boolean;

  bestFor: string[];

  affiliateLink: string;
  lastUpdated: string;
}
