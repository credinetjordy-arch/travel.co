export const MARKET_IDS = ["1", "2", "3", "4", "5"] as const;

export type MarketId = (typeof MARKET_IDS)[number];

export const MARKET_ISO = {
  "1": "BR",
  "2": "PE",
  "3": "CO",
  "4": "EC",
  "5": "PY",
} as const;

export function getActiveMarketId(): MarketId {
  const raw = process.env.ACTIVE_COUNTRY?.trim() ?? "1";
  if (MARKET_IDS.includes(raw as MarketId)) {
    return raw as MarketId;
  }
  return "1";
}

export function getActiveIso() {
  return MARKET_ISO[getActiveMarketId()];
}
