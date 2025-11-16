import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/components.css';

export default function Graph({ data, xKey, yKey, color = 'var(--color-chart-line)', type = 'line' }) {
  return (
    <div className="graph-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey={xKey} 
            stroke="var(--color-text-secondary)"
            style={{ fontSize: 'var(--font-size-sm)' }}
          />
          <YAxis 
            stroke="var(--color-text-secondary)"
            style={{ fontSize: 'var(--font-size-sm)' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--border-radius-md)',
              color: 'var(--color-text-primary)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey={yKey} 
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
