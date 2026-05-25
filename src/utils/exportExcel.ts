import * as XLSX from 'xlsx';
import { regions } from '../data/companies';
import type { ScoredCompany } from '../types';

const companyRow = (company: ScoredCompany) => ({
  Компания: company.name,
  Регион: company.regionName,
  'Доля рынка, %': company.marketShare,
  'Выручка, млн ₽': company.revenue,
  'Средний чек, ₽': company.averageCheck,
  Заказы: company.orders,
  'Расчетные заказы': company.modeledOrders,
  'Отклонение заказов': company.orderAuditDelta,
  'Частные заказы, %': company.privateOrderShare,
  'Частные заказы, шт': company.privateOrders,
  'B2B заказы, %': company.b2bOrderShare,
  'B2B заказы, шт': company.b2bOrders,
  'Средний чек частного заказа, ₽': company.privateAverageCheck,
  'Fit частного рынка': company.privateMarketFit,
  Машины: company.vehicles,
  'Загрузка парка, %': company.fleetUtilization,
  'Подача, мин': company.averageDispatchTime,
  'Выполнение, мин': company.averageCompletionTime,
  'Стоимость км, ₽': company.costPerKm,
  'Минимальный заказ, ₽': company.minimumOrderCost,
  Рейтинг: company.customerRating,
  Отзывы: company.reviews,
  'Повторные заказы, %': company.repeatOrders,
  'Конверсия, %': company.conversionRate,
  'CAC, ₽': company.cac,
  'LTV, ₽': company.ltv,
  'Маржинальность, %': company.margin,
  'EBITDA, млн ₽': company.ebitda,
  'Опер. эффективность, %': company.operationalEfficiency,
  'Индекс конкурентоспособности': company.competitivenessIndex,
  'Индекс опер. эффективности': company.operationalEfficiencyIndex,
  'Индекс клиентского доверия': company.customerTrustIndex,
  'Индекс цены': company.priceAttractivenessIndex,
  'Индекс цифровой зрелости': company.digitalMaturityIndex,
  'Общий рейтинг': company.overallRating,
});

export function exportDashboardToExcel(companies: ScoredCompany[]) {
  const workbook = XLSX.utils.book_new();
  const summary = Object.values(regions).map((region) => {
    const regionCompanies = companies.filter((company) => company.regionId === region.id);
    return {
      Регион: region.name,
      'Оценка объема рынка, млн ₽': region.marketVolume,
      'Топ-6 покрытие, %': Number(regionCompanies.reduce((sum, item) => sum + item.marketShare, 0).toFixed(1)),
      'Средний рейтинг': Number((regionCompanies.reduce((sum, item) => sum + item.overallRating, 0) / regionCompanies.length).toFixed(1)),
      Лидер: [...regionCompanies].sort((a, b) => b.overallRating - a.overallRating)[0]?.name,
      'Demo data': 'Оценочные данные, не финансовая отчетность',
    };
  });

  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summary), 'Summary');
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(companies.filter((company) => company.regionId === 'moscow-mo').map(companyRow)), 'Moscow_MO');
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(companies.filter((company) => company.regionId === 'spb-lo').map(companyRow)), 'SPB_LO');
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([...companies].sort((a, b) => b.overallRating - a.overallRating).map(companyRow)), 'Top_Companies');
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(companies.map((company) => ({
      Компания: company.name,
      Регион: company.regionName,
      Заказы: company.orders,
      'Расчетные заказы': company.modeledOrders,
      'Отклонение заказов': company.orderAuditDelta,
      'Частные заказы, %': company.privateOrderShare,
      'Частные заказы, шт': company.privateOrders,
      'B2B заказы, %': company.b2bOrderShare,
      'B2B заказы, шт': company.b2bOrders,
      'Средний чек частного заказа, ₽': company.privateAverageCheck,
      'Fit частного рынка': company.privateMarketFit,
    }))),
    'Private_Orders',
  );
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(companies.map((company) => ({
      Компания: company.name,
      Регион: company.regionName,
      'Выручка, млн ₽': company.revenue,
      'Средний чек, ₽': company.averageCheck,
      'CAC, ₽': company.cac,
      'LTV, ₽': company.ltv,
      'Маржинальность, %': company.margin,
      'EBITDA, млн ₽': company.ebitda,
      'Финансовый индекс': company.financialIndex,
    }))),
    'Financial_Metrics',
  );
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(companies.map((company) => ({
      Компания: company.name,
      Регион: company.regionName,
      Заказы: company.orders,
      Машины: company.vehicles,
      'Загрузка парка, %': company.fleetUtilization,
      'Подача, мин': company.averageDispatchTime,
      'Выполнение, мин': company.averageCompletionTime,
      'Опер. индекс': company.operationalEfficiencyIndex,
    }))),
    'Operational_Metrics',
  );
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(companies.map((company) => ({
      Компания: company.name,
      Регион: company.regionName,
      'Сильные стороны': company.strengths.join('; '),
      'Слабые стороны': company.weaknesses.join('; '),
      'Размышления по сильным сторонам': company.strengthInsights.join('; '),
      'Размышления по слабым сторонам': company.weaknessInsights.join('; '),
    }))),
    'SWOT',
  );
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(companies.map((company) => ({
      Компания: company.name,
      Регион: company.regionName,
      Рекомендации: company.recommendations.join('; '),
    }))),
    'Recommendations',
  );

  XLSX.writeFile(workbook, 'cargo-lite-market-dashboard-demo.xlsx');
}
