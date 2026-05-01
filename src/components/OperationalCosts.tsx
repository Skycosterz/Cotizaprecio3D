import React, { useState } from 'react';
import { Zap, Wrench, Package, Droplets, Thermometer, AlertCircle, Edit2, Check } from 'lucide-react';

interface CostItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  value: number;
  unit: string;
  color: string;
  editable: boolean;
}

export default function OperationalCosts() {
  const [costs, setCosts] = useState<CostItem[]>([
    {
      id: 'cfe_dac',
      icon: <Zap size={18} />,
      label: 'Tarifa CFE DAC',
      description: 'Tarifa doméstica de alto consumo · Hasta 250 kWh',
      value: 0.942,
      unit: '$/kWh',
      color: '#F5A623',
      editable: false,
    },
    {
      id: 'cfe_domestic',
      icon: <Zap size={18} />,
      label: 'Tarifa CFE Básica',
      description: 'Tarifa doméstica básica · Primeros 75 kWh',
      value: 0.793,
      unit: '$/kWh',
      color: '#2D9CDB',
      editable: false,
    },
    {
      id: 'cfe_commercial',
      icon: <Zap size={18} />,
      label: 'Tarifa CFE Comercial',
      description: 'Tarifa comercial PYME · Uso de negocio',
      value: 1.4,
      unit: '$/kWh',
      color: '#00E5FF',
      editable: true,
    },
    {
      id: 'maintenance',
      icon: <Wrench size={18} />,
      label: 'Mantenimiento Mensual',
      description: 'Limpieza, lubricación, calibración general',
      value: 350,
      unit: '$/mes',
      color: '#7B61FF',
      editable: true,
    },
    {
      id: 'nozzle',
      icon: <Package size={18} />,
      label: 'Reemplazo de Boquilla',
      description: 'Boquilla de acero duro · Cada ~500 hrs',
      value: 180,
      unit: '$ c/500hrs',
      color: '#66BB6A',
      editable: true,
    },
    {
      id: 'adhesives',
      icon: <Droplets size={18} />,
      label: 'Adhesivos & Pegamento',
      description: 'Spray, barra adhesiva, alcohol isopropílico',
      value: 120,
      unit: '$/mes',
      color: '#FF6B6B',
      editable: true,
    },
    {
      id: 'lubricants',
      icon: <Droplets size={18} />,
      label: 'Lubricantes',
      description: 'Grasa para guías lineales y husillo',
      value: 80,
      unit: '$/mes',
      color: '#78909C',
      editable: true,
    },
    {
      id: 'drying',
      icon: <Thermometer size={18} />,
      label: 'Secado de Filamento',
      description: 'Costo de energía del secador de filamento',
      value: 45,
      unit: '$/mes',
      color: '#F5A623',
      editable: true,
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (item: CostItem) => {
    if (!item.editable) return;
    setEditingId(item.id);
    setEditValue(item.value.toString());
  };

  const saveEdit = (id: string) => {
    const parsed = parseFloat(editValue);
    if (!isNaN(parsed) && parsed >= 0) {
      setCosts((prev) => prev.map((c) => c.id === id ? { ...c, value: parsed } : c));
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle size={14} style={{ color: 'rgba(255,255,255,0.35)' }} />
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Space Grotesk, sans-serif' }}>
          Los valores editables se integran automáticamente al calculador principal
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {costs.map((item) => (
          <div
            key={item.id}
            className="rounded-xl p-4 glass-card-hover transition-all duration-300"
            style={{
              background: 'rgba(22,26,34,0.85)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${item.color}18` }}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
              </div>
              {item.editable && (
                <button
                  onClick={() => editingId === item.id ? saveEdit(item.id) : startEdit(item)}
                  className="w-6 h-6 rounded flex items-center justify-center transition-colors"
                  style={{
                    background: editingId === item.id ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.05)',
                    color: editingId === item.id ? '#4ADE80' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {editingId === item.id ? <Check size={12} /> : <Edit2 size={11} />}
                </button>
              )}
            </div>

            <div className="mb-1">
              {editingId === item.id ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(item.id)}
                    autoFocus
                    className="w-full rounded px-2 py-1 text-sm outline-none font-mono-jb"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(45,156,219,0.4)',
                      color: item.color,
                    }}
                  />
                </div>
              ) : (
                <div className="font-mono-jb text-lg font-bold" style={{ color: item.color }}>
                  ${item.value}
                  <span className="text-xs font-normal ml-1" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {item.unit}
                  </span>
                </div>
              )}
            </div>

            <div className="text-xs font-medium text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {item.label}
            </div>
            <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Space Grotesk, sans-serif' }}>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
