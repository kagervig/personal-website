import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useGetMarketChart, getGetMarketChartQueryKey } from "@/lib/marketview/api-client";
import { cn } from "@/lib/utils";

type Range = "1h" | "1d" | "1w" | "1m" | "6m" | "1yr" | "5yr";

const RANGES: { id: Range; label: string }[] = [
  { id: "1h",  label: "1H"  },
  { id: "1d",  label: "1D"  },
  { id: "1w",  label: "1W"  },
  { id: "1m",  label: "1M"  },
  { id: "6m",  label: "6M"  },
  { id: "1yr", label: "1Y"  },
  { id: "5yr", label: "5Y"  },
];

function formatXAxis(ts: number, range: Range): string {
  const d = new Date(ts);
  if (range === "1h" || range === "1d") {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  if (range === "1w") {
    return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }
  if (range === "1m") {
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  }
  if (range === "6m" || range === "1yr") {
    return d.toLocaleDateString([], { month: "short", year: "2-digit" });
  }
  return d.toLocaleDateString([], { year: "numeric" });
}

function formatPrice(v: number): string {
  if (v >= 10000) return v.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (v >= 100) return v.toFixed(2);
  return v.toFixed(4);
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: number;
  range: Range;
}

function CustomTooltip({ active, payload, label, range }: CustomTooltipProps) {
  if (!active || !payload?.length || label == null) return null;
  const d = new Date(label);
  const dateStr = range === "1h" || range === "1d"
    ? d.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="text-muted-foreground mb-0.5">{dateStr}</p>
      <p className="font-mono font-semibold text-foreground">{formatPrice(payload[0].value)}</p>
    </div>
  );
}

interface Props {
  symbol: string;
  isUp: boolean;
  defaultRange?: Range;
}

export function ModalChart({ symbol, isUp, defaultRange = "1d" }: Props) {
  const [range, setRange] = useState<Range>(defaultRange);

  const params = { symbol, range };
  const { data, isLoading, isError } = useGetMarketChart(params, {
    query: {
      queryKey: getGetMarketChartQueryKey(params),
      staleTime: 60000,
    },
  });

  const color = isUp ? "#22c55e" : "#ef4444";
  const gradientId = `chart-grad-${symbol.replace(/[^a-z0-9]/gi, "")}`;

  // Determine tick count based on range
  const tickCount = range === "1h" ? 6 : range === "1d" ? 7 : range === "1w" ? 7 : 6;

  return (
    <div className="space-y-3">
      {/* Range selector */}
      <div className="flex gap-1">
        {RANGES.map((r) => (
          <button
            key={r.id}
            onClick={() => setRange(r.id)}
            className={cn(
              "flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors",
              range === r.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Chart area */}
      <div className="h-48 w-full">
        {isLoading && (
          <div className="h-full w-full flex items-center justify-center">
            <div className="flex gap-1 items-end h-10">
              {[3, 5, 4, 6, 3, 7, 5].map((h, i) => (
                <div
                  key={i}
                  className="w-2 bg-muted rounded animate-pulse"
                  style={{ height: `${h * 5}px`, animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {isError && (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-xs text-muted-foreground">Unable to load chart data</p>
          </div>
        )}

        {!isLoading && !isError && (data as any) && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={(data as any).points}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border, #e2e8f0)"
                opacity={0.4}
                vertical={false}
              />
              <XAxis
                dataKey="t"
                type="number"
                domain={["dataMin", "dataMax"]}
                scale="time"
                tickFormatter={(v) => formatXAxis(v as number, range)}
                tickCount={tickCount}
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground, #94a3b8)" }}
                axisLine={false}
                tickLine={false}
                dy={4}
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 10, fill: "var(--color-muted-foreground, #94a3b8)" }}
                tickFormatter={(v) => formatPrice(v as number)}
                axisLine={false}
                tickLine={false}
                width={55}
              />
              <Tooltip content={<CustomTooltip range={range} />} />
              <Area
                type="monotone"
                dataKey="c"
                stroke={color}
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{ r: 3, fill: color, stroke: "var(--color-card, #fff)", strokeWidth: 2 }}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
