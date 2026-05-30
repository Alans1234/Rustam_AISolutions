import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 animate-fade-in" id="services-page-root">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Services Portal</span>
        <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Our Enterprise Core Competencies</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          We specialize in deep cognitive systems and secure database operations. We build private models that operate securely inside your database architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((srv) => {
          const IconComp = (LucideIcons as any)[srv.icon] || LucideIcons.Cpu;
          return (
            <div 
              key={srv.id} 
              className="bg-white p-8 rounded-2xl border border-slate-150/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 text-left"
            >
              <div className="space-y-4">
                <div className="p-3 bg-indigo-50 border border-indigo-100/60 text-indigo-600 rounded-xl w-fit">
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 leading-snug">{srv.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">ID CODE: {srv.slug}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{srv.shortDescription}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-50">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">Technologies Employed</p>
                <div className="flex flex-wrap gap-1.5">
                  {srv.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-50 text-[10px] font-mono text-slate-500 border rounded">
                      {tech}
                    </span>
                  ))}
                  {srv.technologies.length > 3 && (
                    <span className="text-[9px] font-mono text-indigo-600 shrink-0 mt-0.5">+{srv.technologies.length - 3} more</span>
                  )}
                </div>
                <button 
                  onClick={() => setSelectedService(srv)}
                  className="w-full mt-4 flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-indigo-50 hover:bg-slate-900 border border-indigo-100/50 hover:border-slate-900 text-indigo-700 hover:text-white rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer"
                >
                  <span>View SLA Specifications</span>
                  <LucideIcons.ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col text-left">
            <div className="p-6 bg-indigo-50 border-b border-indigo-100/50 flex justify-between items-center sticky top-0 bg-white/95">
              <div className="flex items-center space-x-3 text-indigo-600">
                {React.createElement((LucideIcons as any)[selectedService.icon] || LucideIcons.Cpu, { className: 'w-8 h-8' })}
                <h3 className="text-xl font-bold font-display text-slate-800">{selectedService.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full hover:bg-slate-200/50 transition-colors text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <LucideIcons.X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold mb-2">Detailed Enterprise Service Description</p>
                <p className="text-slate-600 leading-relaxed font-sans text-sm">{selectedService.detailedDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-xs font-mono tracking-wider uppercase text-slate-500 mb-3">Key Structural Offerings</h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs">
                        <LucideIcons.Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-xs font-mono tracking-wider uppercase text-slate-500 mb-3">Target Business Benefits</h4>
                  <ul className="space-y-2">
                    {selectedService.benefits.map((b, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs">
                        <LucideIcons.Star className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-semibold text-xs font-mono tracking-wider uppercase text-slate-500 mb-3">Underlying Tech Matrix</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.technologies.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200/50 text-[11px] font-mono text-slate-600 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selectedService.process && selectedService.process.length > 0 && (
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="font-semibold text-xs font-mono tracking-wider uppercase text-slate-500 mb-4 font-sans">Tactical Delivery SLA Program</h4>
                  <div className="space-y-3">
                    {selectedService.process.map((p, i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[10px] font-mono font-bold text-indigo-600 shrink-0 mt-0.5">
                          0{i + 1}
                        </div>
                        <div className="text-xs text-slate-600 leading-relaxed font-sans">{p}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3 shrink-0">
              <button 
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 text-slate-600 cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setSelectedService(null);
                  navigate('/contact');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Book Intake Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
