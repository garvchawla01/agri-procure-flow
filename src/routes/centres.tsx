import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Users, CalendarClock, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout, Section, SectionTitle } from "@/components/kisansetu/public-layout";
import { useKisansetu } from "@/lib/kisansetu/store";

export const Route = createFileRoute("/centres")({
  head: () => ({
    meta: [
      { title: "Procurement Centres — Capacity, Queue & Slots | KISANSETU" },
      {
        name: "description",
        content:
          "See today's capacity, live queue length, available slots and open/closed status for every KISANSETU procurement centre.",
      },
      { property: "og:title", content: "Procurement Centres | KISANSETU" },
      {
        property: "og:description",
        content: "Live capacity, queue and slot availability across procurement centres.",
      },
    ],
  }),
  component: Centres,
});

const statusTone: Record<string, string> = {
  Open: "bg-success/12 text-success border-success/30",
  "Almost Full": "bg-warning/15 text-[color:var(--primary)] border-warning/40",
  Closed: "bg-pending/15 text-muted-foreground border-pending/30",
};

function Centres() {
  const { state } = useKisansetu();

  return (
    <PublicLayout>
      <Section>
        <SectionTitle
          eyebrow="Procurement centres"
          title="Find a centre with space today"
          description="Queue and slot numbers update as officers scan tokens through the day."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {state.centres.map((c) => (
            <article key={c.id} className="card-soft flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold leading-snug">{c.name}</h3>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusTone[c.status]}`}
                >
                  {c.status}
                </span>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" /> {c.location}
              </p>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Warehouse className="size-4" /> Today&apos;s capacity
                  </dt>
                  <dd className="font-semibold">{c.capacity} farmers</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <Users className="size-4" /> Current queue
                  </dt>
                  <dd className="font-semibold">{c.queue}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <CalendarClock className="size-4" /> Available slots
                  </dt>
                  <dd className="font-semibold">{c.availableSlots}</dd>
                </div>
              </dl>
              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${Math.min(100, Math.round((c.queue / c.capacity) * 100))}%` }}
                />
              </div>
              <Button
                asChild
                className="mt-5 w-full"
                variant={c.status === "Closed" ? "outline" : "default"}
                disabled={c.status === "Closed"}
              >
                <Link to="/farmer/request">Book at this centre</Link>
              </Button>
            </article>
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}
