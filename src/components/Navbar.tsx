import React, { useState } from 'react';
import { Menu, X, DollarSign, ChevronDown } from 'lucide-react';
import type { Currency } from '@/types/calculator';

interface NavbarProps {
  currency: Currency;
  onCurrencyToggle: () => void;
  onNavClick: (section: string) => void;
}

export default function Navbar({ currency, onCurrencyToggle, onNavClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Calculadora', id: 'calculator' },
    { label: 'Materiales', id: 'materials' },
    { label: 'Costos', id: 'costs' },
    { label: 'Simulador', id: 'simulator' },
    { label: 'Blog', id: 'blog' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]"
      style={{ background: 'rgba(13, 15, 20, 0.92)', backdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2D9CDB, #00E5FF)' }}>
            <span className="text-xs font-bold text-black">3D</span>
          </div>
          <span className="font-syne font-bold text-white text-lg tracking-tight">
            3D <span style={{ color: '#2D9CDB' }}>PriceForge</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavClick(link.id)}
              className="text-sm font-medium transition-colors duration-200 hover:text-[#2D9CDB]"
              style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Currency Toggle */}
          <button
            onClick={onCurrencyToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: 'rgba(45,156,219,0.1)',
              border: '1px solid rgba(45,156,219,0.25)',
              color: '#2D9CDB',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <DollarSign size={13} />
            {currency}
            <ChevronDown size={12} />
          </button>

          {/* CTA */}
          <button
            onClick={() => onNavClick('calculator')}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #2D9CDB, #0B7FBF)',
              boxShadow: '0 0 20px rgba(45,156,219,0.35)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            Cotizar Ahora
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/70"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] py-4 px-6 space-y-3" style={{ background: 'rgba(13,15,20,0.98)' }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { onNavClick(link.id); setMobileOpen(false); }}
              className="block w-full text-left text-sm py-2 transition-colors hover:text-[#2D9CDB]"
              style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onCurrencyToggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ background: 'rgba(45,156,219,0.1)', border: '1px solid rgba(45,156,219,0.25)', color: '#2D9CDB' }}
            >
              <DollarSign size={13} /> {currency}
            </button>
            <button
              onClick={() => { onNavClick('calculator'); setMobileOpen(false); }}
              className="flex-1 py-2 rounded-lg text-sm font-semibold text-white text-center"
              style={{ background: 'linear-gradient(135deg, #2D9CDB, #0B7FBF)' }}
            >
              Cotizar Ahora
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
