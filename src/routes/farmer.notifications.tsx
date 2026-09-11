import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bell,
  CalendarClock,
  IndianRupee,
  QrCode,
  Scale,
  ScanLine,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/kisansetu/app-shell";
import { useKisansetu } from "@/lib/kisansetu/store";
import type { Notification } from "@/lib/kisansetu/types";

export const Route = createFileRoute("/farmer/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — KISANSETU" },
      { name: "description", content: "Token, slot, weighing, verification and payment alerts for your procurement." },
      { property: "og:title", content: "Notifications — KISANSETU" },
      { property: "og:description", content: "Every procurement event, with time stamps." },
    ],
  }),
  component: Notifications,
});

const icons: Record<Notification["kind"], LucideIcon> = {
  token: QrCode,
  slot: CalendarClock,
  scan: ScanLine,
  weighing: Scale,
  verification: BadgeCheck,
  payment: IndianRupee,
  info: Bell,
};

function Notifications() {
  const { farmerNotifications, markAllRead } = useKisansetu();

  return (
    <>
      <PageHeading
        title="Notification Centre"
        description="Mock SMS and push alerts generated at every procurement stage."
        action={
          <Button
            variant="outline"
            onClick={() => {
              markAllRead();
              toast.success("All notifications marked as read.");
            }}
          >
            Mark all as read
          </Button>
        }
      />

      <ul className="space-y-3">
        {farmerNotifications.map((n) => {
          const Icon = icons[n.kind];
          return (
            <li
              key={n.id}
              className={`card-soft flex gap-4 p-5 ${n.read ? "opacity-70" : "border-l-4 border-l-accent"}`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{n.title}</p>
                  <time className="text-xs text-muted-foreground">
                    {new Date(n.createdAt).toLocaleString("en-IN")}
                  </time>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
              </div>
            </li>
          );
        })}
        {farmerNotifications.length === 0 ? (
          <li className="card-soft p-10 text-center text-muted-foreground">No notifications yet.</li>
        ) : null}
      </ul>
    </>
  );
}
