import React, { useState } from 'react';
import { Calculator, BarChart, DollarSign, HelpCircle } from 'lucide-react';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import DataVisualization from './components/DataVisualization';
import { CalculatorState } from './types';

const initialState: CalculatorState = {
  fixedCosts: 5000,
  segments: [
    {
      name: 'Segment 1',
      subscriptionFee: 300,
      medicationCost: 100,
      acquisitionCost: 50,
      newPatientsPerMonth: 30,
      averageRetentionMonths: 12,
      initialNPVisitCost: 80,
      ongoingNPVisitCost: 50,
      monthsBetweenVisits: 3,
    },
  ],
  industryMultiple: 5,
  projectedGrowthRate: 10,
  projectionMonths: 24,
};

function App() {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>(initialState);
  const [activeTab, setActiveTab] = useState('input');

  const handleInputChange = (newState: CalculatorState) => {
    setCalculatorState(newState);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'input':
        return <InputForm state={calculatorState} onChange={handleInputChange} />;
      case 'dashboard':
        return <Dashboard state={calculatorState} />;
      case 'visualization':
        return <DataVisualization state={calculatorState} />;
      case 'help':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">How to Use This Calculator</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Start by entering your fixed costs in the Input tab.</li>
              <li>Add or modify segments to represent different patient groups or service offerings.</li>
              <li>Adjust the exit valuation parameters to reflect your industry and growth expectations.</li>
              <li>View your results in the Dashboard tab.</li>
              <li>Explore visual representations of your data in the Visualization tab.</li>
              <li>Use the projection months slider to see how your business might grow over time.</li>
            </ol>
            <p className="mt-4">
              Remember, this calculator provides estimates based on your inputs. Always consult with financial professionals for important business decisions.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Calculator className="w-8 h-8 mr-2" />
            <h1 className="text-2xl font-bold">NP Subscription Model Calculator</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={() => setActiveTab('input')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'input' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
                >
                  <Calculator className="w-5 h-5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
                >
                  <DollarSign className="w-5 h-5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('visualization')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'visualization' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
                >
                  <BarChart className="w-5 h-5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('help')}
                  className={`px-3 py-2 rounded-md ${activeTab === 'help' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto flex-grow p-4">
        {renderTabContent()}
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2023 NP Subscription Model Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;