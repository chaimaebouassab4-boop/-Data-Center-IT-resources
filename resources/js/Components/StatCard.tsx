
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div className="p-2.5 bg-slate-50 rounded-xl text-blue-600 border border-slate-100">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </span>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
