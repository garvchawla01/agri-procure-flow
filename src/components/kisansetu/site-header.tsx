import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./brand";
import { useTranslation } from "@/lib/kisansetu/language-context";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  const NAV = [
    { to: "/", label: t.navHome },
    { to: "/how-it-works", label: t.navHowItWorks },
    { to: "/centres", label: t.navCentres },
    { to: "/about", label: t.navAbout },
    { to: "/contact", label: t.navContact },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        {/* Desktop Navigation */}
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

        {/* Desktop Buttons & Language Switcher */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Language Toggle Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-secondary/70 px-3 font-semibold text-foreground hover:bg-secondary hover:text-primary cursor-pointer"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="size-4 text-primary" />
            <span>{language === "en" ? "हिंदी" : "English"}</span>
          </Button>

          <Button asChild variant="outline">
            <Link to="/login/farmer">{t.farmerLogin}</Link>
          </Button>
          <Button asChild>
            <Link to="/login/officer">{t.officerLogin}</Link>
          </Button>
        </div>

        {/* Mobile Actions: Language toggle + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1 rounded-full border border-primary/20 bg-secondary/70 px-2.5 py-1 text-xs font-semibold"
          >
            <Globe className="size-3.5 text-primary" />
            <span>{language === "en" ? "हिं" : "EN"}</span>
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

      {/* Mobile Drawer Menu */}
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
                <Link to="/login/farmer">{t.farmerLogin}</Link>
              </Button>
              <Button asChild size="lg" onClick={() => setOpen(false)}>
                <Link to="/login/officer">{t.officerLogin}</Link>
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

  return (
    <footer className="mt-16 border-t border-border bg-primary text-[color:var(--primary-foreground)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">
            {language === "hi" ? "किसानसेतु" : "KISANSETU"}
          </p>
          <p className="mt-2 max-w-sm text-sm opacity-80">
            {language === "hi"
              ? "किसानों को निष्पक्ष और पारदर्शी खरीद व्यवस्था से जोड़ना।"
              : "Connecting Farmers to Fair & Transparent Procurement."}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">{language === "hi" ? "किसानों के लिए" : "For Farmers"}</p>
          <ul className="mt-3 space-y-2 opacity-85">
            <li>
              <Link to="/farmer/request">
                {language === "hi" ? "नया खरीद अनुरोध" : "New Procurement Request"}
              </Link>
            </li>
            <li>
              <Link to="/farmer/track">
                {language === "hi" ? "खरीद स्थिति ट्रैक करें" : "Track Procurement"}
              </Link>
            </li>
            <li>
              <Link to="/farmer/schedule">
                {language === "hi" ? "खरीद अनुसूची" : "Procurement Schedule"}
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">
            {language === "hi" ? "अधिकारियों एवं व्यवस्थापकों के लिए" : "For Officers & Admin"}
          </p>
          <ul className="mt-3 space-y-2 opacity-85">
            <li>
              <Link to="/officer">
                {language === "hi" ? "अधिकारी डैशबोर्ड" : "Officer Dashboard"}
              </Link>
            </li>
            <li>
              <a href="/admin">
                {language === "hi" ? "प्रशासक डैशबोर्ड" : "Admin Dashboard"}
              </a>
            </li>
            <li>
              <Link to="/centres">
                {language === "hi" ? "खरीद केंद्र सूची" : "Procurement Centres"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs opacity-70 sm:px-6">
        {language === "hi"
          ? "स्मार्ट इंडिया हैकथॉन प्रस्तुति के लिए निर्मित प्रोटोटाइप।"
          : "Demo prototype built for Smart India Hackathon presentation."}
      </div>
    </footer>
  );
}