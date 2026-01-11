import { useState, useEffect } from 'react';
import logo from '@/Pages/image.png';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-4 transition-all duration-700 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {/* Enhanced Logo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
  <img
    src={logo}
    alt="DataCenterHub Logo"
    className="w-90 h-90 object-contain"
  />
</div>

            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white tracking-tight">DataCenter<span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Hub</span></span>
              <span className="text-xs text-gray-400 font-semibold tracking-widest">RESOURCE MANAGEMENT</span>
            </div>
          </div>

          <div className={`flex items-center space-x-4 transition-all duration-700 delay-200 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <button
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
              onClick={() => window.location.href = '/auth'}
            >
              Sign In
            </button>

            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all hover:scale-105 font-semibold shadow-lg shadow-blue-500/25"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-blue-400 text-sm font-medium">Resource Management Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Manage Your Data Center
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                With Confidence
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Streamline resource allocation, track reservations in real-time, and optimize your infrastructure
              with our intelligent reservation system.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 flex items-center space-x-2 font-semibold">
                <span>Start Reserving</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all hover:scale-105 border border-white/10 backdrop-blur-sm font-semibold">
                View Resources
              </button>
            </div>
          </div>

          <div className={`mt-16 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-20" />
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-gray-400 text-sm">Resources</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">1200+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-gray-400 text-sm">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}