import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, DollarSign, Clock, BarChart2 } from 'lucide-react';
import type { Currency } from '@/types/calculator';
import { formatCurrency } from '@/lib/calculator';

interface SimulatorProps {
  suggestedPrice: number;
  totalCost: number;
  currency: Currency;
  exchangeRate: number;
}

export default function AdvancedSimulator({ suggestedPrice, totalCost, currency, exchangeRate }: SimulatorProps) {
  const [unitsPerMonth, setUnitsPerMonth] = useState(30);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [pricePerUnit, setPricePerUnit] = useState(Math.round(suggestedPrice));
  const [costPerUnit, setCostPerUnit] = useState(Math.round(totalCost));

  const projections = useMemo(() => {
    const months = 12;
    const data = [];
    let cumulativeRevenue = 0;
    let cumulativeCost = 0;

    for (let m = 1; m <= months; m++) {
      const revenue = pricePerUnit * unitsPerMonth * m;
      const cost = costPerUnit * unitsPerMonth * m;
      cumulativeRevenue = revenue;
      cumulativeCost = cost;
      data.push({
        month: `Mes ${m}`,
        revenue: Math.round(revenue),
        cost: Math.round(cost),
        profit: Math.round(revenue - cost),
        cumProfit: Math.round(cumulativeRevenue - cumulativeCost),
      });
    }
    return data;
  }, [pricePerUnit, costPerUnit, unitsPerMonth]);

  const monthly = {
    revenue: pricePerUnit * unitsPerMonth,
    cost: costPerUnit * unitsPerMonth,
    profit: (pricePerUnit - costPerUnit) * unitsPerMonth,
  };

  const breakEvenMonths = monthly.profit > 0 ? Math.ceil(50000 / monthly.profit) : null;

  const fmt = (v: number) => formatCurrency(v, currency, exchangeRate);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-3 py-2 rounded-lg text-xs space-y-1"
          style={{ background: '#161A22', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <p className="font-medium text-white mb-1">{label}</p>
          {payload.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>{p.name}:</span>
              <span className="font-mono-jb" style={{ color: p.color }}>${p.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Unidades/mes', value: unitsPerMonth, onChange: setUnitsPerMonth, min: 1, max: 1000, suffix: 'uds', icon: <BarChart2 size={14} /> },
          { label: 'Horas/día', value: hoursPerDay, onChange: setHoursPerDay, min: 1, max: 24, suffix: 'hrs', icon: <Clock size={14} /> },
          { label: 'Precio unitario', value: pricePerUnit, onChange: setPricePerUnit, min: 1, max: 100000, suffix: '$', icon: <DollarSign size={14} /> },
          { label: 'Costo unitario', value: costPerUnit, onChange: setCostPerUnit, min: 1, max: 100000, suffix: '$', icon: <TrendingUp size={14} /> },
        ].map((field, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(22,26,34,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Space Grotesk, sans-serif' }}>
              <span style={{ color: '#2D9CDB' }}>{field.icon}</span>
              {field.label}
            </div>
            <input
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              min={field.min}
              max={field.max}
              className="w-full rounded-lg px-3 py-2 text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#2D9CDB',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            />
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Space Grotesk, sans-serif' }}>{field.suffix}</div>
          </div>
        ))}
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Ingresos Mensuales', value: monthly.revenue, color: '45,156,219' },
          { label: 'Costos Mensuales', value: monthly.cost, color: '255,107,107' },
          { label: 'Ganancia Mensual', value: monthly.profit, color: '74,222,128' },
        ].map((card, i) => (
          <div
            key={i}
            className="rounded-xl p-4 text-center"
            style={{
              background: `rgba(${card.color},0.06)`,
              border: `1px solid rgba(${card.color},0.18)`,
            }}
          >
            <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk, sans-serif' }}>
              {card.label}
            </div>
            <div className="font-mono-jb text-lg font-bold" style={{ color: `rgb(${card.color})` }}>
              {fmt(card.value)}
            </div>
          </div>
        ))}
      </div>

      {/* Break-even */}
      {breakEvenMonths !== null && (
        <div
          className="rounded-xl p-4 flex items-center gap-3"
          style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.15)' }}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245,166,35,0.15)' }}>
            <TrendingUp size={18} style={{ color: '#F5A623' }} />
          </div>
          <div>
            <div className="text-sm font-medium text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Punto de equilibrio estimado
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Space Grotesk, sans-serif' }}>
              Con inversión inicial de $50,000 MXN ≈{' '}
              <span className="font-mono-jb" style={{ color: '#F5A623' }}>{breakEvenMonths} meses</span>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Chart */}
      <div className="rounded-xl p-5" style={{ background: 'rgba(22,26,34,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h4 className="text-sm font-medium mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Space Grotesk, sans-serif' }}>
          Proyección de Ingresos vs Costos (12 meses)
        </h4>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projections}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D9CDB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2D9CDB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Space Grotesk' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'Space Grotesk', color: 'rgba(255,255,255,0.5)', paddingTop: '12px' }} />
              <Area type="monotone" dataKey="revenue" name="Ingresos" stroke="#2D9CDB" strokeWidth={2} fill="url(#revenueGrad)" />
              <Area type="monotone" dataKey="profit" name="Ganancia" stroke="#4ADE80" strokeWidth={2} fill="url(#profitGrad)" />
              <Line type="monotone" dataKey="cost" name="Costos" stroke="#FF6B6B" strokeWidth={1.5} dot={false} strokeDasharray="4 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
