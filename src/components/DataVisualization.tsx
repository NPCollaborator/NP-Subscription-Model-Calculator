import React from 'react';
import { CalculatorState } from '../types';
import { calculateResults, generateProjectionData } from '../utils/calculations';
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { XAxis, YAxis } from 'recharts';

interface DataVisualizationProps {
  state: CalculatorState;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ state }) => {
  const results = calculateResults(state);
  const projectionData = generateProjectionData(state, results);

  const renderLineChart = (data: any[], xKey: string, lines: { key: string; color: string }[]) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map(line => (
          <Line key={line.key} type="monotone" dataKey={line.key} stroke={line.color} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">{state.projectionMonths}-Month Projection</h3>
        {renderLineChart(projectionData, 'month', [
          { key: 'revenue', color: '#8884d8' },
          { key: 'costs', color: '#82ca9d' },
          { key: 'profit', color: '#ffc658' },
        ])}
      </div>
    </div>
  );
};

export default DataVisualization;