
import { Database } from 'lucide-react';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Panel: Content / Form */}
      <div className="flex flex-col flex-1 px-6 py-12 lg:px-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Database size={24} className="text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">Nexus DC</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        <div className="mt-8 text-sm text-slate-500">
          © {new Date().getFullYear()} Nexus DC. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Hero / Marketing (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] relative overflow-hidden flex-col justify-center px-16">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            New Platform v2.0
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight">
            The next generation of <span className="text-blue-500">Data Center</span> management.
          </h1>

          <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
            Manage your resources, bookings, and incident reports with our centralized dashboard. Professional-grade infrastructure at your fingertips.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-800">
            <div>
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-slate-500 text-sm">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">1.2k+</div>
              <div className="text-slate-500 text-sm">Active Users</div>
            </div>
          </div>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="absolute bottom-10 left-16 right-16 flex justify-between items-center opacity-40">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
          </div>
          <div className="text-slate-500 text-xs uppercase tracking-widest font-bold">Trusted by Enterprise</div>
        </div>
      </div>
    </div>
  );
};
