export interface Broker {
  id: string;
  name: string;
  logo: string;

  trustScore: number;
  regulators: string[];
  country: string;
  region: string;

  minDeposit: number;
  accountTypes: ("cent" | "commission" | "spread-only" | "ecn")[];

  assets: {
    forex: boolean;
    futures: boolean;
    commodities: boolean;
    indices: boolean;
    crypto: boolean;
    stocks: boolean;
  };

  platforms: {
    mt4: boolean;
    mt5: boolean;
    ctrader: boolean;
  };

  beginnerFriendly: boolean;
  scalpingAllowed: boolean;

  affiliateLink: string;
}
