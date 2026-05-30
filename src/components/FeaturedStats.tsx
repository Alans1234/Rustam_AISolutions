import { Activity, Award, BarChart3, Clock, Users } from 'lucide-react';
import React from 'react';

export function FeaturedStats() {
  const stats = [
    {
      id: 'stat-accuracy',
      label: 'Prediction Forecast Confidence',
      value: '97.8%',
      subtitle: 'Sustained across real-world testing environments',
      icon: Award,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 'stat-processing',
      label: 'Telemetry Events Scored Daily',
      value: '12M+',
      subtitle: 'Streaming pipeline checkout metrics',
      icon: Activity,
      color: 'text-cyan-600 bg-cyan-50'
    },
    {
      id: 'stat-retrieval',
      label: 'RAG Retrieval Delay Reduced',
      value: '14X',
      subtitle: 'Hybrid indexing search deployment speed',
      icon: Clock,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 'stat-savings',
      label: 'Supply Chain Fuel Saves',
      value: '18.2%',
      subtitle: 'Logistics genetic dispatch routing optimization',
      icon: BarChart3,
      color: 'text-cyan-600 bg-cyan-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="stats-grid-container">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div 
            key={stat.id} 
            id={stat.id}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  {stat.label}
                </p>
                <h4 className="text-3xl font-bold font-display tracking-tight text-slate-800 mt-2">
                  {stat.value}
                </h4>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} shrink-0`}>
                <IconComponent className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1">
              {stat.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
