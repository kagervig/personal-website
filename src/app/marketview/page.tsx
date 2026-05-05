"use client";

import { useState, useCallback, useMemo } from "react";
import { BarChart2, Globe, TrendingUp, Droplets, DollarSign, Activity, Moon, Sun, RefreshCw, Loader2, BookMarked, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useGetStockIndices,
  useGetCommodities,
  useGetAgriculturalCommodities,
  useGetCurrencies,
  useGetMacroByCountry,
  useGetMarketSummary,
  useGetIndexStocks,
  useGetSparklines,
  getGetStockIndicesQueryKey,
  getGetCommoditiesQueryKey,
  getGetAgriculturalCommoditiesQueryKey,
  getGetCurrenciesQueryKey,
  getGetMacroByCountryQueryKey,
  getGetMarketSummaryQueryKey,
  getGetIndexStocksQueryKey,
  getGetSparklinesQueryKey,
} from "@/lib/marketview/api-client";
import { TickerCard, type TickerData } from "@/components/marketview/TickerCard";
import { TickerModal } from "@/components/marketview/TickerModal";
import { MacroIndicatorCard, type MacroIndicator } from "@/components/marketview/MacroIndicatorCard";
import { SentimentBanner } from "@/components/marketview/SentimentBanner";
import { SkeletonGrid, SkeletonMacro, SkeletonTable } from "@/components/marketview/SkeletonGrid";
import { TopMovers } from "@/components/marketview/TopMovers";
import { IndexMarketTab } from "@/components/marketview/IndexMarketTab";
import type { IndexStock } from "@/components/marketview/IndexStockTable";
import { WatchlistView } from "@/components/marketview/WatchlistView";

type Tab = "overview" | "stocks" | "commodities" | "currencies" | "macro" | "etfs";

type EtfsSubTab = "etfs" | "watchlist";

type MacroSubTab = "usa" | "uk" | "canada" | "eu";

const MACRO_SUBTABS: { id: MacroSubTab; label: string; flag: string }[] = [
  { id: "usa", label: "USA", flag: "🇺🇸" },
  { id: "uk", label: "UK", flag: "🇬🇧" },
  { id: "canada", label: "Canada", flag: "🇨🇦" },
  { id: "eu", label: "EU", flag: "🇪🇺" },
];

const DEFAULT_ETF_SYMBOLS = [
  "XLUP.L",
  "FEUZ.L",
  "EXH9.DE",
  "INRA.L",
  "SPOG.L",
  "WENS.L",
  "HEAW.L",
  "XS2D.L",
  "VEQT.TO",
  "XEQT.TO",
  "XEG.TO",
  "HXE.TO",
  "CEF.TO",
];

const DEFAULT_WATCHLIST_SYMBOLS = ["ELVR", "MSFT", "LIN", "DSV.CO"];

// Sub-tabs for the Stocks tab
type StocksSubTab = "overview" | "nasdaq" | "dowjones" | "tsx" | "ftse100" | "dax" | "hangseng" | "cac40" | "nikkei" | "kospi";

const STOCK_SUBTABS: { id: StocksSubTab; label: string; shortLabel: string }[] = [
  { id: "overview", label: "Overview", shortLabel: "Overview" },
  { id: "nasdaq", label: "NASDAQ", shortLabel: "NASDAQ" },
  { id: "dowjones", label: "Dow Jones", shortLabel: "DJI" },
  { id: "tsx", label: "TSX", shortLabel: "TSX" },
  { id: "ftse100", label: "FTSE 100", shortLabel: "FTSE" },
  { id: "dax", label: "DAX", shortLabel: "DAX" },
  { id: "hangseng", label: "Hang Seng", shortLabel: "HSI" },
  { id: "cac40", label: "CAC 40", shortLabel: "CAC" },
  { id: "nikkei", label: "Nikkei 225", shortLabel: "N225" },
  { id: "kospi", label: "KOSPI", shortLabel: "KOSPI" },
];

const INDEX_META: Record<string, string> = {
  nasdaq: "NASDAQ",
  dowjones: "Dow Jones",
  tsx: "TSX",
  ftse100: "FTSE 100",
  dax: "DAX",
  hangseng: "Hang Seng",
  cac40: "CAC 40",
  nikkei: "Nikkei 225",
  kospi: "KOSPI",
};

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <Globe className="w-4 h-4" /> },
  { id: "stocks", label: "Stock Indices", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "commodities", label: "Commodities", icon: <Droplets className="w-4 h-4" /> },
  { id: "currencies", label: "Currencies", icon: <DollarSign className="w-4 h-4" /> },
  { id: "macro", label: "Macro & Policy", icon: <Activity className="w-4 h-4" /> },
  { id: "etfs", label: "ETFs & Watchlist", icon: <BookMarked className="w-4 h-4" /> },
];

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  return { dark, toggle };
}

// Lazy-loaded index market data — only fetches when the sub-tab is active
type IndexId = "nasdaq" | "dowjones" | "tsx" | "ftse100" | "dax" | "hangseng";

function IndexStocksLoader({ indexId }: { indexId: string }) {
  const id = indexId as IndexId;
  const { data, isLoading, error } = useGetIndexStocks(id, {
    query: { queryKey: getGetIndexStocksQueryKey(id), refetchInterval: 300000, staleTime: 240000 },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading {INDEX_META[indexId]} stocks — fetching fundamentals and technicals…
        </div>
        <SkeletonTable rows={10} cols={5} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
        Failed to load {INDEX_META[indexId]} stock data. Please try again.
      </div>
    );
  }

  return (
    <IndexMarketTab
      indexId={(data as any).indexId}
      indexName={(data as any).indexName}
      stocks={(data as any).stocks as IndexStock[]}
    />
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [stocksSubTab, setStocksSubTab] = useState<StocksSubTab>("overview");
  const [etfsSubTab, setEtfsSubTab] = useState<EtfsSubTab>("etfs");
  const [macroSubTab, setMacroSubTab] = useState<MacroSubTab>("usa");
  const [selectedTicker, setSelectedTicker] = useState<TickerData | null>(null);
  const { dark, toggle } = useTheme();

  const stocks = useGetStockIndices({
    query: { queryKey: getGetStockIndicesQueryKey(), refetchInterval: 60000 },
  });
  const commodities = useGetCommodities({
    query: { queryKey: getGetCommoditiesQueryKey(), refetchInterval: 60000 },
  });
  const agricultural = useGetAgriculturalCommodities({
    query: { queryKey: getGetAgriculturalCommoditiesQueryKey(), refetchInterval: 60000 },
  });
  const currencies = useGetCurrencies({
    query: { queryKey: getGetCurrenciesQueryKey(), refetchInterval: 60000 },
  });
  const summary = useGetMarketSummary({
    query: { queryKey: getGetMarketSummaryQueryKey(), refetchInterval: 60000 },
  });

  // Fetch sparklines for all market tickers in one batch call
  const ALL_MARKET_SYMBOLS = "^IXIC,^DJI,^GSPTSX,^FTMC,^GDAXI,^HSI,^FCHI,^N225,^KS11,CL=F,BZ=F,GC=F,SI=F,NG=F,HG=F,LIT,WCOB.L,EURUSD=X,GBPUSD=X,USDJPY=X,USDCAD=X,AUDUSD=X,USDCNY=X,USDINR=X,USDCHF=X,ZC=F,ZW=F,ZS=F,KC=F,SB=F,CT=F,CC=F,LE=F,HE=F";
  const sparklinesQuery = useGetSparklines(
    { symbols: ALL_MARKET_SYMBOLS },
    { query: { queryKey: getGetSparklinesQueryKey({ symbols: ALL_MARKET_SYMBOLS }), refetchInterval: 600000, staleTime: 300000 } }
  );

  const sparklineMap = useMemo(() => {
    const map = new Map<string, number[]>();
    ((sparklinesQuery.data as any) ?? []).forEach((entry: any) => map.set(entry.symbol, entry.closes));
    return map;
  }, [sparklinesQuery.data]);

  const withSparkline = useCallback((ticker: TickerData): TickerData => ({
    ...ticker,
    sparkline: sparklineMap.get(ticker.symbol) ?? [],
  }), [sparklineMap]);

  const handleTickerClick = useCallback((ticker: TickerData) => {
    setSelectedTicker(ticker);
  }, []);

  const anyLoading = stocks.isLoading || commodities.isLoading || currencies.isLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-sidebar border-b border-sidebar-border">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <BarChart2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-base font-bold text-sidebar-foreground leading-tight">GlobalMacro</h1>
                <p className="text-xs text-sidebar-foreground/50 hidden sm:block">Real-time market intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {(summary.data as any) && (
                <div className={cn(
                  "hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full",
                  (summary.data as any).overallSentiment === "bullish" && "bg-emerald-500/20 text-emerald-300",
                  (summary.data as any).overallSentiment === "bearish" && "bg-red-500/20 text-red-300",
                  (summary.data as any).overallSentiment === "neutral" && "bg-slate-500/20 text-slate-300",
                )}>
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full animate-pulse",
                    (summary.data as any).overallSentiment === "bullish" && "bg-emerald-400",
                    (summary.data as any).overallSentiment === "bearish" && "bg-red-400",
                    (summary.data as any).overallSentiment === "neutral" && "bg-slate-400",
                  )} />
                  {((summary.data as any).overallSentiment.charAt(0).toUpperCase() + (summary.data as any).overallSentiment.slice(1)) as string}
                </div>
              )}
              {anyLoading && <RefreshCw className="w-4 h-4 text-sidebar-foreground/50 animate-spin" />}
              <button
                data-testid="theme-toggle"
                onClick={toggle}
                className="p-2 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                aria-label="Toggle theme"
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary navigation tabs */}
          <div className="flex gap-1 pb-0 overflow-x-auto -mx-1 px-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                data-testid={`tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors border-b-2",
                  tab === t.id
                    ? "text-primary border-primary bg-sidebar-accent/50"
                    : "text-sidebar-foreground/60 border-transparent hover:text-sidebar-foreground hover:bg-sidebar-accent/30"
                )}
              >
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div className="space-y-6">
            {(summary.data as any) && (
              <SentimentBanner

                overallSentiment={(summary.data as any).overallSentiment}
                alerts={(summary.data as any).alerts}
                lastUpdated={(summary.data as any).lastUpdated}
              />
            )}
            {(() => {
              const allTickers = [
                ...(stocks.data as TickerData[] ?? []),
                ...(commodities.data as TickerData[] ?? []),
                ...(agricultural.data as TickerData[] ?? []),
                ...(currencies.data as TickerData[] ?? []),
              ].map(withSparkline);
              return allTickers.length > 0 ? (
                <TopMovers allTickers={allTickers} onTickerClick={handleTickerClick} />
              ) : null;
            })()}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Stock Indices</h2>
              {stocks.isLoading ? <SkeletonGrid count={6} /> : stocks.error ? <ErrorMessage message="Failed to load stock indices" /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {(stocks.data as TickerData[] ?? []).map((t) => <TickerCard key={t.symbol} ticker={withSparkline(t)} onClick={handleTickerClick} />)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Energy & Metals</h2>
              {commodities.isLoading ? <SkeletonGrid count={4} /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {(commodities.data as TickerData[] ?? []).map((t) => <TickerCard key={t.symbol} ticker={withSparkline(t)} onClick={handleTickerClick} />)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Agricultural</h2>
              {agricultural.isLoading ? <SkeletonGrid count={4} /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {(agricultural.data as TickerData[] ?? []).map((t) => <TickerCard key={t.symbol} ticker={withSparkline(t)} onClick={handleTickerClick} />)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Currencies</h2>
              {currencies.isLoading ? <SkeletonGrid count={4} /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {(currencies.data as TickerData[] ?? []).map((t) => <TickerCard key={t.symbol} ticker={withSparkline(t)} onClick={handleTickerClick} />)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STOCKS TAB */}
        {tab === "stocks" && (
          <div className="space-y-0">
            {/* Sub-tab bar */}
            <div className="flex gap-1 overflow-x-auto pb-4 mb-2 border-b border-border">
              {STOCK_SUBTABS.map((st) => (
                <button
                  key={st.id}
                  data-testid={`stocks-subtab-${st.id}`}
                  onClick={() => setStocksSubTab(st.id)}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                    stocksSubTab === st.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <span className="hidden sm:inline">{st.label}</span>
                  <span className="sm:hidden">{st.shortLabel}</span>
                </button>
              ))}
            </div>

            {/* Sub-tab content */}
            <div className="pt-2">
              {stocksSubTab === "overview" && (
                <div className="space-y-4">
                  {(summary.data as any) && (
                    <SentimentBanner

                      overallSentiment={(summary.data as any).overallSentiment}
                      alerts={((summary.data as any).alerts as any[]).filter(a => ["^IXIC","^DJI","^GSPTSX","^FTMC","^GDAXI","^HSI"].some(s => a.symbol === s))}
                      lastUpdated={(summary.data as any).lastUpdated}
                    />
                  )}
                  <SectionHeader
                    title="G20 Stock Indices"
                    subtitle="Click a card to see detailed stock data for that market, including fundamentals and technical indicators"
                  />
                  {stocks.isLoading ? <SkeletonGrid count={6} /> : stocks.error ? <ErrorMessage message="Failed to load stock data" /> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(stocks.data as TickerData[] ?? []).map((t) => {
                        const subTabMap: Record<string, StocksSubTab> = {
                          "^IXIC": "nasdaq", "^DJI": "dowjones", "^GSPTSX": "tsx",
                          "^FTMC": "ftse100", "^GDAXI": "dax", "^HSI": "hangseng",
                          "^FCHI": "cac40", "^N225": "nikkei", "^KS11": "kospi",
                        };
                        return (
                          <TickerCard
                            key={t.symbol}
                            ticker={withSparkline(t)}
                            onClick={() => {
                              const subTab = subTabMap[t.symbol];
                              if (subTab) setStocksSubTab(subTab);
                              else handleTickerClick(t);
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Per-market sub-tabs: render only when selected */}
              {stocksSubTab !== "overview" && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{INDEX_META[stocksSubTab]}</h2>
                      <p className="text-sm text-muted-foreground">Fundamentals, technicals, and market analysis for {INDEX_META[stocksSubTab]} constituents</p>
                    </div>
                  </div>
                  <IndexStocksLoader indexId={stocksSubTab} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* COMMODITIES TAB */}
        {tab === "commodities" && (
          <div className="space-y-8">
            <div className="space-y-3">
              <SectionHeader title="Energy & Metals" subtitle="Click any card for ETF suggestions available in the UK and Canada" />
              {commodities.isLoading ? <SkeletonGrid count={6} /> : commodities.error ? <ErrorMessage message="Failed to load commodities data" /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(commodities.data as TickerData[] ?? []).map((t) => <TickerCard key={t.symbol} ticker={withSparkline(t)} onClick={handleTickerClick} />)}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <SectionHeader title="Agricultural" subtitle="Grains, softs, and livestock futures — click any card for UK & Canada ETF suggestions" />
              {agricultural.isLoading ? <SkeletonGrid count={9} /> : agricultural.error ? <ErrorMessage message="Failed to load agricultural data" /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(agricultural.data as TickerData[] ?? []).map((t) => <TickerCard key={t.symbol} ticker={withSparkline(t)} onClick={handleTickerClick} />)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CURRENCIES TAB */}
        {tab === "currencies" && (
          <div className="space-y-4">
            <SectionHeader title="Currency Pairs" subtitle="Major global FX pairs — click any card to view on Google Finance" />
            {currencies.isLoading ? <SkeletonGrid count={8} /> : currencies.error ? <ErrorMessage message="Failed to load currency data" /> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(currencies.data as TickerData[] ?? []).map((t) => <TickerCard key={t.symbol} ticker={withSparkline(t)} onClick={handleTickerClick} />)}
              </div>
            )}
          </div>
        )}

        {/* MACRO TAB */}
        {tab === "macro" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <SectionHeader
                title="Monetary Policy & Economic Indicators"
                subtitle="Live data from the St. Louis Federal Reserve (FRED) — updated daily/monthly"
              />
            </div>
            {/* Country sub-tab bar */}
            <div className="flex items-center gap-1 border-b border-border">
              {MACRO_SUBTABS.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setMacroSubTab(st.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
                    macroSubTab === st.id
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                  )}
                >
                  <span>{st.flag}</span>
                  {st.label}
                </button>
              ))}
            </div>
            <MacroCountryTab countryId={macroSubTab} />
          </div>
        )}

        {tab === "etfs" && (
          <div className="space-y-6">
            {/* ETFs/Watchlist sub-tab bar */}
            <div className="flex items-center gap-1 border-b border-border">
              {([ { id: "etfs" as EtfsSubTab, label: "ETFs", icon: <BookMarked className="w-3.5 h-3.5" /> }, { id: "watchlist" as EtfsSubTab, label: "Stock Watchlist", icon: <Star className="w-3.5 h-3.5" /> } ]).map((st) => (
                <button
                  key={st.id}
                  onClick={() => setEtfsSubTab(st.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
                    etfsSubTab === st.id
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                  )}
                >
                  {st.icon}
                  {st.label}
                </button>
              ))}
            </div>

            {etfsSubTab === "etfs" && (
              <WatchlistView
                storageKey="globalmacro-etf-list"
                defaultSymbols={DEFAULT_ETF_SYMBOLS}
                title="ETF Tracker"
                description="Track ETFs across any global exchange. Includes price, performance (1D/1W/1M/1Y), fundamentals, and technicals. Add an exchange suffix when needed: .L (LSE), .TO (TSX), .DE (Xetra), .CO (Copenhagen)."
                searchPlaceholder="Add ETF (e.g. SPY or VWRL.L)"
              />
            )}

            {etfsSubTab === "watchlist" && (
              <WatchlistView
                storageKey="globalmacro-watchlist"
                defaultSymbols={DEFAULT_WATCHLIST_SYMBOLS}
                title="Stock Watchlist"
                description="Track individual stocks from any global exchange. Search by ticker and add with exchange suffix if needed."
                searchPlaceholder="Add stock (e.g. AAPL or VOW3.DE)"
              />
            )}
          </div>
        )}
      </main>

      {/* Ticker modal */}
      <TickerModal ticker={selectedTicker} onClose={() => setSelectedTicker(null)} />
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function MacroSection({ title, subtitle, indicators }: { title: string; subtitle: string; indicators: MacroIndicator[] }) {
  return (
    <div>
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {indicators.map((ind) => <MacroIndicatorCard key={ind.id} indicator={ind} />)}
      </div>
    </div>
  );
}

const COUNTRY_SECTIONS: Record<string, { interestRates: string; inflation: string; gdp: string; sentiment: string; subtitle: string }> = {
  usa: {
    interestRates: "Federal Reserve rates and yield curve",
    inflation: "CPI, PCE, and inflation expectations",
    gdp: "Gross domestic product and growth rates",
    sentiment: "Employment, payrolls, and consumer confidence",
    subtitle: "Federal Reserve (FRED)",
  },
  uk: {
    interestRates: "Bank of England rate, gilts, and money markets",
    inflation: "CPI and price indices",
    gdp: "Output and industrial production",
    sentiment: "Labour market and consumer confidence",
    subtitle: "Bank of England / ONS data via FRED",
  },
  canada: {
    interestRates: "Bank of Canada overnight rate and bond yields",
    inflation: "CPI and core inflation",
    gdp: "Output and industrial production",
    sentiment: "Labour market and consumer confidence",
    subtitle: "Bank of Canada / Statistics Canada data via FRED",
  },
  eu: {
    interestRates: "ECB policy rates, Euribor, and euro area yields",
    inflation: "HICP and core inflation",
    gdp: "Euro area output and industrial production",
    sentiment: "Euro area labour market and consumer confidence",
    subtitle: "European Central Bank / Eurostat data via FRED",
  },
};

function MacroCountryTab({ countryId }: { countryId: string }) {
  const { data, isLoading, error } = useGetMacroByCountry(countryId as "usa" | "uk" | "canada" | "eu", {
    query: { queryKey: getGetMacroByCountryQueryKey(countryId as "usa" | "uk" | "canada" | "eu"), refetchInterval: 600000, staleTime: 540000 },
  });

  const sections = COUNTRY_SECTIONS[countryId] ?? COUNTRY_SECTIONS.usa;

  if (isLoading) return <SkeletonMacro count={12} />;
  if (error || !data) return <ErrorMessage message="Failed to load macroeconomic data" />;

  return (
    <div className="space-y-8">
      <MacroSection title="Interest Rates" subtitle={sections.interestRates} indicators={(data as any).interestRates as MacroIndicator[]} />
      <MacroSection title="Inflation" subtitle={sections.inflation} indicators={(data as any).inflation as MacroIndicator[]} />
      <MacroSection title="GDP & Growth" subtitle={sections.gdp} indicators={(data as any).gdp as MacroIndicator[]} />
      <MacroSection title="Labor Market & Sentiment" subtitle={sections.sentiment} indicators={(data as any).sentiment as MacroIndicator[]} />
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
      <p>{message}. Please check the API connection and try again.</p>
    </div>
  );
}
