import React from 'react';
import { X, Calendar, Clock, Tag, FileText, Info } from 'lucide-react';

interface ReservationDetailsModalProps {
    reservation: any;
    onClose: () => void;
}

export const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({ reservation, onClose }) => {
    if (!reservation) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Info size={20} className="text-blue-600" />
                        Reservation Details
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Resource</label>
                        <p className="text-xl font-bold text-slate-900">{reservation.resource.name}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Calendar size={18} /></div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Starts</p>
                                <p className="text-sm font-medium text-slate-700">{formatDate(reservation.start_time)}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><Clock size={18} /></div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Ends</p>
                                <p className="text-sm font-medium text-slate-700">{formatDate(reservation.end_time)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-2 text-slate-600">
                            <FileText size={16} />
                            <span className="text-sm font-bold uppercase tracking-tight text-xs">Justification</span>
                        </div>
                        <p className="text-slate-600 text-sm italic leading-relaxed">
                            "{reservation.justification || "No justification provided."}"
                        </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                            <span className={`text-sm font-bold uppercase ${reservation.status === 'pending' ? 'text-amber-500' : 'text-emerald-500'}`}>
                                ● {reservation.status}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">ID: REF-{reservation.id}</p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};