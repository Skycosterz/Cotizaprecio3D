import React, { useState } from 'react';
import { FileText, MessageCircle, BookmarkPlus, X, Bookmark } from 'lucide-react';
import type { CalculatorResults, Currency, SavedQuote } from '@/types/calculator';
import type { CalculatorInputs } from '@/types/calculator';
import { formatCurrency } from '@/lib/calculator';
import { MATERIALS } from '@/data/materials';

interface ExportBarProps {
  results: CalculatorResults;
  inputs: CalculatorInputs;
  currency: Currency;
  exchangeRate: number;
  savedQuotes: SavedQuote[];
  onSaveQuote: (name: string) => void;
  onOpenSaved: () => void;
}

export default function ExportBar({
  results,
  inputs,
  currency,
  exchangeRate,
  savedQuotes,
  onSaveQuote,
  onOpenSaved,
}: ExportBarProps) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [quoteName, setQuoteName] = useState('');

  const material = MATERIALS.find((m) => m.id === inputs.materialId);
  const fmt = (v: number) => formatCurrency(v, currency, exchangeRate);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `🖨️ *Cotización 3D PriceForge*\n\n` +
      `📦 Material: ${material?.name || inputs.materialId}\n` +
      `⚖️ Peso: ${inputs.weightGrams}g\n` +
      `⏱ Tiempo: ${inputs.printTimeHours}hrs\n\n` +
      `💰 *Desglose de costos:*\n` +
      `• Material: ${fmt(results.materialCost)}\n` +
      `• Electricidad: ${fmt(results.electricityCost)}\n` +
      `• Desgaste: ${fmt(results.machineWear)}\n` +
      `• Mano de obra: ${fmt(results.laborCost)}\n\n` +
      `🏷️ *Precio sugerido: ${fmt(results.suggestedPrice)}*\n` +
      `📈 Ganancia neta: ${fmt(results.netProfit)}\n\n` +
      `_Cotización generada con 3D PriceForge_`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const handleExportPDF = () => {
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Cotización 3D PriceForge</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; color: #1a1a2e; }
          .header { background: linear-gradient(135deg, #0D0F14, #161A22); color: white; padding: 32px; border-radius: 12px; margin-bottom: 32px; }
          .title { font-size: 28px; font-weight: 800; margin: 0 0 4px; }
          .subtitle { color: rgba(255,255,255,0.6); font-size: 14px; }
          .section { margin-bottom: 24px; }
          .section-title { font-size: 14px; font-weight: 700; color: #2D9CDB; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
          .card { background: #f8f9fa; padding: 16px; border-radius: 8px; border: 1px solid #e9ecef; }
          .card-label { font-size: 12px; color: #6c757d; margin-bottom: 4px; }
          .card-value { font-size: 18px; font-weight: 700; color: #1a1a2e; font-family: monospace; }
          .highlight { background: #e8f4fd; border-color: #2D9CDB; }
          .highlight .card-value { color: #2D9CDB; }
          .profit { background: #e8f8ee; border-color: #4ADE80; }
          .profit .card-value { color: #16a34a; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">3D PriceForge</div>
          <div class="subtitle">Cotización Profesional · ${new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        
        <div class="section">
          <div class="section-title">Detalles del Proyecto</div>
          <div class="grid">
            <div class="card"><div class="card-label">Material</div><div class="card-value">${material?.name || inputs.materialId}</div></div>
            <div class="card"><div class="card-label">Peso del Modelo</div><div class="card-value">${inputs.weightGrams} g</div></div>
            <div class="card"><div class="card-label">Tiempo de Impresión</div><div class="card-value">${inputs.printTimeHours} hrs</div></div>
            <div class="card"><div class="card-label">Nivel de Acabado</div><div class="card-value">${inputs.finishLevel}</div></div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Desglose de Costos</div>
          <div class="grid">
            <div class="card"><div class="card-label">Material</div><div class="card-value">${fmt(results.materialCost)}</div></div>
            <div class="card"><div class="card-label">Electricidad CFE</div><div class="card-value">${fmt(results.electricityCost)}</div></div>
            <div class="card"><div class="card-label">Desgaste de Máquina</div><div class="card-value">${fmt(results.machineWear)}</div></div>
            <div class="card"><div class="card-label">Mano de Obra</div><div class="card-value">${fmt(results.laborCost)}</div></div>
            ${results.extrasCost > 0 ? `<div class="card"><div class="card-label">Extras</div><div class="card-value">${fmt(results.extrasCost)}</div></div>` : ''}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Resumen de Precios</div>
          <div class="grid">
            <div class="card highlight"><div class="card-label">Precio Sugerido</div><div class="card-value">${fmt(results.suggestedPrice)}</div></div>
            <div class="card profit"><div class="card-label">Ganancia Neta</div><div class="card-value">${fmt(results.netProfit)}</div></div>
            <div class="card"><div class="card-label">Precio Mayoreo</div><div class="card-value">${fmt(results.wholesalePrice)}</div></div>
            <div class="card"><div class="card-label">Costo Total</div><div class="card-value">${fmt(results.totalCost)}</div></div>
          </div>
        </div>

        <div class="footer">
          Cotización generada con 3D PriceForge · priceforge.mx · ${currency === 'USD' ? 'Valores en USD (TC: $${exchangeRate})' : 'Valores en MXN'}
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    if (w) {
      w.onload = () => {
        w.print();
        URL.revokeObjectURL(url);
      };
    }
  };

  const handleSave = () => {
    if (quoteName.trim()) {
      onSaveQuote(quoteName.trim());
      setQuoteName('');
      setShowSaveModal(false);
    }
  };

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
        style={{ background: 'rgba(13,15,20,0.97)', borderTop: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'rgba(255,255,255,0.45)' }}>
              Precio sugerido:
            </div>
            <div className="font-mono-jb font-bold text-lg" style={{ color: '#F5A623' }}>
              {fmt(results.suggestedPrice)}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenSaved}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              <Bookmark size={14} />
              Guardadas ({savedQuotes.length})
            </button>

            <button
              onClick={() => setShowSaveModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80"
              style={{
                background: 'rgba(123,97,255,0.15)',
                border: '1px solid rgba(123,97,255,0.3)',
                color: '#7B61FF',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              <BookmarkPlus size={14} />
              Guardar
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80"
              style={{
                background: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.3)',
                color: '#25D366',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              <MessageCircle size={14} />
              WhatsApp
            </button>

            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #2D9CDB, #0B7FBF)',
                boxShadow: '0 0 16px rgba(45,156,219,0.3)',
                color: 'white',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              <FileText size={14} />
              Exportar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowSaveModal(false)}
          />
          <div
            className="relative w-full max-w-md rounded-2xl p-6 z-10"
            style={{ background: '#161A22', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <button
              onClick={() => setShowSaveModal(false)}
              className="absolute top-4 right-4"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              <X size={16} />
            </button>
            <h3 className="font-syne font-bold text-white text-lg mb-1">Guardar Cotización</h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Space Grotesk, sans-serif' }}>
              Dale un nombre para identificarla fácilmente
            </p>
            <input
              type="text"
              value={quoteName}
              onChange={(e) => setQuoteName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder={`Cotización ${material?.name} ${new Date().toLocaleDateString('es-MX')}`}
              autoFocus
              className="w-full rounded-xl px-4 py-3 text-sm mb-4 outline-none"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(45,156,219,0.3)',
                color: 'white',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #2D9CDB, #0B7FBF)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
