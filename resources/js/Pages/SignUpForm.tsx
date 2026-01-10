import React from 'react';
import { useForm } from '@inertiajs/react';

interface SignUpFormProps {
  onSwitch: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitch }) => {
  // Initialisation avec useForm
  const { data, setData, post, processing, errors } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Envoi des données vers la route /register
    post('/register');
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0f172a] mb-2 tracking-tight">Create an account</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">First Name</label>
            <input
              type="text"
              value={data.first_name}
              onChange={e => setData('first_name', e.target.value)}
              placeholder="John"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Last Name</label>
            <input
              type="text"
              value={data.last_name}
              onChange={e => setData('last_name', e.target.value)}
              placeholder="Doe"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
          <input
            type="email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            placeholder="j.doe@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
          <input
            type="password"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          <p className="text-[11px] text-slate-400 px-1 mt-1">Must be at least 8 characters long.</p>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50"
        >
          {processing ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-10 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button onClick={onSwitch} className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all">
          Sign In
        </button>
      </p>
    </div>
  );
};
