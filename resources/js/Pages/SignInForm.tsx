import React from 'react';
import { useForm } from '@inertiajs/react';

interface SignInFormProps {
  onSwitch: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSwitch }) => {
  // 1. Initialisation du formulaire avec Inertia
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 2. Envoi des données à la route POST /login de Laravel
    post('/login');
  };
  

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0f172a] mb-2 tracking-tight">Welcome back</h2>
        <p className="text-slate-500">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
          <input 
            required
            type="email" 
            value={data.email} // Liaison avec l'état
            onChange={e => setData('email', e.target.value)} // Mise à jour de l'état
            placeholder="j.doe@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
          {/* Affichage des erreurs si Laravel en renvoie */}
          {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <input 
            required
            type="password" 
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
          {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
        </div>

        <button 
          type="submit" 
          disabled={processing} // Désactive le bouton pendant l'envoi
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {processing ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <p className="mt-10 text-center text-sm text-slate-500">
        New to Nexus DC?{' '}
        <button onClick={onSwitch} className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all">
          Create an account
        </button>
      </p>
    </div>
  );
};

export default SignInForm;