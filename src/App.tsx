import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Filter,
  ListChecks,
  Target,
  TrendingDown,
  TrendingUp,
  Truck,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type SegmentId = 'all' | 'auto' | 'cargo' | 'heels';

type Segment = {
  id: SegmentId;
  name: string;
  orders: number;
  lateOrders: number;
  lateShare: number;
  targetLateShare: number;
  avgDelay: string;
  b2bLateShare: number;
  b2cLateShare: number;
  urgentLateShare: number;
  before11LateShare: number;
  after11LateShare: number;
  risk: 'critical' | 'warning' | 'stable';
};

const segments: Segment[] = [
  {
    id: 'all',
    name: 'Все заказы',
    orders: 796,
    lateOrders: 209,
    lateShare: 26.3,
    targetLateShare: 18,
    avgDelay: '0:32:22',
    b2bLateShare: 21.1,
    b2cLateShare: 29,
    urgentLateShare: 56,
    before11LateShare: 7.4,
    after11LateShare: 15,
    risk: 'critical',
  },
  {
    id: 'auto',
    name: 'AUTO',
    orders: 524,
    lateOrders: 139,
    lateShare: 26.5,
    targetLateShare: 18,
    avgDelay: '0:32:45',
    b2bLateShare: 22.3,
    b2cLateShare: 30.1,
    urgentLateShare: 52.7,
    before11LateShare: 7.3,
    after11LateShare: 15.4,
    risk: 'critical',
  },
  {
    id: 'cargo',
    name: 'ГРУЗ',
    orders: 272,
    lateOrders: 70,
    lateShare: 25.7,
    targetLateShare: 18,
    avgDelay: '0:31:35',
    b2bLateShare: 13.5,
    b2cLateShare: 27.7,
    urgentLateShare: 66.7,
    before11LateShare: 7.5,
    after11LateShare: 14.6,
    risk: 'critical',
  },
  {
    id: 'heels',
    name: 'Каблуки',
    orders: 80,
    lateOrders: 24,
    lateShare: 30,
    targetLateShare: 18,
    avgDelay: '0:25:57',
    b2bLateShare: 34.2,
    b2cLateShare: 26.2,
    urgentLateShare: 55,
    before11LateShare: 7.7,
    after11LateShare: 8.3,
    risk: 'critical',
  },
];

const trend = [
  { day: '10 апр', late: 21.8, after11: 10.4, target: 18 },
  { day: '11 апр', late: 19.6, after11: 8.9, target: 18 },
  { day: '12 апр', late: 22.1, after11: 11.7, target: 18 },
  { day: '13 апр', late: 24.3, after11: 12.9, target: 18 },
  { day: '14 апр', late: 23.4, after11: 12.1, target: 18 },
  { day: '15 апр', late: 25.1, after11: 13.8, target: 18 },
  { day: '16 апр', late: 26.3, after11: 15, target: 18 },
];

const causes = [
  { name: 'Пик срочных', value: 72, owner: 'Планирование' },
  { name: 'Поздний старт', value: 48, owner: 'Логистика' },
  { name: 'Недобор ресурса', value: 37, owner: 'Операции' },
  { name: 'Перенос окна', value: 29, owner: 'Контакт-центр' },
  { name: 'Адрес/доступ', value: 23, owner: 'Клиентский сервис' },
];

const exceptions = [
  { zone: 'ГРУЗ / срочные', metric: '66.7%', delta: '+48.7 п.п.', priority: 'P1', owner: 'Планирование' },
  { zone: 'Каблуки / B2B', metric: '34.2%', delta: '+16.2 п.п.', priority: 'P1', owner: 'Операции' },
  { zone: 'AUTO / B2C', metric: '30.1%', delta: '+12.1 п.п.', priority: 'P2', owner: 'Логистика' },
  { zone: 'Все / после 11:00', metric: '15.0%', delta: '+7.0 п.п.', priority: 'P2', owner: 'Диспетчеризация' },
];

const actions = [
  { task: 'Выделить отдельный слот под срочные ГРУЗ до 11:30', owner: 'Планирование', due: 'сегодня 12:00', status: 'В работе' },
  { task: 'Перераспределить 2 экипажа из AUTO в B2C-пик', owner: 'Логистика', due: 'сегодня 13:00', status: 'В работе' },
  { task: 'Проверить 20 заказов с переносом окна', owner: 'КЦ', due: 'сегодня 15:00', status: 'Нужно решение' },
];

const statusStyles = {
  critical: 'border-red-200 bg-red-50 text-red-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  stable: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

function formatNumber(value: number) {
  return value.toLocaleString('ru-RU');
}

function exportCsv() {
  const header = ['Сегмент', 'Заказы', 'Опоздания', '% опозданий', 'Цель', 'Среднее опоздание', 'Срочные', 'После 11'];
  const rows = segments.map((item) => [
    item.name,
    item.orders,
    item.lateOrders,
    `${item.lateShare}%`,
    `${item.targetLateShare}%`,
    item.avgDelay,
    `${item.urgentLateShare}%`,
    `${item.after11LateShare}%`,
  ]);
  const csv = [header, ...rows].map((row) => row.join(';')).join('\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'spb-delay-control-tower.csv';
  link.click();
  URL.revokeObjectURL(url);
}

function App() {
  const [selectedSegment, setSelectedSegment] = useState<SegmentId>('all');
  const current = segments.find((item) => item.id === selectedSegment) ?? segments[0];
  const totalLate = segments[0].lateOrders;

  const selectedCauses = useMemo(
    () =>
      causes.map((cause, index) => ({
        ...cause,
        share: Math.round((cause.value / totalLate) * 100),
        cumulative: causes.slice(0, index + 1).reduce((sum, item) => sum + item.value, 0),
      })),
    [totalLate],
  );

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <span className="rounded border border-slate-200 bg-slate-50 px-2 py-1">CRM блок</span>
                <span className="rounded border border-slate-200 bg-slate-50 px-2 py-1">СПБ</span>
                <span className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  16 апреля
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Control Tower опозданий</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Ежедневный операционный экран: факт против SLA, зоны риска, Pareto причин и список действий для планерки.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                <Filter className="h-4 w-4" />
                Смены
              </button>
              <button
                onClick={exportCsv}
                className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                <Download className="h-4 w-4" />
                CSV
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <Kpi title="Заказы" value={formatNumber(current.orders)} note="объем за день" icon={Truck} tone="slate" />
          <Kpi title="Опоздания" value={`${current.lateShare}%`} note={`цель <= ${current.targetLateShare}%`} icon={AlertTriangle} tone="red" />
          <Kpi title="После 11:00" value={`${current.after11LateShare}%`} note="+7.0 п.п. к цели" icon={Clock3} tone="amber" />
          <Kpi title="Срочные" value={`${current.urgentLateShare}%`} note="главный драйвер риска" icon={TrendingUp} tone="violet" />
          <Kpi title="Среднее время" value={current.avgDelay} note="среднее опоздание" icon={Target} tone="emerald" />
        </section>

        <nav className="flex gap-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
          {segments.map((segment) => (
            <button
              key={segment.id}
              onClick={() => setSelectedSegment(segment.id)}
              className={`shrink-0 rounded-md px-4 py-2 text-sm font-semibold transition ${
                selectedSegment === segment.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {segment.name}
            </button>
          ))}
        </nav>

        <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <Panel title="Матрица сегментов" icon={BarChart3}>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="py-3 pr-4">Сегмент</th>
                    <th className="py-3 pr-4">Заказы</th>
                    <th className="py-3 pr-4">% опозд.</th>
                    <th className="py-3 pr-4">B2B</th>
                    <th className="py-3 pr-4">B2C</th>
                    <th className="py-3 pr-4">Срочные</th>
                    <th className="py-3 pr-4">После 11</th>
                    <th className="py-3">Статус</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {segments.slice(1).map((segment) => (
                    <tr key={segment.id} className="hover:bg-slate-50">
                      <td className="py-3 pr-4 font-semibold">{segment.name}</td>
                      <td className="py-3 pr-4">{formatNumber(segment.orders)}</td>
                      <td className="py-3 pr-4 font-semibold text-red-700">{segment.lateShare}%</td>
                      <td className="py-3 pr-4">{segment.b2bLateShare}%</td>
                      <td className="py-3 pr-4">{segment.b2cLateShare}%</td>
                      <td className="py-3 pr-4 font-semibold text-violet-700">{segment.urgentLateShare}%</td>
                      <td className="py-3 pr-4">{segment.after11LateShare}%</td>
                      <td className="py-3">
                        <span className={`rounded border px-2 py-1 text-xs font-semibold ${statusStyles[segment.risk]}`}>Action</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Тренд 7 дней" icon={TrendingDown}>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="after11" name="После 11" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="late" name="Опоздания" stroke="#dc2626" strokeWidth={3} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="target" name="SLA" stroke="#0f766e" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel title="Pareto причин" icon={Target}>
            <div className="grid gap-4 md:grid-cols-[180px_1fr]">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={selectedCauses} dataKey="value" innerRadius={48} outerRadius={76} paddingAngle={2}>
                      {selectedCauses.map((_, index) => (
                        <Cell key={index} fill={['#dc2626', '#f59e0b', '#4f46e5', '#0f766e', '#64748b'][index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {selectedCauses.map((cause) => (
                  <div key={cause.name} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold">{cause.name}</span>
                      <span className="text-sm font-bold">{cause.share}%</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{cause.value} заказов · владелец: {cause.owner}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel title="Exception list" icon={AlertTriangle}>
            <div className="grid gap-3">
              {exceptions.map((item) => (
                <div key={item.zone} className="grid gap-3 rounded-md border border-slate-200 bg-white p-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
                  <div>
                    <p className="font-semibold">{item.zone}</p>
                    <p className="text-xs text-slate-500">Владелец: {item.owner}</p>
                  </div>
                  <span className="font-bold text-red-700">{item.metric}</span>
                  <span className="rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">{item.delta}</span>
                  <span className="rounded bg-slate-900 px-2 py-1 text-xs font-semibold text-white">{item.priority}</span>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <Panel title="Action tracker на смену" icon={ListChecks}>
          <div className="grid gap-3 lg:grid-cols-3">
            {actions.map((action) => (
              <article key={action.task} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 inline-flex items-center gap-2 rounded border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {action.status}
                </div>
                <h3 className="font-semibold leading-6">{action.task}</h3>
                <p className="mt-3 text-sm text-slate-600">{action.owner} · {action.due}</p>
              </article>
            ))}
          </div>
        </Panel>
      </section>
    </main>
  );
}

function Kpi({
  title,
  value,
  note,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  note: string;
  icon: typeof Truck;
  tone: 'slate' | 'red' | 'amber' | 'violet' | 'emerald';
}) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    red: 'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
    violet: 'bg-violet-50 text-violet-700',
    emerald: 'bg-emerald-50 text-emerald-700',
  };

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
        </div>
        <span className={`rounded-md p-2 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-xs font-medium text-slate-500">{note}</p>
    </article>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof Truck; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-slate-500" />
        <h2 className="text-base font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default App;
