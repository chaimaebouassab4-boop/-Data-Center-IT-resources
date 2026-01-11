import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { ReservationDetailsModal } from '../Components/ReservationDetailsModal';

interface Reservation {
  id: number;
  status: string;
  start_time: string;
  end_time: string;
  justification?: string;
  resource: {
    name: string;
  };
}

interface ReservationHistoryProps {
  onNew: () => void;
  reservations: Reservation[] | { data: Reservation[] };
}

export const ReservationHistory: React.FC<ReservationHistoryProps> = ({ reservations, onNew }) => {
  const [filter, setFilter] = useState('All Statuses');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  // Extraction des données (gestion de la pagination Laravel)
  const dataList = Array.isArray(reservations) ? reservations : (reservations?.data || []);

  // Formatage des dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short', day: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  // --- ACTIONS ---

  const handleCancel = (id: number) => {
    if (confirm("Are you sure you want to cancel this reservation request?")) {
      router.delete(`/user/reservations/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          router.reload({ only: ['reservations'] });
        },
      });
    }
  };

  // --- LOGIQUE DE FILTRAGE COMBINÉE ---
  const filteredHistory = dataList.filter(item => {
    const matchesSearch = item.resource.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === 'All Statuses' ||
      item.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // --- STYLES DYNAMIQUES ---
  const getStatusStyles = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'cancelled': return 'bg-slate-100 text-slate-500 border-slate-200 italic';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Reservations</h1>
          <p className="text-slate-500">Track and manage your resource allocation history.</p>
        </div>
        <button
          onClick={onNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          New Reservation
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Barre de Recherche et Filtres */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/30 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search resource..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none bg-white"
            />
            <div className="absolute inset-y-0 left-3.5 flex items-center text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Tableau de données */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Resource</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{row.resource.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono italic">REF-{row.id.toString().padStart(5, '0')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 font-medium">{formatDate(row.start_time)}</div>
                      <div className="text-xs text-slate-400">to {formatDate(row.end_time)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border capitalize ${getStatusStyles(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Bouton Voir */}
                        <button
                          onClick={() => setSelectedReservation(row)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="View details"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>

                        {/* Bouton Annuler (Uniquement si en attente) */}
                        {row.status.toLowerCase() === 'pending' && (
                          <button
                            onClick={() => handleCancel(row.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            title="Cancel request"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic bg-slate-50/20">
                    No reservations found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer simple */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200">
          <p className="text-sm text-slate-500 font-medium">
            Showing {filteredHistory.length} of {dataList.length} total entries
          </p>
        </div>
      </div>

      {/* Modale de Détails */}
      {selectedReservation && (
        <ReservationDetailsModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
};