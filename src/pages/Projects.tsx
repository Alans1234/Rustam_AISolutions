import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const formatFriendlyDate = (rawDate: string) => {
    try {
      const d = new Date(rawDate);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (_) {
      return rawDate;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in" id="projects-page-root">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Client Deliverables Portfolio</span>
        <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Completed Technical Deliverables</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Explore concrete case logs documenting how our models optimize logistics routes and automate invoice processing under high database load.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((prj) => (
          <div 
            key={prj.id} 
            onClick={() => setSelectedProject(prj)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group text-left"
          >
            <div className="relative overflow-hidden h-48 shrink-0">
              <img 
                src={prj.thumbnail} 
                alt={prj.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-mono uppercase tracking-wider rounded">
                {prj.category}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Client: {prj.clientName}</p>
                <h3 className="font-bold text-slate-800 text-base leading-snug">{prj.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">{prj.shortSummary}</p>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-600 font-bold">Inspect Case Study</span>
                <LucideIcons.ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col text-left">
            <div className="relative h-60 w-full shrink-0">
              <img 
                src={selectedProject.bannerImage} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-8">
                <div>
                  <span className="px-2.5 py-1 bg-cyan-400 text-slate-950 text-[10px] font-mono uppercase font-bold rounded">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-white mt-2 leading-tight">{selectedProject.title}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-slate-800 transition-colors cursor-pointer"
              >
                <LucideIcons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400">Client Partner</p>
                  <p className="text-xs font-semibold text-slate-700">{selectedProject.clientName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400">Industry Vertical</p>
                  <p className="text-xs font-semibold text-slate-700">{selectedProject.industry}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400">Completion Milestone</p>
                  <p className="text-xs font-semibold text-slate-700">{formatFriendlyDate(selectedProject.completionDate)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-slate-400">Project Status</p>
                  <span className="text-xs font-mono uppercase font-bold text-indigo-600">{selectedProject.status}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold mb-2">Project Overview</h4>
                <p className="text-slate-600 leading-relaxed font-sans text-sm">{selectedProject.overview}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold mb-2">Business Pain Points Isolated</h4>
                <p className="text-slate-600 leading-relaxed font-sans text-sm">{selectedProject.businessProblem}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-xs font-mono tracking-wider uppercase text-slate-500 mb-3">Architected System Modules</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs">
                        <LucideIcons.Cpu className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-xs font-mono tracking-wider uppercase text-slate-500 mb-3">Quantifiable Enterprise Gains</h4>
                  <ul className="space-y-2">
                    {selectedProject.resultsAndImpact.map((r, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs">
                        <LucideIcons.Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-semibold text-xs font-mono tracking-wider uppercase text-slate-500 mb-3">Technology Stack Employed</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologiesUsed.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200/50 text-[11px] font-mono text-slate-600 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Return to Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
