import { ExternalLink, X, TrendingUp, TrendingDown, BarChart2, Sprout } from "lucide-react";
import { cn, formatPrice, formatPercent, formatNumber, changeColor } from "@/lib/utils";
import type { TickerData } from "./TickerCard";
import { COMMODITY_ETFS, COMMODITY_SYMBOLS } from "@/app/marketview/data/commodity-etfs";
import { ModalChart } from "./ModalChart";

interface Props {
  ticker: TickerData | null;
  onClose: () => void;
}

const COUNTRY_COLORS: Record<string, string> = {
  "UK": "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400",
  "Canada": "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400",
  "UK & Canada": "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400",
};

export function TickerModal({ ticker, onClose }: Props) {
  if (!ticker) return null;

  const isUp = ticker.changePercent >= 0;
  const etfs = COMMODITY_SYMBOLS.has(ticker.symbol) ? (COMMODITY_ETFS[ticker.symbol] ?? []) : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-testid="ticker-modal"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={cn(
        "relative bg-card border border-card-border rounded-xl shadow-2xl w-full overflow-hidden overflow-y-auto",
        etfs.length > 0 ? "max-w-xl max-h-[90vh]" : "max-w-lg",
      )}>
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm text-muted-foreground font-medium">
                {ticker.symbol.replace("=X", "").replace("=F", "").replace("^", "")}
              </span>
              <span className="text-xs text-muted-foreground/60 border border-border rounded px-1">{ticker.region}</span>
              {ticker.isHighVolatility && (
                <span className="text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-1.5 py-0.5 rounded font-medium">High Volatility</span>
              )}
            </div>
            <h2 className="text-xl font-bold text-foreground">{ticker.name}</h2>
          </div>
          <button
            data-testid="modal-close"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price */}
        <div className="p-6 pb-4">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-4xl font-bold font-mono tabular-nums text-foreground">
                {formatPrice(ticker.price, ticker.currency)}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className={cn("flex items-center gap-1 text-lg font-semibold tabular-nums", changeColor(ticker.changePercent))}>
                  {isUp ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  {formatPercent(ticker.changePercent)} today
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-0.5">1 Week</p>
              <p className={cn("text-xl font-bold tabular-nums", changeColor(ticker.changePercentWeek))}>
                {formatPercent(ticker.changePercentWeek)}
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: "Change (abs)", value: formatPrice(ticker.change, ticker.currency) },
              { label: "Currency", value: ticker.currency },
              ticker.high52w ? { label: "52W High", value: formatPrice(ticker.high52w, ticker.currency) } : null,
              ticker.low52w ? { label: "52W Low", value: formatPrice(ticker.low52w, ticker.currency) } : null,
              ticker.volume ? { label: "Volume", value: formatNumber(ticker.volume) } : null,
              ticker.marketCap ? { label: "Market Cap", value: formatNumber(ticker.marketCap) } : null,
            ].filter(Boolean).map((stat) => stat && (
              <div key={stat.label} className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-0.5">{stat.label}</p>
                <p className="text-sm font-semibold font-mono tabular-nums">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Alert badge */}
          {ticker.alertLevel !== "none" && (
            <div className={cn(
              "flex items-center gap-2 p-3 rounded-lg mb-4 text-sm font-medium",
              ticker.alertLevel === "critical" && "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400",
              ticker.alertLevel === "alert" && "bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400",
              ticker.alertLevel === "watch" && "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400",
            )}>
              <BarChart2 className="w-4 h-4 flex-shrink-0" />
              <span>
                {ticker.alertLevel === "critical" && "Critical move detected: "}
                {ticker.alertLevel === "alert" && "Significant move: "}
                {ticker.alertLevel === "watch" && "Watch: "}
                {ticker.name} is {ticker.changePercent > 0 ? "up" : "down"} {formatPercent(Math.abs(ticker.changePercent))} today
              </span>
            </div>
          )}

          {/* Interactive chart with time range selector */}
          <div className="mb-4">
            <ModalChart symbol={ticker.symbol} isUp={isUp} />
          </div>

          {/* Last updated */}
          <p className="text-xs text-muted-foreground mb-4">
            Last updated: {new Date(ticker.lastUpdated).toLocaleTimeString()}
          </p>
        </div>

        {/* ETF Recommendations */}
        {etfs.length > 0 && (
          <div className="px-6 pb-5 border-t border-border pt-5">
            <div className="flex items-center gap-2 mb-3">
              <Sprout className="w-4 h-4 text-green-600 dark:text-green-400" />
              <h3 className="text-sm font-semibold text-foreground">ETFs available in UK & Canada</h3>
            </div>
            <div className="space-y-3">
              {etfs.map((etf) => (
                <a
                  key={`${etf.ticker}-${etf.exchange}`}
                  href={etf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-muted/40 hover:bg-muted border border-border hover:border-primary/40 rounded-lg p-3 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-sm font-bold text-foreground">{etf.ticker}</span>
                        <span className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">{etf.exchange}</span>
                        <span className={cn("text-xs rounded px-1.5 py-0.5 font-medium", COUNTRY_COLORS[etf.country])}>
                          {etf.country}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">{etf.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{etf.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-0.5 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/70 mt-3 leading-relaxed">
              ETF suggestions are for informational purposes only. Verify availability with your broker and check costs before investing.
            </p>
          </div>
        )}

        {/* Footer — Google Finance link */}
        <div className="px-6 pb-6 pt-2">
          <a
            href={ticker.googleFinanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`google-finance-link-${ticker.symbol}`}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <ExternalLink className="w-4 h-4" />
            View on Google Finance
          </a>
        </div>
      </div>
    </div>
  );
}
