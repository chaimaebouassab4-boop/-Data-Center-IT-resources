
import React, { useState } from 'react';
import { ResourceType, UserRole, ResourceStatus } from '../types';
import { MOCK_RESOURCES } from '../constants';
import ResourceCard from '../components/ResourceCard';
// Added Server to imports from lucide-react
import { Search, Filter, Grid, List as ListIcon, Server } from 'lucide-react';

interface CatalogProps {
  role: UserRole;
}

const Catalog: React.FC<CatalogProps> = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = MOCK_RESOURCES.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || r.type === filterType;
    return matchesSearch && matchesType;
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
            placeholder="Search by name, location, or manager..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-700">Type:</span>
          </div>
          <select 
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Categories</option>
            {Object.values(ResourceType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "flex flex-col gap-4"
      }>
        {filtered.length > 0 ? (
          filtered.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              role={role} 
              onReserve={(id) => alert(`Reserve action triggered for ${id}`)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400">
            <Server size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">No resources found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
