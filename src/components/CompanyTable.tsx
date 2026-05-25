import type { MetricGroup, ScoredCompany } from '../types';

const compactNumber = new Intl.NumberFormat('ru-RU');

interface CompanyTableProps {
  companies: ScoredCompany[];
  metricGroup: MetricGroup;
}

export function CompanyTable({ companies, metricGroup }: CompanyTableProps) {
  const showFinancial = metricGroup === 'all' || metricGroup === 'financial';
  const showOperational = metricGroup === 'all' || metricGroup === 'operational';
  const showCustomer = metricGroup === 'all' || metricGroup === 'customer';
  const showPricing = metricGroup === 'all' || metricGroup === 'pricing';

  return (
    <div className="toon-card overflow-hidden rounded-xl bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full text-left text-sm">
          <thead className="bg-ink text-white">
            <tr>
              <th className="px-4 py-3">Компания</th>
              <th className="px-4 py-3">Регион</th>
              <th className="px-4 py-3">Рейтинг</th>
              <th className="px-4 py-3">Доля</th>
              <th className="px-4 py-3">Частные</th>
              <th className="px-4 py-3">Аудит заказов</th>
              {showFinancial && <th className="px-4 py-3">Выручка</th>}
              {showFinancial && <th className="px-4 py-3">EBITDA</th>}
              {showOperational && <th className="px-4 py-3">Машины</th>}
              {showOperational && <th className="px-4 py-3">Подача</th>}
              {showPricing && <th className="px-4 py-3">₽/км</th>}
              {showCustomer && <th className="px-4 py-3">Отзывы</th>}
              {showCustomer && <th className="px-4 py-3">Повторы</th>}
              <th className="px-4 py-3">Сильные стороны</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={company.id} className={index % 2 === 0 ? 'bg-cream/65' : 'bg-white'}>
                <td className="px-4 py-3 font-black">{company.name}</td>
                <td className="px-4 py-3 font-semibold text-ink/70">{company.regionName}</td>
                <td className="px-4 py-3">
                  <span className="rounded-md border border-ink/10 bg-sunpop/15 px-3 py-1 font-black text-ink">{company.overallRating}</span>
                </td>
                <td className="px-4 py-3 font-bold">{company.marketShare}%</td>
                <td className="px-4 py-3 font-bold">{company.privateOrderShare}% / {compactNumber.format(company.privateOrders)}</td>
                <td className="px-4 py-3 text-xs font-bold text-ink/70">{company.orderAuditDelta >= 0 ? '+' : ''}{compactNumber.format(company.orderAuditDelta)} к модели</td>
                {showFinancial && <td className="px-4 py-3 font-bold">{compactNumber.format(company.revenue)} млн ₽</td>}
                {showFinancial && <td className="px-4 py-3">{company.ebitda} млн ₽</td>}
                {showOperational && <td className="px-4 py-3">{compactNumber.format(company.vehicles)}</td>}
                {showOperational && <td className="px-4 py-3">{company.averageDispatchTime} мин</td>}
                {showPricing && <td className="px-4 py-3">{company.costPerKm} ₽</td>}
                {showCustomer && <td className="px-4 py-3">{compactNumber.format(company.reviews)}</td>}
                {showCustomer && <td className="px-4 py-3">{company.repeatOrders}%</td>}
                <td className="px-4 py-3 text-ink/75">{company.strengths.slice(0, 2).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
