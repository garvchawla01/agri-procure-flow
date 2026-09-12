import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./brand";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/centres", label: "Procurement Centres" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-primary" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline">
            <Link to="/login/farmer">Farmer Login</Link>
          </Button>
          <Button asChild>
            <Link to="/login/officer">Officer Login</Link>
          </Button>
        </div>
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-border p-2 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2">
              <Button asChild variant="outline" size="lg" onClick={() => setOpen(false)}>
                <Link to="/login/farmer">Farmer Login</Link>
              </Button>
              <Button asChild size="lg" onClick={() => setOpen(false)}>
                <Link to="/login/officer">Officer Login</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-primary text-[color:var(--primary-foreground)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">KISANSETU</p>
          <p className="mt-2 max-w-sm text-sm opacity-80">
            Connecting Farmers to Fair &amp; Transparent Procurement.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">For Farmers</p>
          <ul className="mt-3 space-y-2 opacity-85">
            <li>
              <Link to="/farmer/request">New Procurement Request</Link>
            </li>
            <li>
              <Link to="/farmer/track">Track Procurement</Link>
            </li>
            <li>
              <Link to="/farmer/schedule">Procurement Schedule</Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">For Officers &amp; Admin</p>
          <ul className="mt-3 space-y-2 opacity-85">
            <li>
              <Link to="/officer">Officer Dashboard</Link>
            </li>
            <li>
              <a href="/admin">Admin Dashboard</a>
            </li>
            <li>
              <Link to="/centres">Procurement Centres</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs opacity-70 sm:px-6">
        Demo prototype built for Smart India Hackathon presentation. Data is stored locally in your browser.
      </div>
    </footer>
  );
}
