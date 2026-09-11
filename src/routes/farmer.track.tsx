import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FastForward, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeading } from "@/components/kisansetu/app-shell";
import { StatusBadge, StatusTimeline } from "@/components/kisansetu/status";
import { useKisansetu } from "@/lib/kisansetu/store";
import { STATUS_LABEL } from "@/lib/kisansetu/types";

export const Route = createFileRoute("/farmer/track")({
  head: () => ({
    meta: [
      { title: "Track Your Procurement — KISANSETU" },
      { name: "description", content: "Enter your token number to follow every procurement stage in real time." },
      { property: "og:title", content: "Track Your Procurement — KISANSETU" },
      { property: "og:description", content: "Live status from token generation to payment initiation." },
    ],
  }),
  component: Track,
});

function Track() {
  const { findByToken, advanceStatus, farmerRequests } = useKisansetu();
  const [input, setInput] = useState(farmerRequests[0]?.token ?? "A104");
  const [query, setQuery] = useState(farmerRequests[0]?.token ?? "A104");
  const request = findByToken(query);

  return (
    <>
      <PageHeading
        title="Track Your Procurement"
        description="Use the token printed on your procurement card, for example A104."
      />

      <div className="card-soft mb-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="token">Enter token number</Label>
          <Input
            id="token"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            className="h-12 text-base font-semibold tracking-widest"
            placeholder="A104"
            maxLength={8}
          />
        </div>
        <Button size="lg" className="h-12" onClick={() => setQuery(input)}>
          <Search className="size-4.5" /> Track
        </Button>
      </div>

      {!request ? (
        <div className="card-soft p-8 text-center text-muted-foreground">
          No procurement found for token <span className="font-semibold">{query}</span>. Try A104, A105 or A106.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="card-soft p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Current status</p>
                <p className="font-display text-2xl font-bold text-primary">{STATUS_LABEL[request.status]}</p>
              </div>
              <StatusBadge status={request.status} />
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Centre name", request.centre],
                ["Token number", request.token],
                ["Assigned slot", request.slot],
                ["Crop & quantity", `${request.crop} · ${request.actualWeight ?? request.quantity} kg`],
                ["Last updated", new Date(request.updatedAt).toLocaleString("en-IN")],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-secondary/60 p-3">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                size="lg"
                onClick={() => toast.success("Status refreshed just now.")}
              >
                <RefreshCw className="size-4.5" /> Refresh Status
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  advanceStatus(request.requestId);
                  toast.success("Demo: procurement moved to the next step.");
                }}
              >
                <FastForward className="size-4.5" /> Simulate Next Step
              </Button>
            </div>
          </div>

          <div className="card-soft p-6">
            <h3 className="mb-5 font-display text-lg font-bold text-primary">Procurement timeline</h3>
            <StatusTimeline status={request.status} />
          </div>
        </div>
      )}
    </>
  );
}
