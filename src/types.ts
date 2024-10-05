export interface Segment {
  name: string;
  subscriptionFee: number;
  medicationCost: number;
  acquisitionCost: number;
  newPatientsPerMonth: number;
  averageRetentionMonths: number;
  initialNPVisitCost: number;
  ongoingNPVisitCost: number;
  monthsBetweenVisits: number;
}

export interface CalculatorState {
  fixedCosts: number;
  segments: Segment[];
  industryMultiple: number;
  projectedGrowthRate: number;
  projectionMonths: number;
}

export interface CalculationResults {
  monthlyRevenue: number;
  monthlyCosts: number;
  monthlyProfit: number;
  patientLifetimeValue: number;
  breakEvenPoint: number;
  customerAcquisitionCost: number;
  ltvCacRatio: number;
  contributionMargin: number;
  roi: number;
  annualRevenue: number;
  annualProfit: number;
  activeClients: number;
}