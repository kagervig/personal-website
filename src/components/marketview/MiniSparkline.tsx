import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface Props {
  positive: boolean;
  data?: number[];
}

function generateSparkData(positive: boolean, base: number, points = 12): { v: number }[] {
  const data: { v: number }[] = [];
  let val = base;
  for (let i = 0; i < points; i++) {
    val += (Math.random() - (positive ? 0.35 : 0.65)) * base * 0.03;
    data.push({ v: Math.max(val, base * 0.85) });
  }
  return data;
}

export function MiniSparkline({ positive, data }: Props) {
  const seed = Math.random() * 100 + 50;
  const chartData = data?.map((v) => ({ v })) ?? generateSparkData(positive, seed);
  const color = positive ? "#10b981" : "#ef4444";

  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={`spark-${positive}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#spark-${positive})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
