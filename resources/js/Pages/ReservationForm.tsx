
import React from 'react';

interface ReservationFormProps {
  onSuccess: () => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onSuccess }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  const resources = [
    "Dell PowerEdge R740 (Server)",
    "NVIDIA DGX A100 (AI Lab)",
    "Quantum Processor V1 (Lab)",
    "Storage Array 500TB"
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">New Reservation Request</h2>
          <p className="text-sm text-slate-500">Fill out the details below to request compute resources.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Resource Selection</label>
            <div className="relative">
              <select className="w-full appearance-none px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                {resources.map(res => <option key={res}>{res}</option>)}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Start Date & Time</label>
              <input 
                type="datetime-local" 
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">End Date & Time</label>
              <input 
                type="datetime-local" 
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Justification / Purpose</label>
            <textarea 
              rows={4}
              placeholder="e.g. Project X development, Thesis research, etc."
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
            ></textarea>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button"
              className="flex-1 px-4 py-3.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform active:scale-[0.98]"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
