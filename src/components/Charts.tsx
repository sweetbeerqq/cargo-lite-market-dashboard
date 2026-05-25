import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ReactNode } from 'react';
import type { ScoredCompany } from '../types';

const palette = ['#FF78B7', '#66D9EF', '#FFD166', '#7ED957', '#7C5CFF', '#1AA6A6', '#FF9F6E'];

export function MarketShareChart({ companies }: { companies: ScoredCompany[] }) {
  return (
    <ChartShell title="Доли рынка" note="Топ-компании в выбранном срезе">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={companies} dataKey="marketShare" nameKey="name" innerRadius={58} outerRadius={104} paddingAngle={2}>
            {companies.map((company, index) => (
              <Cell key={company.id} fill={palette[index % palette.length]} stroke="#243047" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function ComparisonBarChart({ companies }: { companies: ScoredCompany[] }) {
  const data = companies.map((company) => ({
    name: company.name.replace(' Грузовая', ''),
    Рейтинг: company.overallRating,
    Эффективность: company.operationalEfficiencyIndex,
    Доверие: company.customerTrustIndex,
  }));

  return (
    <ChartShell title="Сравнение индексов" note="Рейтинг, операции и клиентское доверие">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 12, right: 8, bottom: 48, left: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#d8cda7" />
          <XAxis dataKey="name" angle={-22} textAnchor="end" height={72} tick={{ fill: '#243047', fontSize: 11, fontWeight: 700 }} />
          <YAxis tick={{ fill: '#243047', fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Рейтинг" fill="#FF78B7" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Эффективность" fill="#66D9EF" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Доверие" fill="#7ED957" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function FinancialComparisonChart({ companies }: { companies: ScoredCompany[] }) {
  const data = companies.map((company) => ({
    name: company.name.replace(' Грузовая', ''),
    'Выручка, млн ₽': company.revenue,
    'EBITDA, млн ₽': company.ebitda,
    'Маржа, %': company.margin,
  }));

  return (
    <ChartShell title="Финансовое сравнение" note="Выручка, EBITDA и маржинальность по выбранным компаниям">
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} margin={{ top: 12, right: 8, bottom: 58, left: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#d8dee9" />
          <XAxis dataKey="name" angle={-24} textAnchor="end" height={86} tick={{ fill: '#1F2937', fontSize: 11, fontWeight: 700 }} />
          <YAxis yAxisId="money" tick={{ fill: '#1F2937', fontSize: 12 }} />
          <YAxis yAxisId="percent" orientation="right" tick={{ fill: '#1F2937', fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="money" dataKey="Выручка, млн ₽" fill="#2563EB" radius={[6, 6, 0, 0]} />
          <Bar yAxisId="money" dataKey="EBITDA, млн ₽" fill="#0F766E" radius={[6, 6, 0, 0]} />
          <Bar yAxisId="percent" dataKey="Маржа, %" fill="#F59E0B" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function OperationalComparisonChart({ companies }: { companies: ScoredCompany[] }) {
  const data = companies.map((company) => ({
    name: company.name.replace(' Грузовая', ''),
    'Заказы, тыс.': Math.round(company.orders / 1000),
    'Машины': company.vehicles,
    'Подача, мин': company.averageDispatchTime,
    'Загрузка, %': company.fleetUtilization,
  }));

  return (
    <ChartShell title="Операционное сравнение" note="Объем заказов, парк, загрузка и скорость подачи">
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} margin={{ top: 12, right: 8, bottom: 58, left: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#d8dee9" />
          <XAxis dataKey="name" angle={-24} textAnchor="end" height={86} tick={{ fill: '#1F2937', fontSize: 11, fontWeight: 700 }} />
          <YAxis tick={{ fill: '#1F2937', fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Заказы, тыс." fill="#4F46E5" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Машины" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Загрузка, %" fill="#16A34A" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Подача, мин" fill="#DC2626" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function PrivateOrdersChart({ companies }: { companies: ScoredCompany[] }) {
  const data = companies.map((company) => ({
    name: company.name.replace(' Грузовая', ''),
    Частные: company.privateOrders,
    B2B: company.b2bOrders,
    fit: company.privateMarketFit,
  }));

  return (
    <ChartShell title="Рынок частных заказов" note="Оценка распределения заказов между частными клиентами и B2B">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 12, right: 8, bottom: 48, left: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#d8cda7" />
          <XAxis dataKey="name" angle={-22} textAnchor="end" height={72} tick={{ fill: '#243047', fontSize: 11, fontWeight: 700 }} />
          <YAxis tick={{ fill: '#243047', fontSize: 12 }} />
          <Tooltip formatter={(value) => Number(value).toLocaleString('ru-RU')} />
          <Legend />
          <Bar dataKey="Частные" stackId="orders" fill="#FF78B7" radius={[8, 8, 0, 0]} />
          <Bar dataKey="B2B" stackId="orders" fill="#66D9EF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function CompanyRadarChart({ company }: { company: ScoredCompany }) {
  const data = [
    { metric: 'Финансы', value: company.financialIndex },
    { metric: 'Операции', value: company.operationalEfficiencyIndex },
    { metric: 'Доверие', value: company.customerTrustIndex },
    { metric: 'Цена', value: company.priceAttractivenessIndex },
    { metric: 'Digital', value: company.digitalMaturityIndex },
    { metric: 'Конкур.', value: company.competitivenessIndex },
  ];

  return (
    <ChartShell title={`Radar: ${company.name}`} note="6 расчетных индексов">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#9a8d69" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: '#243047', fontSize: 12, fontWeight: 800 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#243047', fontSize: 10 }} />
          <Radar dataKey="value" stroke="#7C5CFF" fill="#7C5CFF" fillOpacity={0.45} strokeWidth={3} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function SwotHeatmap({ companies }: { companies: ScoredCompany[] }) {
  return (
    <div className="toon-card rounded-xl bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-black">Heatmap сильных и слабых сторон</h2>
          <p className="text-sm font-semibold text-ink/65">Чем темнее ячейка, тем сильнее сигнал в оценочной модели</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {companies.map((company) => (
          <div key={company.id} className="rounded-xl border border-ink/10 bg-cream p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="font-black">{company.name}</h3>
              <span className="rounded-md border border-ink/10 bg-white px-2 py-1 text-xs font-black">{company.overallRating}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <HeatCell label="Сила" value={company.strengthInsights.length * 25} color="bg-meadow" text={company.strengthInsights[0] ?? company.strengths[0]} />
              <HeatCell label="Риск" value={company.weaknessInsights.length * 30} color="bg-candy" text={company.weaknessInsights[0] ?? company.weaknesses[0]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeatCell({ label, value, color, text }: { label: string; value: number; color: string; text: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink/10 bg-white">
      <div className={`${color} px-2 py-1 text-xs font-black`} style={{ opacity: Math.max(0.35, value / 100) }}>
        {label}
      </div>
      <p className="min-h-14 px-2 py-2 text-xs font-bold text-ink/75">{text}</p>
    </div>
  );
}

function ChartShell({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <div className="toon-card rounded-xl bg-white p-5">
      <div className="mb-3">
        <h2 className="font-display text-xl font-black">{title}</h2>
        <p className="text-sm font-semibold text-ink/65">{note}</p>
      </div>
      {children}
    </div>
  );
}
