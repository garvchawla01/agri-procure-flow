import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  Clock,
  HelpCircle,
  IndianRupee,
  QrCode,
  Radio,
  Scale,
  ShieldCheck,
  Sprout,
  Truck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicLayout, Section, SectionTitle } from "@/components/kisansetu/public-layout";
import heroImage from "@/assets/hero-farmer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KISANSETU — Smart Farmer Procurement Management" },
      {
        name: "description",
        content:
          "KISANSETU connects farmers with procurement centres through digital tokens, smart slot allocation and live status tracking.",
      },
      { property: "og:title", content: "KISANSETU — Smart Farmer Procurement Management" },
      {
        property: "og:description",
        content:
          "Digital tokens, assigned time slots and real-time procurement tracking for farmers and procurement officers.",
      },
    ],
  }),
  component: Home,
});

const problems = [
  {
    icon: Clock,
    title: "Long Waiting Times",
    body: "Farmers wait for hours, sometimes days, outside procurement centres with no queue order.",
  },
  {
    icon: HelpCircle,
    title: "No Schedule Information",
    body: "Procurement dates and centre capacity are rarely communicated to farmers in advance.",
  },
  {
    icon: Radio,
    title: "Uncertain Procurement Status",
    body: "After handing over the crop, farmers have no way to know weighing, verification or payment progress.",
  },
];

const solutions = [
  { icon: QrCode, title: "Digital Token", body: "Every request receives a unique QR token that identifies the farmer at the centre." },
  { icon: CalendarClock, title: "Smart Slot Allocation", body: "Slots are assigned by centre capacity, so farmers arrive only when their turn is due." },
  { icon: Radio, title: "Live Status Tracking", body: "Follow every stage from token generation to payment initiation in real time." },
  { icon: ShieldCheck, title: "Transparent Procurement", body: "Weight, verification and payment records stay visible to both farmer and officer." },
];

const steps = [
  { icon: ClipboardList, title: "Request", body: "Farmer submits crop, quantity and preferred date." },
  { icon: QrCode, title: "Token Generated", body: "A unique token such as A104 is created instantly." },
  { icon: CalendarClock, title: "Slot Assigned", body: "System allots a one-hour arrival slot." },
  { icon: Truck, title: "Reach Centre", body: "Token is scanned on arrival at the centre." },
  { icon: Scale, title: "Weighing", body: "Officer records the actual weight of the produce." },
  { icon: IndianRupee, title: "Verification & Payment", body: "Documents verified and payment initiated." },
];

const benefits = [
  "Reduced waiting time at centres",
  "Better planning for farmers and centres",
  "Real-time status updates",
  "Full transparency of weight and payment",
  "Fair and organised procurement queue",
  "Improved procurement officer efficiency",
];

function Home() {
  return (
    <PublicLayout>
      <div className="field-pattern border-b border-border">
        <Section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/15 px-3 py-1 text-xs font-semibold text-primary">
              <Sprout className="size-3.5" /> Connecting Farmers to Fair &amp; Transparent Procurement
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
              Smart Procurement. Less Waiting. More Transparency.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              KISANSETU connects farmers with procurement centres through digital scheduling, token-based
              tracking and real-time status updates.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-13 text-base">
                <Link to="/farmer/request">Start Procurement Request</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-13 text-base">
                <Link to="/farmer/track">Track My Procurement</Link>
              </Button>
            </div>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-4 text-center">
              {[
                { k: "650", v: "Farmers served" },
                { k: "4", v: "Procurement centres" },
                { k: "85%", v: "Less waiting" },
              ].map((s) => (
                <div key={s.v}>
                  <p className="font-display text-xl font-bold text-accent">{s.k}</p>
                  <p className="text-xs text-muted-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Farmer using KISANSETU on a smartphone outside a wheat procurement centre"
              width={1280}
              height={1024}
              className="w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-raised)]"
            />
            <div className="card-soft absolute -bottom-6 left-4 hidden w-56 p-4 sm:block">
              <p className="text-xs font-medium text-muted-foreground">Your token</p>
              <p className="font-display text-3xl font-bold text-primary">A104</p>
              <p className="mt-1 text-xs text-accent">Slot 10:00 AM – 11:00 AM</p>
            </div>
          </div>
        </Section>
      </div>

      <Section>
        <SectionTitle
          eyebrow="The problem"
          title="Procurement today is slow and unclear"
          description="Farmers lose time and income to queues and missing information."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {problems.map((p) => (
            <div key={p.title} className="card-soft p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <p.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="border-y border-border bg-secondary/60">
        <Section>
          <SectionTitle eyebrow="The solution" title="One digital bridge from farm to centre" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => (
              <div key={s.title} className="card-soft p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent/12 text-accent">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section id="how-it-works">
        <SectionTitle eyebrow="How it works" title="Six simple steps" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="card-soft relative p-6">
              <span className="absolute right-5 top-5 font-display text-3xl font-bold text-gold/60">
                {i + 1}
              </span>
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-success/30 bg-success/10 p-5 text-center">
          <BadgeCheck className="size-6 text-success" />
          <p className="font-semibold text-success">Procurement Completed — payment initiated to the farmer.</p>
        </div>
      </Section>

      <div className="border-y border-border bg-card">
        <Section>
          <div className="grid gap-10 lg:grid-cols-2">
            <SectionTitle
              center={false}
              eyebrow="Benefits"
              title="Value for farmers, officers and administrators"
              description="KISANSETU turns an unpredictable day at the mandi into a scheduled, traceable process."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl bg-secondary/70 p-4 text-sm font-medium">
                  <BadgeCheck className="mt-0.5 size-4.5 shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </div>

      <Section>
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-[color:var(--primary-foreground)] sm:px-12">
          <Users className="mx-auto size-8 text-gold" />
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Ready to simplify procurement?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-85">
            Register your request, collect your token and arrive only when your slot is due.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-7 h-13 px-8 text-base">
            <Link to="/login/farmer">Get Started</Link>
          </Button>
        </div>
      </Section>
    </PublicLayout>
  );
}
