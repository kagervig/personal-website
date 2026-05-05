import YahooFinanceClass from "yahoo-finance2";

const yf = new YahooFinanceClass({ suppressNotices: ["yahooSurvey"] });

interface CacheEntry<T> {
  data: T;
  expires: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (entry && entry.expires > Date.now()) return entry.data;
  return null;
}

export function setCached<T>(key: string, data: T, ttlMs: number): void {
  cache.set(key, { data, expires: Date.now() + ttlMs });
}

export default yf;
