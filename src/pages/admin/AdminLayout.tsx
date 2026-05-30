import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { apiFetch } from '../../utils/mockFetch';

interface AdminLayoutProps {
  inquiriesCount: number;
}

export function AdminLayout({ inquiriesCount }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('admin');
  const [loginPassword, setLoginPassword] = useState<string>('admin');
  const [loginError, setLoginError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load check on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'admin_tok_99182a') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    const emailTrim = loginEmail.trim().toLowerCase();
    const passTrim = loginPassword.trim();

    // Sandbox immediate account safety fallback
    if (
      (emailTrim === 'admin' || emailTrim === 'admin@aisolution.com') && 
      (passTrim === 'admin' || passTrim === 'admin123')
    ) {
      localStorage.setItem('adminToken', 'admin_tok_99182a');
      setIsAuthenticated(true);
      setIsLoggingIn(false);
      return;
    }

    try {
      const res = await apiFetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      if (res.ok) {
        localStorage.setItem('adminToken', 'admin_tok_99182a');
        setIsAuthenticated(true);
      } else {
        const err = await res.json();
        setLoginError(err.error || 'Identity credentials validation failed.');
      }
    } catch (_) {
      setLoginError('Local server port routing discrepancy.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-[#FAF4EB] p-4 font-sans text-left">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-150 p-8 space-y-6 shadow-xl relative overflow-hidden">
          {/* Top layout lines */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500" />
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100 shadow-sm">
              <LucideIcons.ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold font-display text-slate-800">Sovereign Validation Terminal</h2>
            <p className="text-xs text-slate-400">Restricted Corporate Portal Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                <LucideIcons.AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Cryptokey Access ID</label>
              <div className="relative">
                <LucideIcons.User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  required
                  placeholder="admin@aisolution.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/50 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 font-medium" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Administrative Cipherphrase</label>
              <div className="relative">
                <LucideIcons.Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/50 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 font-medium" 
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />
                  <span>Decrypting security cryptokeys...</span>
                </>
              ) : (
                'Validate Administrative Cryptokey'
              )}
            </button>
          </form>

          <div className="p-4 bg-indigo-50/55 border border-indigo-100 rounded-2xl space-y-1">
            <p className="text-[10px] font-mono text-indigo-700 font-bold uppercase">Sandbox Access Account</p>
            <p className="text-xs text-indigo-950 leading-relaxed font-sans">
              Demo Access Credentials:<br />
              Username/Email: <span className="font-mono text-slate-800 font-bold">admin</span><br />
              Password: <span className="font-mono text-slate-800 font-bold">admin</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const navTabs = [
    { id: '', label: 'Overview Metrics', icon: LucideIcons.LayoutDashboard },
    { id: 'inquiries', label: `Inbound Leads (${inquiriesCount})`, icon: LucideIcons.Inbox },
    { id: 'services', label: 'Services Catalogue', icon: LucideIcons.Cpu },
    { id: 'projects', label: 'Projects Cases', icon: LucideIcons.Briefcase },
    { id: 'blogs', label: 'Research Papers', icon: LucideIcons.BookOpen },
    { id: 'gallery', label: 'Sovereign Gallery', icon: LucideIcons.Image },
    { id: 'testimonials', label: 'Client Feedback', icon: LucideIcons.Star },
    { id: 'events', label: 'Summits & Panels', icon: LucideIcons.Calendar }
  ];

  return (
    <div className="min-h-screen bg-[#FAF4EB] text-slate-800 font-sans flex flex-col lg:flex-row w-full text-left" id="admin-panel-root">
      {/* Corporate Admin Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-[#FCF9F4] shadow-xl p-6 lg:p-8 flex flex-col justify-between shrink-0 mb-6 lg:mb-0 border-r border-slate-150">
        <div className="space-y-8">
          {/* Identity Header */}
          <div className="text-left">
            <span className="text-[9px] font-mono text-indigo-600 bg-indigo-100/50 px-2.5 py-1 rounded font-bold uppercase tracking-wider">ADMIN LEVEL CLEARED</span>
            <h1 className="text-xl font-bold font-display text-slate-800 mt-2.5 flex items-center gap-2">
              <LucideIcons.ShieldCheck className="w-5 h-5 text-indigo-650" />
              <span>CMS Control</span>
            </h1>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">Configure active catalog pages, journals, inbound inquiries, & schedules.</p>
          </div>

          {/* Navigation links formatted as distinct list tabs */}
          <nav className="space-y-1.5 text-left">
            {navTabs.map(tab => {
              const TabIcon = tab.icon;
              // Detect active router path
              const subPath = tab.id ? `/admin/${tab.id}` : '/admin';
              const isActive = location.pathname === subPath;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(subPath)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Details & Session Logout */}
        <div className="pt-6 space-y-4 border-t border-slate-150 text-left mt-8 lg:mt-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-indigo-50 border flex items-center justify-center text-indigo-600 shrink-0 font-bold text-xs">
              CS
            </div>
            <div className="overflow-hidden">
              <h5 className="text-xs font-bold text-slate-850 truncate">Dr. Aria Sterling</h5>
              <p className="text-[10px] font-mono text-slate-400 truncate">SYSTEM ARCHITECT</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/')}
              className="flex-1 py-2 px-3 border border-slate-200 hover:bg-slate-50 text-[10px] font-bold rounded-xl transition-all cursor-pointer text-center text-slate-650"
            >
              Public View
            </button>
            <button 
              onClick={handleLogout}
              className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
            >
              <LucideIcons.LogOut className="w-3.5 h-3.5" />
              <span>Exit Ledger</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Layout Workspace Content Frame */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-full">
        <Outlet />
      </main>
    </div>
  );
}
