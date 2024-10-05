import React from 'react';
import { CalculatorState } from '../types';
import { calculateResults, calculateExitValuation } from '../utils/calculations';

interface DashboardProps {
  state: CalculatorState;
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const results = calculateResults(state);
  const exitValuation = calculateExitValuation(
    results.annualRevenue,
    results.annualProfit,
    state.industryMultiple,
    state.projectedGrowthRate,
    results.activeClients,
    state.projectionMonths
  );

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  const formatPercent = (value: number) => new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Monthly Revenue</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(results.monthlyRevenue)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Monthly Costs</h3>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(results.monthlyCosts)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Monthly Profit</h3>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.monthlyProfit)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Break-even Point</h3>
          <p className="text-2xl font-bold">{results.breakEvenPoint.toFixed(2)} months</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Patient LTV</h3>
          <p className="text-2xl font-bold">{formatCurrency(results.patientLifetimeValue)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Customer Acquisition Cost</h3>
          <p className="text-2xl font-bold">{formatCurrency(results.customerAcquisitionCost)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">LTV:CAC Ratio</h3>
          <p className="text-2xl font-bold">{results.ltvCacRatio.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">ROI (Monthly)</h3>
          <p className="text-2xl font-bold">{formatPercent(results.roi)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Contribution Margin</h3>
          <p className="text-2xl font-bold">{formatPercent(results.contributionMargin * 100)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Active Clients</h3>
          <p className="text-2xl font-bold">{results.activeClients}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Potential Exit Valuation</h3>
          <p className="text-2xl font-bold text-purple-600">{formatCurrency(exitValuation)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;