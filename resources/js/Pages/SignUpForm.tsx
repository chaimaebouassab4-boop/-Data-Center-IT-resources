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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden p-4">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500 rounded-full blur-[100px] opacity-30"></div>
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 tracking-tight">Create an account</h2>
              <p className="text-slate-400">Join DataCenterHub and start managing your infrastructure</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-300 ml-1">First Name</label>
                  <input
                    type="text"
                    value={data.first_name}
                    onChange={e => setData('first_name', e.target.value)}
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-xl border border-slate-600/50 bg-slate-800/30 text-white focus:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all placeholder:text-slate-500 hover:border-slate-600 hover:bg-slate-800/40"
                  />
                  {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-300 ml-1">Last Name</label>
                  <input
                    type="text"
                    value={data.last_name}
                    onChange={e => setData('last_name', e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-600/50 bg-slate-800/30 text-white focus:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-500 hover:border-slate-600 hover:bg-slate-800/40"
                  />
                  {errors.last_name && <p className="text-red-400 text-xs mt-1">{errors.last_name}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  placeholder="j.doe@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-600/50 bg-slate-800/30 text-white focus:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all placeholder:text-slate-500 hover:border-slate-600 hover:bg-slate-800/40"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-300 ml-1">Password</label>
                <input
                  type="password"
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-600/50 bg-slate-800/30 text-white focus:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-500 hover:border-slate-600 hover:bg-slate-800/40"
                />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                <p className="text-[11px] text-slate-400 px-1 mt-1">Must be at least 8 characters long.</p>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:opacity-50"
              >
                {processing ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-slate-400">
              Already have an account?{' '}
              <button onClick={onSwitch} className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 hover:underline transition-all">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};