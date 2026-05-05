import { useMemo } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  closes: number[];
  positive?: boolean;
  height?: number;
  showTooltip?: boolean;
}

interface TooltipProps {
  active?: boolean;
  payload?: { value: number }[];
}

function ChartTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded px-2 py-1 text-xs font-mono shadow-lg">
      {payload[0].value.toFixed(2)}
    </div>
  );
}

export function MiniChart({ closes, positive, height = 48, showTooltip = false }: Props) {
  const data = useMemo(
    () => closes.map((v, i) => ({ i, v })),
    [closes]
  );

  if (!closes.length) {
    return (
      <div
        style={{ height }}
        className="flex items-center justify-center text-muted-foreground/30 text-xs"
      >
        —
      </div>
    );
  }

  const isUp = positive ?? (closes[closes.length - 1] >= closes[0]);
  const color = isUp ? "#22c55e" : "#ef4444";
  const gradientId = `spark-${isUp ? "up" : "dn"}-${height}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.25} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showTooltip && (
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: "3 3" }}
          />
        )}
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
