
import React from 'react';
import { UserRole } from '../types';
import { NAV_ITEMS } from '../constants';
import { Database, LogOut } from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  activeTab: string;
  onTabChange: (id: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, activeTab, onTabChange, onLogout, isLoggedIn }) => {
  const filteredItems = NAV_ITEMS.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 z-40 transition-all">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Database size={24} className="text-white" />
        </div>
        <h1 className="font-bold text-xl tracking-tight">Nexus DC</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="mb-4 px-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Menu</p>
        </div>
        {filteredItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-3 mb-4">
          <p className="text-xs text-slate-500 mb-1">Signed in as</p>
          <p className="text-sm font-semibold truncate capitalize">{currentRole.replace('_', ' ').toLowerCase()}</p>
        </div>
        {isLoggedIn && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
