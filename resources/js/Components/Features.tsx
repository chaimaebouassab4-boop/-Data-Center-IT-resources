import { Server, Database, Network, Shield, Clock, Bell } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

export default function Features() {
  const { ref, isVisible } = useScrollAnimation();

  const features: Feature[] = [
    {
      icon: Server,
      title: 'Resource Management',
      description: 'Complete catalog of servers, VMs, storage, and network equipment with detailed specifications and real-time status.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Clock,
      title: 'Smart Reservations',
      description: 'Automatic availability checking, conflict resolution, and intelligent scheduling for optimal resource utilization.',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Database,
      title: 'Usage Analytics',
      description: 'Comprehensive dashboards with visual statistics, occupancy rates, and historical data for informed decisions.',
      gradient: 'from-teal-500 to-green-500',
    },
    {
      icon: Bell,
      title: 'Real-time Notifications',
      description: 'Instant alerts for request updates, expiration warnings, conflicts, and scheduled maintenance periods.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'Role-based Security',
      description: 'Advanced authentication with granular permissions, action logging, and comprehensive audit trails.',
      gradient: 'from-emerald-500 to-blue-500',
    },
    {
      icon: Network,
      title: 'Complete Traceability',
      description: 'Full tracking of reservations from request to completion with detailed status updates and history.',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features for
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Complete Control
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage your data center infrastructure efficiently and securely
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={`feature-${index}`}
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 h-full">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div 
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}