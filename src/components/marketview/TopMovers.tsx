import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatPrice, formatPercent, changeColor } from "@/lib/utils";
import type { TickerData } from "./TickerCard";

type Period = "1d" | "1w" | "1m" | "1y";

const PERIODS: { id: Period; label: string }[] = [
  { id: "1d", label: "1D" },
  { id: "1w", label: "1W" },
  { id: "1m", label: "1M" },
  { id: "1y", label: "1Y" },
];

function computeSparklineReturn(sparkline: number[] = []): number {
  if (sparkline.length < 2) return 0;
  const first = sparkline[0];
  const last = sparkline[sparkline.length - 1];
  if (!first) return 0;
  return ((last - first) / first) * 100;
}

function getPeriodChange(ticker: TickerData, period: Period): number {
  switch (period) {
    case "1d": return ticker.changePercent ?? 0;
    case "1w": return computeSparklineReturn(ticker.sparkline);
    case "1m": return ticker.changePercent1M ?? 0;
    case "1y": return ticker.changePercent1Y ?? ticker.changePercentWeek ?? 0;
  }
}

function MoverRow({
  ticker,
  period,
  onClick,
}: {
  ticker: TickerData;
  period: Period;
  onClick: () => void;
}) {
  const change = getPeriodChange(ticker, period);
  return (
    <button
      data-testid={`mover-${ticker.symbol}`}
      onClick={onClick}
      className="w-full flex items-center justify-between py-2 px-3 hover:bg-muted/50 rounded-lg transition-colors text-left"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{ticker.name}</p>
        <p className="text-xs text-muted-foreground font-mono">
          {ticker.symbol.replace("=X", "").replace("=F", "").replace("^", "")}
        </p>
      </div>
      <div className="text-right ml-3">
        <p className="text-sm font-mono font-bold tabular-nums">
          {formatPrice(ticker.price, ticker.currency)}
        </p>
        <p className={cn("text-xs font-semibold tabular-nums", changeColor(change))}>
          {formatPercent(change)}
        </p>
      </div>
    </button>
  );
}

interface Props {
  allTickers: TickerData[];
  onTickerClick: (ticker: TickerData) => void;
}

export function TopMovers({ allTickers, onTickerClick }: Props) {
  const [period, setPeriod] = useState<Period>("1d");

  const { gainers, losers } = useMemo(() => {
    const valid = allTickers.filter((t) => {
      const v = getPeriodChange(t, period);
      return v !== 0 && isFinite(v);
    });
    const sorted = [...valid].sort(
      (a, b) => getPeriodChange(b, period) - getPeriodChange(a, period)
    );
    return {
      gainers: sorted.slice(0, 3),
      losers: sorted.slice(-3).reverse(),
    };
  }, [allTickers, period]);

  return (
    <div className="bg-card border border-card-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-card-border">
        <h3 className="text-sm font-semibold text-foreground">Top Movers</h3>
        <div className="flex items-center gap-0.5 bg-muted rounded-md p-0.5">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded transition-colors",
                period === p.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-card-border">
        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
              Gainers
            </span>
          </div>
          <div className="space-y-0.5">
            {gainers.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No data</p>
            ) : (
              gainers.map((t) => (
                <MoverRow
                  key={t.symbol}
                  ticker={t}
                  period={period}
                  onClick={() => onTickerClick(t)}
                />
              ))
            )}
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <TrendingDown className="w-3.5 h-3.5 text-red-500" />
            <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
              Losers
            </span>
          </div>
          <div className="space-y-0.5">
            {losers.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No data</p>
            ) : (
              losers.map((t) => (
                <MoverRow
                  key={t.symbol}
                  ticker={t}
                  period={period}
                  onClick={() => onTickerClick(t)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
