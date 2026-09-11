import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bell,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  LayoutDashboard,
  Scale,
  ScanLine,
  Settings,
} from "lucide-react";
import { SidebarShell, type NavItem } from "@/components/kisansetu/app-shell";

export const Route = createFileRoute("/officer")({
  component: OfficerLayout,
});

const items: NavItem[] = [
  { to: "/officer", label: "Dashboard", icon: LayoutDashboard },
  { to: "/officer/schedule", label: "Today's Schedule", icon: CalendarClock },
  { to: "/officer/requests", label: "Farmer Requests", icon: ClipboardList },
  { to: "/officer/scanner", label: "Token Scanner", icon: ScanLine },
  { to: "/officer/weighing", label: "Weighing", icon: Scale },
  { to: "/officer/verification", label: "Verification", icon: BadgeCheck },
  { to: "/officer/completed", label: "Completed", icon: CheckCircle2 },
  { to: "/officer/notifications", label: "Notifications", icon: Bell },
  { to: "/officer/settings", label: "Settings", icon: Settings },
];

function OfficerLayout() {
  return (
    <SidebarShell
      items={items}
      title="Procurement Officer Console"
      subtitle="Officer OFF-2041 · XYZ Procurement Centre, Delhi"
      notificationsTo="/officer/notifications"
    >
      <Outlet />
    </SidebarShell>
  );
}
