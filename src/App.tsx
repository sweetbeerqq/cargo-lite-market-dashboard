import { useMemo, useState } from 'react';
import { Download, Gauge, MapPinned, Percent, Route, Sparkles, Truck, WalletCards } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CompanyTable } from './components/CompanyTable';
import { CompanyRadarChart, ComparisonBarChart, MarketShareChart, SwotHeatmap } from './components/Charts';
import { Filters } from './components/Filters';
import { InsightPanels } from './components/InsightPanels';
import { KpiCard } from './components/KpiCard';
import { formatMoney, regions, scoredCompanies, sourceArchitecture } from './data/companies';
import type { MetricGroup, RegionId, ScoredCompany, SortKey } from './types';
import { exportDashboardToExcel } from './utils/exportExcel';

const regionTabs: Array<{ id: RegionId | 'all'; label: string }> = [
  { id: 'all', label: 'Главная' },
  { id: 'moscow-mo', label: 'Москва и МО' },
  { id: 'spb-lo', label: 'СПб и ЛО' },
];

const regionColors = ['#FF78B7', '#66D9EF'];

function App() {
  const [region, setRegion] = useState<RegionId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [metricGroup, setMetricGroup] = useState<MetricGroup>('all');
  const [sortKey, setSortKey] = useState<SortKey>('overallRating');
  const [selectedCompanyId, setSelectedCompanyId] = useState(scoredCompanies[0].id);

  const filteredCompanies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return scoredCompanies
      .filter((company) => region === 'all' || company.regionId === region)
      .filter((company) => !normalizedQuery || company.name.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => b[sortKey] - a[sortKey]);
  }, [query, region, sortKey]);

  const selectedCompany = filteredCompanies.find((company) => company.id === selectedCompanyId) ?? filteredCompanies[0] ?? scoredCompanies[0];

  const regionSummary = Object.values(regions).map((item) => {
    const companies = scoredCompanies.filter((company) => company.regionId === item.id);
    return {
      name: item.shortName,
      volume: item.marketVolume,
      share: Number(companies.reduce((sum, company) => sum + company.marketShare, 0).toFixed(1)),
      averageRating: Math.round(companies.reduce((sum, company) => sum + company.overallRating, 0) / companies.length),
      leader: [...companies].sort((a, b) => b.overallRating - a.overallRating)[0],
    };
  });

  const totals = {
    revenue: filteredCompanies.reduce((sum, company) => sum + company.revenue, 0),
    orders: filteredCompanies.reduce((sum, company) => sum + company.orders, 0),
    vehicles: filteredCompanies.reduce((sum, company) => sum + company.vehicles, 0),
    marketShare: Number(filteredCompanies.reduce((sum, company) => sum + company.marketShare, 0).toFixed(1)),
    rating: Math.round(filteredCompanies.reduce((sum, company) => sum + company.overallRating, 0) / Math.max(filteredCompanies.length, 1)),
  };

  return (
    <main className="fantasy-bg min-h-screen text-ink">
      <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="relative overflow-hidden rounded-[32px] border-[3px] border-ink bg-white/80 p-5 shadow-toon">
          <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[12px] border-sunpop bg-skyjam/60" />
          <div className="absolute bottom-0 left-0 h-14 w-full bg-meadow/30 wave" />
          <div className="relative z-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sunpop px-3 py-1 text-xs font-black uppercase">
                <Sparkles className="h-4 w-4" />
                оценочные / demo data
              </div>
              <h1 className="font-display text-3xl font-black leading-tight sm:text-5xl">
                Аналитика малотоннажных грузоперевозок
              </h1>
              <p className="mt-3 max-w-3xl text-base font-bold leading-7 text-ink/72">
                Два макрорегиона, топ-6 игроков, финансы, операции, рыночные доли, SWOT и рекомендации. Данные правдоподобно смоделированы и готовы к замене на реальные источники.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {regionSummary.map((item, index) => (
                <div key={item.name} className="toon-card rounded-[24px] bg-cream p-4">
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={[{ name: 'Топ-6', value: item.share }, { name: 'Прочие', value: 100 - item.share }]} dataKey="value" innerRadius={26} outerRadius={42}>
                          <Cell fill={regionColors[index]} stroke="#243047" strokeWidth={2} />
                          <Cell fill="#ffffff" stroke="#243047" strokeWidth={2} />
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <h2 className="font-black">{item.name}</h2>
                  <p className="text-sm font-bold text-ink/70">Объем рынка: {formatMoney(item.volume)}</p>
                  <p className="text-sm font-bold text-ink/70">Лидер: {item.leader.name}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <nav className="flex gap-2 overflow-x-auto no-scrollbar">
          {regionTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRegion(tab.id)}
              className={`shrink-0 rounded-full border-2 border-ink px-5 py-2 text-sm font-black shadow-[0_4px_0_rgba(36,48,71,0.18)] transition ${region === tab.id ? 'bg-candy text-white' : 'bg-white hover:bg-sunpop'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <Filters
          region={region}
          setRegion={setRegion}
          query={query}
          setQuery={setQuery}
          metricGroup={metricGroup}
          setMetricGroup={setMetricGroup}
          sortKey={sortKey}
          setSortKey={setSortKey}
        />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <KpiCard title="Выручка топа" value={formatMoney(totals.revenue)} note="Сумма по выбранному срезу" icon={WalletCards} accent="bg-sunpop" />
          <KpiCard title="Заказы" value={totals.orders.toLocaleString('ru-RU')} note="Годовая оценка заказов" icon={Route} accent="bg-skyjam" />
          <KpiCard title="Автопарк" value={totals.vehicles.toLocaleString('ru-RU')} note="Машины до 3.5 т" icon={Truck} accent="bg-meadow" />
          <KpiCard title="Покрытие рынка" value={`${totals.marketShare}%`} note="Доля топ-игроков" icon={Percent} accent="bg-candy" />
          <KpiCard title="Средний рейтинг" value={`${totals.rating}/100`} note="Расчетный общий индекс" icon={Gauge} accent="bg-plum/30" />
        </section>

        <InsightPanels companies={filteredCompanies} />

        <section className="grid gap-5 xl:grid-cols-2">
          <MarketShareChart companies={filteredCompanies} />
          <ComparisonBarChart companies={filteredCompanies} />
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="toon-card rounded-[24px] bg-white/95 p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-black">Топ-6 компаний</h2>
                <p className="text-sm font-semibold text-ink/65">Выберите компанию для radar chart и рекомендаций</p>
              </div>
              <select className="rounded-2xl border-2 border-ink bg-cream px-3 py-2 text-sm font-black" value={selectedCompany.id} onChange={(event) => setSelectedCompanyId(event.target.value)}>
                {filteredCompanies.map((company) => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-3">
              {filteredCompanies.slice(0, 6).map((company, index) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompanyId(company.id)}
                  className={`rounded-2xl border-2 border-ink p-3 text-left transition ${selectedCompany.id === company.id ? 'bg-sunpop' : 'bg-cream hover:bg-skyjam/30'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-black">{index + 1}. {company.name}</span>
                    <span className="rounded-full border-2 border-ink bg-white px-2 py-1 text-xs font-black">{company.overallRating}</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-ink/70">Доля {company.marketShare}% · выручка {formatMoney(company.revenue)} · подача {company.averageDispatchTime} мин</p>
                </button>
              ))}
            </div>
          </div>
          <CompanyRadarChart company={selectedCompany} />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
          <CompanyTable companies={filteredCompanies} metricGroup={metricGroup} />
          <aside className="toon-card rounded-[24px] bg-white/95 p-5">
            <h2 className="font-display text-xl font-black">Рекомендации: {selectedCompany.name}</h2>
            <div className="mt-4 space-y-3">
              {selectedCompany.recommendations.map((item) => (
                <div key={item} className="rounded-2xl border-2 border-ink bg-meadow/20 p-3 text-sm font-bold">{item}</div>
              ))}
            </div>
            <h3 className="mt-5 font-black">Слабые стороны</h3>
            <div className="mt-2 space-y-2">
              {selectedCompany.weaknesses.map((item) => (
                <div key={item} className="rounded-2xl border-2 border-ink bg-candy/20 p-3 text-sm font-bold">{item}</div>
              ))}
            </div>
          </aside>
        </section>

        <SwotHeatmap companies={filteredCompanies} />

        <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="toon-card rounded-[24px] bg-white/95 p-5">
            <h2 className="font-display text-xl font-black">Архитектура подключения реальных данных</h2>
            <div className="mt-4 grid gap-2">
              {sourceArchitecture.map((source) => (
                <div key={source} className="flex items-start gap-2 rounded-2xl border-2 border-ink bg-cream p-3 text-sm font-bold">
                  <MapPinned className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{source}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="toon-card rounded-[24px] bg-plum/20 p-5">
            <h2 className="font-display text-xl font-black">Раздел выгрузки данных в Excel</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-ink/70">
              Файл содержит листы Summary, Moscow_MO, SPB_LO, Top_Companies, Financial_Metrics, Operational_Metrics, SWOT и Recommendations.
            </p>
            <button
              onClick={() => exportDashboardToExcel(scoredCompanies)}
              className="mt-5 inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-sunpop px-5 py-3 font-black shadow-[0_5px_0_rgba(36,48,71,0.18)] transition hover:translate-y-0.5 hover:shadow-[0_3px_0_rgba(36,48,71,0.18)]"
            >
              <Download className="h-5 w-5" />
              Выгрузить в Excel
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
