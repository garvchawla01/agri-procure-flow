import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FastForward,
  Phone,
  Radio,
  Sprout,
  TriangleAlert,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/kisansetu/app-shell";
import { StatCard } from "@/components/kisansetu/stat-card";
import { StatusBadge } from "@/components/kisansetu/status";
import { useKisansetu } from "@/lib/kisansetu/store";
import { statusIndex } from "@/lib/kisansetu/types";

export const Route = createFileRoute("/farmer/")({
  head: () => ({
    meta: [
      { title: "Kisan Dashboard — KISANSETU" },
      { name: "description", content: "Your procurement requests, tokens, slots and status updates in one place." },
      { property: "og:title", content: "Kisan Dashboard — KISANSETU" },
      { property: "og:description", content: "Track active requests, upcoming slots and completed procurements." },
    ],
  }),
  component: FarmerDashboard,
});

function FarmerDashboard() {
  const { currentFarmer, farmerRequests, farmerNotifications, advanceStatus } = useKisansetu();

  const active = farmerRequests.filter((r) => statusIndex(r.status) < 6);
  const completed = farmerRequests.filter((r) => statusIndex(r.status) >= 6);
  const upcoming = active[0];
  const pendingActions = farmerNotifications.filter((n) => !n.read).length;
  const liveRequest = active.find((r) => statusIndex(r.status) >= 3) ?? active[0];

  return (
    <>
      <PageHeading
        title={`Namaste, ${currentFarmer.name.split(" ")[0]}`}
        description="Here is today's procurement summary for your registered farmer ID."
        action={
          liveRequest ? (
            <Button
              variant="secondary"
              onClick={() => {
                advanceStatus(liveRequest.requestId);
                toast.success(`Demo: token ${liveRequest.token} moved to the next step.`);
              }}
            >
              <FastForward className="size-4" /> Simulate Next Step
            </Button>
          ) : undefined
        }
      />

      <div className="card-soft mb-6 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: User, label: "Farmer name", value: currentFarmer.name },
          { icon: Sprout, label: "Farmer ID", value: currentFarmer.farmerId },
          { icon: CalendarClock, label: "Village", value: currentFarmer.village },
          { icon: Phone, label: "Registered mobile", value: currentFarmer.mobile },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
              <f.icon className="size-4.5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{f.label}</p>
              <p className="truncate font-semibold">{f.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ClipboardList} label="Active Requests" value={active.length} tone="primary" />
        <StatCard
          icon={CalendarClock}
          label="Upcoming Slot"
          value={upcoming ? upcoming.slot.split("–")[0]!.trim() : "—"}
          hint={upcoming ? `${upcoming.centre} · ${upcoming.date}` : "No upcoming slot"}
          tone="gold"
        />
        <StatCard icon={CheckCircle2} label="Completed Procurements" value={completed.length} tone="green" />
        <StatCard icon={TriangleAlert} label="Pending Actions" value={pendingActions} hint="Unread notifications" tone="grey" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Button asChild size="lg" className="h-14 text-base">
          <Link to="/farmer/request">
            <ClipboardList className="size-5" /> New Procurement Request
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-14 text-base">
          <Link to="/farmer/track">
            <Radio className="size-5" /> Track Status
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-14 text-base">
          <Link to="/farmer/schedule">
            <CalendarClock className="size-5" /> View Schedule
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-14 text-base">
          <Link to="/farmer/notifications">
            <Bell className="size-5" /> Notifications
          </Link>
        </Button>
      </div>

      <section className="card-soft mt-8 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h3 className="font-display text-lg font-bold text-primary">Recent procurement</h3>
          <Link to="/farmer/track" className="text-sm font-semibold text-accent underline">
            Track a token
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Token</th>
                <th className="px-5 py-3">Crop</th>
                <th className="px-5 py-3">Quantity</th>
                <th className="px-5 py-3">Centre</th>
                <th className="px-5 py-3">Slot</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {farmerRequests.map((r) => (
                <tr key={r.requestId} className="border-t border-border/70">
                  <td className="px-5 py-4 font-display font-bold text-primary">{r.token}</td>
                  <td className="px-5 py-4">{r.crop}</td>
                  <td className="px-5 py-4">{r.actualWeight ?? r.quantity} kg</td>
                  <td className="px-5 py-4">{r.centre}</td>
                  <td className="px-5 py-4 whitespace-nowrap">{r.slot}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to="/farmer/token/$token"
                      params={{ token: r.token }}
                      className="font-semibold text-accent underline"
                    >
                      View token
                    </Link>
                  </td>
                </tr>
              ))}
              {farmerRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                    No procurement requests yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
