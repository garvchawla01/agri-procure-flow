import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Bell, CalendarClock, ClipboardList, LayoutDashboard, Radio } from "lucide-react";
import { SidebarShell, type NavItem } from "@/components/kisansetu/app-shell";
import { useKisansetu } from "@/lib/kisansetu/store";

export const Route = createFileRoute("/farmer")({
  component: FarmerLayout,
});

const items: NavItem[] = [
  { to: "/farmer", label: "Dashboard", icon: LayoutDashboard },
  { to: "/farmer/request", label: "New Request", icon: ClipboardList },
  { to: "/farmer/track", label: "Track Status", icon: Radio },
  { to: "/farmer/schedule", label: "Procurement Schedule", icon: CalendarClock },
  { to: "/farmer/notifications", label: "Notifications", icon: Bell },
];

function FarmerLayout() {
  const { currentFarmer } = useKisansetu();
  return (
    <SidebarShell
      items={items}
      title="Kisan Dashboard"
      subtitle={`${currentFarmer.name} · ${currentFarmer.farmerId} · ${currentFarmer.village}`}
    >
      <Outlet />
    </SidebarShell>
  );
}
