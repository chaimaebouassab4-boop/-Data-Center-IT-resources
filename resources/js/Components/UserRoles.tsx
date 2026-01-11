
import { Eye, User, Settings, Shield } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function UserRoles() {
  const { ref, isVisible } = useScrollAnimation();

  const roles = [
    {
      icon: Eye,
      title: 'Guest',
      description: 'Browse available resources, view specifications, and submit account requests.',
      features: ['Read-only access', 'Resource catalog', 'Account requests'],
      color: 'from-gray-500 to-slate-500',
    },
    {
      icon: User,
      title: 'Internal User',
      description: 'Engineers, teachers, and students with full reservation capabilities.',
      features: ['Submit reservations', 'Track requests', 'View history', 'Get notifications'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Settings,
      title: 'Resource Manager',
      description: 'Manage assigned resources and approve reservation requests.',
      features: ['Approve requests', 'Manage resources', 'Set maintenance', 'View analytics'],
      color: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Shield,
      title: 'Administrator',
      description: 'Complete control over the entire data center platform.',
      features: ['User management', 'Global statistics', 'System configuration', 'Full access'],
      color: 'from-teal-500 to-green-500',
    },
  ];

  return (
    <div ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Designed for
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Every User Type
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tailored experiences with precise role-based permissions for your entire team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
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
                <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 transition-all hover:scale-105 h-full flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex-1 flex flex-col">
                    <div className={`inline-block p-4 bg-gradient-to-br ${role.color} rounded-xl mb-6 self-start group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">{role.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{role.description}</p>

                    <div className="mt-auto space-y-2">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${role.color}`} />
                          <span className="text-sm text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
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
