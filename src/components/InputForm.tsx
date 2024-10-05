import React from 'react';
import { CalculatorState, Segment } from '../types';
import { Info } from 'lucide-react';

interface InputFormProps {
  state: CalculatorState;
  onChange: (newState: CalculatorState) => void;
}

const InputForm: React.FC<InputFormProps> = ({ state, onChange }) => {
  const handleFixedCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...state, fixedCosts: parseFloat(e.target.value) || 0 });
  };

  const handleSegmentChange = (index: number, key: keyof Segment, value: string) => {
    const newSegments = [...state.segments];
    newSegments[index] = { ...newSegments[index], [key]: parseFloat(value) || 0 };
    onChange({ ...state, segments: newSegments });
  };

  const addSegment = () => {
    onChange({
      ...state,
      segments: [
        ...state.segments,
        {
          name: `Segment ${state.segments.length + 1}`,
          subscriptionFee: 0,
          medicationCost: 0,
          acquisitionCost: 0,
          newPatientsPerMonth: 0,
          averageRetentionMonths: 0,
          initialNPVisitCost: 0,
          ongoingNPVisitCost: 0,
          monthsBetweenVisits: 0,
        },
      ],
    });
  };

  const removeSegment = (index: number) => {
    const newSegments = state.segments.filter((_, i) => i !== index);
    onChange({ ...state, segments: newSegments });
  };

  const handleExitValuationChange = (key: keyof CalculatorState, value: string) => {
    onChange({ ...state, [key]: parseFloat(value) || 0 });
  };

  const handleProjectionMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...state, projectionMonths: parseInt(e.target.value) || 24 });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Input Parameters</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Fixed Costs ($)</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            value={state.fixedCosts}
            onChange={handleFixedCostsChange}
            className="block w-full pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Info className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Enter your monthly fixed costs, such as rent, salaries, and utilities.
        </p>
      </div>
      {state.segments.map((segment, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-medium mb-2">{segment.name}</h3>
          {Object.entries(segment).map(([key, value]) => (
            key !== 'name' && (
              <div key={key} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleSegmentChange(index, key as keyof Segment, e.target.value)}
                    className="block w-full pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Info className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
            )
          ))}
          <button
            onClick={() => removeSegment(index)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove Segment
          </button>
        </div>
      ))}
      {state.segments.length < 5 && (
        <button
          onClick={addSegment}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Segment
        </button>
      )}
      <h3 className="text-lg font-medium mt-6 mb-2">Exit Valuation Parameters</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Industry Multiple</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            value={state.industryMultiple}
            onChange={(e) => handleExitValuationChange('industryMultiple', e.target.value)}
            className="block w-full pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Info className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          The industry multiple is typically between 3x and 10x annual revenue or profit.
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Projected Growth Rate (%)</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            value={state.projectedGrowthRate}
            onChange={(e) => handleExitValuationChange('projectedGrowthRate', e.target.value)}
            className="block w-full pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Info className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Enter your expected annual growth rate as a percentage.
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Projection Months</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            value={state.projectionMonths}
            onChange={handleProjectionMonthsChange}
            className="block w-full pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Info className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Enter the number of months for your growth projections (e.g., 24 for 2 years).
        </p>
      </div>
    </div>
  );
};

export default InputForm;