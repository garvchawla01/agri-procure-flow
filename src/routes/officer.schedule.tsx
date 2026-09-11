import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { PageHeading } from "@/components/kisansetu/app-shell";
import { StatusBadge } from "@/components/kisansetu/status";
import { useKisansetu } from "@/lib/kisansetu/store";
import { SLOTS } from "@/lib/kisansetu/types";

export const Route = createFileRoute("/officer/schedule")({
  head: () => ({
    meta: [
      { title: "Today's Schedule — Officer Console | KISANSETU" },
      { name: "description", content: "Slot-wise farmer schedule for your procurement centre today." },
      { property: "og:title", content: "Today's Schedule — KISANSETU" },
      { property: "og:description", content: "See which farmers are expected in each hourly slot." },
    ],
  }),
  component: OfficerSchedule,
});

function OfficerSchedule() {
  const { state } = useKisansetu();

  return (
    <>
      <PageHeading title="Today's Schedule" description="Slot-wise arrival plan for registered tokens." />
      <div className="space-y-5">
        {SLOTS.map((slot) => {
          const rows = state.requests.filter((r) => r.slot === slot);
          return (
            <section key={slot} className="card-soft overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary/50 px-5 py-3">
                <p className="flex items-center gap-2 font-semibold">
                  <CalendarClock className="size-4.5 text-primary" /> {slot}
                </p>
                <span className="text-xs text-muted-foreground">{rows.length} farmers</span>
              </div>
              {rows.length ? (
                <ul className="divide-y divide-border/70">
                  {rows.map((r) => (
                    <li key={r.requestId} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm">
                      <span className="font-display font-bold text-primary">{r.token}</span>
                      <span className="min-w-32 flex-1">{r.farmerName}</span>
                      <span className="text-muted-foreground">
                        {r.crop} · {r.quantity} kg
                      </span>
                      <StatusBadge status={r.status} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-5 py-6 text-sm text-muted-foreground">No farmers scheduled in this slot.</p>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
