import logo from '@/Pages/image.png';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
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

      {/* Left Panel: Content / Form */}
      <div className="flex flex-col flex-1 px-6 py-12 lg:px-24 relative z-10">
        <div className="flex items-center justify-between">
          <div className="relative p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg">
  <img
    src={logo}
    alt="DataCenterHub Logo"
    className="w-10 h-10 object-contain"
  />
</div>

        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            {children}
          </div>
        </div>

        <div className="mt-8 text-sm text-slate-400">
          © {new Date().getFullYear()} DataCenterHub. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Hero / Marketing (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-center px-16 z-10">
        <div className="relative z-20 space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase">
            New Platform v2.0
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight">
            The next generation of <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Data Center</span> management.
          </h1>

          <p className="text-slate-300 text-lg max-w-lg leading-relaxed">
            Manage your resources, bookings, and incident reports with our centralized dashboard. Professional-grade infrastructure at your fingertips.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-700/50">
            <div className="group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">99.9%</div>
              <div className="text-slate-400 text-sm">Uptime Guarantee</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">1.2k+</div>
              <div className="text-slate-400 text-sm">Active Users</div>
            </div>
          </div>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="absolute bottom-10 left-16 right-16 flex justify-between items-center opacity-60 z-20">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <div className="w-2 h-2 rounded-full bg-slate-600"></div>
            <div className="w-2 h-2 rounded-full bg-slate-600"></div>
          </div>
          <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">Trusted by Enterprise</div>
        </div>
      </div>
    </div>
  );
};