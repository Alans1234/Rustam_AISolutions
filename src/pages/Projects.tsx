import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologiesUsed.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

      {/* Modern Filters Panel */}
      <div className="bg-white/60 p-5 rounded-3xl border border-slate-150/80 shadow-xs flex flex-col md:flex-row gap-5 items-center justify-between text-left">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <LucideIcons.Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search deliverables & stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-205 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-slate-700"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-650"
            >
              <LucideIcons.X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grids display */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((prj) => (
            <div 
              key={prj.id} 
              onClick={() => setSelectedProject(prj)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-150/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group text-left"
            >
              <div className="relative overflow-hidden h-52 shrink-0">
                <img 
                  src={prj.thumbnail} 
                  alt={prj.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-indigo-600/90 backdrop-blur-xs text-white text-[9px] font-mono uppercase tracking-wider rounded-lg font-bold">
                  {prj.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Enterprise Client: {prj.clientName}</p>
                  <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors">{prj.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">{prj.shortSummary}</p>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-650 font-bold group-hover:text-indigo-600 transition-colors">Inspect Case Study</span>
                  <LucideIcons.ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center text-slate-400 bg-white border border-slate-100 rounded-3xl shadow-xs">
          <LucideIcons.SearchX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-sm text-slate-700">No matching projects found.</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Try typing another keyword, client partner name, or resetting your choices.</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-5 px-4 py-2 bg-indigo-600 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
          >
            Clear Search Filter
          </button>
        </div>
      )}

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
