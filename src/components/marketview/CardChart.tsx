import { useState } from "react";
import { useGetMarketChart, getGetMarketChartQueryKey } from "@/lib/marketview/api-client";
import { MiniChart } from "./MiniChart";
import { cn } from "@/lib/utils";

type Range = "1h" | "1d" | "1w" | "1m" | "6m" | "1yr" | "5yr";

const RANGES: { id: Range; label: string }[] = [
  { id: "1h",  label: "1H" },
  { id: "1d",  label: "1D" },
  { id: "1w",  label: "1W" },
  { id: "1m",  label: "1M" },
  { id: "6m",  label: "6M" },
  { id: "1yr", label: "1Y" },
  { id: "5yr", label: "5Y" },
];

interface Props {
  symbol: string;
  isUp: boolean;
  sparkline?: number[];
}

export function CardChart({ symbol, isUp, sparkline = [] }: Props) {
  const [range, setRange] = useState<Range>("1w");

  const useApiData = range !== "1w" || sparkline.length === 0;
  const params = { symbol, range };
  const { data, isLoading } = useGetMarketChart(params, {
    query: {
      queryKey: getGetMarketChartQueryKey(params),
      enabled: useApiData,
      staleTime: 60000,
    },
  });

  const closes: number[] =
    range === "1w" && sparkline.length > 0
      ? sparkline
      : ((data as any)?.points ?? []).map((p: any) => p.c);

  const loading = useApiData && isLoading;

  return (
    <div className="mt-3 -mx-1">
      {/* Range pills */}
      <div className="flex gap-0.5 mb-1.5 px-1">
        {RANGES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={(e) => { e.stopPropagation(); setRange(r.id); }}
            className={cn(
              "flex-1 text-[9px] font-bold py-1 rounded transition-colors leading-none",
              range === r.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Chart or loader */}
      {loading ? (
        <div className="h-11 flex items-center justify-center gap-0.5">
          {[2, 3, 2, 4, 3, 5, 3].map((h, i) => (
            <div
              key={i}
              className="w-1.5 bg-muted rounded animate-pulse"
              style={{ height: `${h * 5}px`, animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      ) : (
        <MiniChart closes={closes} positive={isUp} height={44} showTooltip />
      )}
    </div>
  );
}
