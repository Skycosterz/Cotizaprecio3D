import React, { useState, useCallback, useRef } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import CalculatorForm from './CalculatorForm';
import ResultsDashboard from './ResultsDashboard';
import MaterialsTable from './MaterialsTable';
import OperationalCosts from './OperationalCosts';
import AdvancedSimulator from './AdvancedSimulator';
import BlogSection from './BlogSection';
import ExportBar from './ExportBar';
import SavedQuotesDrawer from './SavedQuotesDrawer';
import Footer from './Footer';
import Section from './Section';
import { calculateCosts } from '@/lib/calculator';
import { DEFAULT_INPUTS, EXCHANGE_RATE } from '@/data/materials';
import type { CalculatorInputs, Currency, SavedQuote } from '@/types/calculator';

function Home() {
  const [currency, setCurrency] = useState<Currency>('MXN');
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>(() => {
    try {
      const stored = localStorage.getItem('priceforge_quotes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = calculateCosts(inputs);

  const calculatorRef = useRef<HTMLDivElement>(null);
  const materialsRef = useRef<HTMLDivElement>(null);
  const costsRef = useRef<HTMLDivElement>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      calculator: calculatorRef,
      materials: materialsRef,
      costs: costsRef,
      simulator: simulatorRef,
      blog: blogRef,
    };
    const ref = refs[id];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSaveQuote = useCallback((name: string) => {
    const newQuote: SavedQuote = {
      id: Date.now().toString(),
      name,
      inputs,
      results,
      createdAt: new Date().toISOString(),
      currency,
    };
    const updated = [newQuote, ...savedQuotes].slice(0, 20);
    setSavedQuotes(updated);
    try {
      localStorage.setItem('priceforge_quotes', JSON.stringify(updated));
    } catch {}
  }, [inputs, results, savedQuotes, currency]);

  const handleDeleteQuote = useCallback((id: string) => {
    const updated = savedQuotes.filter((q) => q.id !== id);
    setSavedQuotes(updated);
    try {
      localStorage.setItem('priceforge_quotes', JSON.stringify(updated));
    } catch {}
  }, [savedQuotes]);

  const handleLoadQuote = useCallback((quote: SavedQuote) => {
    setInputs(quote.inputs);
    setCurrency(quote.currency);
    scrollToSection('calculator');
  }, []);

  return (
    <div style={{ background: '#0D0F14', minHeight: '100vh', paddingBottom: '80px' }}>
      <Navbar
        currency={currency}
        onCurrencyToggle={() => setCurrency((c) => (c === 'MXN' ? 'USD' : 'MXN'))}
        onNavClick={scrollToSection}
      />

      <HeroSection onCTA={() => scrollToSection('calculator')} />

      {/* Calculator Section */}
      <div ref={calculatorRef}>
        <section id="calculator" className="py-20 px-6" style={{ background: '#0D0F14' }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium"
                style={{
                  background: 'rgba(245,166,35,0.1)',
                  border: '1px solid rgba(245,166,35,0.25)',
                  color: '#F5A623',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                CALCULADORA
              </div>
              <h2 className="font-syne font-bold text-white text-3xl md:text-4xl mb-3" style={{ letterSpacing: '-0.02em' }}>
                Calcula tu cotización
              </h2>
              <p className="text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Space Grotesk, sans-serif' }}>
                Ingresa los parámetros de tu impresión y obtén un desglose detallado en tiempo real.
                Todos los valores se actualizan instantáneamente.
              </p>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Form */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(22,26,34,0.85)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h3 className="font-syne font-semibold text-white text-lg mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center text-xs" style={{ background: 'rgba(245,166,35,0.2)', color: '#F5A623' }}>⚙</span>
                  Parámetros de Impresión
                </h3>
                <CalculatorForm inputs={inputs} onChange={setInputs} />
              </div>

              {/* Right: Results */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(22,26,34,0.85)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h3 className="font-syne font-semibold text-white text-lg mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center text-xs" style={{ background: 'rgba(45,156,219,0.2)', color: '#2D9CDB' }}>📊</span>
                  Resultados en Tiempo Real
                </h3>
                <ResultsDashboard results={results} currency={currency} exchangeRate={EXCHANGE_RATE} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Materials */}
      <div ref={materialsRef}>
        <Section
          id="materials"
          title="Referencia de Materiales"
          subtitle="Tabla completa de materiales con precios actualizados, propiedades técnicas y recomendaciones de uso para impresión 3D en México."
          accentColor="#2D9CDB"
        >
          <MaterialsTable />
        </Section>
      </div>

      {/* Operational Costs */}
      <div ref={costsRef}>
        <Section
          id="costs"
          title="Costos Operacionales"
          subtitle="Referencia de costos fijos y variables para operar impresoras Bambu Lab. Los valores editables se integran al calculador."
          accentColor="#F5A623"
        >
          <OperationalCosts />
        </Section>
      </div>

      {/* Simulator */}
      <div ref={simulatorRef}>
        <Section
          id="simulator"
          title="Simulador de Producción"
          subtitle="Proyecta ingresos, costos y rentabilidad para producción en serie. Calcula tu punto de equilibrio y ROI estimado."
          accentColor="#00E5FF"
        >
          <AdvancedSimulator
            suggestedPrice={results.suggestedPrice}
            totalCost={results.totalCost}
            currency={currency}
            exchangeRate={EXCHANGE_RATE}
          />
        </Section>
      </div>

      {/* Blog */}
      <div ref={blogRef}>
        <Section
          id="blog"
          title="Guías y Recursos"
          subtitle="Artículos especializados para makers y emprendedores de impresión 3D. Estrategia de precios, materiales y operaciones."
          accentColor="#7B61FF"
        >
          <BlogSection />
        </Section>
      </div>

      <Footer />

      {/* Export Bar */}
      <ExportBar
        results={results}
        inputs={inputs}
        currency={currency}
        exchangeRate={EXCHANGE_RATE}
        savedQuotes={savedQuotes}
        onSaveQuote={handleSaveQuote}
        onOpenSaved={() => setDrawerOpen(true)}
      />

      {/* Saved Quotes Drawer */}
      <SavedQuotesDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        quotes={savedQuotes}
        onLoad={handleLoadQuote}
        onDelete={handleDeleteQuote}
        currency={currency}
        exchangeRate={EXCHANGE_RATE}
      />
    </div>
  );
}

export default Home;
