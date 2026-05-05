import { TrendingUp, TrendingDown, Minus, AlertTriangle, Zap, ExternalLink } from "lucide-react";
import { cn, formatPrice, formatPercent, formatNumber, changeColor } from "@/lib/utils";
import { CardChart } from "./CardChart";

export interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  changePercentWeek: number;
  changePercent1M?: number;
  changePercent1Y?: number;
  high52w?: number | null;
  low52w?: number | null;
  volume?: number | null;
  marketCap?: number | null;
  currency: string;
  region: string;
  googleFinanceUrl: string;
  isHighVolatility: boolean;
  alertLevel: "none" | "watch" | "alert" | "critical";
  lastUpdated: string;
  sparkline?: number[];
}

const ALERT_CONFIG = {
  none: { badge: null, border: "" },
  watch: {
    badge: <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-xs font-medium bg-yellow-50 dark:bg-yellow-950/40 px-1.5 py-0.5 rounded"><Zap className="w-3 h-3" />Watch</span>,
    border: "border-yellow-300 dark:border-yellow-800",
  },
  alert: {
    badge: <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 text-xs font-medium bg-orange-50 dark:bg-orange-950/40 px-1.5 py-0.5 rounded"><AlertTriangle className="w-3 h-3" />Alert</span>,
    border: "border-orange-400 dark:border-orange-700",
  },
  critical: {
    badge: <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-xs font-semibold bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 rounded animate-pulse"><AlertTriangle className="w-3 h-3" />Critical</span>,
    border: "border-red-500 dark:border-red-600",
  },
};

interface Props {
  ticker: TickerData;
  onClick?: (ticker: TickerData) => void;
}

export function TickerCard({ ticker, onClick }: Props) {
  const alertCfg = ALERT_CONFIG[ticker.alertLevel];
  const isUp = ticker.changePercent >= 0;
  const isDown = ticker.changePercent < 0;

  const handleCardClick = () => onClick?.(ticker);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(ticker);
    }
  };

  return (
    <div
      data-testid={`ticker-card-${ticker.symbol}`}
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "w-full text-left bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        alertCfg.border || "border-card-border",
        ticker.isHighVolatility && ticker.alertLevel === "none" && "border-blue-300 dark:border-blue-800"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span data-testid={`symbol-${ticker.symbol}`} className="font-mono text-xs text-muted-foreground font-medium">
              {ticker.symbol.replace("=X", "").replace("=F", "").replace("^", "")}
            </span>
            <span className="text-xs text-muted-foreground/60 border border-border rounded px-1">{ticker.region}</span>
            {alertCfg.badge}
            {ticker.isHighVolatility && ticker.alertLevel === "none" && (
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-medium bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded">
                <Zap className="w-3 h-3" />Volatile
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-foreground mt-0.5 truncate group-hover:text-primary transition-colors">
            {ticker.name}
          </p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0 mt-0.5 ml-2" />
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p data-testid={`price-${ticker.symbol}`} className="text-xl font-bold font-mono text-foreground tabular-nums">
            {formatPrice(ticker.price, ticker.currency)}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn("flex items-center gap-0.5 text-sm font-semibold tabular-nums", changeColor(ticker.changePercent))}>
              {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : isDown ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              {formatPercent(ticker.changePercent)}
            </span>
            <span className={cn("text-xs tabular-nums", changeColor(ticker.changePercent))}>
              ({formatPercent(ticker.changePercent > 0 ? ticker.changePercent : ticker.changePercent, true)} today)
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">1W</p>
          <p className={cn("text-sm font-semibold tabular-nums", changeColor(ticker.changePercentWeek))}>
            {formatPercent(ticker.changePercentWeek)}
          </p>
        </div>
      </div>

      {/* Dynamic chart with range selector */}
      <CardChart symbol={ticker.symbol} isUp={isUp} sparkline={ticker.sparkline} />

      {(ticker.volume || ticker.high52w) && (
        <div className="mt-2 pt-2 border-t border-border/50 grid grid-cols-2 gap-2">
          {ticker.high52w && (
            <div>
              <p className="text-xs text-muted-foreground">52W High</p>
              <p className="text-xs font-mono font-medium tabular-nums">{formatPrice(ticker.high52w, ticker.currency)}</p>
            </div>
          )}
          {ticker.low52w && (
            <div>
              <p className="text-xs text-muted-foreground">52W Low</p>
              <p className="text-xs font-mono font-medium tabular-nums">{formatPrice(ticker.low52w, ticker.currency)}</p>
            </div>
          )}
          {ticker.volume && (
            <div>
              <p className="text-xs text-muted-foreground">Volume</p>
              <p className="text-xs font-mono font-medium tabular-nums">{formatNumber(ticker.volume)}</p>
            </div>
          )}
          {ticker.marketCap && (
            <div>
              <p className="text-xs text-muted-foreground">Mkt Cap</p>
              <p className="text-xs font-mono font-medium tabular-nums">{formatNumber(ticker.marketCap)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
