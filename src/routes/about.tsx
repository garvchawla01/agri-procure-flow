import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, Landmark, ShieldCheck, Sprout } from "lucide-react";
import { PublicLayout, Section, SectionTitle } from "@/components/kisansetu/public-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About KISANSETU — Digital Bridge for Farmer Procurement" },
      {
        name: "description",
        content:
          "KISANSETU is a smart farmer procurement management system built to remove queues and bring transparency to crop procurement.",
      },
      { property: "og:title", content: "About KISANSETU" },
      {
        property: "og:description",
        content: "Why we built a token and slot based procurement platform for farmers.",
      },
    ],
  }),
  component: About,
});

const values = [
  { icon: Sprout, title: "Farmer first", body: "Large buttons, simple words and mobile-first screens for farmers with limited digital experience." },
  { icon: ShieldCheck, title: "Transparent by default", body: "Weight, verification and payment records are visible to the farmer, not just the officer." },
  { icon: Landmark, title: "Built for public systems", body: "Designed to fit existing mandi and procurement centre workflows without extra paperwork." },
  { icon: HeartHandshake, title: "Fair queues", body: "Slot allocation follows centre capacity, so nobody loses a day standing in line." },
];

function About() {
  return (
    <PublicLayout>
      <Section>
        <SectionTitle
          eyebrow="About us"
          title="KISANSETU — a bridge between the farm and the centre"
          description="Kisan means farmer, Setu means bridge. The platform exists to make government crop procurement predictable, quick and traceable."
        />
        <div className="mx-auto mt-10 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            During peak procurement season, farmers travel to centres without knowing whether their crop can
            be accepted that day. Trucks wait, produce is exposed to weather, and families lose working days.
          </p>
          <p>
            KISANSETU replaces that uncertainty with a digital token and an assigned time slot. Officers get
            an organised queue with document verification and weighing built in, while farmers follow each
            step from their phone and receive an update whenever the status changes.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="card-soft p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <v.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}
