import React, { useState } from 'react';
import { MATERIALS } from '@/data/materials';
import { ArrowUpDown, Search, Filter } from 'lucide-react';

type SortKey = 'name' | 'pricePerKg' | 'difficulty' | 'resistance';
type UseFilter = 'all' | 'cosplay' | 'functional' | 'flexible';
type DiffFilter = 'all' | 'easy' | 'medium' | 'hard';

export default function MaterialsTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [useFilter, setUseFilter] = useState<UseFilter>('all');
  const [diffFilter, setDiffFilter] = useState<DiffFilter>('all');

  const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
  const resistanceOrder = { baja: 0, media: 1, alta: 2, 'muy alta': 3 };

  const filtered = MATERIALS
    .filter((m) => {
      if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (useFilter !== 'all' && !m.useCase.includes(useFilter as 'cosplay' | 'functional' | 'flexible')) return false;
      if (diffFilter !== 'all' && m.difficulty !== diffFilter) return false;
      return true;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'pricePerKg') cmp = a.pricePerKg - b.pricePerKg;
      else if (sortKey === 'difficulty') cmp = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      else if (sortKey === 'resistance') cmp = resistanceOrder[a.resistance] - resistanceOrder[b.resistance];
      return sortAsc ? cmp : -cmp;
    });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const difficultyColor = { easy: '#4CAF50', medium: '#F5A623', hard: '#FF6B6B' };
  const difficultyLabel = { easy: 'Fácil', medium: 'Medio', hard: 'Difícil' };
  const resistanceColor = { baja: '#78909C', media: '#42A5F5', alta: '#66BB6A', 'muy alta': '#F5A623' };

  const SortButton = ({ label, k }: { label: string; k: SortKey }) => (
    <button
      onClick={() => toggleSort(k)}
      className="flex items-center gap-1 hover:opacity-80 transition-opacity"
      style={{ color: sortKey === k ? '#2D9CDB' : 'rgba(255,255,255,0.5)', fontFamily: 'Space Grotesk, sans-serif' }}
    >
      {label}
      <ArrowUpDown size={11} />
    </button>
  );

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input
            type="text"
            placeholder="Buscar material..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 rounded-lg text-sm outline-none"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              fontFamily: 'Space Grotesk, sans-serif',
              width: '180px',
            }}
          />
        </div>

        {/* Use case filter */}
        <div className="flex items-center gap-1">
          <Filter size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
          {(['all', 'cosplay', 'functional', 'flexible'] as UseFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setUseFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
              style={{
                background: useFilter === f ? 'rgba(45,156,219,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${useFilter === f ? 'rgba(45,156,219,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: useFilter === f ? '#2D9CDB' : 'rgba(255,255,255,0.5)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {f === 'all' ? 'Todos' : f === 'cosplay' ? 'Cosplay' : f === 'functional' ? 'Funcional' : 'Flexible'}
            </button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-1">
          {(['all', 'easy', 'medium', 'hard'] as DiffFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setDiffFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
              style={{
                background: diffFilter === f ? 'rgba(245,166,35,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${diffFilter === f ? 'rgba(245,166,35,0.35)' : 'rgba(255,255,255,0.08)'}`,
                color: diffFilter === f ? '#F5A623' : 'rgba(255,255,255,0.5)',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              {f === 'all' ? 'Dif.' : f === 'easy' ? 'Fácil' : f === 'medium' ? 'Medio' : 'Difícil'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse', fontFamily: 'Space Grotesk, sans-serif' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { label: 'Material', k: 'name' as SortKey },
                { label: 'MXN/kg', k: 'pricePerKg' as SortKey },
                { label: 'Temp.' },
                { label: 'Dificultad', k: 'difficulty' as SortKey },
                { label: 'Resistencia', k: 'resistance' as SortKey },
                { label: 'Uso' },
                { label: 'Humedad' },
              ].map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-medium"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {col.k ? <SortButton label={col.label} k={col.k} /> : col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((mat, i) => (
              <tr
                key={mat.id}
                className="transition-colors duration-150 hover:bg-white/[0.02]"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: mat.color }} />
                    <span className="font-medium text-white">{mat.name}</span>
                  </div>
                  <div className="text-xs mt-0.5 hidden md:block" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {mat.description.slice(0, 40)}...
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono-jb text-sm" style={{ color: '#F5A623' }}>
                    ${mat.pricePerKg}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-mono-jb" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {mat.temperature}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      background: `${difficultyColor[mat.difficulty]}18`,
                      color: difficultyColor[mat.difficulty],
                    }}
                  >
                    {difficultyLabel[mat.difficulty]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      background: `${resistanceColor[mat.resistance]}18`,
                      color: resistanceColor[mat.resistance],
                    }}
                  >
                    {mat.resistance.charAt(0).toUpperCase() + mat.resistance.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {mat.useCase.map((uc) => (
                      <span
                        key={uc}
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{ background: 'rgba(45,156,219,0.1)', color: '#2D9CDB' }}
                      >
                        {uc === 'cosplay' ? 'Cosplay' : uc === 'functional' ? 'Funcional' : 'Flexible'}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs"
                    style={{ color: mat.humiditySensitive ? '#FF6B6B' : '#4CAF50' }}
                  >
                    {mat.humiditySensitive ? '⚠ Sí' : '✓ No'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Space Grotesk, sans-serif' }}>
            No se encontraron materiales con los filtros actuales
          </div>
        )}
      </div>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Space Grotesk, sans-serif' }}>
        * Precios aproximados en México. Pueden variar según proveedor y cantidad.
      </p>
    </div>
  );
}
