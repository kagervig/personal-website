import { cn } from "@/lib/utils";

function SkeletonBox({ className }: { className?: string }) {
  return <div className={cn("bg-muted animate-pulse rounded", className)} />;
}

function SkeletonCard() {
  return (
    <div className="bg-card border border-card-border rounded-lg p-4 space-y-3">
      <div className="flex justify-between">
        <SkeletonBox className="h-4 w-16" />
        <SkeletonBox className="h-4 w-10" />
      </div>
      <SkeletonBox className="h-5 w-3/4" />
      <SkeletonBox className="h-8 w-1/2" />
      <div className="flex justify-between">
        <SkeletonBox className="h-4 w-20" />
        <SkeletonBox className="h-4 w-16" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonMacro({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border border-card-border rounded-lg p-4 space-y-3">
          <div className="flex gap-2">
            <SkeletonBox className="h-5 w-16" />
            <SkeletonBox className="h-5 w-8" />
          </div>
          <SkeletonBox className="h-4 w-3/4" />
          <SkeletonBox className="h-8 w-1/2" />
          <SkeletonBox className="h-3 w-full" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 10, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-card-border">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-4 py-2.5">
                <SkeletonBox className="h-3 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b border-border/50 last:border-0">
              {Array.from({ length: cols }).map((_, j) => (
                <td key={j} className="px-4 py-3">
                  <SkeletonBox className={cn("h-4", j === 0 ? "w-32" : "w-16")} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
