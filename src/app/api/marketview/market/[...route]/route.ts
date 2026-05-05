import { NextRequest, NextResponse } from "next/server";
import yf, { getCached, setCached } from "@/lib/marketview/yahoo-finance";

// Constants from original market.ts
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
  { symbol: "LIT", name: "Lithium", region: "Global" },
  { symbol: "WCOB.L", name: "Cobalt", region: "Global" },
];

const AGRICULTURAL_TICKERS = [
  { symbol: "ZC=F", name: "Corn", region: "Global" },
  { symbol: "ZW=F", name: "Wheat", region: "Global" },
  { symbol: "ZS=F", name: "Soybeans", region: "Global" },
  { symbol: "KC=F", name: "Coffee", region: "Global" },
  { symbol: "SB=F", name: "Sugar", region: "Global" },
  { symbol: "CT=F", name: "Cotton", region: "Global" },
  { symbol: "CC=F", name: "Cocoa", region: "Global" },
  { symbol: "LE=F", name: "Live Cattle", region: "Global" },
  { symbol: "HE=F", name: "Lean Hogs", region: "Global" },
];

const CURRENCY_TICKERS = [
  { symbol: "EURUSD=X", name: "EUR/USD", region: "FX" },
  { symbol: "GBPUSD=X", name: "GBP/USD", region: "FX" },
  { symbol: "USDJPY=X", name: "USD/JPY", region: "FX" },
  { symbol: "USDCAD=X", name: "USD/CAD", region: "FX" },
  { symbol: "AUDUSD=X", name: "AUD/USD", region: "FX" },
  { symbol: "USDCNY=X", name: "USD/CNY", region: "FX" },
  { symbol: "USDINR=X", name: "USD/INR", region: "FX" },
  { symbol: "USDCHF=X", name: "USD/CHF", region: "FX" },
];

const INDEX_META: Record<string, { name: string; symbols: string[] }> = {
  nasdaq: {
    name: "NASDAQ",
    symbols: ["AAPL","MSFT","NVDA","AMZN","META","TSLA","GOOGL","AVGO","COST","NFLX","AMD","QCOM","TMUS","ADBE","CSCO","TXN","AMGN","INTU","CMCSA","ISRG","MU","AMAT","KLAC","PANW","REGN","VRTX","PEP","BKNG","GILD","LRCX","SNPS","MELI","ADI","CDNS","ASML","CRWD","NXPI","WDAY","PYPL","ORLY","ABNB","FTNT","TEAM","CEG","DXCM","IDXX","MRVL","AZN","PCAR","CTAS","ODFL","FANG","FAST","ROST","VRSK","CPRT","GEHC","KDP","CTSH","MNST","BIIB","SGEN","DLTR","ANSS","PAYX","CSGP","ZS","SPLK","TTWO","ENPH","XEL","SIRI","AEP","HON","MDLZ","CSX","ILMN","EA","ON","CHTR","WBA","ALGN","DDOG","LCID","RIVN","ZM","ROKU","DOCU","OKTA","SNOW","PLTR","COIN","HOOD","UBER","LYFT","DASH","TTD","PINS","RBLX","SHOP"],
  },
  dowjones: {
    name: "Dow Jones",
    symbols: ["AAPL","AMGN","AXP","BA","CAT","CRM","CSCO","CVX","DIS","DOW","GS","HD","HON","IBM","JNJ","JPM","KO","MCD","MMM","MRK","MSFT","NKE","NVDA","PG","SHW","TRV","UNH","V","VZ","WMT"],
  },
  tsx: {
    name: "TSX",
    symbols: ["RY.TO","TD.TO","BNS.TO","BMO.TO","ENB.TO","CNQ.TO","CP.TO","CNR.TO","TRI.TO","MFC.TO","SU.TO","ABX.TO","SHOP.TO","ATD.TO","BAM.TO","BCE.TO","TRP.TO","CM.TO","AEM.TO","WPM.TO","SLF.TO","POW.TO","FFH.TO","CSU.TO","IFC.TO","EMA.TO","H.TO","FNV.TO","IMO.TO","MRU.TO","T.TO","L.TO","NA.TO","X.TO","FM.TO","K.TO","GFL.TO","TFII.TO","WN.TO","QSR.TO"],
  },
  ftse100: {
    name: "FTSE 100",
    symbols: ["AZN.L","SHEL.L","HSBA.L","ULVR.L","BP.L","RIO.L","GSK.L","DGE.L","REL.L","BATS.L","LSEG.L","BA.L","EXPN.L","CPG.L","RKT.L","NXT.L","NG.L","BARC.L","LLOY.L","AHT.L","GLEN.L","PRU.L","SGRO.L","SSE.L","FLTR.L","NWG.L","IMB.L","AAL.L","III.L","AV.L","LGEN.L","BT-A.L","SMT.L","IHG.L","TSCO.L","HLMA.L","RR.L","VOD.L","ABF.L","WPP.L"],
  },
  dax: {
    name: "DAX",
    symbols: ["SAP.DE","SIE.DE","ALV.DE","MRK.DE","ADS.DE","BMW.DE","BAS.DE","MBG.DE","VOW3.DE","DTE.DE","BAYN.DE","DB1.DE","RWE.DE","EON.DE","HEI.DE","IFX.DE","FRE.DE","MUV2.DE","VNA.DE","LIN.DE","RHM.DE","CBK.DE","SHL.DE","BEI.DE","CON.DE","DBK.DE","ZAL.DE","PUM.DE","1COV.DE","DHER.DE","SY1.DE","QIA.DE","SAR.DE","HNR1.DE","P911.DE","SRT3.DE","ENR.DE","EVD.DE","AIR.DE","DHL.DE"],
  },
  hangseng: {
    name: "Hang Seng",
    symbols: ["0700.HK","0005.HK","9988.HK","0388.HK","0941.HK","1299.HK","2318.HK","0016.HK","1398.HK","3988.HK","0883.HK","2628.HK","0688.HK","1109.HK","6098.HK","1177.HK","1928.HK","0011.HK","0066.HK","2388.HK","0823.HK","3328.HK","0267.HK","1038.HK","0027.HK","0002.HK","0003.HK","0006.HK","0012.HK","2020.HK","1997.HK","0101.HK","1211.HK","2313.HK","0175.HK","3968.HK","0019.HK","0017.HK","1113.HK","0836.HK"],
  },
};

// Helper functions
function getAlertLevel(changePercent: number): "none" | "watch" | "alert" | "critical" {
  const abs = Math.abs(changePercent);
  if (abs >= 5) return "critical";
  if (abs >= 3) return "alert";
  if (abs >= 1.5) return "watch";
  return "none";
}

async function fetchMonthlyReturn(symbol: string): Promise<number> {
  const cacheKey = `month:${symbol}`;
  const cached = getCached<number>(cacheKey);
  if (cached !== null) return cached;
  try {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 31);
    const result = await yf.chart(symbol, {
      period1: start.toISOString().split("T")[0],
      period2: end.toISOString().split("T")[0],
      interval: "1d",
    });
    const quotes = (result.quotes as any[]) ?? [];
    const closes = quotes.map((q) => q.close).filter((c): c is number => c != null && c > 0);
    if (closes.length < 2) return 0;
    const pct = parseFloat((((closes[closes.length - 1] - closes[0]) / closes[0]) * 100).toFixed(4));
    setCached(cacheKey, pct, 60 * 60 * 1000);
    return pct;
  } catch {
    return 0;
  }
}

async function fetchTickers(tickers: { symbol: string; name: string; region: string }[]) {
  const results = await Promise.allSettled(
    tickers.map(async ({ symbol, name, region }) => {
      const [quote, changePercent1M] = await Promise.all([
        yf.quote(symbol).catch(() => null),
        fetchMonthlyReturn(symbol),
      ]);
      if (!quote) throw new Error(`No quote data for ${symbol}`);
      const changePercent = quote.regularMarketChangePercent ?? 0;
      const changePercent1Y = (quote as any).fiftyTwoWeekChangePercent ?? null;

      return {
        symbol,
        name,
        price: quote.regularMarketPrice ?? 0,
        change: quote.regularMarketChange ?? 0,
        changePercent,
        changePercentWeek: changePercent1Y ?? changePercent * 5,
        changePercent1M,
        changePercent1Y: changePercent1Y != null ? parseFloat(changePercent1Y.toFixed(2)) : null,
        high52w: quote.fiftyTwoWeekHigh ?? null,
        low52w: quote.fiftyTwoWeekLow ?? null,
        volume: quote.regularMarketVolume ?? null,
        marketCap: (quote as any).marketCap ?? null,
        currency: quote.currency ?? "USD",
        region,
        isHighVolatility: Math.abs(changePercent) >= 3,
        alertLevel: getAlertLevel(changePercent),
        lastUpdated: new Date().toISOString(),
      };
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
    .map((r) => r.value);
}

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
  try {
    const [quoteResult, fundamentalsResult, closesResult] = await Promise.allSettled([
      yf.quote(symbol),
      fetchFundamentals(symbol),
      fetchHistory(symbol),
    ]);

    const quote = quoteResult.status === "fulfilled" ? quoteResult.value : ({} as any);
    const fundamentals = fundamentalsResult.status === "fulfilled" ? fundamentalsResult.value : { peRatio: null, forwardPE: null, pegRatio: null, pbRatio: null, deRatio: null, roe: null, dividendYield: null };
    const closes = closesResult.status === "fulfilled" ? closesResult.value : [];

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
  } catch (err) {
    console.error(`Failed to build index stock ${symbol}:`, err);
    return null;
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ route: string[] }> }) {
  const { route } = await params;
  const searchParams = req.nextUrl.searchParams;

  try {
    if (route[0] === "stocks") {
      const data = await fetchTickers(STOCK_TICKERS);
      return NextResponse.json(data);
    }

    if (route[0] === "commodities") {
      const data = await fetchTickers(COMMODITY_TICKERS);
      return NextResponse.json(data);
    }

    if (route[0] === "agricultural") {
      const data = await fetchTickers(AGRICULTURAL_TICKERS);
      return NextResponse.json(data);
    }

    if (route[0] === "currencies") {
      const data = await fetchTickers(CURRENCY_TICKERS);
      return NextResponse.json(data);
    }

    if (route[0] === "summary") {
      try {
        const all = await fetchTickers([...STOCK_TICKERS, ...COMMODITY_TICKERS, ...CURRENCY_TICKERS, ...AGRICULTURAL_TICKERS]);
        const avgChange = all.length > 0 ? all.reduce((sum, t) => sum + (t.changePercent || 0), 0) / all.length : 0;
        const sorted = [...all].sort((a, b) => (b.changePercent || 0) - (a.changePercent || 0));
        const alerts = all
          .filter((t) => t.alertLevel && t.alertLevel !== "none")
          .map((t) => ({
            symbol: t.symbol,
            name: t.name,
            severity: t.alertLevel,
            changePercent: t.changePercent,
            message: `${t.name} moved ${t.changePercent > 0 ? "+" : ""}${t.changePercent.toFixed(2)}% today`,
          }));

        return NextResponse.json({
          overallSentiment: avgChange > 0.5 ? "bullish" : avgChange < -0.5 ? "bearish" : "neutral",
          topGainers: sorted.slice(0, 3),
          topLosers: sorted.slice(-3).reverse(),
          alerts,
          lastUpdated: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Summary fallback used:", err);
        return NextResponse.json({
          overallSentiment: "neutral",
          topGainers: [],
          topLosers: [],
          alerts: [],
          lastUpdated: new Date().toISOString(),
        });
      }
    }

    if (route[0] === "quotes") {
      const symbols = searchParams.get("symbols")?.split(",") ?? [];
      const tickers = symbols.map(s => ({ symbol: s, name: s, region: "Watchlist" }));
      const stocks = await fetchTickers(tickers);
      return NextResponse.json({ stocks, lastUpdated: new Date().toISOString() });
    }

    if (route[0] === "chart") {
      const symbol = searchParams.get("symbol") || "";
      const range = (searchParams.get("range") || "1w") as any;
      
      try {
        const now = new Date();
        const startDate = new Date();
        const daysBack = range === "1h" ? 1 : range === "1d" ? 1 : range === "1w" ? 7 : range === "1m" ? 31 : range === "6m" ? 183 : range === "1yr" ? 365 : 1825;
        startDate.setDate(startDate.getDate() - daysBack);

        const result = await yf.chart(symbol, {
          period1: startDate.toISOString().split("T")[0],
          period2: now.toISOString().split("T")[0],
          interval: range === "1h" ? "2m" : range === "1d" ? "5m" : range === "1w" ? "1h" : "1d",
        });

        const points = (result.quotes || [])
          .filter((q: any) => q.close != null)
          .map((q: any) => ({
            t: new Date(q.date).getTime(),
            c: q.close,
          }));

        return NextResponse.json({ symbol, range, points });
      } catch (err) {
        console.error(`Chart error for ${symbol}:`, err);
        return NextResponse.json({ symbol, range, points: [] });
      }
    }

    if (route[0] === "macro" && route[1] === "country") {
      const countryId = route[2];
      const dummyIndicator = (id: string, name: string, category: any): any => ({
        id, name, value: 0, previousValue: 0, change: 0, unit: "%", frequency: "Monthly", lastUpdated: "Today", category, country: countryId, history: []
      });
      return NextResponse.json({
        interestRates: [dummyIndicator("ir", "Central Bank Rate", "interest_rate")],
        inflation: [dummyIndicator("cpi", "CPI Inflation", "inflation")],
        gdp: [dummyIndicator("gdp", "GDP Growth", "gdp")],
        sentiment: [dummyIndicator("sent", "Consumer Sentiment", "sentiment")],
      });
    }

    if (route[0] === "index-stocks") {
      const indexId = route[1];
      const meta = INDEX_META[indexId];
      if (!meta) return NextResponse.json({ error: "Not found" }, { status: 404 });
      
      const stockResults = await Promise.allSettled(meta.symbols.slice(0, 15).map(s => buildIndexStock(s)));
      const stocks = stockResults
        .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled" && r.value !== null)
        .map(r => r.value);

      return NextResponse.json({ indexId, indexName: meta.name, stocks, lastUpdated: new Date().toISOString() });
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
  } catch (err: any) {
    console.error("MarketView API Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
