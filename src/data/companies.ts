import type { Company, RegionId, ScoredCompany } from '../types';

export const regions: Record<RegionId, { id: RegionId; name: string; shortName: string; marketVolume: number }> = {
  'moscow-mo': {
    id: 'moscow-mo',
    name: 'Москва и Московская область',
    shortName: 'Москва + МО',
    marketVolume: 18200,
  },
  'spb-lo': {
    id: 'spb-lo',
    name: 'Санкт-Петербург и Ленинградская область',
    shortName: 'СПб + ЛО',
    marketVolume: 8200,
  },
};

export const sourceArchitecture = [
  'Avito: объявления, цены, активность исполнителей',
  'Яндекс Карты и 2ГИС: рейтинг, отзывы, география офисов',
  'Сайты компаний: тарифы, парк, SLA, услуги',
  'Открытые объявления: динамика спроса и предложения',
  'CRM-данные: заявки, конверсия, повторные заказы',
  'Рекламные кабинеты: CAC, каналы, стоимость лида',
];

export const companies: Company[] = [
  {
    id: 'msk-gruzovichkof',
    name: 'Грузовичкоф',
    regionId: 'moscow-mo',
    regionName: regions['moscow-mo'].name,
    marketShare: 16.8,
    revenue: 3058,
    averageCheck: 6850,
    orders: 446400,
    privateOrderShare: 52,
    b2bOrderShare: 48,
    privateAverageCheck: 5900,
    privateMarketFit: 88,
    vehicles: 1620,
    fleetUtilization: 82,
    averageDispatchTime: 38,
    averageCompletionTime: 162,
    costPerKm: 62,
    minimumOrderCost: 2890,
    customerRating: 4.64,
    reviews: 18400,
    repeatOrders: 39,
    conversionRate: 31,
    cac: 810,
    ltv: 17600,
    margin: 23,
    ebitda: 704,
    operationalEfficiency: 86,
    digitalMaturity: 88,
    serviceStability: 84,
    strengths: ['Высокая узнаваемость', 'Большой парк', 'Сильная диспетчеризация', 'Широкая тарифная сетка'],
    weaknesses: ['Высокая цена в пиковые часы', 'Неравномерное качество подрядчиков'],
    recommendations: ['Ввести скоринг водителей по SLA', 'Развивать подписки для B2B', 'Динамически сглаживать пиковые тарифы'],
  },
  {
    id: 'msk-dostavista',
    name: 'Dostavista / Borzo',
    regionId: 'moscow-mo',
    regionName: regions['moscow-mo'].name,
    marketShare: 13.7,
    revenue: 2493,
    averageCheck: 5120,
    orders: 487000,
    privateOrderShare: 62,
    b2bOrderShare: 38,
    privateAverageCheck: 4200,
    privateMarketFit: 82,
    vehicles: 1380,
    fleetUtilization: 79,
    averageDispatchTime: 29,
    averageCompletionTime: 135,
    costPerKm: 58,
    minimumOrderCost: 2400,
    customerRating: 4.58,
    reviews: 22600,
    repeatOrders: 42,
    conversionRate: 36,
    cac: 690,
    ltv: 15800,
    margin: 21,
    ebitda: 524,
    operationalEfficiency: 84,
    digitalMaturity: 93,
    serviceStability: 79,
    strengths: ['Сильная цифровая платформа', 'Быстрая подача', 'Высокая конверсия'],
    weaknesses: ['Ограниченная глубина сложных переездов', 'Риск дефицита машин в пригородах'],
    recommendations: ['Расширить B2B-пакеты с грузчиками', 'Закрепить водителей в зонах МО', 'Усилить контроль сложных заказов'],
  },
  {
    id: 'msk-vezet-vsem',
    name: 'Везет Всем',
    regionId: 'moscow-mo',
    regionName: regions['moscow-mo'].name,
    marketShare: 10.4,
    revenue: 1893,
    averageCheck: 7450,
    orders: 254000,
    privateOrderShare: 41,
    b2bOrderShare: 59,
    privateAverageCheck: 6400,
    privateMarketFit: 70,
    vehicles: 940,
    fleetUtilization: 76,
    averageDispatchTime: 52,
    averageCompletionTime: 184,
    costPerKm: 64,
    minimumOrderCost: 3100,
    customerRating: 4.49,
    reviews: 9800,
    repeatOrders: 34,
    conversionRate: 28,
    cac: 920,
    ltv: 14100,
    margin: 24,
    ebitda: 454,
    operationalEfficiency: 78,
    digitalMaturity: 72,
    serviceStability: 77,
    strengths: ['Опыт междугородних маршрутов', 'Хорошая маржинальность', 'Гибкие типы кузовов'],
    weaknesses: ['Медленнее подача', 'Ниже цифровая зрелость'],
    recommendations: ['Обновить онлайн-калькулятор', 'Автоматизировать назначение машин', 'Усилить работу с отзывами'],
  },
  {
    id: 'msk-yandex-delivery',
    name: 'Яндекс Доставка Грузовая',
    regionId: 'moscow-mo',
    regionName: regions['moscow-mo'].name,
    marketShare: 9.6,
    revenue: 1747,
    averageCheck: 4680,
    orders: 373300,
    privateOrderShare: 66,
    b2bOrderShare: 34,
    privateAverageCheck: 3600,
    privateMarketFit: 78,
    vehicles: 1180,
    fleetUtilization: 81,
    averageDispatchTime: 24,
    averageCompletionTime: 121,
    costPerKm: 55,
    minimumOrderCost: 2200,
    customerRating: 4.52,
    reviews: 31200,
    repeatOrders: 37,
    conversionRate: 39,
    cac: 620,
    ltv: 13200,
    margin: 18,
    ebitda: 314,
    operationalEfficiency: 87,
    digitalMaturity: 96,
    serviceStability: 80,
    strengths: ['Самая быстрая подача', 'Мощный перформанс-маркетинг', 'Удобное приложение'],
    weaknesses: ['Ниже маржа', 'Меньше кастомизации для сложных переездов'],
    recommendations: ['Разделить грузовые SLA по сегментам', 'Повысить допродажи грузчиков', 'Развить корпоративные лимиты'],
  },
  {
    id: 'msk-delovye-linii',
    name: 'Деловые Линии Малый груз',
    regionId: 'moscow-mo',
    regionName: regions['moscow-mo'].name,
    marketShare: 8.8,
    revenue: 1602,
    averageCheck: 8120,
    orders: 197300,
    privateOrderShare: 24,
    b2bOrderShare: 76,
    privateAverageCheck: 6900,
    privateMarketFit: 48,
    vehicles: 760,
    fleetUtilization: 74,
    averageDispatchTime: 61,
    averageCompletionTime: 205,
    costPerKm: 69,
    minimumOrderCost: 3300,
    customerRating: 4.41,
    reviews: 12100,
    repeatOrders: 45,
    conversionRate: 26,
    cac: 980,
    ltv: 21400,
    margin: 25,
    ebitda: 401,
    operationalEfficiency: 75,
    digitalMaturity: 78,
    serviceStability: 86,
    strengths: ['Сильный B2B-контур', 'Стабильность сервиса', 'Высокий LTV'],
    weaknesses: ['Высокий минимальный заказ', 'Дольше подача'],
    recommendations: ['Запустить быстрый городской тариф', 'Снизить трение в онлайн-заказе', 'Выделить микро-флот до 1.5 т'],
  },
  {
    id: 'msk-pereezd-01',
    name: 'Переезд 01',
    regionId: 'moscow-mo',
    regionName: regions['moscow-mo'].name,
    marketShare: 6.9,
    revenue: 1256,
    averageCheck: 9100,
    orders: 138000,
    privateOrderShare: 58,
    b2bOrderShare: 42,
    privateAverageCheck: 8300,
    privateMarketFit: 72,
    vehicles: 520,
    fleetUtilization: 71,
    averageDispatchTime: 69,
    averageCompletionTime: 228,
    costPerKm: 72,
    minimumOrderCost: 3600,
    customerRating: 4.55,
    reviews: 7400,
    repeatOrders: 31,
    conversionRate: 24,
    cac: 1040,
    ltv: 16800,
    margin: 26,
    ebitda: 327,
    operationalEfficiency: 72,
    digitalMaturity: 66,
    serviceStability: 78,
    strengths: ['Сильная экспертиза переездов', 'Высокий средний чек', 'Хорошее качество упаковки'],
    weaknesses: ['Малый парк', 'Слабее цифровые каналы'],
    recommendations: ['Ускорить мобильный заказ', 'Добавить слоты срочной подачи', 'Собрать пакетные B2B-переезды'],
  },
  {
    id: 'spb-gruzovichkof',
    name: 'Грузовичкоф СПб',
    regionId: 'spb-lo',
    regionName: regions['spb-lo'].name,
    marketShare: 20.4,
    revenue: 1673,
    averageCheck: 6020,
    orders: 278000,
    privateOrderShare: 55,
    b2bOrderShare: 45,
    privateAverageCheck: 5200,
    privateMarketFit: 86,
    vehicles: 980,
    fleetUtilization: 84,
    averageDispatchTime: 31,
    averageCompletionTime: 148,
    costPerKm: 56,
    minimumOrderCost: 2600,
    customerRating: 4.67,
    reviews: 15600,
    repeatOrders: 43,
    conversionRate: 35,
    cac: 680,
    ltv: 16900,
    margin: 24,
    ebitda: 402,
    operationalEfficiency: 88,
    digitalMaturity: 86,
    serviceStability: 86,
    strengths: ['Лидер узнаваемости', 'Плотное покрытие города', 'Высокая повторяемость'],
    weaknesses: ['Высокая зависимость от городского ядра', 'Пиковая цена выше рынка'],
    recommendations: ['Укрепить зону ЛО', 'Ввести ночные B2B-тарифы', 'Развить предиктивное распределение машин'],
  },
  {
    id: 'spb-yandex-delivery',
    name: 'Яндекс Доставка Грузовая СПб',
    regionId: 'spb-lo',
    regionName: regions['spb-lo'].name,
    marketShare: 12.9,
    revenue: 1058,
    averageCheck: 4320,
    orders: 245000,
    privateOrderShare: 68,
    b2bOrderShare: 32,
    privateAverageCheck: 3400,
    privateMarketFit: 79,
    vehicles: 790,
    fleetUtilization: 80,
    averageDispatchTime: 23,
    averageCompletionTime: 116,
    costPerKm: 51,
    minimumOrderCost: 2050,
    customerRating: 4.5,
    reviews: 19800,
    repeatOrders: 36,
    conversionRate: 40,
    cac: 590,
    ltv: 12100,
    margin: 17,
    ebitda: 180,
    operationalEfficiency: 86,
    digitalMaturity: 96,
    serviceStability: 79,
    strengths: ['Низкая цена входа', 'Быстрый заказ', 'Высокая цифровая зрелость'],
    weaknesses: ['Низкая маржинальность', 'Не всегда подходит для сложных работ'],
    recommendations: ['Упаковать грузовые допуслуги', 'Повысить удержание B2B', 'Улучшить сценарии с грузчиками'],
  },
  {
    id: 'spb-dostavista',
    name: 'Dostavista / Borzo СПб',
    regionId: 'spb-lo',
    regionName: regions['spb-lo'].name,
    marketShare: 11.2,
    revenue: 918,
    averageCheck: 4650,
    orders: 197400,
    privateOrderShare: 64,
    b2bOrderShare: 36,
    privateAverageCheck: 3800,
    privateMarketFit: 81,
    vehicles: 710,
    fleetUtilization: 78,
    averageDispatchTime: 27,
    averageCompletionTime: 129,
    costPerKm: 53,
    minimumOrderCost: 2200,
    customerRating: 4.56,
    reviews: 14200,
    repeatOrders: 39,
    conversionRate: 37,
    cac: 640,
    ltv: 13400,
    margin: 20,
    ebitda: 184,
    operationalEfficiency: 83,
    digitalMaturity: 92,
    serviceStability: 80,
    strengths: ['Хорошая скорость подачи', 'Сильный UX', 'Конкурентная цена'],
    weaknesses: ['Ограниченный контроль качества в час пик', 'Слабее покрытие дальних районов ЛО'],
    recommendations: ['Закрепить микро-зоны ЛО', 'Ввести премиум-проверку водителей', 'Развить регулярные маршруты'],
  },
  {
    id: 'spb-vezet-vsem',
    name: 'Везет Всем СПб',
    regionId: 'spb-lo',
    regionName: regions['spb-lo'].name,
    marketShare: 8.7,
    revenue: 713,
    averageCheck: 6900,
    orders: 103300,
    privateOrderShare: 43,
    b2bOrderShare: 57,
    privateAverageCheck: 6100,
    privateMarketFit: 67,
    vehicles: 430,
    fleetUtilization: 73,
    averageDispatchTime: 49,
    averageCompletionTime: 176,
    costPerKm: 61,
    minimumOrderCost: 2950,
    customerRating: 4.44,
    reviews: 6800,
    repeatOrders: 32,
    conversionRate: 27,
    cac: 880,
    ltv: 13700,
    margin: 23,
    ebitda: 164,
    operationalEfficiency: 76,
    digitalMaturity: 70,
    serviceStability: 76,
    strengths: ['Гибкая логистика по области', 'Уверенная маржа', 'Опытные диспетчеры'],
    weaknesses: ['Средняя скорость подачи', 'Меньше отзывов'],
    recommendations: ['Усилить SEO и карты', 'Оптимизировать быстрые тарифы', 'Добавить онлайн-отслеживание'],
  },
  {
    id: 'spb-pereezd-bez-hlopot',
    name: 'Переезд без хлопот',
    regionId: 'spb-lo',
    regionName: regions['spb-lo'].name,
    marketShare: 7.4,
    revenue: 607,
    averageCheck: 7800,
    orders: 77800,
    privateOrderShare: 61,
    b2bOrderShare: 39,
    privateAverageCheck: 7200,
    privateMarketFit: 74,
    vehicles: 310,
    fleetUtilization: 72,
    averageDispatchTime: 58,
    averageCompletionTime: 208,
    costPerKm: 65,
    minimumOrderCost: 3200,
    customerRating: 4.61,
    reviews: 5200,
    repeatOrders: 29,
    conversionRate: 25,
    cac: 930,
    ltv: 15100,
    margin: 25,
    ebitda: 152,
    operationalEfficiency: 74,
    digitalMaturity: 64,
    serviceStability: 77,
    strengths: ['Качественные переезды', 'Высокая оценка клиентов', 'Пакетные услуги'],
    weaknesses: ['Небольшой парк', 'Низкая цифровая зрелость'],
    recommendations: ['Запустить мобильную форму заявки', 'Собрать отзывы в картах', 'Добавить тариф для малых офисов'],
  },
  {
    id: 'spb-dellin',
    name: 'Деловые Линии Малый груз СПб',
    regionId: 'spb-lo',
    regionName: regions['spb-lo'].name,
    marketShare: 6.8,
    revenue: 558,
    averageCheck: 7600,
    orders: 73400,
    privateOrderShare: 22,
    b2bOrderShare: 78,
    privateAverageCheck: 6600,
    privateMarketFit: 45,
    vehicles: 280,
    fleetUtilization: 70,
    averageDispatchTime: 63,
    averageCompletionTime: 214,
    costPerKm: 67,
    minimumOrderCost: 3350,
    customerRating: 4.38,
    reviews: 7600,
    repeatOrders: 44,
    conversionRate: 24,
    cac: 960,
    ltv: 20500,
    margin: 24,
    ebitda: 134,
    operationalEfficiency: 73,
    digitalMaturity: 76,
    serviceStability: 84,
    strengths: ['Стабильный B2B-спрос', 'Высокий LTV', 'Надежность процессов'],
    weaknesses: ['Долгая подача', 'Меньше фокуса на срочный городской сегмент'],
    recommendations: ['Создать городской экспресс-продукт', 'Упростить заказ до 3 шагов', 'Развить локальные партнерства'],
  },
];

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

const scoreLowerIsBetter = (value: number, min: number, max: number) => clamp(((max - value) / (max - min)) * 100);
const scoreHigherIsBetter = (value: number, min: number, max: number) => clamp(((value - min) / (max - min)) * 100);

function buildStrengthInsights(company: Company): string[] {
  const insights: string[] = [];

  if (company.vehicles >= 900) {
    insights.push(`Масштаб парка (${company.vehicles.toLocaleString('ru-RU')} машин) снижает риск отказа в срочных частных заказах и дает плотность покрытия.`);
  }
  if (company.averageDispatchTime <= 35) {
    insights.push(`Быстрая подача (${company.averageDispatchTime} мин) критична для частного спроса: клиенты чаще выбирают исполнителя в моменте, а не после долгого сравнения.`);
  }
  if (company.repeatOrders >= 40) {
    insights.push(`Повторные заказы ${company.repeatOrders}% показывают устойчивое доверие и дают более дешевый рост без постоянного давления на рекламный бюджет.`);
  }
  if (company.privateOrderShare >= 58) {
    insights.push(`Высокая доля частных заказов (${company.privateOrderShare}%) делает бренд чувствительным к отзывам, но повышает объем коротких городских перевозок.`);
  }
  if (company.margin >= 24) {
    insights.push(`Маржинальность ${company.margin}% оставляет пространство для скидок, пакетных тарифов и инвестиций в качество без немедленного провала экономики.`);
  }

  return insights.slice(0, 4);
}

function buildWeaknessInsights(company: Company): string[] {
  const insights: string[] = [];

  if (company.averageDispatchTime >= 50) {
    insights.push(`Подача ${company.averageDispatchTime} мин ухудшает конверсию частных заявок: клиент с переездом или покупкой с маркетплейса часто выбирает ближайшую машину.`);
  }
  if (company.minimumOrderCost >= 3100) {
    insights.push(`Минимальный заказ ${company.minimumOrderCost.toLocaleString('ru-RU')} ₽ отсекает короткие частные перевозки, где решение принимается по порогу входа.`);
  }
  if (company.digitalMaturity <= 76) {
    insights.push(`Цифровая зрелость ${company.digitalMaturity}/100 ограничивает самообслуживание: дороже лид, больше ручной диспетчеризации и слабее прозрачность статуса.`);
  }
  if (company.vehicles <= 520) {
    insights.push(`Парк ${company.vehicles} машин ограничивает масштабирование в пиковые окна и повышает риск просадки SLA при всплеске частного спроса.`);
  }
  if (company.margin <= 20) {
    insights.push(`Маржинальность ${company.margin}% делает рост через скидки рискованным: нужно монетизировать допуслуги, а не только снижать цену.`);
  }

  return insights.slice(0, 4);
}

export function scoreCompany(company: Company): ScoredCompany {
  const modeledOrders = Math.round((company.revenue * 1_000_000) / company.averageCheck);
  const orderAuditDelta = company.orders - modeledOrders;
  const privateOrders = Math.round(company.orders * (company.privateOrderShare / 100));
  const b2bOrders = company.orders - privateOrders;
  const financialIndex = clamp(company.margin * 1.6 + scoreHigherIsBetter(company.ebitda, 120, 730) * 0.35 + scoreHigherIsBetter(company.ltv / company.cac, 12, 26) * 0.25);
  const operationalEfficiencyIndex = clamp(company.operationalEfficiency * 0.45 + company.fleetUtilization * 0.25 + scoreLowerIsBetter(company.averageDispatchTime, 20, 75) * 0.2 + company.serviceStability * 0.1);
  const customerTrustIndex = clamp(scoreHigherIsBetter(company.customerRating, 4.25, 4.75) * 0.45 + scoreHigherIsBetter(company.reviews, 4500, 32000) * 0.25 + company.repeatOrders * 0.3);
  const priceAttractivenessIndex = clamp(scoreLowerIsBetter(company.costPerKm, 48, 74) * 0.55 + scoreLowerIsBetter(company.minimumOrderCost, 2000, 3700) * 0.45);
  const digitalMaturityIndex = company.digitalMaturity;
  const competitivenessIndex = clamp(
    company.marketShare * 2.1 +
      scoreHigherIsBetter(company.vehicles, 250, 1650) * 0.25 +
      operationalEfficiencyIndex * 0.25 +
      customerTrustIndex * 0.2 +
      digitalMaturityIndex * 0.1 +
      company.privateMarketFit * 0.08,
  );
  const overallRating = clamp(
    financialIndex * 0.2 +
      customerTrustIndex * 0.18 +
      scoreLowerIsBetter(company.averageDispatchTime, 20, 75) * 0.14 +
      priceAttractivenessIndex * 0.12 +
      company.serviceStability * 0.12 +
      company.repeatOrders * 0.1 +
      scoreHigherIsBetter(company.vehicles, 250, 1650) * 0.1 +
      company.privateMarketFit * 0.04,
  );

  return {
    ...company,
    modeledOrders,
    orderAuditDelta,
    privateOrders,
    b2bOrders,
    strengthInsights: buildStrengthInsights(company),
    weaknessInsights: buildWeaknessInsights(company),
    competitivenessIndex: Math.round(competitivenessIndex),
    operationalEfficiencyIndex: Math.round(operationalEfficiencyIndex),
    customerTrustIndex: Math.round(customerTrustIndex),
    priceAttractivenessIndex: Math.round(priceAttractivenessIndex),
    digitalMaturityIndex: Math.round(digitalMaturityIndex),
    financialIndex: Math.round(financialIndex),
    overallRating: Math.round(overallRating),
  };
}

export const scoredCompanies = companies.map(scoreCompany);

export const formatMoney = (value: number, suffix = 'млн ₽') => `${value.toLocaleString('ru-RU')} ${suffix}`;
