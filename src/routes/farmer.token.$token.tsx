import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { BellPlus, CheckCircle2, Info, Printer, Radio } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/kisansetu/app-shell";
import { TokenQR } from "@/components/kisansetu/qr";
import { StatusBadge } from "@/components/kisansetu/status";
import { useKisansetu } from "@/lib/kisansetu/store";

export const Route = createFileRoute("/farmer/token/$token")({
  head: () => ({
    meta: [
      { title: "Your Procurement Token — KISANSETU" },
      { name: "description", content: "Token card with QR code, procurement centre, date and assigned time slot." },
      { property: "og:title", content: "Your Procurement Token — KISANSETU" },
      { property: "og:description", content: "Show this QR token at the procurement centre." },
    ],
  }),
  component: TokenPage,
});

function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function TokenPage() {
  const { token } = useParams({ from: "/farmer/token/$token" });
  const { findByToken } = useKisansetu();
  const request = findByToken(token);

  if (!request) {
    return (
      <>
        <PageHeading title="Token not found" description={`No procurement request exists for token ${token}.`} />
        <Button asChild>
          <Link to="/farmer">Back to dashboard</Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <PageHeading
        title="Request Submitted Successfully"
        description="Keep this token safe. Show the QR code at the procurement centre gate."
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="card-soft overflow-hidden">
          <div className="flex items-center justify-between gap-3 bg-primary px-6 py-4 text-[color:var(--primary-foreground)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Your procurement token</p>
            <CheckCircle2 className="size-5 text-gold" />
          </div>
          <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <TokenQR value={request.token} />
            <div>
              <p className="font-display text-5xl font-bold tracking-wide text-primary">{request.token}</p>
              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Procurement centre</dt>
                  <dd className="font-semibold">{request.centre}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Date</dt>
                  <dd className="font-semibold">{formatDate(request.date)}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Time slot</dt>
                  <dd className="font-semibold">{request.slot}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Status</dt>
                  <dd className="mt-1">
                    <StatusBadge status={request.status} />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-border bg-secondary/50 p-6 sm:flex-row">
            <Button size="lg" onClick={() => window.print()}>
              <Printer className="size-4.5" /> Download / Print Token
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toast.success(`Reminder set for ${request.slot} on ${formatDate(request.date)}.`)}
            >
              <BellPlus className="size-4.5" /> Add reminder
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/farmer/track">
                <Radio className="size-4.5" /> Track status
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gold/40 bg-gold/12 p-5 text-sm">
            <p className="flex items-start gap-2 font-medium text-primary">
              <Info className="mt-0.5 size-4.5 shrink-0" />
              Please arrive during your assigned slot to avoid waiting.
            </p>
          </div>
          <div className="card-soft p-5 text-sm">
            <h3 className="font-display text-lg font-bold text-primary">Request summary</h3>
            <dl className="mt-4 space-y-2.5">
              {[
                ["Request ID", request.requestId],
                ["Farmer", `${request.farmerName} (${request.farmerId})`],
                ["Crop", request.crop],
                ["Expected quantity", `${request.quantity} kg`],
                ...(request.actualWeight ? [["Actual weight", `${request.actualWeight} kg`]] : []),
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
