import type { CalculatorInputs, CalculatorResults } from '@/types/calculator';
import { MATERIALS, FINISH_LEVELS } from '@/data/materials';

export function calculateCosts(inputs: CalculatorInputs): CalculatorResults {
  const material = MATERIALS.find((m) => m.id === inputs.materialId);
  const pricePerKg = inputs.pricePerKgOverride || material?.pricePerKg || 280;
  const finishLevel = FINISH_LEVELS.find((f) => f.id === inputs.finishLevel);
  const laborMultiplier = finishLevel?.multiplier || 1;

  // Material cost
  const materialCost = (inputs.weightGrams / 1000) * pricePerKg;

  // Electricity cost: kWh = (watts * hours) / 1000
  const kWh = (inputs.printerWattage * inputs.printTimeHours) / 1000;
  const electricityCost = kWh * inputs.electricityCostPerKwh;

  // Machine wear per hour
  const machineWear = inputs.machineWearPerHour * inputs.printTimeHours;

  // Labor cost (only post-processing time ≈ 15 min per hour of print for basic, multiplied by finish)
  const baseLabor = (inputs.printTimeHours * 0.25) * inputs.laborHourlyRate * laborMultiplier;
  const laborCost = baseLabor;

  // Extras
  let extrasCost = 0;
  if (inputs.supportsEnabled) {
    extrasCost += materialCost * (inputs.supportsPercent / 100);
  }
  if (inputs.failureEnabled) {
    extrasCost += (materialCost + electricityCost) * (inputs.failurePercent / 100);
  }
  if (inputs.maintenanceEnabled) {
    extrasCost += inputs.maintenancePerHour * inputs.printTimeHours;
  }
  if (inputs.packagingEnabled) {
    extrasCost += inputs.packagingCost;
  }
  if (inputs.shippingEnabled) {
    extrasCost += inputs.shippingCost;
  }

  const totalCost = materialCost + electricityCost + machineWear + laborCost + extrasCost;
  const suggestedPrice = totalCost * (1 + inputs.profitMargin / 100);
  const netProfit = suggestedPrice - totalCost;
  const wholesalePrice = totalCost * 1.15; // 15% markup for wholesale

  const breakdown = [
    { label: 'Material', value: materialCost, color: '#2D9CDB' },
    { label: 'Electricidad', value: electricityCost, color: '#00E5FF' },
    { label: 'Desgaste', value: machineWear, color: '#7B61FF' },
    { label: 'Mano de Obra', value: laborCost, color: '#F5A623' },
    { label: 'Extras', value: extrasCost, color: '#FF6B6B' },
  ].filter((item) => item.value > 0);

  return {
    materialCost,
    electricityCost,
    machineWear,
    laborCost,
    extrasCost,
    totalCost,
    suggestedPrice,
    netProfit,
    wholesalePrice,
    breakdown,
  };
}

export function formatCurrency(amount: number, currency: 'MXN' | 'USD', exchangeRate = 17.5): string {
  if (currency === 'USD') {
    return `$${(amount / exchangeRate).toFixed(2)} USD`;
  }
  return `$${amount.toFixed(2)} MXN`;
}

export function formatCurrencyShort(amount: number, currency: 'MXN' | 'USD', exchangeRate = 17.5): string {
  const val = currency === 'USD' ? amount / exchangeRate : amount;
  if (val >= 1000) {
    return `${currency === 'USD' ? '$' : '$'}${(val / 1000).toFixed(1)}k`;
  }
  return `${currency === 'USD' ? '$' : '$'}${val.toFixed(0)}`;
}
