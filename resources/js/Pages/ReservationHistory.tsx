
import React, { useState } from 'react';

interface ReservationHistoryProps {
  onNew: () => void;
}

export const ReservationHistory: React.FC<ReservationHistoryProps> = ({ onNew }) => {
  const [filter, setFilter] = useState('All');

  const history = [
    { id: 1, resource: "NVIDIA DGX A100 (AI Lab)", from: "Jan 14, 2026 20:42", to: "Jan 16, 2026 20:42", status: "Approved" },
    { id: 2, resource: "NVIDIA DGX A100 (AI Lab)", from: "Jan 07, 2026 20:42", to: "Jan 08, 2026 20:42", status: "Rejected" },
    { id: 3, resource: "Dell PowerEdge R740", from: "Dec 30, 2025 20:42", to: "Jan 01, 2026 20:42", status: "Completed" },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'Completed': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Reservations</h1>
          <p className="text-slate-500">Track and manage your resource allocation history.</p>
        </div>
        <button 
          onClick={onNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          New Reservation
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/30 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <input 
              type="text" 
              placeholder="Search resource..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none text-sm font-semibold text-slate-600"
          >
            <option>All Statuses</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Resource</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">From</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">To</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{row.resource}</div>
                    <div className="text-xs text-slate-400">ID: #{row.id}1092</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{row.from}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{row.to}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-sm text-slate-500 font-medium">Showing 3 of 12 requests</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold text-slate-400 cursor-not-allowed">Prev</button>
            <button className="px-3 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
