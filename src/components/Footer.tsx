import { Cpu, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand block */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('/')}>
              <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                AI <span className="text-cyan-400">Solution</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leading the deployment of scalable multi-agent architectures, sovereign cognitive vector indexing, and real-time predictive logistics.
            </p>
            <div className="space-y-2 text-xs font-mono text-slate-500">
              <p>PROD_BUILD_VERSION: 4.1.0_2026</p>
              <p>RELIABILITY METRIC: 99.98% SLA</p>
            </div>
          </div>

          {/* Quick Nav links */}
          <div className="text-left">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 font-display">Sovereign Directory</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNavClick('/')} className="hover:text-cyan-400 font-medium transition-colors cursor-pointer bg-transparent border-none p-0">
                  Product Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/about')} className="hover:text-cyan-400 font-medium transition-colors cursor-pointer bg-transparent border-none p-0">
                  Agency Heritage
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/services')} className="hover:text-cyan-400 font-medium transition-colors cursor-pointer bg-transparent border-none p-0">
                  Core Competencies
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/projects')} className="hover:text-cyan-400 font-medium transition-colors cursor-pointer bg-transparent border-none p-0">
                  Client Deliverables
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/events')} className="hover:text-cyan-400 font-medium transition-colors cursor-pointer bg-transparent border-none p-0">
                  Summits & Labs
                </button>
              </li>
            </ul>
          </div>

          {/* Blogs and Gallery */}
          <div className="text-left">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 font-display">Information Center</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNavClick('/blog')} className="hover:text-cyan-400 font-medium transition-colors cursor-pointer bg-transparent border-none p-0">
                  Expert Insights Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/gallery')} className="hover:text-cyan-400 font-medium transition-colors cursor-pointer bg-transparent border-none p-0">
                  Laboratory Media
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/testimonials')} className="hover:text-cyan-400 font-medium transition-colors cursor-pointer bg-transparent border-none p-0">
                  SGI Endorsements
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/contact')} className="hover:text-cyan-400 font-medium transition-colors cursor-pointer bg-transparent border-none p-0">
                  Lead Qualification
                </button>
              </li>
            </ul>
          </div>

          {/* Headquarters contact */}
          <div className="space-y-4 text-left">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 font-display">Seattle Headquarters</h3>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>1200 Pine Street, Block B,<br />Seattle, WA 98101</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-indigo-400" />
                <span>(206) 555-0199</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <span>contact@aisolution.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 AI Solution Consultant LLC. All sovereignty, code layouts, and agent blueprints fully protected.</p>
          <div className="flex space-x-4 text-[11px] font-mono">
            <span className="hover:text-slate-400 cursor-pointer">Sitemap</span>
            <span className="hover:text-slate-400 cursor-pointer">Robots.txt</span>
            <span className="hover:text-slate-400 cursor-pointer">Schema Markups</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
