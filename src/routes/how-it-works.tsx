import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, CalendarClock, ClipboardList, IndianRupee, QrCode, Scale, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout, Section, SectionTitle } from "@/components/kisansetu/public-layout";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How KISANSETU Works — Token to Payment in 6 Steps" },
      {
        name: "description",
        content:
          "Understand the KISANSETU procurement flow: request, token, slot, arrival, weighing, verification and payment.",
      },
      { property: "og:title", content: "How KISANSETU Works" },
      {
        property: "og:description",
        content: "The six-step digital procurement journey for farmers and procurement officers.",
      },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  {
    icon: ClipboardList,
    title: "1. Request",
    body: "The farmer submits crop type, expected quantity, preferred date and the nearest procurement centre.",
    who: "Farmer",
  },
  {
    icon: QrCode,
    title: "2. Token Generated",
    body: "KISANSETU issues a unique token (for example A104) with a QR code that can be printed or shown on a phone.",
    who: "System",
  },
  {
    icon: CalendarClock,
    title: "3. Slot Assigned",
    body: "A one-hour arrival slot is allotted based on centre capacity and the day's queue.",
    who: "System",
  },
  {
    icon: Truck,
    title: "4. Reach Centre",
    body: "The officer scans the token on arrival. Status changes to Reached Centre and the farmer is notified.",
    who: "Officer",
  },
  {
    icon: Scale,
    title: "5. Weighing",
    body: "Actual weight is recorded against the expected quantity, visible to the farmer immediately.",
    who: "Officer",
  },
  {
    icon: IndianRupee,
    title: "6. Verification & Payment",
    body: "Identity, documents, crop, token and weight are verified, then payment is initiated.",
    who: "Officer",
  },
];

function HowItWorks() {
  return (
    <PublicLayout>
      <Section>
        <SectionTitle
          eyebrow="How it works"
          title="From request to payment, step by step"
          description="Every stage generates an update for the farmer, so nobody has to guess what happens next."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((s) => (
            <div key={s.title} className="card-soft flex gap-4 p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">{s.who}</p>
                <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-success/30 bg-success/10 p-8 text-center">
          <BadgeCheck className="size-9 text-success" />
          <h3 className="font-display text-2xl font-bold text-success">Procurement Completed</h3>
          <p className="max-w-lg text-sm text-muted-foreground">
            The farmer receives a completion record with final weight, centre details and payment status.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/farmer/request">Start Procurement Request</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/farmer/track">Track My Procurement</Link>
            </Button>
          </div>
        </div>
      </Section>
    </PublicLayout>
  );
}
