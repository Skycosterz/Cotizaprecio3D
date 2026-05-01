import React, { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Zap, Wrench, Users, DollarSign, Target, ShoppingCart } from 'lucide-react';
import type { CalculatorResults } from '@/types/calculator';
import type { Currency } from '@/types/calculator';
import { formatCurrency } from '@/lib/calculator';

interface ResultsDashboardProps {
  results: CalculatorResults;
  currency: Currency;
  exchangeRate: number;
}

function AnimatedValue({ value, currency, exchangeRate }: { value: number; currency: Currency; exchangeRate: number }) {
  const [displayVal, setDisplayVal] = useState(value);
  const [key, setKey] = useState(0);
  const prevRef = useRef(value);

  useEffect(() => {
    if (Math.abs(value - prevRef.current) > 0.01) {
      prevRef.current = value;
      setDisplayVal(value);
      setKey((k) => k + 1);
    }
  }, [value]);

  const displayStr = formatCurrency(displayVal, currency, exchangeRate);

  return (
    <span key={key} className="animate-count font-mono-jb">
      {displayStr}
    </span>
  );
}

interface MetricTileProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  currency: Currency;
  exchangeRate: number;
  accentColor: string;
  highlight?: boolean;
}

function MetricTile({ icon, label, value, currency, exchangeRate, accentColor, highlight }: MetricTileProps) {
  return (
    <div
      className="rounded-xl p-4 transition-all duration-300 glass-card-hover"
      style={{
        background: highlight ? `rgba(${accentColor},0.08)` : 'rgba(22,26,34,0.85)',
        border: `1px solid ${highlight ? `rgba(${accentColor},0.25)` : 'rgba(255,255,255,0.07)'}`,
        boxShadow: highlight ? `0 0 20px rgba(${accentColor},0.1)` : 'none',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `rgba(${accentColor},0.15)` }}
        >
          <span style={{ color: `rgb(${accentColor})` }}>{icon}</span>
        </div>
      </div>
      <div
        className="text-lg font-bold mb-1"
        style={{ color: highlight ? `rgb(${accentColor})` : 'white' }}
      >
        <AnimatedValue value={value} currency={currency} exchangeRate={exchangeRate} />
      </div>
      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Space Grotesk, sans-serif' }}>
        {label}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { label: string }; value: number }> }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 rounded-lg text-sm"
        style={{ background: '#161A22', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'Space Grotesk, sans-serif' }}
      >
        <p className="font-medium">{payload[0].payload.label}</p>
        <p className="font-mono-jb text-sm" style={{ color: '#2D9CDB' }}>
          ${payload[0].value.toFixed(2)} MXN
        </p>
        {payload[0].value > 0 && (
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            ({((payload[0].value / (payload.reduce((s, p) => s + p.value, 0))) * 100).toFixed(1)}%)
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function ResultsDashboard({ results, currency, exchangeRate }: ResultsDashboardProps) {
  const metrics = [
    { icon: <DollarSign size={16} />, label: 'Costo Material', value: results.materialCost, color: '45,156,219' },
    { icon: <Zap size={16} />, label: 'Electricidad CFE', value: results.electricityCost, color: '0,229,255' },
    { icon: <Wrench size={16} />, label: 'Desgaste Máquina', value: results.machineWear, color: '123,97,255' },
    { icon: <Users size={16} />, label: 'Mano de Obra', value: results.laborCost, color: '245,166,35' },
    { icon: <Target size={16} />, label: 'Precio Sugerido', value: results.suggestedPrice, color: '245,166,35', highlight: true },
    { icon: <TrendingUp size={16} />, label: 'Ganancia Neta', value: results.netProfit, color: '74,222,128', highlight: true },
    { icon: <ShoppingCart size={16} />, label: 'Precio Mayoreo', value: results.wholesalePrice, color: '156,163,175' },
  ];

  const chartData = results.breakdown.filter((b) => b.value > 0.01);

  return (
    <div className="space-y-5">
      {/* Total Cost Highlight */}
      <div
        className="rounded-xl p-5 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(45,156,219,0.08), rgba(0,229,255,0.04))',
          border: '1px solid rgba(45,156,219,0.2)',
          boxShadow: '0 0 30px rgba(45,156,219,0.08)',
        }}
      >
        <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Space Grotesk, sans-serif' }}>
          COSTO TOTAL DE PRODUCCIÓN
        </div>
        <div className="text-3xl font-bold" style={{ color: '#2D9CDB', fontFamily: 'JetBrains Mono, monospace' }}>
          <AnimatedValue value={results.totalCost} currency={currency} exchangeRate={exchangeRate} />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m, i) => (
          <MetricTile key={i} {...m} currency={currency} exchangeRate={exchangeRate} accentColor={m.color} />
        ))}
      </div>

      {/* Cost Breakdown Chart */}
      {chartData.length > 0 && (
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(22,26,34,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h3 className="text-sm font-medium mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Space Grotesk, sans-serif' }}>
            Desglose de Costos
          </h3>
          <div className="flex items-center gap-4">
            <div style={{ width: 120, height: 120, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={2}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={400}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {chartData.map((item, i) => {
                const pct = results.totalCost > 0 ? (item.value / results.totalCost) * 100 : 0;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Space Grotesk, sans-serif' }}>
                        {item.label}
                      </span>
                      <span className="text-xs font-mono-jb" style={{ color: item.color }}>
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: item.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
