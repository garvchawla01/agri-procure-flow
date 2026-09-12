import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
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
import { supabase } from "@/supabaseClient";

export const Route = createFileRoute("/farmer/request")({
  head: () => ({
    meta: [
      { title: "New Procurement Request — KISANSETU" },
      { name: "description", content: "Submit crop, quantity, centre and preferred date to receive a procurement token." },
      { property: "og:title", content: "New Procurement Request — KISANSETU" },
      { property: "og:description", content: "Request a slot and get a digital token instantly." },
    ],
  }),
  component: NewRequest,
});

const schema = z.object({
  farmerName: z.string().trim().min(2, "Enter the farmer name").max(100),
  farmerId: z.string().trim().min(4, "Enter a valid farmer ID").max(20),
  crop: z.string().min(1, "Select a crop"),
  quantity: z.coerce.number().positive("Enter quantity in kg").max(100000),
  centre: z.string().min(1, "Select a procurement centre"),
  date: z.string().min(1, "Choose a preferred date"),
  contact: z.string().trim().regex(/^[0-9X]{10}$/i, "Enter a 10 digit mobile number"),
  slot: z.string().min(1),
});

function NewRequest() {
  const navigate = useNavigate();
  const { state, currentFarmer, createRequest } = useKisansetu();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [crop, setCrop] = useState("Wheat");
  const [centre, setCentre] = useState(state.centres[0]!.name);
  const [slot, setSlot] = useState(SLOTS[0]!);

  return (
    <>
      <PageHeading
        title="New Procurement Request"
        description="Fill in the details below. Your token and time slot are generated immediately after submission."
      />

      <form
        className="card-soft max-w-3xl space-y-5 p-6 sm:p-8"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const parsed = schema.safeParse({
            farmerName: String(form.get("farmerName") ?? ""),
            farmerId: String(form.get("farmerId") ?? ""),
            crop,
            quantity: String(form.get("quantity") ?? ""),
            centre,
            date: String(form.get("date") ?? ""),
            contact: String(form.get("contact") ?? ""),
            slot,
          });

          if (!parsed.success) {
            const next: Record<string, string> = {};
            for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
            setErrors(next);
            toast.error("Please correct the highlighted fields.");
            return;
          }

          setErrors({});
          setSubmitting(true);

          try {
            // 1. Local state update for UI token generation
            const created = createRequest(parsed.data);

            // 2. Supabase Cloud Database Insert
            const { error: dbError } = await supabase.from("slots").insert([
              {
                farmer_name: parsed.data.farmerName,
                kisan_id: parsed.data.farmerId,
                phone_number: parsed.data.contact,
                crop_type: parsed.data.crop,
                quantity_quintals: Number(parsed.data.quantity) / 100, // kg to quintals
                booking_date: parsed.data.date,
                time_slot: parsed.data.slot,
                token_number: created.token,
                status: "Booked",
              },
            ]);

            if (dbError) {
              console.error("Supabase Error:", dbError);
              toast.error(`Database Warning: ${dbError.message}`);
            } else {
              toast.success(`Request saved to Cloud DB! Token ${created.token} generated.`);
            }

            navigate({ to: "/farmer/token/$token", params: { token: created.token } });
          } catch (err) {
            console.error("Submission failed:", err);
            toast.error("Failed to submit request. Check console for details.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="farmerName">Farmer name</Label>
            <Input id="farmerName" name="farmerName" defaultValue={currentFarmer.name} className="h-12" maxLength={100} />
            {errors["farmerName"] ? <p className="text-xs text-destructive">{errors["farmerName"]}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="farmerId">Farmer ID</Label>
            <Input id="farmerId" name="farmerId" defaultValue={currentFarmer.farmerId} className="h-12" maxLength={20} />
            {errors["farmerId"] ? <p className="text-xs text-destructive">{errors["farmerId"]}</p> : null}
          </div>

          <div className="space-y-2">
            <Label>Crop type</Label>
            <Select value={crop} onValueChange={setCrop}>
              <SelectTrigger className="h-12 w-full">
                <SelectValue placeholder="Select crop" />
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
            <Label htmlFor="quantity">Expected quantity (kg)</Label>
            <Input id="quantity" name="quantity" inputMode="numeric" placeholder="250" className="h-12" />
            {errors["quantity"] ? <p className="text-xs text-destructive">{errors["quantity"]}</p> : null}
          </div>

          <div className="space-y-2">
            <Label>Procurement centre</Label>
            <Select value={centre} onValueChange={setCentre}>
              <SelectTrigger className="h-12 w-full">
                <SelectValue placeholder="Select centre" />
              </SelectTrigger>
              <SelectContent>
                {state.centres.map((c) => (
                  <SelectItem key={c.id} value={c.name} disabled={c.status === "Closed"}>
                    {c.name} — {c.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Preferred date</Label>
            <Input id="date" name="date" type="date" defaultValue="2026-09-12" className="h-12" />
            {errors["date"] ? <p className="text-xs text-destructive">{errors["date"]}</p> : null}
          </div>

          <div className="space-y-2">
            <Label>Preferred slot</Label>
            <Select value={slot} onValueChange={setSlot}>
              <SelectTrigger className="h-12 w-full">
                <SelectValue placeholder="Select slot" />
              </SelectTrigger>
              <SelectContent>
                {SLOTS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact number</Label>
            <Input id="contact" name="contact" defaultValue={currentFarmer.mobile} className="h-12" maxLength={10} />
            {errors["contact"] ? <p className="text-xs text-destructive">{errors["contact"]}</p> : null}
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-secondary/70 p-4 text-sm text-muted-foreground">
          <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-accent" />
          After submission you will receive a unique token with a QR code and a confirmed arrival slot.
        </div>

        <Button type="submit" size="lg" className="h-13 w-full text-base sm:w-auto sm:px-10" disabled={submitting}>
          {submitting ? <Loader2 className="size-5 animate-spin" /> : null}
          {submitting ? "Submitting…" : "Submit Request"}
        </Button>
      </form>
    </>
  );
}