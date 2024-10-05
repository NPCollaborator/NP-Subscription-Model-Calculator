import React from 'react';
import { XAxis as RechartsXAxis, YAxis as RechartsYAxis, XAxisProps, YAxisProps } from 'recharts';

export const XAxis: React.FC<XAxisProps> = ({ 
  allowDataOverflow = false,
  allowDecimals = true,
  allowDuplicatedCategory = true,
  ...props 
}) => (
  <RechartsXAxis
    allowDataOverflow={allowDataOverflow}
    allowDecimals={allowDecimals}
    allowDuplicatedCategory={allowDuplicatedCategory}
    {...props}
  />
);

export const YAxis: React.FC<YAxisProps> = ({ 
  allowDataOverflow = false,
  allowDecimals = true,
  allowDuplicatedCategory = true,
  ...props 
}) => (
  <RechartsYAxis
    allowDataOverflow={allowDataOverflow}
    allowDecimals={allowDecimals}
    allowDuplicatedCategory={allowDuplicatedCategory}
    {...props}
  />
);