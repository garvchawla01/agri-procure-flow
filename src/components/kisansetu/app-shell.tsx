import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, LogOut, Menu, X, type LucideIcon } from "lucide-react";
import { Logo } from "./brand";
import { Button } from "@/components/ui/button";

export type NavItem = { to: string; label: string; icon: LucideIcon };

export function SidebarShell({
  items,
  title,
  subtitle,
  notificationsTo = "/farmer/notifications",
  children,
}: {
  items: NavItem[];
  title: string;
  subtitle?: string;
  notificationsTo?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1 p-3">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to as "/"}
          activeOptions={{ exact: true }}
          onClick={() => setOpen(false)}
          activeProps={{
            className: "bg-sidebar-accent text-[color:var(--sidebar-accent-foreground)] font-semibold",
          }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[color:var(--sidebar-foreground)]/85 transition-colors hover:bg-sidebar-accent/70"
        >
          <item.icon className="size-4.5 shrink-0" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
          <div className="flex h-16 items-center border-b border-sidebar-border px-4">
            <Link to="/" className="font-display text-lg font-bold text-[color:var(--sidebar-primary)]">
              KISANSETU
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">{nav}</div>
          <div className="border-t border-sidebar-border p-3">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[color:var(--sidebar-foreground)]/80 hover:bg-sidebar-accent/70"
            >
              <LogOut className="size-4.5" /> Sign out
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
                className="rounded-lg border border-border p-2 lg:hidden"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
              <div className="min-w-0">
                <h1 className="truncate font-display text-lg font-bold text-primary sm:text-xl">{title}</h1>
                {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="icon" aria-label="Notifications">
                <Link to={notificationsTo as "/"}>
                  <Bell className="size-5" />
                </Link>
              </Button>
              <div className="hidden sm:block">
                <Logo size={32} withText={false} />
              </div>
            </div>
          </header>

          {open ? (
            <div className="border-b border-sidebar-border bg-sidebar lg:hidden">{nav}</div>
          ) : null}

          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
        {description ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
