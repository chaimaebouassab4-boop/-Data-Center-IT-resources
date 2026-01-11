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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden p-4">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-500 rounded-full blur-[100px] opacity-30"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .05) 25%, rgba(59, 130, 246, .05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .05) 75%, rgba(59, 130, 246, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .05) 25%, rgba(59, 130, 246, .05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .05) 75%, rgba(59, 130, 246, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 tracking-tight">Welcome back</h2>
              <p className="text-slate-400">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  placeholder="j.doe@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-600/50 bg-slate-800/30 text-white focus:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all placeholder:text-slate-500 hover:border-slate-600 hover:bg-slate-800/40"
                />
                {errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-slate-300">Password</label>
                  <a href="#" className="text-xs font-semibold text-purple-400 hover:text-purple-300 hover:underline transition-colors">Forgot password?</a>
                </div>
                <input 
                  required
                  type="password" 
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-600/50 bg-slate-800/30 text-white focus:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-500 hover:border-slate-600 hover:bg-slate-800/40"
                />
                {errors.password && <div className="text-red-400 text-xs mt-1">{errors.password}</div>}
              </div>

              <button 
                type="submit" 
                disabled={processing}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-500/30 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {processing ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-slate-400">
              New to DataCenterHub?{' '}
              <button onClick={onSwitch} className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 hover:underline transition-all">
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;