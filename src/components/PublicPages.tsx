import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Service, Project, Blog, BlogCategory, GalleryItem, Testimonial, EventItem, ContactInquiry } from '../types';
import { FeaturedStats } from './FeaturedStats';
import { apiFetch } from '../utils/mockFetch';

// Safe dynamic icon loader helper
export function LucideIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Cpu;
  return <IconComponent className={className || "w-5 h-5"} />;
}

interface PublicPagesProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  services: Service[];
  projects: Project[];
  blogs: Blog[];
  blogCategories: BlogCategory[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  events: EventItem[];
  refreshData: () => void;
}

export function PublicPages({
  activeSection,
  setActiveSection,
  services,
  projects,
  blogs,
  blogCategories,
  gallery,
  testimonials,
  events,
  refreshData
}: PublicPagesProps) {

  // Global details overlays
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  // States for Blog Search & Filter
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCatFilter, setBlogCatFilter] = useState('all');

  // States for Gallery Filter
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'office' | 'team' | 'ai-lab' | 'events'>('all');

  // Contact form submission states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactSubject, setContactSubject] = useState('General Partnership');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Auto-scroll on tab click
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSection]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus(null);

    // Simple robust validation
    if (!contactName.trim()) {
      return setContactStatus({ error: 'Please enter your Full Name.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return setContactStatus({ error: 'Please enter a valid business email address.' });
    }
    if (!contactSubject.trim()) {
      return setContactStatus({ error: 'Please enter a message subject.' });
    }
    if (contactMessage.trim().length < 10) {
      return setContactStatus({ error: 'Your project summary must be at least 10 characters long.' });
    }

    setIsSubmittingContact(true);
    try {
      const res = await apiFetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: contactName,
          emailAddress: contactEmail,
          phoneNumber: contactPhone,
          companyName: contactCompany,
          subject: contactSubject,
          message: contactMessage
        })
      });

      if (res.ok) {
        setContactStatus({ success: true });
        setContactName('');
        setContactEmail('');
        setContactPhone('');
        setContactCompany('');
        setContactMessage('');
        refreshData(); // updates admin listings with new inquiry
      } else {
        const err = await res.json();
        setContactStatus({ error: err.error || 'Failed to submit inquiry.' });
      }
    } catch (err) {
      setContactStatus({ error: 'Network communication anomaly. Please retry.' });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Helper for formatting event dates
  const formatFriendlyDate = (rawDate: string) => {
    try {
      const d = new Date(rawDate);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (_) {
      return rawDate;
    }
  };

  return (
    <div className="min-h-screen">

      {/* ======================= OVERLAYS & DETAIL MODALS ======================= */}

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            <div className="p-6 bg-indigo-50 border-b border-indigo-100/50 flex justify-between items-center sticky top-0 bg-white/95">
              <div className="flex items-center space-x-3 text-indigo-600">
                <LucideIcon name={selectedService.icon} className="w-8 h-8" />
                <h3 className="text-xl font-bold font-display text-slate-800">{selectedService.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full hover:bg-slate-200/50 transition-colors text-slate-400 hover:text-slate-700"
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
                  <h4 className="font-semibold text-xs font-mono tracking-wider uppercase text-slate-500 mb-4">Tactical Delivery SLA Program</h4>
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
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 text-slate-600 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setSelectedService(null);
                  setActiveSection('contact');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Book Intake Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
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
                  <h3 className="text-2xl font-bold font-display text-white mt-2">{selectedProject.title}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-slate-800 transition-colors"
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

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Return to Directory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Screen Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            <div className="relative h-64 shrink-0">
              <img 
                src={selectedBlog.featuredImage} 
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-8">
                <div>
                  <span className="px-2.5 py-1 bg-indigo-500 text-white text-[10px] font-mono uppercase font-bold rounded">
                    {blogCategories.find(c => c.id === selectedBlog.categoryId)?.name || 'Insight'}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-white mt-1.5 leading-snug">{selectedBlog.title}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-slate-800 transition-colors"
              >
                <LucideIcons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Author Box */}
              <div className="flex items-center space-x-3.5 pb-6 border-b border-slate-100">
                <img 
                  src={selectedBlog.authorAvatar} 
                  alt={selectedBlog.authorName} 
                  className="w-11 h-11 rounded-full object-cover border"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="text-sm font-bold text-slate-800">{selectedBlog.authorName}</h5>
                  <p className="text-xs text-slate-400">{selectedBlog.authorRole} • {formatFriendlyDate(selectedBlog.publishDate)}</p>
                </div>
                <div className="ml-auto text-xs font-mono text-slate-500">
                  {selectedBlog.readTime}
                </div>
              </div>

              {/* Blog content parser */}
              <div className="text-sm text-slate-600 leading-relaxed font-sans space-y-4">
                {selectedBlog.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('## ')) {
                    return <h4 key={i} className="text-lg font-bold font-display text-slate-800 pt-4 pb-1">{para.substring(3)}</h4>;
                  }
                  if (para.startsWith('### ')) {
                    return <h5 key={i} className="text-base font-bold font-display text-slate-800 pt-2 pb-1">{para.substring(4)}</h5>;
                  }
                  if (para.startsWith('```')) {
                    const block = para.replaceAll('```', '');
                    return (
                      <pre key={i} className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl font-mono text-xs overflow-x-auto text-indigo-900 my-4">
                        <code>{block}</code>
                      </pre>
                    );
                  }
                  if (para.startsWith('* ')) {
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1">
                        {para.split('\n').map((li, idx) => (
                          <li key={idx} className="text-xs text-slate-600">{li.substring(2)}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                {selectedBlog.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-50 border text-[10px] font-mono text-slate-400 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
              <span className="text-xs text-slate-400 font-mono">SEOLink: {selectedBlog.slug}</span>
              <button 
                onClick={() => setSelectedBlog(null)}
                className="px-5 py-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Close Insights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
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
                    Sovereign Engineering Event
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1.5 leading-snug">{selectedEvent.name}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-slate-800 transition-colors"
              >
                <LucideIcons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-3 text-slate-600">
                  <LucideIcons.Calendar className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Date & Timing</p>
                    <p className="text-xs font-semibold text-slate-700">{formatFriendlyDate(selectedEvent.date)} • {selectedEvent.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <LucideIcons.MapPin className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Location Assembly</p>
                    <p className="text-xs font-semibold text-slate-700">{selectedEvent.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold mb-2">Detailed Summit Description</h4>
                <p className="text-slate-600 leading-relaxed font-sans text-sm">{selectedEvent.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold mb-3">Invited Core Guest Speakers</h4>
                <div className="flex flex-wrap gap-2.5">
                  {selectedEvent.speakers.map((s, i) => (
                    <div key={i} className="flex items-center space-x-2 bg-slate-50 border border-slate-200/50 px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-700">
                      <LucideIcons.Mic className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedEvent.venueDetails && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
                  <h5 className="font-bold text-xs tracking-wide text-slate-700 mb-1">Access Guidelines & Security</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">{selectedEvent.venueDetails}</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3 shrink-0">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 text-slate-600"
              >
                Close
              </button>
              <a 
                href={selectedEvent.registrationUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition-colors flex items-center space-x-2"
              >
                <span>Register Pass Portal</span>
                <LucideIcons.ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-3 bg-white/10 rounded-full hover:bg-white text-white hover:text-slate-900 transition-colors"
            >
              <LucideIcons.X className="w-5 h-5" />
            </button>
            <img 
              src={lightboxImage.imageUrl} 
              alt={lightboxImage.caption}
              className="max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center text-white px-6 max-w-xl">
              <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase font-semibold">
                Category: {lightboxImage.category}
              </span>
              <p className="text-sm font-medium mt-1 leading-relaxed text-slate-300">{lightboxImage.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* ======================= PUBLIC SCRIPT PAGES GRID ======================= */}

      {/* 1. PUBLIC HOME PAGE */}
      {activeSection === 'home' && (
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
                      onClick={() => setActiveSection('contact')}
                      className="px-6 py-3.5 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-150 transition-colors"
                    >
                      Schedule Technical Audit
                    </button>
                    <button 
                      onClick={() => setActiveSection('services')}
                      className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
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
                        <div className="w-3 h-3 rounded-full bg-yellow-450" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-xs font-mono text-slate-400">MODEL_LATENCY_METERS_MS</span>
                    </div>
                    {/* Fake Live telemetry screen */}
                    <div className="space-y-4">
                      {services.slice(0, 3).map((s, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 border rounded-xl hover:border-indigo-200 transition-all cursor-pointer" onClick={() => setSelectedService(s)}>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                              <LucideIcon name={s.icon} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-700">{s.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">STATUS: OPTIMAL</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-indigo-500">{(98.5 - idx * 0.4).toFixed(1)}% Accuracy</span>
                        </div>
                      ))}
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
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-600 font-bold">Client Success Case Files</span>
                <h2 className="text-3xl font-bold font-display text-slate-800 mt-1">Sovereign Deployments</h2>
              </div>
              <button onClick={() => setActiveSection('projects')} className="text-indigo-600 hover:text-cyan-500 text-sm font-semibold flex items-center space-x-1.5">
                <span>Browse All Cases</span>
                <LucideIcons.ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div>
                <span className="text-[10px] font-mono tracking-widest text-indigo-600 uppercase font-bold">Endorsements</span>
                <h3 className="text-3xl font-bold font-display text-slate-800 mt-1.5 leading-tight">What Corporate leaders say</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-3">Read complete audit confirmations logged by CTOs and operations managers after service. </p>
                <button onClick={() => setActiveSection('testimonials')} className="mt-6 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-all">
                  Read All Endorsements
                </button>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100">
            <div className="md:w-1/3 space-y-3">
              <span className="text-[10px] font-mono tracking-wider text-indigo-600 font-bold uppercase">Skins & Knowledge</span>
              <h3 className="text-2xl font-bold font-display text-slate-800">Upcoming Corporate Panels</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Meet our Principal AI Architects and Infrastructure managers during global technology summits.</p>
              <button onClick={() => setActiveSection('events')} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1">
                <span>View Event Logs</span>
                <LucideIcons.ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1 space-y-4">
              {events.slice(0, 1).map((evt) => (
                <div key={evt.id} className="bg-white p-6 rounded-2xl border border-slate-150/80 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                  <img src={evt.banner} alt={evt.name} className="w-full sm:w-32 h-24 object-cover rounded-xl" referrerPolicy="no-referrer" />
                  <div className="flex-1 space-y-2">
                    <span className="text-[11px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{formatFriendlyDate(evt.date)}</span>
                    <h4 className="font-bold font-display text-slate-800 text-sm">{evt.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{evt.location}</p>
                  </div>
                  <button onClick={() => setSelectedEvent(evt)} className="px-3.5 py-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold">
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
              <button onClick={() => setActiveSection('contact')} className="px-7 py-3 bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-900/30 transition-transform hover:scale-105">
                Generate Custom AI Proposal
              </button>
            </div>
          </section>
        </div>
      )}


      {/* 2. ABOUT US PAGE */}
      {activeSection === 'about' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 animate-fade-in" id="about-page-root">
          {/* Header block */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">About Our Heritage</span>
            <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Our Heritage, Vision & Multi-Tier Ecosystem</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Founded in Seattle by senior cognitive engineering experts, AI Solution integrates visual classification engines, multi-agent ledger networks, and private cloud deployments for global enterprises.
            </p>
          </div>

          {/* Grid components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-display text-slate-800">Deep Corporate Mission</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                We believe that software transparency and strict algorithmic validation are the foundations of modern corporate innovation.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Instead of wrapping public APIs in simple chatbots, we engineer deep, private systems and sovereign vector indexes that integrate securely with our clients' existing legacy codebases.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <p className="text-2xl font-bold text-indigo-600 font-display">12M+</p>
                  <p className="text-[10px] uppercase font-mono tracking-wide text-slate-400 mt-1">Telemetry Metrics Scored</p>
                </div>
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <p className="text-2xl font-bold text-indigo-600 font-display">100%</p>
                  <p className="text-[10px] uppercase font-mono tracking-wide text-slate-400 mt-1">Data Sovereignty Security</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
                alt="AI Team research lab" 
                className="rounded-2xl border border-slate-150 shadow-md h-80 object-cover w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Pillars of values */}
          <section className="bg-slate-50 border rounded-3xl p-10 space-y-10">
            <h3 className="text-center text-xl font-bold font-display text-slate-800">Our Operational Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-150/70 space-y-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                  <LucideIcons.ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold font-display text-slate-800">Sovereign Data Security</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  We deploy solutions in isolated VPC environments under absolute zero-knowledge compliance logs, protecting your proprietary IP.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-150/70 space-y-4">
                <div className="p-3 bg-cyan-50 text-cyan-500 rounded-xl w-fit">
                  <LucideIcons.Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-bold font-display text-slate-800">Precision Integrity</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  We implement automated, layered evaluation logic and reciprocal verification loops to eliminate hallucinations or statistical artifacts.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-150/70 space-y-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                  <LucideIcons.Zap className="w-6 h-6" />
                </div>
                <h4 className="font-bold font-display text-slate-800">Continuous Evolution</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  We integrate reinforcement loops and offline safety barriers, ensuring model accuracy scales continuously over time.
                </p>
              </div>
            </div>
          </section>

          {/* Leadership and experts */}
          <section className="space-y-10">
            <h3 className="text-center text-2xl font-bold font-display text-slate-800">Sovereign Board of Architects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border rounded-2xl p-5 text-center space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" 
                  alt="Aria Sterling"
                  className="w-24 h-24 rounded-full object-cover mx-auto border"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-base">Dr. Aria Sterling</h4>
                  <p className="text-xs font-mono text-slate-400">Chief Science Officer • co-Founder</p>
                </div>
                <p className="text-xs text-slate-500 truncate px-2">Former MIT Neural Systems lead with decades of vector-indexing expertise.</p>
              </div>
              <div className="bg-white border rounded-2xl p-5 text-center space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
                  alt="Liam Vance"
                  className="w-24 h-24 rounded-full object-cover mx-auto border"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-base">Liam Vance</h4>
                  <p className="text-xs font-mono text-slate-400">Director of Infrastructure Ops</p>
                </div>
                <p className="text-xs text-slate-500 truncate px-2">Architect of high-availability, low-latency private GPU scaling clusters.</p>
              </div>
              <div className="bg-white border rounded-2xl p-5 text-center space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" 
                  alt="Dr. Evelyn"
                  className="w-24 h-24 rounded-full object-cover mx-auto border"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-base">Dr. Evelyn Vance</h4>
                  <p className="text-xs font-mono text-slate-400">Leader of NLP Development</p>
                </div>
                <p className="text-xs text-slate-500 truncate px-2">Developer of generative multi-turn dialog engines and agent networks.</p>
              </div>
            </div>
          </section>
        </div>
      )}


      {/* 3. CORE COMPETENCIES (SERVICES) */}
      {activeSection === 'services' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 animate-fade-in" id="services-page-root">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Services Portal</span>
            <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Our Enterprise Core Competencies</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              We specialize in deep statistical modeling and production workflows. We build private systems that operate securely inside your database architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((srv) => (
              <div 
                key={srv.id} 
                className="bg-white p-8 rounded-2xl border border-slate-150/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl w-fit">
                    <LucideIcon name={srv.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{srv.name}</h3>
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
                    className="w-full mt-4 flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-indigo-50 hover:bg-slate-900 border border-indigo-100/50 hover:border-slate-900 text-indigo-700 hover:text-white rounded-xl text-xs font-semibold transition-all duration-300"
                  >
                    <span>View Architectural SLA Specifications</span>
                    <LucideIcons.ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* 4. CLIENT DELIVERABLES (PROJECTS) */}
      {activeSection === 'projects' && (
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
                className="bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
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
        </div>
      )}


      {/* 5. TESTIMONIALS */}
      {activeSection === 'testimonials' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 animate-fade-in" id="testimonials-page-root">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Endorsements</span>
            <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Corporate Audit Endorsements</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Read verified feedback and metric reports provided by enterprise leads after integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div 
                key={t.id} 
                className="bg-white p-8 rounded-2xl border border-slate-150 shadow-sm flex flex-col justify-between space-y-6"
              >
                <p className="text-xs text-slate-600 leading-relaxed font-sans italic">
                  "{t.reviewText}"
                </p>

                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-left">
                    <img 
                      src={t.clientPhoto} 
                      alt={t.name} 
                      className="w-10 h-10 rounded-full object-cover border shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{t.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono uppercase">{t.position}</p>
                      <p className="text-[10px] text-indigo-600 font-semibold">{t.companyName}</p>
                    </div>
                  </div>
                  <div className="flex space-x-0.5 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <LucideIcons.Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* 6. SUMMITS & LABS (EVENTS) */}
      {activeSection === 'events' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 animate-fade-in" id="events-page-root">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Summits & Labs</span>
            <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Interactive Summits & Hands-on Labs</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Explore upcoming multi-agent panels, physical computer vision workshops, and technical events featuring industry leaders.
            </p>
          </div>

          <div className="space-y-6">
            {events.map((evt) => {
              const isPast = new Date(evt.date) < new Date();
              return (
                <div 
                  key={evt.id} 
                  className="bg-white rounded-2xl border border-slate-150 shadow-sm p-6 flex flex-col md:flex-row gap-6 items-center hover:border-indigo-200 transition-colors"
                >
                  <img 
                    src={evt.banner} 
                    alt={evt.name} 
                    className="w-full md:w-44 h-32 object-cover rounded-xl shrink-0 border"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 text-left space-y-3">
                    <div className="flex flex-wrap gap-2.5 items-center">
                      <span className={`px-2.5 py-0.5 text-[9px] font-mono tracking-wide rounded-full font-bold uppercase ${
                        isPast ? 'bg-slate-100 text-slate-500' : 'bg-indigo-50 text-indigo-600'
                      }`}>
                        {isPast ? 'Past Event' : 'Upcoming Event'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{formatFriendlyDate(evt.date)} • {evt.time}</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-slate-800 leading-snug">{evt.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{evt.description}</p>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto">
                    <button 
                      onClick={() => setSelectedEvent(evt)}
                      className="flex-1 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      View Agenda
                    </button>
                    {!isPast && (
                      <a 
                        href={evt.registrationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl text-center transition-colors shadow-md shadow-indigo-50"
                      >
                        Register Pass
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}


      {/* 7. EXPERT BLOG INSIGHTS */}
      {activeSection === 'blog' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in" id="blog-page-root">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Expert Intelligence</span>
            <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Insights, Architecture & Whitepapers</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Read technical whitepapers on multi-agent synchronization and sovereign semantic vector search pipelines.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-150 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <LucideIcons.Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search research logs..."
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-slate-700"
              />
            </div>
            {/* Category Selects */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button 
                onClick={() => setBlogCatFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  blogCatFilter === 'all' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Papers
              </button>
              {blogCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setBlogCatFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    blogCatFilter === cat.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid list sorted newest publish date first */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs
              .filter(b => {
                const matchesSearch = b.title.toLowerCase().includes(blogSearch.toLowerCase()) || b.content.toLowerCase().includes(blogSearch.toLowerCase());
                const matchesCategory = blogCatFilter === 'all' || b.categoryId === blogCatFilter;
                return matchesSearch && matchesCategory;
              })
              .sort((a,b) => b.publishDate.localeCompare(a.publishDate))
              .map((b) => (
                <div 
                  key={b.id}
                  onClick={() => setSelectedBlog(b)}
                  className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row text-left hover:border-indigo-200"
                >
                  <img 
                    src={b.featuredImage} 
                    alt={b.title} 
                    className="w-full md:w-48 h-full object-cover shrink-0 min-h-[160px]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase">
                        {blogCategories.find(cat => cat.id === b.categoryId)?.name || 'Whitepaper'}
                      </span>
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug line-clamp-2">{b.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-2">{b.excerpt}</p>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>{formatFriendlyDate(b.publishDate)}</span>
                      <span>{b.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}


      {/* 8. GALLERY media (GALLERY) */}
      {activeSection === 'gallery' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in" id="gallery-page-root">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Laboratory Media</span>
            <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Laboratory & Sovereign Facility Media</h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Take a visual tour inside our Computer Vision Sandbox, flagship Seattle server nodes, and team workspaces.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {(['all', 'office', 'team', 'ai-lab', 'events'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setGalleryFilter(filter)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase font-mono tracking-wider ${
                  galleryFilter === filter 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100'
                }`}
              >
                {filter === 'all' ? 'All Areas' : filter.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Masonry-equivalent Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {gallery
              .filter(item => galleryFilter === 'all' || item.category === galleryFilter)
              .map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setLightboxImage(item)}
                  className="bg-white border rounded-2xl overflow-hidden p-2.5 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="overflow-hidden rounded-xl h-52">
                    <img 
                      src={item.imageUrl} 
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="pt-3 px-2 text-left space-y-1">
                    <span className="text-[9px] font-mono bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase">{item.category}</span>
                    <p className="text-[11px] text-slate-600 font-medium leading-normal line-clamp-2 mt-1">{item.caption}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}


      {/* 9. CONTACT US */}
      {activeSection === 'contact' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in" id="contact-page-root">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side Info */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Intake Operations</span>
                <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Initiate Operational Audit</h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We schedule intake sessions and system modeling reviews. Submit your pain points to start the design process.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-600 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                    <LucideIcons.Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Electronic Mail</p>
                    <p className="text-xs font-semibold text-slate-700">contact@aisolution.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center shrink-0">
                    <LucideIcons.Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Phone Hotline</p>
                    <p className="text-xs font-semibold text-slate-700">(206) 555-0199</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-slate-600 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                    <LucideIcons.Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Office Working Hours</p>
                    <p className="text-xs font-semibold text-slate-700">Mon - Fri • 09:00 AM - 06:00 PM PST</p>
                  </div>
                </div>
              </div>

              {/* Offline Google Maps Mock */}
              <div className="border border-slate-150 rounded-2xl overflow-hidden p-2.5 bg-white shadow-sm">
                <div className="h-44 bg-indigo-50 flex items-center justify-center relative rounded-xl">
                  {/* Styled canvas looking map */}
                  <div className="absolute inset-0 bg-teal-50/20" />
                  <div className="absolute top-1/2 left-1/3 text-[10px] font-mono text-slate-300 transform -rotate-12">I-5 EXPRESSWAY HIGHWAY</div>
                  <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-indigo-600 rounded-full animate-ping" />
                  <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[8px] font-bold shadow-md">
                    <LucideIcons.MapPin className="w-2 h-2" />
                  </div>
                  <p className="absolute bottom-3 left-3 text-[10px] font-mono bg-white px-2 py-1 rounded shadow text-slate-500 uppercase">
                    Map Ground Reference: Seattle Sovereign Office
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side Form */}
            <div className="lg:col-span-7 bg-white border border-slate-150 rounded-2xl p-6 sm:p-8 shadow-sm">
              <form onSubmit={handleContactSubmit} className="space-y-5 text-left">
                <h4 className="font-bold text-lg text-slate-800 font-display border-b pb-3 border-slate-100 flex items-center gap-2">
                  <LucideIcons.FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                  Request Custom Service Scope Proposal
                </h4>

                {contactStatus?.error && (
                  <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <LucideIcons.AlertCircle className="w-4.5 h-4.5" />
                    <span>{contactStatus.error}</span>
                  </div>
                )}

                {contactStatus?.success && (
                  <div className="p-4 bg-emerald-50 border border-emerald-110 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-pulse">
                    <LucideIcons.CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                    <span>Thank you! Your inquiry was successfully registered in our CRM ledger.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">First & Last Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Raymond Fowler"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-105 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Business Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="raymond.fowler@hightech.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-105 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Direct Mobile Line</label>
                    <input 
                      type="tel"
                      placeholder="206-555-0143"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-105 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Company Name</label>
                    <input 
                      type="text"
                      placeholder="HighTech Ventures LLC"
                      value={contactCompany}
                      onChange={(e) => setContactCompany(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-105 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Subject *</label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-105 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 font-medium"
                  >
                    <option value="Enterprise Sovereign RAG Integration">Enterprise Sovereign RAG Integration</option>
                    <option value="Predictive Demand Modeling Sync">Predictive Demand Modeling Sync</option>
                    <option value="RPA & Invoice Parsing Quote">RPA & Invoice Parsing Quote</option>
                    <option value="General Corporate Partnership">General Corporate Partnership</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Project Pain Points Summary *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="We process upwards of 1,200 cargo receipts weekly. We need an RPA visual engine with high confidence indexes..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-105 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 leading-relaxed"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">Min 10 characters required. We respect absolute non-disclosure protocols.</span>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full py-3 bg-indigo-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-150 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmittingContact ? (
                    <>
                      <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />
                      <span>Writing Contact Ledger Entry...</span>
                    </>
                  ) : (
                    <>
                      <LucideIcons.Send className="w-4 h-4" />
                      <span>Transmit Code Proposal Request</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
