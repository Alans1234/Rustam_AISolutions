import { Cpu, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'projects', label: 'Projects', path: '/projects' },
    { id: 'testimonials', label: 'Testimonials', path: '/testimonials' },
    { id: 'events', label: 'Events', path: '/events' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'gallery', label: 'Gallery', path: '/gallery' },
    { id: 'contact', label: 'Contact Us', path: '/contact' }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isAdminActive = location.pathname === '/admin';

  return (
    <header className="sticky top-0 z-50 bg-[#FAF4EB]/90 backdrop-blur-md border-b border-slate-150 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('/')}
            onDoubleClick={() => {
              navigate('/admin');
            }}
            id="navbar-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-cyan-500 shadow-md shadow-indigo-100">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="font-display text-xl font-bold tracking-tight text-slate-800">
                AI <span className="text-indigo-600">Solution</span>
              </span>
              <p className="text-[10px] font-mono tracking-wider uppercase text-slate-400 m-0">Enterprise AI Engine</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = !isAdminActive && (location.pathname === link.path);
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-indigo-600 bg-indigo-50/50' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Hidden Admin Access Holder */}
          <div className="hidden lg:flex items-center space-x-3">
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-150 bg-[#FAF4EB] shadow-inner animate-fade-in py-4 px-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = !isAdminActive && (location.pathname === link.path);
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center cursor-pointer ${
                  isActive 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
