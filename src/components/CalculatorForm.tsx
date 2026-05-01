import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Settings2,
  Package,
  Clock,
  Weight,
  Zap,
  Percent,
  Box,
  Truck,
  Wrench,
  AlertCircle,
} from 'lucide-react';
import type { CalculatorInputs } from '@/types/calculator';
import { MATERIALS, FINISH_LEVELS } from '@/data/materials';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
}

function InputField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  icon,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        className="text-xs font-medium flex items-center gap-1.5"
        style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Space Grotesk, sans-serif' }}
      >
        {icon && <span style={{ color: '#2D9CDB' }}>{icon}</span>}
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step || 1}
          className="w-full rounded-lg px-3 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-1"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '13px',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(45,156,219,0.5)';
            e.target.style.boxShadow = '0 0 0 2px rgba(45,156,219,0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.1)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {suffix && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
            style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ExtraToggle({
  enabled,
  onToggle,
  label,
  icon,
  children,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="rounded-lg p-3 transition-all duration-200"
      style={{
        background: enabled ? 'rgba(45,156,219,0.08)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${enabled ? 'rgba(45,156,219,0.25)' : 'rgba(255,255,255,0.06)'}`,
      }}
    >
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200 flex-shrink-0"
          style={{
            background: enabled ? '#2D9CDB' : 'rgba(255,255,255,0.1)',
            border: `1px solid ${enabled ? '#2D9CDB' : 'rgba(255,255,255,0.2)'}`,
          }}
          onClick={onToggle}
        >
          {enabled && <span className="text-white text-xs font-bold">✓</span>}
        </div>
        <span className="flex items-center gap-2 text-sm flex-1" style={{ color: enabled ? 'white' : 'rgba(255,255,255,0.55)', fontFamily: 'Space Grotesk, sans-serif' }}>
          <span style={{ color: enabled ? '#2D9CDB' : 'rgba(255,255,255,0.3)' }}>{icon}</span>
          {label}
        </span>
      </label>
      {enabled && children && (
        <div className="mt-3 pl-7">
          {children}
        </div>
      )}
    </div>
  );
}

export default function CalculatorForm({ inputs, onChange }: CalculatorFormProps) {
  const [extrasOpen, setExtrasOpen] = useState(false);
  const selectedMaterial = MATERIALS.find((m) => m.id === inputs.materialId);

  const update = useCallback(
    (field: keyof CalculatorInputs, value: unknown) => {
      onChange({ ...inputs, [field]: value });
    },
    [inputs, onChange]
  );

  // Auto-populate price when material changes
  useEffect(() => {
    const mat = MATERIALS.find((m) => m.id === inputs.materialId);
    if (mat) {
      onChange({ ...inputs, pricePerKgOverride: mat.pricePerKg });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.materialId]);

  const difficultyColor = {
    easy: '#4CAF50',
    medium: '#F5A623',
    hard: '#FF6B6B',
  };

  const energyLabel = {
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
  };

  return (
    <div className="space-y-6">
      {/* Material Selector */}
      <div className="space-y-2">
        <label
          className="text-xs font-medium flex items-center gap-1.5"
          style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <Package size={13} style={{ color: '#2D9CDB' }} />
          Material
        </label>
        <div className="relative">
          <select
            value={inputs.materialId}
            onChange={(e) => update('materialId', e.target.value)}
            className="w-full rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer outline-none"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            {MATERIALS.map((m) => (
              <option key={m.id} value={m.id} style={{ background: '#161A22', color: 'white' }}>
                {m.name} — ${m.pricePerKg}/kg
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.4)' }} />
        </div>

        {/* Material badges */}
        {selectedMaterial && (
          <div className="flex flex-wrap gap-2 pt-1">
            <span
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ background: `${difficultyColor[selectedMaterial.difficulty]}22`, color: difficultyColor[selectedMaterial.difficulty], fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {selectedMaterial.difficulty === 'easy' ? 'Fácil' : selectedMaterial.difficulty === 'medium' ? 'Medio' : 'Difícil'}
            </span>
            <span
              className="px-2 py-0.5 rounded text-xs"
              style={{ background: 'rgba(45,156,219,0.1)', color: '#2D9CDB', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Consumo: {energyLabel[selectedMaterial.energyProfile]}
            </span>
            <span
              className="px-2 py-0.5 rounded text-xs"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {selectedMaterial.temperature}
            </span>
          </div>
        )}
      </div>

      {/* Main inputs grid */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Peso del modelo"
          value={inputs.weightGrams}
          onChange={(v) => update('weightGrams', v)}
          min={1}
          max={5000}
          step={10}
          suffix="g"
          icon={<Weight size={12} />}
        />
        <InputField
          label="Tiempo de impresión"
          value={inputs.printTimeHours}
          onChange={(v) => update('printTimeHours', v)}
          min={0.1}
          max={200}
          step={0.5}
          suffix="hrs"
          icon={<Clock size={12} />}
        />
        <InputField
          label="Precio material"
          value={inputs.pricePerKgOverride}
          onChange={(v) => update('pricePerKgOverride', v)}
          min={50}
          max={5000}
          step={10}
          suffix="$/kg"
          icon={<Package size={12} />}
        />
        <InputField
          label="Potencia impresora"
          value={inputs.printerWattage}
          onChange={(v) => update('printerWattage', v)}
          min={50}
          max={2000}
          step={10}
          suffix="W"
          icon={<Zap size={12} />}
        />
      </div>

      {/* Finish Level */}
      <div className="space-y-2">
        <label
          className="text-xs font-medium"
          style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Nivel de Acabado
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FINISH_LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => update('finishLevel', level.id)}
              className="px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 text-left"
              style={{
                background: inputs.finishLevel === level.id ? 'rgba(245,166,35,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${inputs.finishLevel === level.id ? 'rgba(245,166,35,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: inputs.finishLevel === level.id ? '#F5A623' : 'rgba(255,255,255,0.55)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              <div className="font-semibold">{level.label}</div>
              <div className="text-xs mt-0.5 opacity-70">×{level.multiplier}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <InputField
            label="Tarifa CFE"
            value={inputs.electricityCostPerKwh}
            onChange={(v) => update('electricityCostPerKwh', v)}
            min={0.5}
            max={10}
            step={0.1}
            suffix="$/kWh"
          />
          <InputField
            label="Desgaste/hr"
            value={inputs.machineWearPerHour}
            onChange={(v) => update('machineWearPerHour', v)}
            min={1}
            max={50}
            step={0.5}
            suffix="$/hr"
          />
          <InputField
            label="Margen (%)"
            value={inputs.profitMargin}
            onChange={(v) => update('profitMargin', v)}
            min={0}
            max={500}
            step={5}
            suffix="%"
            icon={<Percent size={12} />}
          />
        </div>
        <InputField
          label="Costo de mano de obra"
          value={inputs.laborHourlyRate}
          onChange={(v) => update('laborHourlyRate', v)}
          min={10}
          max={1000}
          step={10}
          suffix="$/hr"
        />
      </div>

      {/* Extras Panel */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <button
          onClick={() => setExtrasOpen(!extrasOpen)}
          className="w-full flex items-center justify-between px-4 py-3 transition-colors duration-200"
          style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.7)', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <Settings2 size={14} style={{ color: '#F5A623' }} />
            Extras y Ajustes
          </div>
          {extrasOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {extrasOpen && (
          <div className="p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.01)' }}>
            <ExtraToggle
              enabled={inputs.supportsEnabled}
              onToggle={() => update('supportsEnabled', !inputs.supportsEnabled)}
              label="Soportes de impresión"
              icon={<AlertCircle size={13} />}
            >
              <InputField
                label="% de material extra"
                value={inputs.supportsPercent}
                onChange={(v) => update('supportsPercent', v)}
                min={5}
                max={80}
                step={5}
                suffix="%"
              />
            </ExtraToggle>

            <ExtraToggle
              enabled={inputs.failureEnabled}
              onToggle={() => update('failureEnabled', !inputs.failureEnabled)}
              label="Tasa de fallos"
              icon={<AlertCircle size={13} />}
            >
              <InputField
                label="% de probabilidad de fallo"
                value={inputs.failurePercent}
                onChange={(v) => update('failurePercent', v)}
                min={1}
                max={50}
                step={1}
                suffix="%"
              />
            </ExtraToggle>

            <ExtraToggle
              enabled={inputs.maintenanceEnabled}
              onToggle={() => update('maintenanceEnabled', !inputs.maintenanceEnabled)}
              label="Mantenimiento"
              icon={<Wrench size={13} />}
            >
              <InputField
                label="Costo por hora"
                value={inputs.maintenancePerHour}
                onChange={(v) => update('maintenancePerHour', v)}
                min={1}
                max={50}
                step={0.5}
                suffix="$/hr"
              />
            </ExtraToggle>

            <ExtraToggle
              enabled={inputs.packagingEnabled}
              onToggle={() => update('packagingEnabled', !inputs.packagingEnabled)}
              label="Empaquetado"
              icon={<Box size={13} />}
            >
              <InputField
                label="Costo fijo de empaque"
                value={inputs.packagingCost}
                onChange={(v) => update('packagingCost', v)}
                min={5}
                max={500}
                step={5}
                suffix="$"
              />
            </ExtraToggle>

            <ExtraToggle
              enabled={inputs.shippingEnabled}
              onToggle={() => update('shippingEnabled', !inputs.shippingEnabled)}
              label="Envío"
              icon={<Truck size={13} />}
            >
              <InputField
                label="Costo de envío"
                value={inputs.shippingCost}
                onChange={(v) => update('shippingCost', v)}
                min={0}
                max={2000}
                step={10}
                suffix="$"
              />
            </ExtraToggle>
          </div>
        )}
      </div>
    </div>
  );
}
