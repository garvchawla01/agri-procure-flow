import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeading } from "@/components/kisansetu/app-shell";
import { StatusBadge, StatusTimeline } from "@/components/kisansetu/status";
import { supabase } from "@/supabaseClient";

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

interface SupabaseSlot {
  id: string;
  farmer_name: string;
  phone_number: string;
  kisan_id: string;
  crop_type: string;
  quantity_quintals: number;
  booking_date: string;
  time_slot: string;
  token_number: string;
  status: string;
  created_at: string;
}

function Track() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [slotData, setSlotData] = useState<SupabaseSlot | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchStatus = async (tokenToSearch: string) => {
    const cleanToken = tokenToSearch.trim();
    if (!cleanToken) {
      toast.error("Please enter a token number");
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      
      const { data: rows, error } = await supabase
        .from("slots")
        .select("*")
        .eq("token_number", cleanToken)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Supabase error:", error);
        toast.error(`Error: ${error.message}`);
      } else if (rows && rows.length > 0) {
        setSlotData(rows[0] as SupabaseSlot);
        toast.success(`Token ${cleanToken} status fetched.`);
      } else {
        setSlotData(null);
        toast.info("No slot found with this token number.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to Supabase");
    } finally {
      setLoading(false);
    }
  };

  // Initial load: fetch the latest slot created if available
  useEffect(() => {
    const getLatest = async () => {
      const { data } = await supabase
        .from("slots")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        setInput(data[0].token_number);
        setSlotData(data[0] as SupabaseSlot);
        setHasSearched(true);
      }
    };
    getLatest();
  }, []);

  return (
    <>
      <PageHeading
        title="Track Your Procurement"
        description="Enter your token number to fetch real-time status directly from the Cloud Database."
      />

      <div className="card-soft mb-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="token">Enter token number</Label>
          <Input
            id="token"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            className="h-12 text-base font-semibold tracking-widest"
            placeholder="e.g. A101"
            maxLength={12}
          />
        </div>
        <Button
          size="lg"
          className="h-12"
          disabled={loading}
          onClick={() => fetchStatus(input)}
        >
          {loading ? <Loader2 className="size-4.5 animate-spin" /> : <Search className="size-4.5" />}
          Track Status
        </Button>
      </div>

      {loading ? (
        <div className="card-soft p-12 text-center text-muted-foreground">
          <Loader2 className="mx-auto size-8 animate-spin text-primary" />
          <p className="mt-3">Searching Supabase cloud database...</p>
        </div>
      ) : !slotData && hasSearched ? (
        <div className="card-soft p-8 text-center text-muted-foreground">
          No procurement request found for token <span className="font-semibold text-foreground">{input}</span>.
        </div>
      ) : slotData ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="card-soft p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Current status</p>
                <p className="font-display text-2xl font-bold text-primary">{slotData.status}</p>
              </div>
              <StatusBadge status={slotData.status as any} />
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Farmer Name", slotData.farmer_name],
                ["Token number", slotData.token_number],
                ["Assigned Slot", slotData.time_slot],
                ["Date", slotData.booking_date],
                ["Crop & Quantity", `${slotData.crop_type} · ${(slotData.quantity_quintals ?? 0) * 100} kg`],
                ["Kisan ID / Phone", slotData.kisan_id || slotData.phone_number],
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
                onClick={() => fetchStatus(slotData.token_number)}
                disabled={loading}
              >
                <RefreshCw className="size-4.5 mr-2" /> Refresh Status
              </Button>
            </div>
          </div>

          <div className="card-soft p-6">
            <h3 className="mb-5 font-display text-lg font-bold text-primary">Procurement timeline</h3>
            <StatusTimeline status={slotData.status as any} />
          </div>
        </div>
      ) : null}
    </>
  );
}