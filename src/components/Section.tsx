import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
  children: React.ReactNode;
}

export default function Section({ id, title, subtitle, accentColor = '#2D9CDB', children }: SectionProps) {
  const { ref, visible } = useScrollAnimation();

  return (
    <section id={id} className="py-20 px-6" style={{ background: '#0D0F14' }}>
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          {/* Section header */}
          <div className="mb-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium"
              style={{
                background: `${accentColor}12`,
                border: `1px solid ${accentColor}30`,
                color: accentColor,
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
              {id.toUpperCase()}
            </div>
            <h2
              className="font-syne font-bold text-white text-3xl md:text-4xl mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="text-base max-w-2xl"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}
