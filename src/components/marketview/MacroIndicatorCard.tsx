import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { cn, formatPercent, changeColor } from "@/lib/utils";

export interface MacroIndicator {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  unit: string;
  frequency: string;
  lastUpdated: string;
  category: "interest_rate" | "inflation" | "gdp" | "employment" | "sentiment";
  country: string;
  history?: { date: string; value: number }[];
}

interface Props {
  indicator: MacroIndicator;
}

const CATEGORY_COLORS: Record<string, string> = {
  interest_rate: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
  inflation: "bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300",
  gdp: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
  employment: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300",
  sentiment: "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300",
};

const CATEGORY_LABELS: Record<string, string> = {
  interest_rate: "Rate",
  inflation: "Inflation",
  gdp: "GDP",
  employment: "Employment",
  sentiment: "Sentiment",
};

const CHART_STROKE: Record<string, string> = {
  interest_rate: "#3b82f6",
  inflation: "#f97316",
  gdp: "#10b981",
  employment: "#a855f7",
  sentiment: "#eab308",
};

const CHART_FILL: Record<string, string> = {
  interest_rate: "#3b82f620",
  inflation: "#f9731620",
  gdp: "#10b98120",
  employment: "#a855f720",
  sentiment: "#eab30820",
};

function formatTooltipDate(date: string) {
  try {
    return new Date(date + "T12:00:00").toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  } catch {
    return date;
  }
}

export function MacroIndicatorCard({ indicator }: Props) {
  const isUp = indicator.change > 0;
  const isDown = indicator.change < 0;
  const history = indicator.history ?? [];
  const hasHistory = history.length >= 3;

  const stroke = CHART_STROKE[indicator.category] ?? "#6b7280";
  const fill = CHART_FILL[indicator.category] ?? "#6b728020";

  const formatValue = (v: number) => {
    if (isNaN(v) || v === 0) return "—";
    if (indicator.unit === "%") return `${v.toFixed(2)}%`;
    if (indicator.unit === "bps") return `${v.toFixed(1)} bps`;
    if (indicator.unit.startsWith("Bil")) {
      return `${v.toLocaleString("en-US", { maximumFractionDigits: 1 })}B`;
    }
    if (indicator.unit === "Thousands") {
      return `${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}K`;
    }
    return v.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  return (
    <div
      data-testid={`macro-card-${indicator.id}`}
      className="bg-card border border-card-border rounded-lg p-4 hover:shadow-sm transition-shadow flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded shrink-0", CATEGORY_COLORS[indicator.category])}>
              {CATEGORY_LABELS[indicator.category]}
            </span>
            <span className="text-xs text-muted-foreground">{indicator.country}</span>
          </div>
          <p className="text-sm font-semibold text-foreground leading-tight">{indicator.name}</p>
        </div>
      </div>

      {/* Value row */}
      <div className="flex items-end justify-between">
        <div>
          <p data-testid={`macro-value-${indicator.id}`} className="text-2xl font-bold font-mono tabular-nums text-foreground">
            {formatValue(indicator.value)}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className={cn("flex items-center gap-0.5 text-sm font-medium tabular-nums", changeColor(indicator.change))}>
              {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : isDown ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              {indicator.change > 0 ? "+" : ""}{formatValue(indicator.change)}
            </span>
            <span className="text-xs text-muted-foreground">vs prior</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Prior</p>
          <p className="text-sm font-mono tabular-nums text-muted-foreground">{formatValue(indicator.previousValue)}</p>
        </div>
      </div>

      {/* Sparkline chart */}
      {hasHistory && (
        <div className="h-16 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
              <defs>
                <linearGradient id={`grad-${indicator.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stroke} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={stroke} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <YAxis domain={["auto", "auto"]} hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const pt = payload[0].payload as { date: string; value: number };
                  return (
                    <div className="bg-popover border border-border rounded px-2 py-1 text-xs shadow-md">
                      <p className="text-muted-foreground">{formatTooltipDate(pt.date)}</p>
                      <p className="font-mono font-semibold text-foreground">{formatValue(pt.value)}</p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={stroke}
                strokeWidth={1.5}
                fill={`url(#grad-${indicator.id})`}
                dot={false}
                activeDot={{ r: 3, fill: stroke, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Footer */}
      <div className="pt-1 border-t border-border/50 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{indicator.frequency}</span>
        <span className="text-xs text-muted-foreground">{indicator.lastUpdated}</span>
      </div>
    </div>
  );
}
