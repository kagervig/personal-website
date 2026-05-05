import { useState } from "react";
import { TrendingUp, TrendingDown, Star, BarChart2, Activity, BookOpen, AlertTriangle } from "lucide-react";
import { cn, formatPrice, changeColor, formatPercent } from "@/lib/utils";
import { IndexStockTable, type IndexStock } from "./IndexStockTable";

interface Props {
  indexId: string;
  indexName: string;
  stocks: IndexStock[];
}

type Section = "overview" | "risers" | "fallers" | "marketcap" | "athatl" | "pe" | "quality" | "fundamentals" | "technical";

const SECTIONS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <BarChart2 className="w-3.5 h-3.5" /> },
  { id: "risers", label: "Top Risers", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { id: "fallers", label: "Top Fallers", icon: <TrendingDown className="w-3.5 h-3.5" /> },
  { id: "marketcap", label: "Market Cap", icon: <Star className="w-3.5 h-3.5" /> },
  { id: "athatl", label: "ATH / ATL", icon: <Activity className="w-3.5 h-3.5" /> },
  { id: "pe", label: "P/E Ratio", icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: "quality", label: "Quality", icon: <Star className="w-3.5 h-3.5" /> },
  { id: "fundamentals", label: "Fundamentals", icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: "technical", label: "Technical", icon: <Activity className="w-3.5 h-3.5" /> },
];

function SectionPill({ id, label, icon, active, onClick }: { id: Section; label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      data-testid={`section-${id}`}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function SubHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  );
}

function RsiLegend() {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />RSI &gt;70 = Overbought (OB)</span>
      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />RSI &lt;30 = Oversold (OS)</span>
      <span className="flex items-center gap-1.5"><span className="text-emerald-600">▲</span> = Price above MA</span>
      <span className="flex items-center gap-1.5"><span className="text-red-500">▼</span> = Price below MA</span>
    </div>
  );
}

function QualityLegend() {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 flex-wrap">
      <span>Quality score (0–10) is a composite of:</span>
      <span className="text-emerald-600 dark:text-emerald-400">ROE (profitability)</span>
      <span>+ D/E (leverage)</span>
      <span>+ PEG (growth vs value)</span>
      <span>+ Dividend (income)</span>
    </div>
  );
}

function ATHCard({ stock, type }: { stock: IndexStock; type: "ath" | "atl" }) {
  const isATH = type === "ath";
  return (
    <a
      href={stock.googleFinanceUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`${type}-card-${stock.symbol}`}
      className={cn(
        "block border rounded-lg p-3 hover:shadow-md transition-all",
        isATH ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30"
               : "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-muted-foreground">{stock.symbol}</p>
          <p className="text-sm font-semibold truncate max-w-[150px]">{stock.name}</p>
        </div>
        <span className={cn(
          "text-xs font-bold px-1.5 py-0.5 rounded",
          isATH ? "bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200"
                : "bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200"
        )}>
          {isATH ? "ATH" : "ATL"}
        </span>
      </div>
      <p className="mt-2 text-lg font-bold font-mono tabular-nums">{formatPrice(stock.price, stock.currency)}</p>
      <p className={cn("text-xs font-semibold mt-0.5 tabular-nums", changeColor(stock.changePercent))}>
        {formatPercent(stock.changePercent)} today
      </p>
    </a>
  );
}

function OverviewStats({ stocks }: { stocks: IndexStock[] }) {
  const risers = stocks.filter(s => s.changePercent > 0).length;
  const fallers = stocks.filter(s => s.changePercent < 0).length;
  const athCount = stocks.filter(s => s.isNearATH).length;
  const atlCount = stocks.filter(s => s.isNearATL).length;
  const avgRSI = stocks.filter(s => s.rsi14 != null).reduce((sum, s) => sum + (s.rsi14 ?? 0), 0) / (stocks.filter(s => s.rsi14 != null).length || 1);
  const aboveMa200 = stocks.filter(s => s.priceVsMa200 === "above").length;

  const statCards = [
    { label: "Advancing", value: risers.toString(), sub: `of ${stocks.length} stocks`, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Declining", value: fallers.toString(), sub: `of ${stocks.length} stocks`, color: "text-red-500" },
    { label: "Near ATH", value: athCount.toString(), sub: "within 2% of 52W high", color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Near ATL", value: atlCount.toString(), sub: "within 2% of 52W low", color: "text-red-500" },
    { label: "Avg RSI", value: isNaN(avgRSI) ? "—" : avgRSI.toFixed(1), sub: avgRSI > 70 ? "Overbought" : avgRSI < 30 ? "Oversold" : "Neutral", color: avgRSI > 70 ? "text-red-500" : avgRSI < 30 ? "text-emerald-500" : "text-foreground" },
    { label: "Above 200-day MA", value: aboveMa200.toString(), sub: `${Math.round(aboveMa200 / stocks.length * 100)}% of index`, color: "text-blue-600 dark:text-blue-400" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {statCards.map((s) => (
        <div key={s.label} className="bg-card border border-card-border rounded-lg p-3 text-center">
          <p className={cn("text-2xl font-bold tabular-nums", s.color)}>{s.value}</p>
          <p className="text-xs font-semibold text-foreground mt-0.5">{s.label}</p>
          <p className="text-xs text-muted-foreground">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

export function IndexMarketTab({ indexId, indexName, stocks }: Props) {
  const [section, setSection] = useState<Section>("overview");

  const sortedByChange = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
  const topRisers = sortedByChange.slice(0, 5);
  const topFallers = sortedByChange.slice(-5).reverse();
  const topMarketCap = [...stocks].filter(s => s.marketCap != null).sort((a, b) => (b.marketCap ?? 0) - (a.marketCap ?? 0)).slice(0, 10);
  const athStocks = stocks.filter(s => s.isNearATH);
  const atlStocks = stocks.filter(s => s.isNearATL);
  const validPE = stocks.filter(s => s.peRatio != null && s.peRatio > 0);
  const highestPE = [...validPE].sort((a, b) => (b.peRatio ?? 0) - (a.peRatio ?? 0)).slice(0, 5);
  const lowestPE = [...validPE].sort((a, b) => (a.peRatio ?? 0) - (b.peRatio ?? 0)).slice(0, 5);
  const sortedQuality = [...stocks].sort((a, b) => b.qualityScore - a.qualityScore);
  const highQuality = sortedQuality.slice(0, 5);
  const lowQuality = sortedQuality.slice(-5).reverse();

  return (
    <div>
      {/* Section pills */}
      <div className="flex gap-2 flex-wrap mb-5">
        {SECTIONS.map((s) => (
          <SectionPill
            key={s.id}
            {...s}
            active={section === s.id}
            onClick={() => setSection(s.id)}
          />
        ))}
      </div>

      {/* OVERVIEW */}
      {section === "overview" && (
        <div className="space-y-6">
          <OverviewStats stocks={stocks} />
          <div>
            <SubHeader title="All Stocks" subtitle="Sorted by daily change. Click ↗ to view on Google Finance." />
            <IndexStockTable stocks={stocks} mode="price" sortByKey="changePercent" sortDir="desc" />
          </div>
        </div>
      )}

      {/* TOP RISERS */}
      {section === "risers" && (
        <div>
          <SubHeader title="Top 5 Risers" subtitle="Best-performing stocks by daily % change" />
          <IndexStockTable stocks={topRisers} mode="price" sortByKey="changePercent" sortDir="desc" />
        </div>
      )}

      {/* TOP FALLERS */}
      {section === "fallers" && (
        <div>
          <SubHeader title="Top 5 Fallers" subtitle="Worst-performing stocks by daily % change" />
          <IndexStockTable stocks={topFallers} mode="price" sortByKey="changePercent" sortDir="asc" />
        </div>
      )}

      {/* MARKET CAP */}
      {section === "marketcap" && (
        <div>
          <SubHeader title="Top 10 by Market Capitalisation" subtitle="Largest companies by total market value" />
          <IndexStockTable stocks={topMarketCap} mode="price" sortByKey="marketCap" sortDir="desc" />
        </div>
      )}

      {/* ATH / ATL */}
      {section === "athatl" && (
        <div className="space-y-6">
          <div>
            <SubHeader title="Near All-Time High (ATH)" subtitle="Stocks trading within 2% of their 52-week high" />
            {athStocks.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                <AlertTriangle className="w-4 h-4" />
                No stocks currently near their 52-week high
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {athStocks.map((s) => <ATHCard key={s.symbol} stock={s} type="ath" />)}
              </div>
            )}
          </div>
          <div>
            <SubHeader title="Near All-Time Low (ATL)" subtitle="Stocks trading within 2% of their 52-week low" />
            {atlStocks.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                <AlertTriangle className="w-4 h-4" />
                No stocks currently near their 52-week low
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {atlStocks.map((s) => <ATHCard key={s.symbol} stock={s} type="atl" />)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* P/E RATIO */}
      {section === "pe" && (
        <div className="space-y-6">
          <div>
            <SubHeader
              title="Highest P/E Ratio"
              subtitle="High P/E may indicate growth expectations or overvaluation. Lower forward P/E is often preferable."
            />
            <IndexStockTable stocks={highestPE} mode="fundamentals" sortByKey="peRatio" sortDir="desc" />
          </div>
          <div>
            <SubHeader
              title="Lowest P/E Ratio"
              subtitle="Low P/E may indicate undervaluation or slower expected growth. Negative P/E means the company is unprofitable."
            />
            <IndexStockTable stocks={lowestPE} mode="fundamentals" sortByKey="peRatio" sortDir="asc" />
          </div>
        </div>
      )}

      {/* QUALITY */}
      {section === "quality" && (
        <div className="space-y-6">
          <QualityLegend />
          <div>
            <SubHeader title="Highest Quality" subtitle="Best composite score across ROE, D/E, PEG, and dividend yield" />
            <IndexStockTable stocks={highQuality} mode="fundamentals" sortByKey="qualityScore" sortDir="desc" />
          </div>
          <div>
            <SubHeader title="Lowest Quality" subtitle="Weakest composite fundamentals — highest financial risk" />
            <IndexStockTable stocks={lowQuality} mode="fundamentals" sortByKey="qualityScore" sortDir="asc" />
          </div>
        </div>
      )}

      {/* FUNDAMENTALS */}
      {section === "fundamentals" && (
        <div>
          <SubHeader
            title="Fundamental Indicators"
            subtitle="P/E, PEG, P/B, Debt-to-Equity, Return on Equity, and Dividend Yield for all index constituents"
          />
          <div className="text-xs text-muted-foreground mb-3 flex flex-wrap gap-4">
            <span><strong>PEG &lt; 1</strong> = undervalued vs growth</span>
            <span><strong>D/E &lt; 0.5</strong> = conservative leverage</span>
            <span><strong>ROE &gt; 20%</strong> = excellent management efficiency</span>
          </div>
          <IndexStockTable stocks={stocks} mode="fundamentals" sortByKey="qualityScore" sortDir="desc" />
        </div>
      )}

      {/* TECHNICAL */}
      {section === "technical" && (
        <div>
          <SubHeader title="Technical & Momentum Indicators" subtitle="RSI, Moving Averages (20/50/200-day), and Volume" />
          <RsiLegend />
          <IndexStockTable stocks={stocks} mode="technical" sortByKey="rsi14" sortDir="desc" />
        </div>
      )}
    </div>
  );
}
