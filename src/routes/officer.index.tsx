import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, FastForward, Loader2, Scale, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/kisansetu/app-shell";
import { StatCard } from "@/components/kisansetu/stat-card";
import { StatusBadge } from "@/components/kisansetu/status";
import { useKisansetu } from "@/lib/kisansetu/store";
import { statusIndex } from "@/lib/kisansetu/types";

export const Route = createFileRoute("/officer/")({
  head: () => ({
    meta: [
      { title: "Officer Dashboard — KISANSETU" },
      { name: "description", content: "Today's farmer queue, pending requests and procurement volume at your centre." },
      { property: "og:title", content: "Officer Dashboard — KISANSETU" },
      { property: "og:description", content: "Manage the day's token queue end to end." },
    ],
  }),
  component: OfficerDashboard,
});

function OfficerDashboard() {
  const { state, advanceStatus } = useKisansetu();
  const requests = state.requests;
  const pending = requests.filter((r) => statusIndex(r.status) <= 2);
  const inProgress = requests.filter((r) => statusIndex(r.status) > 2 && statusIndex(r.status) < 6);
  const completed = requests.filter((r) => statusIndex(r.status) >= 6);
  const totalQuantity = requests.reduce((sum, r) => sum + (r.actualWeight ?? 0), 0);

  return (
    <>
      <PageHeading
        title="Today's Procurement Overview"
        description="Queue is ordered by assigned slot. Use the actions to move a farmer through the process."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={Users} label="Today's Farmers" value={requests.length} tone="primary" />
        <StatCard icon={ClipboardList} label="Pending Requests" value={pending.length} tone="grey" />
        <StatCard icon={Loader2} label="In Progress" value={inProgress.length} tone="gold" />
        <StatCard icon={CheckCircle2} label="Completed" value={completed.length} tone="green" />
        <StatCard icon={Scale} label="Total Quantity" value={`${totalQuantity} kg`} tone="primary" />
      </div>

      <section className="card-soft mt-8 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h3 className="font-display text-lg font-bold text-primary">Today&apos;s queue</h3>
          <Button asChild variant="outline" size="sm">
            <Link to="/officer/scanner">Open token scanner</Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Token</th>
                <th className="px-5 py-3">Farmer</th>
                <th className="px-5 py-3">Crop</th>
                <th className="px-5 py-3">Quantity</th>
                <th className="px-5 py-3">Slot</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.requestId} className="border-t border-border/70">
                  <td className="px-5 py-4 font-display font-bold text-primary">{r.token}</td>
                  <td className="px-5 py-4">{r.farmerName}</td>
                  <td className="px-5 py-4">{r.crop}</td>
                  <td className="px-5 py-4">{r.actualWeight ?? r.quantity} kg</td>
                  <td className="px-5 py-4 whitespace-nowrap">{r.slot}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="ghost">
                        <Link to="/farmer/token/$token" params={{ token: r.token }}>
                          View
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to="/officer/scanner" search={{ token: r.token }}>
                          Scan
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          advanceStatus(r.requestId);
                          toast.success(`Token ${r.token} updated to the next stage.`);
                        }}
                      >
                        <FastForward className="size-3.5" /> Update
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
