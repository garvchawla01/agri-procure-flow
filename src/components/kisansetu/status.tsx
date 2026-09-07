import { Check, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_FLOW, STATUS_LABEL, statusIndex, type ProcurementStatus } from "@/lib/kisansetu/types";

export function StatusBadge({ status }: { status: ProcurementStatus }) {
  const idx = statusIndex(status);
  const tone =
    idx >= 6
      ? "bg-success/12 text-success border-success/30"
      : idx === 0
        ? "bg-pending/15 text-muted-foreground border-pending/30"
        : "bg-warning/15 text-[color:var(--primary)] border-warning/40";
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold", tone)}>
      <span
        className={cn(
          "size-1.5 rounded-full",
          idx >= 6 ? "bg-success" : idx === 0 ? "bg-pending" : "bg-warning",
        )}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}

const TIMELINE = STATUS_FLOW.slice(0, 7);

export function StatusTimeline({ status }: { status: ProcurementStatus }) {
  const current = Math.min(statusIndex(status), 6);
  return (
    <ol className="space-y-0">
      {TIMELINE.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  done && "border-success bg-success text-[color:var(--success-foreground)]",
                  active && "border-warning bg-warning text-[color:var(--warning-foreground)]",
                  !done && !active && "border-border bg-muted text-muted-foreground",
                )}
              >
                {done ? (
                  <Check className="size-4" />
                ) : active ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Circle className="size-3" />
                )}
              </span>
              {i < TIMELINE.length - 1 ? (
                <span className={cn("w-0.5 flex-1 min-h-8", done ? "bg-success" : "bg-border")} />
              ) : null}
            </div>
            <div className="pb-6 pt-1.5">
              <p
                className={cn(
                  "text-sm font-semibold",
                  active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {STATUS_LABEL[step]}
              </p>
              {active ? (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  In progress — estimated {8 + i * 4} min at the centre
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
