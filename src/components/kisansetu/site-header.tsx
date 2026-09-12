import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./brand";
import { useTranslation } from "@/lib/kisansetu/language-context";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const isHi = language === "hi";

  const NAV = [
    { to: "/", label: isHi ? "होम" : "Home" },
    { to: "/how-it-works", label: isHi ? "प्रक्रिया समझें" : "How It Works" },
    { to: "/centres", label: isHi ? "खरीद केंद्र" : "Procurement Centres" },
    { to: "/about", label: isHi ? "परिचय" : "About" },
    { to: "/contact", label: isHi ? "संपर्क" : "Contact" },
  ] as const;

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

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
          {/* Direct Context Language Toggle Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-secondary/80 px-3.5 py-1.5 font-semibold text-foreground hover:bg-secondary hover:text-primary cursor-pointer"
          >
            <Globe className="size-4 text-primary" />
            <span>{isHi ? "English" : "हिंदी"}</span>
          </Button>

          <Button asChild variant="outline">
            <Link to="/login/farmer">{isHi ? "किसान लॉगिन" : "Farmer Login"}</Link>
          </Button>
          <Button asChild>
            <Link to="/login/officer">{isHi ? "अधिकारी लॉगिन" : "Officer Login"}</Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
          >
            <Globe className="size-3.5 text-primary" />
            <span>{isHi ? "EN" : "हिं"}</span>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border p-2"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
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
                <Link to="/login/farmer">{isHi ? "किसान लॉगिन" : "Farmer Login"}</Link>
              </Button>
              <Button asChild size="lg" onClick={() => setOpen(false)}>
                <Link to="/login/officer">{isHi ? "अधिकारी लॉगिन" : "Officer Login"}</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  const { language } = useTranslation();
  const isHi = language === "hi";

  return (
    <footer className="mt-16 border-t border-border bg-primary text-[color:var(--primary-foreground)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">
            {isHi ? "किसानसेतु" : "KISANSETU"}
          </p>
          <p className="mt-2 max-w-sm text-sm opacity-80">
            {isHi
              ? "किसानों को निष्पक्ष और पारदर्शी खरीद व्यवस्था से जोड़ना।"
              : "Connecting Farmers to Fair & Transparent Procurement."}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">{isHi ? "किसानों के लिए" : "For Farmers"}</p>
          <ul className="mt-3 space-y-2 opacity-85">
            <li>
              <Link to="/farmer/request">
                {isHi ? "नया खरीद अनुरोध" : "New Procurement Request"}
              </Link>
            </li>
            <li>
              <Link to="/farmer/track">
                {isHi ? "खरीद स्थिति ट्रैक करें" : "Track Procurement"}
              </Link>
            </li>
            <li>
              <Link to="/farmer/schedule">
                {isHi ? "खरीद अनुसूची" : "Procurement Schedule"}
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">
            {isHi ? "अधिकारियों और व्यवस्थापक के लिए" : "For Officers & Admin"}
          </p>
          <ul className="mt-3 space-y-2 opacity-85">
            <li>
              <Link to="/officer">
                {isHi ? "अधिकारी डैशबोर्ड" : "Officer Dashboard"}
              </Link>
            </li>
            <li>
              <Link to="/centres">
                {isHi ? "खरीद केंद्र" : "Procurement Centres"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs opacity-70 sm:px-6">
        {isHi
          ? "स्मार्ट इंडिया हैकाथॉन प्रस्तुति के लिए निर्मित प्रोटोटाइप।"
          : "Demo prototype built for Smart India Hackathon presentation."}
      </div>
    </footer>
  );
}