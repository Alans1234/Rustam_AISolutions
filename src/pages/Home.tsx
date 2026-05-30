import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Service, Project, Testimonial, EventItem } from '../types';
import { FeaturedStats } from '../components/FeaturedStats';

interface HomeProps {
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  events: EventItem[];
}

export default function Home({ services, projects, testimonials, events }: HomeProps) {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const formatFriendlyDate = (rawDate: string) => {
    try {
      const d = new Date(rawDate);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (_) {
      return rawDate;
    }
  };

  return (
    <div className="space-y-24 pb-20 animate-fade-in" id="home-page-root">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-12 pb-20 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-150 rounded-full py-1.5 px-4">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-700">Enterprise AI Engine 2026</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-slate-800 leading-none">
                AI-Powered <br />
                <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Business Intelligence</span> <br />
                Sovereign Deployment.
              </h1>
              <p className="text-slate-500 leading-relaxed max-w-lg text-sm sm:text-base">
                Sovereign generative pipelines and multi-agent coordination layers engineered from private databases, delivering 14X faster query speed and optimal compliance.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/contact')}
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-150 transition-colors cursor-pointer"
                >
                  Schedule Technical Audit
                </button>
                <button 
                  onClick={() => navigate('/services')}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Our Core Competencies
                </button>
              </div>

              {/* Trusted by companies bar */}
              <div className="pt-8 border-t border-slate-100 space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">ESTABLISHED PARTNERS INCLUDE</p>
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-display font-bold text-slate-400">
                  <span>FINTECH CORP</span>
                  <span>VANGUARD DISPATCH</span>
                  <span>SOVEREIGN HEALTH</span>
                  <span>AURORA SHIPPING</span>
                </div>
              </div>
            </div>

            {/* Right Side Visual Graphic */}
            <div className="relative">
              <div className="absolute inset-x-0 -top-12 -bottom-12 bg-indigo-50/40 rounded-3xl -rotate-1 transform" />
              <div className="relative bg-white border border-slate-150 shadow-xl rounded-2xl overflow-hidden p-6 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">MODEL_LATENCY_METERS_MS</span>
                </div>
                {/* Fake Live telemetry screen */}
                <div className="space-y-4 text-left">
                  {services.slice(0, 3).map((s, idx) => {
                    const IconComp = (LucideIcons as any)[s.icon] || LucideIcons.Cpu;
                    return (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3.5 bg-slate-50 border rounded-xl hover:border-indigo-200 transition-all cursor-pointer" 
                        onClick={() => setSelectedService(s)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-700">{s.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">STATUS: OPTIMAL</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-indigo-500">{(98.5 - idx * 0.4).toFixed(1)}% Accuracy</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Analytics Banner */}
      <section className="bg-slate-50 border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-600 font-bold">Reliability Under Load</span>
            <h3 className="text-2xl font-bold font-display text-slate-800">Ground-Metric Success Ratios</h3>
          </div>
          <FeaturedStats />
        </div>
      </section>

      {/* Featured Previews (Projects and Testimonials) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex justify-between items-end">
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-600 font-bold">Client Success Case Files</span>
            <h2 className="text-3xl font-bold font-display text-slate-800 mt-1">Sovereign Deployments</h2>
          </div>
          <button onClick={() => navigate('/projects')} className="text-indigo-600 hover:text-cyan-500 text-sm font-semibold flex items-center space-x-1.5 cursor-pointer">
            <span>Browse All Cases</span>
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {projects.slice(0, 3).map((prj) => (
            <div 
              key={prj.id} 
              onClick={() => setSelectedProject(prj)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              <img src={prj.thumbnail} alt={prj.title} className="h-44 w-full object-cover shrink-0" referrerPolicy="no-referrer" />
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-cyan-600 font-bold uppercase">{prj.category}</span>
                  <h4 className="text-base font-bold text-slate-700 leading-tight line-clamp-1">{prj.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{prj.shortSummary}</p>
                </div>
                <span className="text-xs text-indigo-600 font-bold flex items-center space-x-1">
                  <span>Inspect Portfolio</span>
                  <LucideIcons.ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial slider Preview */}
      <section className="bg-white/50 border-y py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="text-left">
            <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase font-bold">Endorsements</span>
            <h3 className="text-3xl font-bold font-display text-slate-800 mt-1.5 leading-tight font-sans">What Corporate leaders say</h3>
            <p className="text-xs text-slate-500 leading-relaxed mt-3">Read complete audit confirmations logged by CTOs and operations managers after service. </p>
            <button onClick={() => navigate('/testimonials')} className="mt-6 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-all cursor-pointer">
              Read All Endorsements
            </button>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {testimonials.slice(0, 2).map((t) => (
              <div key={t.id} className="bg-white p-6 border border-slate-100 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center space-x-3.5">
                  <img src={t.clientPhoto} alt={t.name} className="w-10 h-10 rounded-full object-cover border" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{t.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono uppercase">{t.position} at {t.companyName}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-4 italic">"{t.reviewText}"</p>
                {/* stars */}
                <div className="flex space-x-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <LucideIcons.Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Event preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100 text-left">
        <div className="md:w-1/3 space-y-3">
          <span className="text-[10px] font-mono tracking-wider text-indigo-600 font-bold uppercase">Skins & Knowledge</span>
          <h3 className="text-2xl font-bold font-display text-slate-800">Upcoming Corporate Panels</h3>
          <p className="text-xs text-slate-500 leading-relaxed">Meet our Principal AI Architects and Infrastructure managers during global technology summits.</p>
          <button onClick={() => navigate('/events')} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer bg-transparent border-none">
            <span>View Event Logs</span>
            <LucideIcons.ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex-1 space-y-4">
          {events.slice(0, 1).map((evt) => (
            <div key={evt.id} className="bg-white p-6 rounded-2xl border border-slate-150/85 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
              <img src={evt.banner} alt={evt.name} className="w-full sm:w-32 h-24 object-cover rounded-xl" referrerPolicy="no-referrer" />
              <div className="flex-1 space-y-2 text-left w-full">
                <span className="text-[11px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{formatFriendlyDate(evt.date)}</span>
                <h4 className="font-bold font-display text-slate-800 text-sm leading-snug">{evt.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-1">{evt.location}</p>
              </div>
              <button onClick={() => setSelectedEvent(evt)} className="px-3.5 py-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer w-full sm:w-auto">
                Get Free Pass
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Core Lead Call to Action */}
      <section className="bg-slate-900 text-white py-14 max-w-7xl mx-auto rounded-3xl overflow-hidden px-8 relative shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/50 to-cyan-700/50 mix-blend-multiply" />
        <div className="relative max-w-2xl mx-auto text-center space-y-6">
          <h3 className="text-3xl font-bold font-display tracking-tight">Need a customized ML or RAG system architecture blueprint?</h3>
          <p className="text-slate-300 leading-relaxed text-sm">
            Connect with our senior technical partners. We synthesize structured operational plans and model scopes within 48 hours.
          </p>
          <button onClick={() => navigate('/contact')} className="px-7 py-3 bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-900/30 transition-transform hover:scale-105 cursor-pointer">
            Generate Custom AI Proposal
          </button>
        </div>
      </section>

      {/* Detail Modals inside Home */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            <div className="p-6 bg-indigo-50 border-b border-indigo-100/50 flex justify-between items-center sticky top-0 bg-white/95">
              <div className="flex items-center space-x-3 text-indigo-600">
                {React.createElement((LucideIcons as any)[selectedService.icon] || LucideIcons.Cpu, { className: 'w-8 h-8' })}
                <h3 className="text-xl font-bold font-display text-slate-800">{selectedService.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full hover:bg-slate-200/50 transition-colors text-slate-400 hover:text-slate-700"
              >
                <LucideIcons.X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-6 text-left">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold mb-2">Detailed Enterprise Service Description</p>
                <p className="text-slate-600 leading-relaxed text-sm">{selectedService.detailedDescription}</p>
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
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 text-slate-600"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setSelectedService(null);
                  navigate('/contact');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold"
              >
                Book Intake Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
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
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-slate-800"
              >
                <LucideIcons.X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-6 text-left">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-150 rounded-2xl">
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
                <p className="text-slate-600 leading-relaxed text-sm">{selectedProject.overview}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-xs font-mono tracking-wider uppercase text-slate-500 mb-2">Architected Modules</h4>
                  <ul className="space-y-1.5">
                    {selectedProject.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                        <LucideIcons.Cpu className="w-4 h-4 text-indigo-505 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-xs font-mono tracking-wider uppercase text-slate-500 mb-2">Impact</h4>
                  <ul className="space-y-1.5">
                    {selectedProject.resultsAndImpact.map((r, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs font-medium text-slate-700">
                        <LucideIcons.Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold"
              >
                Close Case
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            <div className="relative h-56 shrink-0">
              <img 
                src={selectedEvent.banner} 
                alt={selectedEvent.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-8">
                <div>
                  <span className="px-2.5 py-1 bg-cyan-400 text-slate-950 text-[10px] font-mono uppercase font-bold rounded">
                    Summit / Live Technical Lab
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1.5 leading-snug">{selectedEvent.name}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-slate-800"
              >
                <LucideIcons.X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-6 text-left">
              <p className="text-slate-600 leading-relaxed text-sm">{selectedEvent.description}</p>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold mb-3">Host Speakers</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.speakers.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-50 border rounded-xl text-xs font-medium text-slate-700 flex items-center gap-1.5">
                      <LucideIcons.Mic className="w-3.5 h-3.5 text-indigo-600" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 border rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <a 
                href={selectedEvent.registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold flex items-center gap-1.5"
              >
                <span>Register</span>
                <LucideIcons.ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
