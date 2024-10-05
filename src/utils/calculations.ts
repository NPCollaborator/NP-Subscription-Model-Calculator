import { CalculatorState, CalculationResults, Segment } from '../types';

export function calculateResults(state: CalculatorState): CalculationResults {
  let totalMonthlyRevenue = 0;
  let totalMonthlyCosts = 0;
  let totalActiveClients = 0;
  let totalCustomerAcquisitionCost = 0;

  state.segments.forEach((segment: Segment) => {
    const activeClients = segment.newPatientsPerMonth * Math.min(segment.averageRetentionMonths, 12); // Cap at 12 months for annual calculations
    totalActiveClients += activeClients;

    // Monthly Revenue
    const monthlyRevenue = segment.subscriptionFee * activeClients;
    totalMonthlyRevenue += monthlyRevenue;

    // Monthly Costs
    const newPatientCosts = (segment.acquisitionCost + segment.initialNPVisitCost) * segment.newPatientsPerMonth;
    const medicationCosts = segment.medicationCost * activeClients;
    const ongoingNPVisitCosts = (segment.ongoingNPVisitCost * activeClients) / segment.monthsBetweenVisits;
    const monthlyCosts = newPatientCosts + medicationCosts + ongoingNPVisitCosts;
    totalMonthlyCosts += monthlyCosts;

    // Customer Acquisition Cost
    totalCustomerAcquisitionCost += (segment.acquisitionCost + segment.initialNPVisitCost) * segment.newPatientsPerMonth;
  });

  const totalCosts = totalMonthlyCosts + state.fixedCosts;
  const monthlyProfit = totalMonthlyRevenue - totalCosts;

  const averageCustomerAcquisitionCost = totalCustomerAcquisitionCost / state.segments.reduce((sum, segment) => sum + segment.newPatientsPerMonth, 0);
  const averageMonthlyRevenuePerClient = totalMonthlyRevenue / totalActiveClients;
  const averageRetentionMonths = state.segments.reduce((sum, segment) => sum + segment.averageRetentionMonths, 0) / state.segments.length;
  const patientLifetimeValue = averageMonthlyRevenuePerClient * averageRetentionMonths;

  return {
    monthlyRevenue: totalMonthlyRevenue,
    monthlyCosts: totalCosts,
    monthlyProfit: monthlyProfit,
    patientLifetimeValue: patientLifetimeValue,
    breakEvenPoint: totalCosts / (totalMonthlyRevenue / 30), // Assuming 30 days in a month
    customerAcquisitionCost: averageCustomerAcquisitionCost,
    ltvCacRatio: patientLifetimeValue / averageCustomerAcquisitionCost,
    contributionMargin: (totalMonthlyRevenue - totalMonthlyCosts) / totalMonthlyRevenue,
    roi: (monthlyProfit / totalCosts) * 100,
    annualRevenue: totalMonthlyRevenue * 12,
    annualProfit: monthlyProfit * 12,
    activeClients: totalActiveClients,
  };
}

export function calculateExitValuation(
  annualRevenue: number,
  annualProfit: number,
  industryMultiple: number,
  projectedGrowthRate: number,
  activeClients: number,
  projectionMonths: number
): number {
  const projectedYears = projectionMonths / 12;
  const growthFactor = Math.pow(1 + projectedGrowthRate / 100, projectedYears);
  const projectedRevenue = annualRevenue * growthFactor;
  const projectedProfit = annualProfit * growthFactor;
  const projectedClients = activeClients * growthFactor;

  // Use a weighted average of revenue and profit multiples
  const revenueMultiple = industryMultiple * 0.7; // 70% weight on revenue
  const profitMultiple = industryMultiple * 1.5 * 0.3; // 30% weight on profit, assuming higher multiple for profit

  const valuationByRevenue = projectedRevenue * revenueMultiple;
  const valuationByProfit = projectedProfit * profitMultiple;

  // Add a premium for the number of active clients
  const clientPremium = projectedClients * 500; // Assuming $500 per client premium

  return valuationByRevenue + valuationByProfit + clientPremium;
}

export function generateProjectionData(state: CalculatorState, initialResults: CalculationResults) {
  const data = [];
  let currentRevenue = initialResults.monthlyRevenue;
  let currentCosts = initialResults.monthlyCosts;
  let currentProfit = initialResults.monthlyProfit;

  for (let month = 1; month <= state.projectionMonths; month++) {
    const growthFactor = 1 + (state.projectedGrowthRate / 100 / 12); // Monthly growth rate
    currentRevenue *= growthFactor;
    currentCosts *= growthFactor;
    currentProfit = currentRevenue - currentCosts;

    data.push({
      month,
      revenue: currentRevenue,
      costs: currentCosts,
      profit: currentProfit,
    });
  }

  return data;
}