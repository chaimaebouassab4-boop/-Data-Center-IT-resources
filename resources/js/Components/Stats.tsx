import { Activity, TrendingUp, Zap, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation();

  const stats = [
    {
      icon: Activity,
      value: '99.9%',
      label: 'System Availability',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      value: '85%',
      label: 'Resource Utilization',
      color: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Zap,
      value: '<2min',
      label: 'Avg. Approval Time',
      color: 'from-teal-500 to-green-500',
    },
    {
      icon: CheckCircle,
      value: '5000+',
      label: 'Completed Reservations',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <div className={`inline-block p-3 bg-gradient-to-br ${stat.color} rounded-xl mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
