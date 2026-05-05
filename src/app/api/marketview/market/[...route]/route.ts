import { NextRequest, NextResponse } from "next/server";
import yf, { getCached, setCached } from "@/lib/marketview/yahoo-finance";

// Constants from api-server
const INDEX_META: Record<string, { name: string; symbols: string[] }> = {
  nasdaq: {
    name: "NASDAQ",
    symbols: ["AAPL","MSFT","NVDA","AMZN","META","TSLA","GOOGL","AVGO","COST","NFLX","AMD","QCOM","TMUS","ADBE","CSCO","TXN","AMGN","INTU","CMCSA","ISRG"], // Truncated for brevity
  },
  dowjones: {
    name: "Dow Jones",
    symbols: ["AAPL","AMGN","AXP","BA","CAT","CRM","CSCO","CVX","DIS","DOW","GS","HD","HON","IBM","JNJ","JPM","KO","MCD","MMM","MRK","MSFT","NKE","NVDA","PG","SHW","TRV","UNH","V","VZ","WMT"],
  },
  tsx: {
    name: "TSX",
    symbols: ["RY.TO","TD.TO","BNS.TO","BMO.TO","ENB.TO","CNQ.TO","CP.TO","CNR.TO","TRI.TO","MFC.TO","SU.TO","ABX.TO","SHOP.TO","ATD.TO","BAM.TO","BCE.TO","TRP.TO","CM.TO","AEM.TO","WPM.TO","SLF.TO","POW.TO","FFH.TO","CSU.TO","IFC.TO","EMA.TO","H.TO","FNV.TO","IMO.TO","MRU.TO","T.TO","L.TO","NA.TO","X.TO","FM.TO","K.TO","GFL.TO","TFII.TO","WN.TO","QSR.TO"],
  },
};

const STOCK_TICKERS = [
  { symbol: "^IXIC", name: "NASDAQ Composite", region: "US" },
  { symbol: "^DJI", name: "Dow Jones", region: "US" },
  { symbol: "^GSPTSX", name: "TSX Composite", region: "CA" },
  { symbol: "^FTMC", name: "FTSE 100", region: "UK" },
  { symbol: "^GDAXI", name: "DAX", region: "DE" },
  { symbol: "^HSI", name: "Hang Seng", region: "HK" },
  { symbol: "^FCHI", name: "CAC 40", region: "FR" },
  { symbol: "^N225", name: "Nikkei 225", region: "JP" },
  { symbol: "^KS11", name: "KOSPI", region: "KR" },
];

const COMMODITY_TICKERS = [
  { symbol: "CL=F", name: "WTI Crude Oil", region: "Global" },
  { symbol: "BZ=F", name: "Brent Crude Oil", region: "Global" },
  { symbol: "GC=F", name: "Gold", region: "Global" },
  { symbol: "SI=F", name: "Silver", region: "Global" },
  { symbol: "NG=F", name: "Natural Gas", region: "Global" },
  { symbol: "HG=F", name: "Copper", region: "Global" },
];

const CURRENCY_TICKERS = [
  { symbol: "EURUSD=X", name: "EUR/USD", region: "FX" },
  { symbol: "GBPUSD=X", name: "GBP/USD", region: "FX" },
  { symbol: "USDJPY=X", name: "USD/JPY", region: "FX" },
  { symbol: "USDCAD=X", name: "USD/CAD", region: "FX" },
];

// Helper functions (copied and adapted from api-server)
function calcMA(closes: number[], period: number): number | null {
  if (closes.length < period) return null;
  const slice = closes.slice(-period);
  return parseFloat((slice.reduce((a, b) => a + b, 0) / period).toFixed(4));
}

function calcRSI(closes: number[], period = 14): number | null {
  if (closes.length < period + 1) return null;
  const recent = closes.slice(-(period + 1));
  let gains = 0;
  let losses = 0;
  for (let i = 1; i < recent.length; i++) {
    const diff = recent[i] - recent[i - 1];
    if (diff >= 0) gains += diff;
    else losses += Math.abs(diff);
  }
  const avgGain = gains / period;
  const avgLoss = losses / period;
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return parseFloat((100 - 100 / (1 + rs)).toFixed(2));
}

async function fetchHistory(symbol: string): Promise<number[]> {
  const cacheKey = `hist:${symbol}`;
  const cached = getCached<number[]>(cacheKey);
  if (cached) return cached;

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 320);

  try {
    const rows = await yf.historical(symbol, {
      period1: startDate.toISOString().split("T")[0],
      period2: endDate.toISOString().split("T")[0],
      interval: "1d",
    });
    const closes = rows.map((r: any) => r.close).filter(Boolean);
    setCached(cacheKey, closes, 10 * 60 * 1000);
    return closes;
  } catch {
    return [];
  }
}

async function fetchFundamentals(symbol: string) {
  try {
    const summary = await yf.quoteSummary(symbol, {
      modules: ["defaultKeyStatistics", "financialData", "summaryDetail"],
    });
    const ks = summary.defaultKeyStatistics as any;
    const fd = summary.financialData as any;
    const sd = summary.summaryDetail as any;

    return {
      peRatio: sd?.trailingPE ?? null,
      forwardPE: sd?.forwardPE ?? ks?.forwardPE ?? null,
      pegRatio: ks?.pegRatio ?? null,
      pbRatio: ks?.priceToBook ?? null,
      deRatio: fd?.debtToEquity ?? null,
      roe: fd?.returnOnEquity != null ? parseFloat((fd.returnOnEquity * 100).toFixed(2)) : null,
      dividendYield: sd?.dividendYield != null ? parseFloat((sd.dividendYield * 100).toFixed(2)) : null,
    };
  } catch {
    return { peRatio: null, forwardPE: null, pegRatio: null, pbRatio: null, deRatio: null, roe: null, dividendYield: null };
  }
}

async function buildIndexStock(symbol: string) {
  const [quote, fundamentals, closes] = await Promise.all([
    yf.quote(symbol),
    fetchFundamentals(symbol),
    fetchHistory(symbol),
  ]);

  const price = quote.regularMarketPrice ?? 0;
  const changePercent = quote.regularMarketChangePercent ?? 0;
  const ma20 = calcMA(closes, 20);
  const ma50 = calcMA(closes, 50);
  const ma200 = calcMA(closes, 200);
  const rsi14 = calcRSI(closes);

  return {
    symbol,
    name: quote.shortName ?? quote.longName ?? symbol,
    price,
    change: quote.regularMarketChange ?? 0,
    changePercent,
    marketCap: (quote as any).marketCap ?? null,
    currency: quote.currency ?? "USD",
    rsi14,
    ma20,
    ma50,
    ma200,
    sparkline: closes.slice(-7),
    lastUpdated: new Date().toISOString(),
  };
}

async function fetchTickers(tickers: { symbol: string; name: string; region: string }[]) {
  return Promise.all(
    tickers.map(async ({ symbol, name, region }) => {
      const quote = await yf.quote(symbol);
      return {
        symbol,
        name,
        price: quote.regularMarketPrice ?? 0,
        change: quote.regularMarketChange ?? 0,
        changePercent: quote.regularMarketChangePercent ?? 0,
        currency: quote.currency ?? "USD",
        region,
        lastUpdated: new Date().toISOString(),
      };
    })
  );
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ route: string[] }> }) {
  const { route } = await params;
  const searchParams = req.nextUrl.searchParams;

  if (route[0] === "stocks") {
    const data = await fetchTickers(STOCK_TICKERS);
    return NextResponse.json(data);
  }

  if (route[0] === "commodities") {
    const data = await fetchTickers(COMMODITY_TICKERS);
    return NextResponse.json(data);
  }

  if (route[0] === "currencies") {
    const data = await fetchTickers(CURRENCY_TICKERS);
    return NextResponse.json(data);
  }

  if (route[0] === "summary") {
    const all = await fetchTickers([...STOCK_TICKERS, ...COMMODITY_TICKERS]);
    const avgChange = all.reduce((sum, t) => sum + t.changePercent, 0) / all.length;
    return NextResponse.json({
      overallSentiment: avgChange > 0.5 ? "bullish" : avgChange < -0.5 ? "bearish" : "neutral",
      alerts: [],
      lastUpdated: new Date().toISOString(),
    });
  }

  if (route[0] === "macro" && route[1] === "country") {
    const countryId = route[2];
    // Simple mock or fetch for now
    return NextResponse.json({
      interestRates: [],
      inflation: [],
      gdp: [],
      sentiment: [],
    });
  }

  if (route[0] === "index-stocks") {
    const indexId = route[1];
    const meta = INDEX_META[indexId];
    if (!meta) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const stocks = await Promise.all(meta.symbols.slice(0, 10).map(s => buildIndexStock(s)));
    return NextResponse.json({
      indexId,
      indexName: meta.name,
      stocks,
      lastUpdated: new Date().toISOString(),
    });
  }

  if (route[0] === "sparklines") {
    const symbols = searchParams.get("symbols")?.split(",") ?? [];
    const data = await Promise.all(symbols.map(async (symbol) => ({
      symbol,
      closes: await fetchHistory(symbol).then(h => h.slice(-7))
    })));
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
