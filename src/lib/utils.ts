import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = "USD", compact = false): string {
  if (!price || isNaN(price)) return "—";
  const opts: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: price > 1000 ? 0 : price > 10 ? 2 : 4,
  };
  try {
    return new Intl.NumberFormat("en-US", opts).format(price);
  } catch {
    return price.toFixed(2);
  }
}

export function formatPercent(value: number, showSign = true): string {
  if (isNaN(value)) return "—";
  const sign = showSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatNumber(value: number, compact = true): string {
  if (isNaN(value) || value === 0) return "—";
  return new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 2,
  }).format(value);
}

export function changeColor(value: number): string {
  if (value > 0) return "text-emerald-600 dark:text-emerald-400";
  if (value < 0) return "text-red-600 dark:text-red-400";
  return "text-muted-foreground";
}

export function changeBg(value: number): string {
  if (value > 0) return "bg-emerald-50 dark:bg-emerald-950/40";
  if (value < 0) return "bg-red-50 dark:bg-red-950/40";
  return "";
}
