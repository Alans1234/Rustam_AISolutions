import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { apiFetch } from '../utils/mockFetch';

interface ContactProps {
  refreshData: () => void;
}

export default function Contact({ refreshData }: ContactProps) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactSubject, setContactSubject] = useState('Enterprise Sovereign RAG Integration');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

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

  return (
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
        <div className="lg:col-span-7 bg-white border border-slate-150 rounded-2xl p-6 sm:p-8 shadow-sm text-left">
          <form onSubmit={handleContactSubmit} className="space-y-5">
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
              <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-850 rounded-xl text-xs font-semibold flex items-center gap-2">
                <LucideIcons.CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                <span>Thank you! Your inquiry was successfully registered in our CRM ledger.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">First & Last Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Raymond Fowler"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Business Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="raymond.fowler@hightech.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Direct Mobile Line</label>
                <input 
                  type="tel"
                  placeholder="206-555-0143"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Company Name</label>
                <input 
                  type="text"
                  placeholder="HighTech Ventures LLC"
                  value={contactCompany}
                  onChange={(e) => setContactCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Subject *</label>
              <select
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 font-medium"
              >
                <option value="Enterprise Sovereign RAG Integration">Enterprise Sovereign RAG Integration</option>
                <option value="Predictive Demand Modeling Sync">Predictive Demand Modeling Sync</option>
                <option value="RPA & Invoice Parsing Quote">RPA & Invoice Parsing Quote</option>
                <option value="General Corporate Partnership">General Corporate Partnership</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Project Pain Points Summary *</label>
              <textarea 
                rows={4}
                required
                placeholder="We process upwards of 1,200 cargo receipts weekly. We need an RPA visual engine with high confidence indexes..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 leading-relaxed"
              />
              <span className="text-[10px] text-slate-400 font-mono">Min 10 characters required. We respect absolute non-disclosure protocols.</span>
            </div>

            <button 
              type="submit"
              disabled={isSubmittingContact}
              className="w-full py-3 bg-indigo-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-150 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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
  );
}
