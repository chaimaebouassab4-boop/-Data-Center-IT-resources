import React, { useState, useMemo } from 'react';
import { UserRole } from '../types';
import ResourceCard from '../components/ResourceCard';
import { Search, Filter, Grid, List as ListIcon, Server } from 'lucide-react';

interface CatalogProps {
  role: UserRole;
  resources: any[];
  setActiveTab: (tab: any, isResource?: boolean) => void;
}

const Catalog: React.FC<CatalogProps> = ({ resources, role, setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 1. Extraire la liste unique des catégories pour le menu déroulant
  // On utilise useMemo pour ne pas recalculer à chaque rendu
  const categories = useMemo(() => {
    const names = resources.map(r => r.category?.name).filter(Boolean);
    return Array.from(new Set(names)); // Supprime les doublons
  }, [resources]);

  // 2. Logique de filtrage corrigée
  const filtered = resources.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());

    // CORRECTION ICI : On accède à r.category.name
    const categoryName = r.category?.name || '';
    const matchesType = filterType === 'All' || categoryName === filterType;

    return matchesSearch && matchesType;
  });

  // 3. Transformation pour le composant ResourceCard
  const formatResource = (resource: any) => ({
    id: resource.id,
    name: resource.name,
    type: resource.category?.name || 'Uncategorized',
    status: resource.status,
    specs: resource.specifications,
    managerId: resource.manager_id
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Resource Catalog</h2>
          <p className="text-slate-500">Explore and reserve hardware/software assets.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg border transition-colors ${viewMode === 'grid' ? 'bg-white border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg border transition-colors ${viewMode === 'list' ? 'bg-white border-blue-200 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
          >
            <ListIcon size={18} />
          </button>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-700">Category:</span>
          </div>
          <select
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid / List View */}
      <div className={viewMode === 'grid'
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        : "flex flex-col gap-4"
      }>
        {filtered.length > 0 ? (
          filtered.map(resource => (
            <ResourceCard
              key={resource.id}
              resource={formatResource(resource)}
              role={role}
              onReserve={(id) => {
                setActiveTab(['new-reservation', id], true);
              }}
            />
          ))
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
            <Server size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No resources found matching your criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setFilterType('All'); }}
              className="mt-2 text-blue-600 hover:underline text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;