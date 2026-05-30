import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { EventItem } from '../../types';
import { apiFetch } from '../../utils/mockFetch';

interface AdminEventsProps {
  events: EventItem[];
  refreshData: () => void;
}

export function AdminEvents({ events, refreshData }: AdminEventsProps) {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [crudError, setCrudError] = useState('');
  const [crudSuccess, setCrudSuccess] = useState('');

  // Form states
  const [evtName, setEvtName] = useState('');
  const [evtBanner, setEvtBanner] = useState('');
  const [evtDate, setEvtDate] = useState('2026-06-15');
  const [evtTime, setEvtTime] = useState('09:00 AM - 05:00 PM');
  const [evtLocation, setEvtLocation] = useState('');
  const [evtDescription, setEvtDescription] = useState('');
  const [evtRegUrl, setEvtRegUrl] = useState('');
  const [evtSpeakersStr, setEvtSpeakersStr] = useState('');

  const handleCreateNewClick = () => {
    setEditingId(null);
    setEvtName('');
    setEvtBanner('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80');
    setEvtDate('2026-06-15');
    setEvtTime('09:00 AM - 05:00 PM');
    setEvtLocation('');
    setEvtDescription('');
    setEvtRegUrl('');
    setEvtSpeakersStr('');
    setCrudError('');
    setCrudSuccess('');
    setIsCreatingNew(true);
  };

  const handleEditClick = (item: EventItem) => {
    setCrudError('');
    setCrudSuccess('');
    setEditingId(item.id);
    setEvtName(item.name);
    setEvtBanner(item.bannerImage || '');
    setEvtDate(item.date);
    setEvtTime(item.time);
    setEvtLocation(item.location);
    setEvtDescription(item.description);
    setEvtRegUrl(item.registrationUrl || '');
    setEvtSpeakersStr(item.speakers ? item.speakers.join(', ') : '');
    setIsCreatingNew(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setCrudError('');
    setCrudSuccess('');

    const payload = {
      name: evtName,
      bannerImage: evtBanner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
      date: evtDate,
      time: evtTime,
      location: evtLocation,
      description: evtDescription,
      registrationUrl: evtRegUrl || 'https://ai.studio/build',
      speakers: evtSpeakersStr.split(',').map(x => x.trim()).filter(Boolean)
    };

    try {
      const url = editingId ? `/api/events/${editingId}` : '/api/events';
      const method = editingId ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setCrudSuccess(`Summit event schedule successfully ${editingId ? 'updated' : 'published'} in timetable.`);
        refreshData();
        setIsCreatingNew(false);
      } else {
        const data = await res.json();
        setCrudError(data.error || 'Failed to submit conference schedule parameters.');
      }
    } catch (_) {
      setCrudError('Database server interface disconnected.');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Proceed to remove summit date from scheduling catalog?')) return;
    setCrudError('');
    setCrudSuccess('');
    try {
      const res = await apiFetch(`/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCrudSuccess('Summit timeline schedule removed.');
        refreshData();
      } else {
        setCrudError('Failed to remove event schedule.');
      }
    } catch (_) {
      setCrudError('Interfacing transition block.');
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in" id="admin-events-panel">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-150 pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Summits & Scheduling</h2>
          <p className="text-xs text-slate-400 mt-1">Configure scheduling timetables for tech panels, keynote papers presentations, and R&D meetups.</p>
        </div>
        {!isCreatingNew && (
          <button 
            onClick={handleCreateNewClick}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            <LucideIcons.Plus className="w-4 h-4" />
            <span>Publish New Live Event</span>
          </button>
        )}
      </div>

      {/* Audit states notifications */}
      {crudSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2">
          <LucideIcons.CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{crudSuccess}</span>
        </div>
      )}
      {crudError && (
        <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-2">
          <LucideIcons.AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{crudError}</span>
        </div>
      )}

      {/* Editing or creations visual grids */}
      {isCreatingNew ? (
        <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSaveEvent} className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3 mb-2">
              <h4 className="font-bold text-sm uppercase font-mono text-indigo-700 tracking-wider">
                {editingId ? 'Modify Event Schedule details' : 'Draft Live Summit Panel'}
              </h4>
              <button 
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
              >
                <LucideIcons.X className="w-4 h-4" />
                <span>Cancel form</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Summit Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., European Heuristics Hackathon"
                  value={evtName}
                  onChange={(e) => setEvtName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Physical Location / Event Link *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Zurich Science Hall / Zoom webinars"
                  value={evtLocation}
                  onChange={(e) => setEvtLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5 font-sans">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Calendar Date *</label>
                <input 
                  type="date" 
                  required
                  value={evtDate}
                  onChange={(e) => setEvtDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5 font-sans">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Standard Time Range *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., 09:00 AM - 05:00 PM CET"
                  value={evtTime}
                  onChange={(e) => setEvtTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5 font-sans">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Registration Ticket Url</label>
                <input 
                  type="url" 
                  placeholder="https://ai.studio/join-event"
                  value={evtRegUrl}
                  onChange={(e) => setEvtRegUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Billboard Banner Image URL *</label>
              <input 
                type="url" 
                required
                placeholder="https://images.unsplash.com/photo-1540575467063-178a50c2df87?fit=crop"
                value={evtBanner}
                onChange={(e) => setEvtBanner(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Specialist Invited Speakers (Comma separated values) *</label>
              <input 
                type="text" 
                required
                placeholder="Dr. Aria Sterling, Prof. Raymond Fowler, Dr. Samantha Mills"
                value={evtSpeakersStr}
                onChange={(e) => setEvtSpeakersStr(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block font-bold">Summit Detailed Agenda/Summary *</label>
              <textarea 
                rows={4}
                required
                placeholder="Heuristic algorithms and dynamic reinforcement learning models presented on stages..."
                value={evtDescription}
                onChange={(e) => setEvtDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none leading-relaxed" 
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t font-sans">
              <button 
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel timeline
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                {editingId ? 'Push Changes' : 'Record Summit'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Event listing catalog table */
        <div className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="p-4 font-bold">Event Banner</th>
                  <th className="p-4 font-bold">Summit Subject</th>
                  <th className="p-4 font-bold">Venue Location</th>
                  <th className="p-4 font-bold">Event Date & Time</th>
                  <th className="p-4 font-bold">Keynote Speakers</th>
                  <th className="p-4 font-bold text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-650">
                {events.length > 0 ? (
                  events.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4">
                        <img 
                          referrerPolicy="no-referrer"
                          src={item.bannerImage} 
                          alt={item.name} 
                          className="w-14 h-10 object-cover rounded-lg border shadow-xs" 
                        />
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{item.name}</p>
                        <p className="text-[10px] text-slate-450 truncate max-w-xs">{item.description}</p>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">{item.location}</td>
                      <td className="p-4 whitespace-nowrap">
                        <p className="font-mono text-slate-850 font-bold flex items-center gap-1.5">
                          <LucideIcons.Calendar className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{item.date}</span>
                        </p>
                        <p className="text-[10px] text-slate-450 mt-0.5">{item.time}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {item.speakers.map((s, idx) => (
                            <span key={idx} className="bg-slate-55 border text-slate-500 font-mono text-[9px] uppercase font-bold px-1.5 rounded">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button 
                            onClick={() => handleEditClick(item)}
                            className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors cursor-pointer"
                            title="Edit summit time"
                          >
                            <LucideIcons.Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteEvent(item.id)}
                            className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer"
                            title="Purge summit"
                          >
                            <LucideIcons.Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400">
                      <LucideIcons.Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="font-semibold text-xs">No timetabled events registered.</p>
                      <p className="text-[11px] text-slate-400 mt-1">Publish summit sessions using high right button header.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
