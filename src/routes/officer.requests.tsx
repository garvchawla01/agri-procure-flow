import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FastForward, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeading } from "@/components/kisansetu/app-shell";
import { StatusBadge } from "@/components/kisansetu/status";
import { useKisansetu } from "@/lib/kisansetu/store";

export const Route = createFileRoute("/officer/requests")({
  head: () => ({
    meta: [
      { title: "Farmer Requests — Officer Console | KISANSETU" },
      { name: "description", content: "Search and manage every farmer procurement request at your centre." },
      { property: "og:title", content: "Farmer Requests — KISANSETU" },
      { property: "og:description", content: "Verify documents and move requests forward." },
    ],
  }),
  component: OfficerRequests,
});

function OfficerRequests() {
  const { state, advanceStatus } = useKisansetu();
  const [q, setQ] = useState("");
  const rows = state.requests.filter((r) =>
    `${r.token} ${r.farmerName} ${r.farmerId} ${r.crop} ${r.centre}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <PageHeading title="Farmer Requests" description="All procurement requests received, newest first." />

      <div className="card-soft mb-6 flex items-center gap-3 p-4">
        <Search className="size-4.5 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by token, farmer, crop or centre"
          className="h-11 border-0 shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="card-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Request ID</th>
                <th className="px-5 py-3">Token</th>
                <th className="px-5 py-3">Farmer</th>
                <th className="px-5 py-3">Crop</th>
                <th className="px-5 py-3">Centre</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.requestId} className="border-t border-border/70">
                  <td className="px-5 py-4 font-medium">{r.requestId}</td>
                  <td className="px-5 py-4 font-display font-bold text-primary">{r.token}</td>
                  <td className="px-5 py-4">
                    {r.farmerName}
                    <span className="block text-xs text-muted-foreground">{r.farmerId}</span>
                  </td>
                  <td className="px-5 py-4">
                    {r.crop} · {r.quantity} kg
                  </td>
                  <td className="px-5 py-4">{r.centre}</td>
                  <td className="px-5 py-4 whitespace-nowrap">{r.date}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-5 py-4">
                    <Button
                      size="sm"
                      onClick={() => {
                        advanceStatus(r.requestId);
                        toast.success(`Token ${r.token} moved forward.`);
                      }}
                    >
                      <FastForward className="size-3.5" /> Update Status
                    </Button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-muted-foreground">
                    No requests match your search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
