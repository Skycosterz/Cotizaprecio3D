import React from 'react';
import { Github, Twitter, Instagram, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 mt-24"
      style={{ background: '#0A0C10', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2D9CDB, #00E5FF)' }}
              >
                <span className="text-sm font-bold text-black">3D</span>
              </div>
              <span className="font-syne font-bold text-white text-xl">
                3D <span style={{ color: '#2D9CDB' }}>PriceForge</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk, sans-serif' }}>
              La calculadora de precios más precisa para makers de impresión 3D en México.
              Toma el control de tu negocio con datos reales.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: <Twitter size={15} />, href: '#' },
                { icon: <Instagram size={15} />, href: '#' },
                { icon: <Github size={15} />, href: '#' },
                { icon: <Mail size={15} />, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:opacity-80"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2D9CDB', fontFamily: 'Space Grotesk, sans-serif' }}>
              Herramientas
            </h4>
            <ul className="space-y-2.5">
              {['Calculadora', 'Materiales', 'Simulador', 'Costos CFE', 'Exportar PDF'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-150 hover:text-white flex items-center gap-1.5"
                    style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#F5A623', fontFamily: 'Space Grotesk, sans-serif' }}>
              Recursos
            </h4>
            <ul className="space-y-2.5">
              {['Blog de Makers', 'Guía de Precios', 'Tarifas CFE 2024', 'Materiales Guide', 'Contacto'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-150 hover:text-white flex items-center gap-1.5"
                    style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {item}
                    <ExternalLink size={10} style={{ opacity: 0.4 }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Space Grotesk, sans-serif' }}>
            © 2024 3D PriceForge · Hecho con ❤️ para makers en México
          </p>
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Todos los datos se procesan localmente · Sin rastreo
          </p>
        </div>
      </div>
    </footer>
  );
}
