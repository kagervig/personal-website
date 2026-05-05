import { TrendingUp, TrendingDown, Minus, AlertTriangle, Bell } from "lucide-react";
import { cn, formatPercent } from "@/lib/utils";

interface MarketAlert {
  symbol: string;
  name: string;
  message: string;
  severity: "watch" | "alert" | "critical";
  changePercent: number;
}

interface Props {
  overallSentiment: "bullish" | "neutral" | "bearish";
  alerts: MarketAlert[];
  lastUpdated: string;
}

const SENTIMENT_CONFIG = {
  bullish: {
    icon: <TrendingUp className="w-5 h-5" />,
    label: "Bullish",
    cls: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
    dot: "bg-emerald-500",
  },
  neutral: {
    icon: <Minus className="w-5 h-5" />,
    label: "Neutral",
    cls: "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300",
    dot: "bg-slate-400",
  },
  bearish: {
    icon: <TrendingDown className="w-5 h-5" />,
    label: "Bearish",
    cls: "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    dot: "bg-red-500",
  },
};

const SEVERITY_COLORS = {
  watch: "text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800",
  alert: "text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800",
  critical: "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800",
};

export function SentimentBanner({ overallSentiment, alerts, lastUpdated }: Props) {
  const cfg = SENTIMENT_CONFIG[overallSentiment];
  const criticalAlerts = alerts.filter((a) => a.severity === "critical");
  const otherAlerts = alerts.filter((a) => a.severity !== "critical");

  return (
    <div className="space-y-3">
      {/* Overall sentiment */}
      <div className={cn("flex items-center justify-between px-4 py-3 rounded-lg border", cfg.cls)}>
        <div className="flex items-center gap-3">
          <div className={cn("w-2.5 h-2.5 rounded-full animate-pulse", cfg.dot)} />
          <span className="flex items-center gap-1.5 font-semibold text-sm">
            {cfg.icon}
            Market Sentiment: {cfg.label}
          </span>
        </div>
        <span className="text-xs opacity-60">Updated {new Date(lastUpdated).toLocaleTimeString()}</span>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="flex items-start gap-2 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0 mt-2">
            <Bell className="w-3.5 h-3.5" />
            Alerts:
          </div>
          <div className="flex gap-2 flex-wrap">
            {[...criticalAlerts, ...otherAlerts].map((alert) => (
              <div
                key={alert.symbol}
                data-testid={`alert-${alert.symbol}`}
                className={cn("flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium flex-shrink-0", SEVERITY_COLORS[alert.severity])}
              >
                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                <span className="font-semibold">{alert.name}</span>
                <span>{formatPercent(alert.changePercent)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
