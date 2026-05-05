import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, RefreshCw, X } from "lucide-react";
import { IndexStockTable } from "./IndexStockTable";
import type { IndexStock } from "./IndexStockTable";
import { cn } from "@/lib/utils";

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setAndStore = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next =
          typeof newValue === "function"
            ? (newValue as (prev: T) => T)(prev)
            : newValue;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [key]
  );

  return [value, setAndStore] as const;
}

type Mode = "price" | "performance" | "fundamentals" | "technical";

const MODES: { id: Mode; label: string }[] = [
  { id: "price", label: "Price" },
  { id: "performance", label: "Performance" },
  { id: "fundamentals", label: "Fundamentals" },
  { id: "technical", label: "Technical" },
];

interface Props {
  storageKey: string;
  defaultSymbols: string[];
  title: string;
  description?: string;
  searchPlaceholder?: string;
}

interface QuotesResponse {
  stocks: IndexStock[];
  lastUpdated: string;
}

export function WatchlistView({
  storageKey,
  defaultSymbols,
  title,
  description,
  searchPlaceholder = "Add symbol (e.g. AAPL)",
}: Props) {
  const [symbols, setSymbols] = useLocalStorage<string[]>(
    storageKey,
    defaultSymbols
  );
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<Mode>("price");
  const [addError, setAddError] = useState("");

  const symbolsKey = symbols.join(",");

  const { data, isLoading, isFetching, refetch, error } =
    useQuery<QuotesResponse>({
      queryKey: ["quotes", symbolsKey],
      queryFn: async () => {
        if (symbols.length === 0) return { stocks: [], lastUpdated: "" };
        const res = await fetch(
          `/api/marketview/market/quotes?symbols=${encodeURIComponent(symbolsKey)}`
        );
        if (!res.ok) throw new Error("Failed to fetch quotes");
        return res.json() as Promise<QuotesResponse>;
      },
      enabled: symbols.length > 0,
      staleTime: 90_000,
      refetchInterval: 180_000,
    });

  function handleAdd() {
    const sym = search.trim().toUpperCase();
    if (!sym) return;
    if (symbols.map((s) => s.toUpperCase()).includes(sym)) {
      setAddError("Already in list");
      return;
    }
    setSymbols((prev) => [...prev, sym]);
    setSearch("");
    setAddError("");
  }

  function handleRemove(symbol: string) {
    setSymbols((prev) => prev.filter((s) => s !== symbol));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleAdd();
    else if (addError) setAddError("");
  }

  const stocks = data?.stocks ?? [];
  const lastUpdated = data?.lastUpdated
    ? new Date(data.lastUpdated).toLocaleTimeString()
    : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </h2>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
          {lastUpdated && (
            <p className="text-xs text-muted-foreground/60 mt-0.5">
              Updated {lastUpdated}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-0.5 bg-muted rounded-md p-0.5">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={cn(
                  "px-2.5 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap",
                  mode === m.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            title="Refresh"
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
          >
            <RefreshCw
              className={cn("w-3.5 h-3.5", isFetching && "animate-spin")}
            />
          </button>
        </div>
      </div>

      <div className="flex items-start gap-3 flex-wrap">
        <div className="flex items-start gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (addError) setAddError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="pl-8 pr-3 py-1.5 text-sm rounded-md border border-input bg-background placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary w-52"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={!search.trim()}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-40 transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>

        {addError && (
          <p className="text-xs text-red-500 mt-2">{addError}</p>
        )}

        <div className="flex flex-wrap gap-1.5 items-center">
          {symbols.map((sym) => (
            <span
              key={sym}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-xs font-mono text-muted-foreground"
            >
              {sym}
              <button
                onClick={() => handleRemove(sym)}
                className="hover:text-red-500 transition-colors ml-0.5"
                title={`Remove ${sym}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {symbols.length === 0 ? (
        <div className="rounded-lg border border-dashed border-card-border p-12 text-center">
          <p className="text-sm text-muted-foreground">
            No items yet. Type a symbol above and click Add to start tracking.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">
            Loading data for {symbols.length} symbol
            {symbols.length !== 1 ? "s" : ""}…
          </span>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-600 dark:text-red-400">
          Failed to load data.{" "}
          <button onClick={() => refetch()} className="underline">
            Retry
          </button>
        </div>
      ) : stocks.length === 0 ? (
        <div className="rounded-lg border border-dashed border-card-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No data returned — the symbols may not be found on Yahoo Finance.
            Try adding the exchange suffix (e.g. TICKER.L for LSE, TICKER.TO
            for TSX, TICKER.DE for Xetra).
          </p>
        </div>
      ) : (
        <IndexStockTable stocks={stocks} mode={mode} onRemove={handleRemove} />
      )}
    </div>
  );
}
