import { Link } from "@tanstack/react-router";
import logo from "@/assets/kisansetu-logo.png";

export function Logo({ size = 40, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img src={logo} alt="KISANSETU logo" width={size} height={size} style={{ width: size, height: size }} />
      {withText ? (
        <span className="leading-tight">
          <span className="block font-display text-lg font-bold tracking-wide text-primary">KISANSETU</span>
          <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Smart Procurement
          </span>
        </span>
      ) : null}
    </Link>
  );
}
