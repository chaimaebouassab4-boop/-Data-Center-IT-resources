
import React from 'react';
import { Resource, ResourceStatus, ResourceType, UserRole } from '../types';
import { Server, Cpu, Database, Network, MapPin, ChevronRight, Activity } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  role: UserRole;
  onReserve?: (id: string) => void;
  onManage?: (id: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, role, onReserve, onManage }) => {
  const getIcon = () => {
    switch (resource.type) {
      case ResourceType.SERVER: return <Server size={20} />;
      case ResourceType.VM: return <Cpu size={20} />;
      case ResourceType.STORAGE: return <Database size={20} />;
      case ResourceType.NETWORK: return <Network size={20} />;
    }
  };

  const getStatusColor = () => {
    switch (resource.status) {
      case ResourceStatus.AVAILABLE: return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
      case ResourceStatus.RESERVED: return 'bg-blue-100 text-blue-700 ring-1 ring-blue-200';
      case ResourceStatus.MAINTENANCE: return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
      case ResourceStatus.OFFLINE: return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-slate-50 text-slate-500 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors`}>
              {getIcon()}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{resource.name}</h4>
              <p className="text-xs text-slate-500 font-medium">{resource.type}</p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getStatusColor()}`}>
            {resource.status}
          </span>
        </div>

        <div className="space-y-2.5 mt-4">
          {resource.specs.cpu && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Activity size={14} className="text-slate-400" />
              <span>{resource.specs.cpu}</span>
            </div>
          )}
          {resource.specs.ram && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Cpu size={14} className="text-slate-400" />
              <span>{resource.specs.ram} RAM</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={14} className="text-slate-400" />
            <span>{resource.specs.location}</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        {role === UserRole.GUEST ? (
          <span className="text-xs font-medium text-slate-400 italic">Login to reserve</span>
        ) : (
          <>
            {onReserve && resource.status === ResourceStatus.AVAILABLE && (
              <button 
                onClick={() => onReserve(resource.id)}
                className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all"
              >
                Reserve Now <ChevronRight size={16} />
              </button>
            )}
            {onManage && (role === UserRole.TECH_MANAGER || role === UserRole.ADMIN) && (
              <button 
                onClick={() => onManage(resource.id)}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Manage
              </button>
            )}
            {(resource.status !== ResourceStatus.AVAILABLE && role === UserRole.INTERNAL_USER) && (
              <span className="text-xs font-medium text-slate-400">Not Available</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
