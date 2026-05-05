import { useState } from "react";
import { TrendingUp, TrendingDown, ExternalLink, ChevronUp, ChevronDown, ChevronsUpDown, X } from "lucide-react";
import { cn, formatPrice, formatPercent, formatNumber, changeColor } from "@/lib/utils";
import { MiniChart } from "./MiniChart";

export interface IndexStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  changePercentWeek: number;
  changePercent1W?: number | null;
  changePercent1M?: number | null;
  changePercent1Y?: number | null;
  marketCap: number | null;
  volume: number | null;
  currency: string;
  high52w: number | null;
  low52w: number | null;
  isNearATH: boolean;
  isNearATL: boolean;
  googleFinanceUrl: string;
  alertLevel: "none" | "watch" | "alert" | "critical";
  peRatio: number | null;
  forwardPE: number | null;
  pegRatio: number | null;
  pbRatio: number | null;
  deRatio: number | null;
  roe: number | null;
  dividendYield: number | null;
  rsi14: number | null;
  ma20: number | null;
  ma50: number | null;
  ma200: number | null;
  priceVsMa20: "above" | "below" | "na";
  priceVsMa50: "above" | "below" | "na";
  priceVsMa200: "above" | "below" | "na";
  qualityScore: number;
  qualityLabel: "excellent" | "good" | "fair" | "poor";
  sparkline: number[];
  lastUpdated: string;
}

type SortKey = "name" | "price" | "changePercent" | "changePercent1W" | "changePercent1M" | "changePercent1Y" | "changePercentWeek" | "marketCap" | "volume" | "peRatio" | "pegRatio" | "deRatio" | "roe" | "dividendYield" | "pbRatio" | "rsi14" | "qualityScore";
type SortDir = "asc" | "desc";

interface Column {
  key: SortKey;
  label: string;
  render: (s: IndexStock) => React.ReactNode;
  align?: "right";
}

function fmt(v: number | null, decimals = 2, suffix = ""): string {
  if (v == null || isNaN(v)) return "—";
  return `${v.toFixed(decimals)}${suffix}`;
}

function RSIBadge({ value }: { value: number | null }) {
  if (value == null) return <span className="text-muted-foreground">—</span>;
  const color = value >= 70 ? "text-red-500" : value <= 30 ? "text-emerald-500" : "text-foreground";
  const label = value >= 70 ? "OB" : value <= 30 ? "OS" : "";
  return (
    <span className={cn("font-mono tabular-nums", color)}>
      {value.toFixed(1)}
      {label && <span className="ml-1 text-xs font-semibold">{label}</span>}
    </span>
  );
}

function MaBadge({ relation }: { relation: "above" | "below" | "na" }) {
  if (relation === "na") return <span className="text-muted-foreground">—</span>;
  return (
    <span className={cn("text-xs font-semibold px-1.5 py-0.5 rounded",
      relation === "above" ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
        : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400"
    )}>
      {relation === "above" ? "▲" : "▼"}
    </span>
  );
}

function QualityBadge({ label }: { label: IndexStock["qualityLabel"] }) {
  const styles = {
    excellent: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300",
    good: "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300",
    fair: "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-300",
    poor: "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300",
  };
  return (
    <span className={cn("text-xs font-semibold px-1.5 py-0.5 rounded capitalize", styles[label])}>
      {label}
    </span>
  );
}

function SparkCell({ closes, changePercent }: { closes: number[]; changePercent: number }) {
  if (!closes || closes.length < 2) return <div className="w-24 h-8 flex items-center justify-center text-muted-foreground/30 text-xs">—</div>;
  return (
    <div className="w-24 h-8">
      <MiniChart closes={closes} positive={changePercent >= 0} height={32} showTooltip />
    </div>
  );
}

const ALL_COLUMNS: Record<string, Column[]> = {
  price: [
    { key: "name", label: "Stock", render: (s) => (
      <div className="flex items-center gap-2 min-w-0">
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{s.name}</p>
          <p className="text-xs text-muted-foreground font-mono">{s.symbol}</p>
        </div>
        {s.isNearATH && <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-1 py-0.5 rounded font-semibold flex-shrink-0">ATH</span>}
        {s.isNearATL && <span className="text-xs bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 px-1 py-0.5 rounded font-semibold flex-shrink-0">ATL</span>}
      </div>
    )},
    { key: "price", label: "Price", align: "right", render: (s) => <span className="font-mono tabular-nums text-sm font-semibold">{formatPrice(s.price, s.currency)}</span> },
    { key: "changePercent", label: "1D %", align: "right", render: (s) => (
      <span className={cn("font-semibold tabular-nums text-sm flex items-center justify-end gap-0.5", changeColor(s.changePercent))}>
        {s.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {formatPercent(s.changePercent)}
      </span>
    )},
    { key: "marketCap", label: "Mkt Cap", align: "right", render: (s) => <span className="font-mono text-sm tabular-nums">{s.marketCap ? formatNumber(s.marketCap) : "—"}</span> },
    { key: "volume", label: "Volume", align: "right", render: (s) => <span className="font-mono text-sm tabular-nums text-muted-foreground">{s.volume ? formatNumber(s.volume) : "—"}</span> },
    { key: "changePercent", label: "1W Chart", render: (s) => <SparkCell closes={s.sparkline} changePercent={s.changePercent} /> },
  ],
  fundamentals: [
    { key: "name", label: "Stock", render: (s) => (
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate">{s.name}</p>
        <p className="text-xs text-muted-foreground font-mono">{s.symbol}</p>
      </div>
    )},
    { key: "peRatio", label: "P/E", align: "right", render: (s) => <span className="font-mono text-sm tabular-nums">{fmt(s.peRatio, 1)}</span> },
    { key: "pegRatio", label: "PEG", align: "right", render: (s) => (
      <span className={cn("font-mono text-sm tabular-nums",
        s.pegRatio != null && s.pegRatio < 1 ? "text-emerald-600 dark:text-emerald-400 font-semibold" :
        s.pegRatio != null && s.pegRatio > 3 ? "text-red-500" : "")}>
        {fmt(s.pegRatio, 2)}
      </span>
    )},
    { key: "pbRatio", label: "P/B", align: "right", render: (s) => <span className="font-mono text-sm tabular-nums">{fmt(s.pbRatio, 2)}</span> },
    { key: "deRatio", label: "D/E", align: "right", render: (s) => (
      <span className={cn("font-mono text-sm tabular-nums",
        s.deRatio != null && s.deRatio < 0.5 ? "text-emerald-600 dark:text-emerald-400" :
        s.deRatio != null && s.deRatio > 2 ? "text-red-500" : "")}>
        {fmt(s.deRatio, 2)}
      </span>
    )},
    { key: "roe", label: "ROE %", align: "right", render: (s) => (
      <span className={cn("font-mono text-sm tabular-nums",
        s.roe != null && s.roe >= 20 ? "text-emerald-600 dark:text-emerald-400 font-semibold" :
        s.roe != null && s.roe < 0 ? "text-red-500" : "")}>
        {fmt(s.roe, 1, "%")}
      </span>
    )},
    { key: "dividendYield", label: "Div %", align: "right", render: (s) => (
      <span className={cn("font-mono text-sm tabular-nums", s.dividendYield && s.dividendYield > 0 ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground")}>
        {s.dividendYield && s.dividendYield > 0 ? fmt(s.dividendYield, 2, "%") : "—"}
      </span>
    )},
    { key: "qualityScore", label: "Quality", align: "right", render: (s) => <QualityBadge label={s.qualityLabel} /> },
    { key: "changePercent", label: "1W Chart", render: (s) => <SparkCell closes={s.sparkline} changePercent={s.changePercent} /> },
  ],
  performance: [
    { key: "name", label: "Name", render: (s) => (
      <div className="flex items-center gap-2 min-w-0">
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{s.name}</p>
          <p className="text-xs text-muted-foreground font-mono">{s.symbol}</p>
        </div>
        {s.isNearATH && <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-1 py-0.5 rounded font-semibold flex-shrink-0">ATH</span>}
        {s.isNearATL && <span className="text-xs bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 px-1 py-0.5 rounded font-semibold flex-shrink-0">ATL</span>}
      </div>
    )},
    { key: "price", label: "Price", align: "right", render: (s) => <span className="font-mono tabular-nums text-sm font-semibold">{formatPrice(s.price, s.currency)}</span> },
    { key: "changePercent", label: "1D %", align: "right", render: (s) => (
      <span className={cn("font-semibold tabular-nums text-sm flex items-center justify-end gap-0.5", changeColor(s.changePercent))}>
        {s.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {formatPercent(s.changePercent)}
      </span>
    )},
    { key: "changePercent1W", label: "1W %", align: "right", render: (s) => (
      s.changePercent1W != null
        ? <span className={cn("font-mono tabular-nums text-sm font-semibold", changeColor(s.changePercent1W))}>{formatPercent(s.changePercent1W)}</span>
        : <span className="text-muted-foreground">—</span>
    )},
    { key: "changePercent1M", label: "1M %", align: "right", render: (s) => (
      s.changePercent1M != null
        ? <span className={cn("font-mono tabular-nums text-sm font-semibold", changeColor(s.changePercent1M))}>{formatPercent(s.changePercent1M)}</span>
        : <span className="text-muted-foreground">—</span>
    )},
    { key: "changePercent1Y", label: "1Y %", align: "right", render: (s) => (
      s.changePercent1Y != null
        ? <span className={cn("font-mono tabular-nums text-sm font-semibold", changeColor(s.changePercent1Y))}>{formatPercent(s.changePercent1Y)}</span>
        : <span className="text-muted-foreground">—</span>
    )},
    { key: "changePercent", label: "Sparkline", render: (s) => <SparkCell closes={s.sparkline} changePercent={s.changePercent} /> },
  ],
  technical: [
    { key: "name", label: "Stock", render: (s) => (
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate">{s.name}</p>
        <p className="text-xs text-muted-foreground font-mono">{s.symbol}</p>
      </div>
    )},
    { key: "rsi14", label: "RSI 14", align: "right", render: (s) => <RSIBadge value={s.rsi14} /> },
    { key: "price", label: "vs MA20", align: "right", render: (s) => <MaBadge relation={s.priceVsMa20} /> },
    { key: "price", label: "vs MA50", align: "right", render: (s) => <MaBadge relation={s.priceVsMa50} /> },
    { key: "price", label: "vs MA200", align: "right", render: (s) => <MaBadge relation={s.priceVsMa200} /> },
    { key: "volume", label: "Volume", align: "right", render: (s) => <span className="font-mono text-sm tabular-nums">{s.volume ? formatNumber(s.volume) : "—"}</span> },
    { key: "changePercent", label: "1W Chart", render: (s) => <SparkCell closes={s.sparkline} changePercent={s.changePercent} /> },
  ],
};

interface Props {
  stocks: IndexStock[];
  mode?: "price" | "fundamentals" | "technical" | "performance";
  limit?: number;
  sortByKey?: SortKey;
  sortDir?: SortDir;
  showHeader?: boolean;
  compact?: boolean;
  onRemove?: (symbol: string) => void;
}

export function IndexStockTable({
  stocks,
  mode = "price",
  limit,
  sortByKey,
  sortDir = "desc",
  showHeader = true,
  compact = false,
  onRemove,
}: Props) {
  const [sortKey, setSortKey] = useState<SortKey>(sortByKey ?? "changePercent");
  const [dir, setDir] = useState<SortDir>(sortDir);

  const columns = ALL_COLUMNS[mode];

  const sorted = [...stocks].sort((a, b) => {
    const av = (a as unknown as Record<string, unknown>)[sortKey] as number | null;
    const bv = (b as unknown as Record<string, unknown>)[sortKey] as number | null;
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    return dir === "desc" ? bv - av : av - bv;
  });

  const rows = limit ? sorted.slice(0, limit) : sorted;

  function handleSort(key: SortKey) {
    if (key === sortKey) setDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortKey(key); setDir("desc"); }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-card-border">
      <table className="w-full text-left">
        {showHeader && (
          <thead>
            <tr className="bg-muted/40 border-b border-border">
              {columns.map((col, i) => (
                <th
                  key={`${col.key}-${i}`}
                  className={cn(
                    "px-4 py-2.5 text-xs font-semibold text-muted-foreground whitespace-nowrap cursor-pointer select-none hover:text-foreground transition-colors",
                    col.align === "right" && "text-right"
                  )}
                  onClick={() => handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key
                      ? dir === "desc" ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />
                      : <ChevronsUpDown className="w-3 h-3 opacity-30" />
                    }
                  </span>
                </th>
              ))}
              <th className="px-4 py-2.5 w-8" />
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((stock, idx) => (
            <tr
              key={stock.symbol}
              className={cn(
                "border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors",
                compact ? "h-10" : "h-12"
              )}
            >
              {columns.map((col, i) => (
                <td
                  key={`${col.key}-${i}`}
                  className={cn("px-4", compact ? "py-1.5" : "py-2.5", col.align === "right" && "text-right")}
                >
                  {col.render(stock)}
                </td>
              ))}
              <td className="px-2 py-2">
                <div className="flex items-center gap-1.5">
                  <a
                    href={stock.googleFinanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`stock-link-${stock.symbol}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground/40 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {onRemove && (
                    <button
                      onClick={() => onRemove(stock.symbol)}
                      title={`Remove ${stock.symbol}`}
                      className="text-muted-foreground/30 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-sm text-muted-foreground">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
