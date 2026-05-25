export type RegionId = 'moscow-mo' | 'spb-lo';

export type MetricGroup = 'all' | 'financial' | 'operational' | 'customer' | 'pricing' | 'digital';

export type SortKey = 'overallRating' | 'revenue' | 'marketShare' | 'operationalEfficiency';

export interface Company {
  id: string;
  name: string;
  regionId: RegionId;
  regionName: string;
  marketShare: number;
  revenue: number;
  averageCheck: number;
  orders: number;
  vehicles: number;
  fleetUtilization: number;
  averageDispatchTime: number;
  averageCompletionTime: number;
  costPerKm: number;
  minimumOrderCost: number;
  customerRating: number;
  reviews: number;
  repeatOrders: number;
  conversionRate: number;
  cac: number;
  ltv: number;
  margin: number;
  ebitda: number;
  operationalEfficiency: number;
  digitalMaturity: number;
  serviceStability: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface ScoredCompany extends Company {
  competitivenessIndex: number;
  operationalEfficiencyIndex: number;
  customerTrustIndex: number;
  priceAttractivenessIndex: number;
  digitalMaturityIndex: number;
  financialIndex: number;
  overallRating: number;
}
