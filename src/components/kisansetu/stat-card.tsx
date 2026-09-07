import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  tone?: "primary" | "green" | "gold" | "grey";
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    green: "bg-accent/12 text-accent",
    gold: "bg-gold/20 text-[color:var(--primary)]",
    grey: "bg-muted text-muted-foreground",
  } as const;

  return (
    <div className="card-soft flex items-start gap-4 p-5 transition-shadow hover:shadow-[var(--shadow-raised)]">
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="font-display text-2xl font-bold text-foreground">{value}</p>
        {hint ? <p className="mt-0.5 truncate text-xs text-muted-foreground">{hint}</p> : null}
      </div>
    </div>
  );
}
