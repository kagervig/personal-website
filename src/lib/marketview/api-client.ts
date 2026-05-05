import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const BASE_URL = "/api/marketview";

async function customFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const useGetStockIndices = (options?: any) => 
  useQuery({ queryKey: ["market", "stocks"], queryFn: () => customFetch<any[]>("/market/stocks"), ...options?.query });

export const useGetCommodities = (options?: any) => 
  useQuery({ queryKey: ["market", "commodities"], queryFn: () => customFetch<any[]>("/market/commodities"), ...options?.query });

export const useGetAgriculturalCommodities = (options?: any) => 
  useQuery({ queryKey: ["market", "agricultural"], queryFn: () => customFetch<any[]>("/market/agricultural"), ...options?.query });

export const useGetCurrencies = (options?: any) => 
  useQuery({ queryKey: ["market", "currencies"], queryFn: () => customFetch<any[]>("/market/currencies"), ...options?.query });

export const useGetMarketSummary = (options?: any) => 
  useQuery({ queryKey: ["market", "summary"], queryFn: () => customFetch<any>("/market/summary"), ...options?.query });

export const useGetMacroByCountry = (countryId: string, options?: any) => 
  useQuery({ 
    queryKey: ["market", "macro", countryId], 
    queryFn: () => customFetch<any>(`/market/macro/country/${countryId}`), 
    enabled: !!countryId,
    ...options?.query 
  });

export const useGetIndexStocks = (indexId: string, options?: any) => 
  useQuery({ 
    queryKey: ["market", "index-stocks", indexId], 
    queryFn: () => customFetch<any>(`/market/index-stocks/${indexId}`), 
    enabled: !!indexId,
    ...options?.query 
  });

export const useGetSparklines = (params: { symbols: string }, options?: any) => 
  useQuery({ 
    queryKey: ["market", "sparklines", params.symbols], 
    queryFn: () => customFetch<any[]>(`/market/sparklines?symbols=${params.symbols}`), 
    ...options?.query 
  });

export const useGetQuotes = (params: { symbols: string }, options?: any) => 
  useQuery({ 
    queryKey: ["market", "quotes", params.symbols], 
    queryFn: () => customFetch<any>(`/market/quotes?symbols=${params.symbols}`), 
    ...options?.query 
  });

export const useGetMarketChart = (params: { symbol: string, range: string }, options?: any) => 
  useQuery({ 
    queryKey: ["market", "chart", params.symbol, params.range], 
    queryFn: () => customFetch<any>(`/market/chart?symbol=${params.symbol}&range=${params.range}`), 
    ...options?.query 
  });

// Query Keys for compatibility
export const getGetStockIndicesQueryKey = () => ["market", "stocks"];
export const getGetCommoditiesQueryKey = () => ["market", "commodities"];
export const getGetAgriculturalCommoditiesQueryKey = () => ["market", "agricultural"];
export const getGetCurrenciesQueryKey = () => ["market", "currencies"];
export const getGetMarketSummaryQueryKey = () => ["market", "summary"];
export const getGetMacroByCountryQueryKey = (id: string) => ["market", "macro", id];
export const getGetIndexStocksQueryKey = (id: string) => ["market", "index-stocks", id];
export const getGetSparklinesQueryKey = (params: any) => ["market", "sparklines", params.symbols];
export const getGetQuotesQueryKey = (params: any) => ["market", "quotes", params.symbols];
export const getGetMarketChartQueryKey = (params: any) => ["market", "chart", params.symbol, params.range];
