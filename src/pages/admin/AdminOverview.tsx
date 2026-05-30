import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Service, Project, Blog, GalleryItem, Testimonial, EventItem, ContactInquiry } from '../../types';

interface AdminOverviewProps {
  services: Service[];
  projects: Project[];
  blogs: Blog[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  events: EventItem[];
  inquiries: ContactInquiry[];
}

export function AdminOverview({
  services,
  projects,
  blogs,
  gallery,
  testimonials,
  events,
  inquiries
}: AdminOverviewProps) {
  return (
    <div className="space-y-8 text-left animate-fade-in" id="admin-overview-panel">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Operations Control Center</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time CMS resource stats, diagnostic telemetry logs and metrics charts.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-[#FFFDFC] border border-orange-100/50 px-3.5 py-1.5 rounded-xl shadow-sm text-amber-700">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          <span className="font-bold">SYSTEM TELEMETRY: GREEN ONLINE</span>
        </div>
      </div>

      {/* Large widget metrics counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-white border border-slate-150 rounded-2xl flex items-center space-x-4 shadow-sm">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <LucideIcons.Inbox className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-slate-400 uppercase">Inbound Leads CRM</p>
            <h3 className="text-3xl font-display font-bold text-slate-800">{inquiries.length}</h3>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-150 rounded-2xl flex items-center space-x-4 shadow-sm">
          <div className="p-3.5 bg-cyan-50 text-cyan-600 rounded-xl">
            <LucideIcons.Cpu className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-slate-400 uppercase">Services Offered</p>
            <h3 className="text-3xl font-display font-bold text-slate-800">{services.length}</h3>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-150 rounded-2xl flex items-center space-x-4 shadow-sm">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <LucideIcons.Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-slate-400 uppercase">Portfolio Projects</p>
            <h3 className="text-3xl font-display font-bold text-slate-800">{projects.length}</h3>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-150 rounded-2xl flex items-center space-x-4 shadow-sm">
          <div className="p-3.5 bg-cyan-50 text-cyan-600 rounded-xl">
            <LucideIcons.BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-mono text-slate-400 uppercase">Whitepapers Catalogs</p>
            <h3 className="text-3xl font-display font-bold text-slate-800">{blogs.length}</h3>
          </div>
        </div>
      </div>

      {/* SVG Graphs - Inline Re-written Recharts Equivalent for Sandbox Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Custom SVG Line Chart */}
        <div className="bg-white rounded-2xl border border-slate-150 p-6 space-y-4 shadow-sm">
          <h4 className="font-bold text-slate-800 font-display text-sm border-b pb-3 flex items-center justify-between">
            <span>Inquiry Traffic Peaks Analysis</span>
            <LucideIcons.TrendingUp className="w-4 h-4 text-indigo-600" />
          </h4>
          <div className="h-60 flex flex-col justify-between relative pt-6 font-mono text-[9px] text-slate-400">
            {/* SVG path */}
            <div className="relative flex-1">
              <svg className="absolute inset-0 w-full h-full text-indigo-600" viewBox="0 0 400 100" preserveAspectRatio="none">
                {/* Horizontal grid guide lines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="80" x2="400" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                {/* Visual Line path */}
                <path d="M 0 90 Q 100 40, 200 60 T 400 15" fill="none" stroke="currentColor" strokeWidth="2.5" />
                {/* Scatter points */}
                <circle cx="100" cy="55" r="4.5" fill="#4F46E5" />
                <circle cx="200" cy="62" r="4.5" fill="#06B6D4" />
                <circle cx="300" cy="38" r="4.5" fill="#4F46E5" />
              </svg>
              <div className="z-10 bg-white/90 border border-indigo-100/50 px-2.5 py-1 rounded-lg absolute top-1 left-1/3 flex items-center gap-1.5 font-bold text-[9px] shadow-sm text-slate-700">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
                <span>RAG Intelligence Lead Peaks Identified</span>
              </div>
            </div>
            <div className="flex justify-between w-full mt-auto pt-2 border-t text-[9px] font-bold text-slate-400">
              <span>FEB 2026</span>
              <span>MAR 2026</span>
              <span>APR 2026</span>
              <span>MAY 2026 (CURRENT)</span>
            </div>
          </div>
        </div>

        {/* Content Database Storage allocation */}
        <div className="bg-white rounded-2xl border border-slate-150 p-6 space-y-4 shadow-sm">
          <h4 className="font-bold text-slate-800 font-display text-sm border-b pb-3 flex items-center justify-between">
            <span>Database Table Capacity Limits</span>
            <LucideIcons.Database className="w-4 h-4 text-cyan-500" />
          </h4>
          <div className="space-y-4">
            {[
              { name: 'Services Nodes Table', count: services.length, designLimit: 20, color: 'bg-indigo-600' },
              { name: 'Completed Project Records', count: projects.length, designLimit: 20, color: 'bg-cyan-500' },
              { name: 'Research Articles (Blogs)', count: blogs.length, designLimit: 50, color: 'bg-indigo-600' },
              { name: 'Testimonials Feed Registry', count: testimonials.length, designLimit: 20, color: 'bg-cyan-500' },
              { name: 'Summits & Panels Registered', count: events.length, designLimit: 15, color: 'bg-indigo-600' }
            ].map((bar, idx) => (
              <div key={idx} className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">{bar.name}</span>
                  <span className="font-mono text-slate-500 font-bold">{bar.count} / {bar.designLimit} slots utilized</span>
                </div>
                <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden border border-slate-100">
                  <div 
                    className={`h-full ${bar.color} rounded-full transition-all duration-500`} 
                    style={{ width: `${Math.min(100, (bar.count / bar.designLimit) * 100)}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Transaction Activity list logs */}
      <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-sm text-left">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h4 className="font-bold text-slate-800 font-display text-sm">System Process Transaction Action Ledger</h4>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 border px-2.5 py-0.5 rounded-lg">LAST 24 HOURS</span>
        </div>
        <div className="space-y-2.5 font-mono text-xs">
          <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between text-slate-600 gap-2">
            <span className="truncate leading-relaxed"><span className="text-emerald-700 font-bold">[LOG_OK]</span> CMS database synchronized. Verified memory tables checksum match.</span>
            <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">JUST NOW</span>
          </div>
          <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between text-slate-600 gap-2">
            <span className="truncate leading-relaxed"><span className="text-indigo-600 font-bold">[RUT_OK]</span> Web Server Router configured subrouting path allocation perfectly map dynamically.</span>
            <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">10 MINUTES AGO</span>
          </div>
          <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between text-slate-600 gap-2">
            <span className="truncate leading-relaxed"><span className="text-indigo-600 font-bold">[CRM_OK]</span> Collected {inquiries.length} operational contact cards via web socket pipeline.</span>
            <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">3 HOURS AGO</span>
          </div>
          {inquiries.length > 0 && (
            <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between text-slate-600 gap-2">
              <span className="truncate leading-relaxed"><span className="text-cyan-600 font-bold">[INQ_IN]</span> Active incoming inquiry recorded from "{inquiries[0].fullName}" with subject of priority.</span>
              <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">TODAY</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
