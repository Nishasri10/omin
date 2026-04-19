import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color, change, onClick }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
    indigo: 'bg-indigo-100 text-indigo-600',
  };

  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-primary-500/10 to-secondary-500/10 blur-2xl"></div>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className={`rounded-xl ${colorClasses[color] || 'bg-gray-100 text-gray-600'} p-3`}>
            <Icon className="h-6 w-6" />
          </div>
          {change && (
            <span className={`text-sm font-semibold ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
          )}
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;