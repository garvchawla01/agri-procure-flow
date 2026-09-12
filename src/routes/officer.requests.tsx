import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FastForward, Loader2, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeading } from "@/components/kisansetu/app-shell";
import { StatusBadge } from "@/components/kisansetu/status";
import { supabase } from "@/supabaseClient";

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

const NEXT_STATUS: Record<string, string> = {
  Booked: "Verified",
  Verified: "Weighed",
  Weighed: "Completed",
  Completed: "Completed",
};

function OfficerRequests() {
  const [requests, setRequests] = useState<SupabaseSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("slots")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase read error:", error);
        toast.error(`Fetch Error: ${error.message}`);
      } else if (data) {
        setRequests(data as SupabaseSlot[]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch slots from Supabase");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (row: SupabaseSlot) => {
    const nextStatus = NEXT_STATUS[row.status] ?? "Verified";
    const { error } = await supabase
      .from("slots")
      .update({ status: nextStatus })
      .eq("id", row.id);

    if (error) {
      toast.error(`Status update failed: ${error.message}`);
    } else {
      toast.success(`Token ${row.token_number} moved to ${nextStatus}`);
      setRequests((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, status: nextStatus } : r))
      );
    }
  };

  const rows = requests.filter((r) =>
    `${r.token_number} ${r.farmer_name} ${r.kisan_id ?? ""} ${r.crop_type}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeading title="Farmer Requests" description="All procurement requests from Supabase Cloud DB, newest first." />
        <Button variant="outline" size="sm" onClick={fetchRequests} disabled={loading}>
          <RefreshCw className={`size-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      <div className="card-soft mb-6 flex items-center gap-3 p-4">
        <Search className="size-4.5 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by token, farmer, crop or ID"
          className="h-11 border-0 shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="card-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Token</th>
                <th className="px-5 py-3">Farmer</th>
                <th className="px-5 py-3">Crop</th>
                <th className="px-5 py-3">Slot Time</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                    <Loader2 className="mx-auto size-6 animate-spin text-primary" />
                    <p className="mt-2">Connecting to Supabase...</p>
                  </td>
                </tr>
              ) : rows.map((r) => (
                <tr key={r.id} className="border-t border-border/70">
                  <td className="px-5 py-4 font-display font-bold text-primary">{r.token_number}</td>
                  <td className="px-5 py-4">
                    {r.farmer_name}
                    <span className="block text-xs text-muted-foreground">{r.kisan_id || r.phone_number}</span>
                  </td>
                  <td className="px-5 py-4">
                    {r.crop_type} · {(r.quantity_quintals ?? 0) * 100} kg
                  </td>
                  <td className="px-5 py-4 font-medium">{r.time_slot}</td>
                  <td className="px-5 py-4 whitespace-nowrap">{r.booking_date}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={r.status as any} />
                  </td>
                  <td className="px-5 py-4">
                    <Button
                      size="sm"
                      disabled={r.status === "Completed"}
                      onClick={() => handleUpdateStatus(r)}
                    >
                      <FastForward className="size-3.5 mr-1" />
                      {r.status === "Completed" ? "Completed" : "Next Stage"}
                    </Button>
                  </td>
                </tr>
              ))}
              {!loading && rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                    No requests found in Supabase database.
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