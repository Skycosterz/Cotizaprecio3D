import React from 'react';
import { X, Trash2, RotateCcw, BookmarkX, Clock } from 'lucide-react';
import type { SavedQuote, Currency } from '@/types/calculator';
import { formatCurrency } from '@/lib/calculator';
import { MATERIALS } from '@/data/materials';

interface SavedQuotesDrawerProps {
  open: boolean;
  onClose: () => void;
  quotes: SavedQuote[];
  onLoad: (quote: SavedQuote) => void;
  onDelete: (id: string) => void;
  currency: Currency;
  exchangeRate: number;
}

export default function SavedQuotesDrawer({
  open,
  onClose,
  quotes,
  onLoad,
  onDelete,
  currency,
  exchangeRate,
}: SavedQuotesDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-sm h-full overflow-y-auto flex flex-col"
        style={{ background: '#0F1117', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 sticky top-0 z-10"
          style={{ background: 'rgba(15,17,23,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
        >
          <div>
            <h3 className="font-syne font-bold text-white">Cotizaciones Guardadas</h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Space Grotesk, sans-serif' }}>
              {quotes.length} guardadas en este dispositivo
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.4)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Quote list */}
        <div className="flex-1 p-4 space-y-3">
          {quotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <BookmarkX size={36} style={{ color: 'rgba(255,255,255,0.15)' }} className="mb-3" />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Grotesk, sans-serif' }}>
                No hay cotizaciones guardadas aún
              </p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Space Grotesk, sans-serif' }}>
                Guarda una cotización desde el calculador
              </p>
            </div>
          ) : (
            quotes.map((quote) => {
              const mat = MATERIALS.find((m) => m.id === quote.inputs.materialId);
              return (
                <div
                  key={quote.id}
                  className="rounded-xl p-4 glass-card-hover transition-all duration-200"
                  style={{ background: 'rgba(22,26,34,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {quote.name}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Grotesk, sans-serif' }}>
                        <Clock size={10} />
                        {new Date(quote.createdAt).toLocaleDateString('es-MX')}
                      </div>
                    </div>
                    <button
                      onClick={() => onDelete(quote.id)}
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded transition-colors hover:text-red-400"
                      style={{ color: 'rgba(255,255,255,0.25)' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <div className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Space Grotesk, sans-serif' }}>Material</div>
                      <div className="text-xs font-medium text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{mat?.name || quote.inputs.materialId}</div>
                    </div>
                    <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(245,166,35,0.06)' }}>
                      <div className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Space Grotesk, sans-serif' }}>Precio</div>
                      <div className="text-xs font-mono-jb font-bold" style={{ color: '#F5A623' }}>
                        {formatCurrency(quote.results.suggestedPrice, currency, exchangeRate)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { onLoad(quote); onClose(); }}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:opacity-80"
                    style={{
                      background: 'rgba(45,156,219,0.12)',
                      border: '1px solid rgba(45,156,219,0.25)',
                      color: '#2D9CDB',
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}
                  >
                    <RotateCcw size={12} />
                    Cargar Cotización
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
