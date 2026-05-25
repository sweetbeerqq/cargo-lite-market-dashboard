import { ArrowDownWideNarrow, Building2, Search, SlidersHorizontal } from 'lucide-react';
import type { MetricGroup, RegionId, SortKey } from '../types';

interface FiltersProps {
  region: RegionId | 'all';
  setRegion: (region: RegionId | 'all') => void;
  query: string;
  setQuery: (query: string) => void;
  metricGroup: MetricGroup;
  setMetricGroup: (group: MetricGroup) => void;
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
}

export function Filters({ region, setRegion, query, setQuery, metricGroup, setMetricGroup, sortKey, setSortKey }: FiltersProps) {
  return (
    <div className="toon-card rounded-[28px] bg-white/90 p-4">
      <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <label className="flex items-center gap-2 rounded-2xl border-2 border-ink bg-cream px-3 py-2">
          <Search className="h-5 w-5 shrink-0" />
          <input
            className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-ink/45"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск компании"
          />
        </label>
        <label className="flex items-center gap-2 rounded-2xl border-2 border-ink bg-skyjam/25 px-3 py-2">
          <Building2 className="h-5 w-5 shrink-0" />
          <select className="w-full bg-transparent text-sm font-bold outline-none" value={region} onChange={(event) => setRegion(event.target.value as RegionId | 'all')}>
            <option value="all">Все регионы</option>
            <option value="moscow-mo">Москва + МО</option>
            <option value="spb-lo">СПб + ЛО</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-2xl border-2 border-ink bg-meadow/25 px-3 py-2">
          <SlidersHorizontal className="h-5 w-5 shrink-0" />
          <select className="w-full bg-transparent text-sm font-bold outline-none" value={metricGroup} onChange={(event) => setMetricGroup(event.target.value as MetricGroup)}>
            <option value="all">Все метрики</option>
            <option value="financial">Финансы</option>
            <option value="operational">Операции</option>
            <option value="customer">Клиенты</option>
            <option value="pricing">Цена</option>
            <option value="digital">Digital</option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-2xl border-2 border-ink bg-sunpop/45 px-3 py-2">
          <ArrowDownWideNarrow className="h-5 w-5 shrink-0" />
          <select className="w-full bg-transparent text-sm font-bold outline-none" value={sortKey} onChange={(event) => setSortKey(event.target.value as SortKey)}>
            <option value="overallRating">По рейтингу</option>
            <option value="revenue">По выручке</option>
            <option value="marketShare">По доле рынка</option>
            <option value="operationalEfficiency">По эффективности</option>
          </select>
        </label>
      </div>
    </div>
  );
}
