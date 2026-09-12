import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Radio, 
  CalendarClock, 
  Bell, 
  LogOut,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/kisansetu/language-context";

export const Route = createFileRoute("/farmer")({
  component: FarmerLayout,
});

function FarmerLayout() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { language, setLanguage, t } = useTranslation();

  const navItems = [
    { to: "/farmer", label: t.farmerNavDashboard, icon: LayoutDashboard },
    { to: "/farmer/request", label: t.farmerNavRequest, icon: ClipboardList },
    { to: "/farmer/track", label: t.farmerNavTrack, icon: Radio },
    { to: "/farmer/schedule", label: t.farmerNavSchedule, icon: CalendarClock },
    { to: "/farmer/notifications", label: t.farmerNavNotifications, icon: Bell },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col justify-between p-4 shrink-0">
        <div>
          <div className="px-3 py-4">
            <h1 className="font-display text-2xl font-bold text-primary">
              {t.brandName}
            </h1>
          </div>

          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const active = currentPath === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="size-4.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="w-full justify-start gap-2 cursor-pointer"
          >
            <Globe className="size-4 text-primary" />
            <span>{language === "en" ? "हिंदी में बदलें" : "Switch to English"}</span>
          </Button>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="size-4" />
            {t.signOut}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/60 backdrop-blur px-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              {t.kisanDashboardTitle}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t.farmerSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold cursor-pointer"
            >
              <Globe className="size-3.5 text-primary" />
              <span>{t.switchLang}</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}