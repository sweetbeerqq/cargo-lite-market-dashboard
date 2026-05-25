import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  note: string;
  icon: LucideIcon;
  accent: string;
}

export function KpiCard({ title, value, note, icon: Icon, accent }: KpiCardProps) {
  return (
    <div className="toon-card rounded-[24px] bg-white/90 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-ink/60">{title}</p>
          <p className="mt-2 font-display text-2xl font-black text-ink">{value}</p>
        </div>
        <div className={`rounded-2xl border-2 border-ink p-2 ${accent}`}>
          <Icon className="h-5 w-5 text-ink" />
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-ink/70">{note}</p>
    </div>
  );
}
