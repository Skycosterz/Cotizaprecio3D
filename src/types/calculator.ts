export type FinishLevel = 'basico' | 'lijado' | 'pintura' | 'premium';
export type Currency = 'MXN' | 'USD';

export interface Material {
  id: string;
  name: string;
  pricePerKg: number; // MXN
  color: string;
  energyProfile: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  temperature: string;
  useCase: ('cosplay' | 'functional' | 'flexible')[];
  resistance: 'baja' | 'media' | 'alta' | 'muy alta';
  humiditySensitive: boolean;
  description: string;
}

export interface CalculatorInputs {
  materialId: string;
  weightGrams: number;
  printTimeHours: number;
  pricePerKgOverride: number;
  finishLevel: FinishLevel;
  laborHourlyRate: number;
  electricityCostPerKwh: number;
  printerWattage: number;
  machineWearPerHour: number;
  profitMargin: number;
  // Extras
  supportsEnabled: boolean;
  supportsPercent: number;
  failureEnabled: boolean;
  failurePercent: number;
  maintenanceEnabled: boolean;
  maintenancePerHour: number;
  packagingEnabled: boolean;
  packagingCost: number;
  shippingEnabled: boolean;
  shippingCost: number;
}

export interface CalculatorResults {
  materialCost: number;
  electricityCost: number;
  machineWear: number;
  laborCost: number;
  extrasCost: number;
  totalCost: number;
  suggestedPrice: number;
  netProfit: number;
  wholesalePrice: number;
  breakdown: {
    label: string;
    value: number;
    color: string;
  }[];
}

export interface SavedQuote {
  id: string;
  name: string;
  inputs: CalculatorInputs;
  results: CalculatorResults;
  createdAt: string;
  currency: Currency;
}

export interface SimulatorInputs {
  unitsPerMonth: number;
  hoursPerDay: number;
  pricePerUnit: number;
  costPerUnit: number;
}
