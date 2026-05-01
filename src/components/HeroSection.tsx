import React from 'react';
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';

interface HeroProps {
  onCTA: () => void;
}

export default function HeroSection({ onCTA }: HeroProps) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0D0F14', paddingTop: '80px' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Mesh gradient */}
      <div className="absolute inset-0 mesh-bg" />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(45,156,219,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-medium"
          style={{
            background: 'rgba(45,156,219,0.1)',
            border: '1px solid rgba(45,156,219,0.25)',
            color: '#2D9CDB',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          <Zap size={12} className="fill-current" />
          Calculadora Profesional para Bambu Lab · México
        </div>

        {/* Headline */}
        <h1
          className="font-syne font-extrabold text-white leading-none mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
        >
          Cotiza tu impresión 3D
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #2D9CDB 0%, #00E5FF 50%, #F5A623 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            con precisión industrial
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Calcula costos reales de materiales, electricidad CFE, desgaste de máquina y mano de obra.
          Genera cotizaciones profesionales en segundos. Diseñado para makers, estudios de cosplay
          y productores de piezas funcionales en México.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={onCTA}
            className="group flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #2D9CDB, #0B7FBF)',
              boxShadow: '0 0 30px rgba(45,156,219,0.4), 0 4px 16px rgba(0,0,0,0.3)',
              border: '1px solid rgba(45,156,219,0.5)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            Calcular Ahora — Es Gratis
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:border-white/20"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            Ver Materiales
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { icon: <Zap size={16} />, value: '10+', label: 'Materiales', color: '#2D9CDB' },
            { icon: <TrendingUp size={16} />, value: 'Real-time', label: 'Cálculo', color: '#F5A623' },
            { icon: <Shield size={16} />, value: 'CFE 2024', label: 'Tarifas', color: '#00E5FF' },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-4 flex flex-col items-center gap-1"
              style={{ borderColor: `${stat.color}22` }}
            >
              <div style={{ color: stat.color }}>{stat.icon}</div>
              <div
                className="font-mono-jb font-medium text-white text-lg"
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0D0F14)' }}
      />
    </section>
  );
}
