import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeading } from "@/components/kisansetu/app-shell";
import { useKisansetu } from "@/lib/kisansetu/store";
import { CROPS, SLOTS } from "@/lib/kisansetu/types";

export const Route = createFileRoute("/farmer/schedule")({
  head: () => ({
    meta: [
      { title: "Procurement Schedule & Available Slots — KISANSETU" },
      { name: "description", content: "Filter by date, crop and centre to find an available procurement slot." },
      { property: "og:title", content: "Procurement Schedule — KISANSETU" },
      { property: "og:description", content: "Choose an available one-hour arrival slot at your centre." },
    ],
  }),
  component: Schedule,
});

const availability = ["Available", "Almost Full", "Full", "Available", "Almost Full"] as const;

const tone: Record<string, string> = {
  Available: "border-success/30 bg-success/10 text-success",
  "Almost Full": "border-warning/40 bg-warning/12 text-[color:var(--primary)]",
  Full: "border-pending/30 bg-pending/12 text-muted-foreground",
};

function Schedule() {
  const { state, farmerRequests, assignSlot } = useKisansetu();
  const [date, setDate] = useState("2026-09-12");
  const [crop, setCrop] = useState("Wheat");
  const [centre, setCentre] = useState(state.centres[0]!.name);
  const activeRequest = farmerRequests[0];

  return (
    <>
      <PageHeading
        title="Procurement Schedule"
        description="Slots are one hour long. Pick a slot marked Available for the smoothest visit."
      />

      <div className="card-soft mb-6 grid gap-4 p-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12" />
        </div>
        <div className="space-y-2">
          <Label>Crop</Label>
          <Select value={crop} onValueChange={setCrop}>
            <SelectTrigger className="h-12 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CROPS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Procurement centre</Label>
          <Select value={centre} onValueChange={setCentre}>
            <SelectTrigger className="h-12 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {state.centres.map((c) => (
                <SelectItem key={c.id} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SLOTS.map((slot, i) => {
          const status = availability[i % availability.length]!;
          const full = status === "Full";
          return (
            <div key={slot} className="card-soft flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-2 font-semibold">
                  <CalendarClock className="size-4.5 text-primary" /> {slot}
                </p>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${tone[status]}`}>
                  {status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {centre} · {crop} · {new Date(date).toLocaleDateString("en-IN")}
              </p>
              <Button
                className="mt-1"
                variant={full ? "outline" : "default"}
                disabled={full}
                onClick={() => {
                  if (activeRequest) assignSlot(activeRequest.requestId, slot);
                  toast.success(`Slot ${slot} selected at ${centre}.`);
                }}
              >
                {full ? "Slot full" : "Select this slot"}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 p-5 text-sm">
        <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-success" />
        Selecting a slot updates your latest request and sends a confirmation notification.
      </div>
    </>
  );
}
