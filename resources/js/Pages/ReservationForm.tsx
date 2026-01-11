import React from 'react';
import { useForm } from '@inertiajs/react';

// Définition de l'interface pour une ressource
interface Resource {
  id: number;
  name: string;
}

interface ReservationFormProps {
  onSuccess: void
  resources: Resource[];
  selectedResourceId?: string | number;
  onHistoryBack: void
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onSuccess, resources = [], selectedResourceId, onHistoryBack }) => {
  // 1. Initialisation du formulaire Inertia
  const { data, setData, post, processing, errors } = useForm({
    resource_id: selectedResourceId || '',
    start_time: '',
    end_time: '',
    justification: '',
  });
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 2. Envoi vers la route store (ex: /reservations)
    post('/user/reservations', {
      onSuccess: () => {
        onSuccess();
      }
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">New Reservation Request</h2>
          <p className="text-sm text-slate-500">Fill out the details below to request compute resources.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Alerte globale pour les conflits de dates */}
          {errors.error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {errors.error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Resource Selection</label>
            <div className="relative">
              <select
                value={data.resource_id}
                onChange={e => setData('resource_id', e.target.value)}
                className="w-full appearance-none px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="">Select a resource...</option>
                {resources.filter(res => res.status === 'available').map(res => (
                  <option key={res.id} value={res.id}>{res.name}</option>
                ))}
              </select>
              {errors.resource_id && <p className="text-red-500 text-xs mt-1">{errors.resource_id}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Start Date & Time</label>
              <input
                type="datetime-local"
                value={data.start_time}
                onChange={e => setData('start_time', e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {errors.start_time && <p className="text-red-500 text-xs mt-1">{errors.start_time}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">End Date & Time</label>
              <input
                type="datetime-local"
                value={data.end_time}
                onChange={e => setData('end_time', e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {errors.end_time && <p className="text-red-500 text-xs mt-1">{errors.end_time}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Justification / Purpose</label>
            <textarea
              rows={4}
              value={data.justification}
              onChange={e => setData('justification', e.target.value)}
              placeholder="e.g. Project X development, Thesis research, etc."
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
            ></textarea>
            {errors.justification && <p className="text-red-500 text-xs mt-1">{errors.justification}</p>}
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={() => onHistoryBack()}
              className="flex-1 px-4 py-3.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform active:scale-[0.98] disabled:opacity-50"
            >
              {processing ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;