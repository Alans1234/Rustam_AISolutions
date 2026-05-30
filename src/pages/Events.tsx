import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { EventItem } from '../types';

interface EventsProps {
  events: EventItem[];
}

export default function Events({ events }: EventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredEvents = events.filter(evt => {
    const isPast = new Date(evt.date) < new Date();
    const matchesSearch = evt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.speakers.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'upcoming' && !isPast) || 
      (statusFilter === 'past' && isPast);

    return matchesSearch && matchesStatus;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in" id="events-page-root">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Summits & Labs</span>
        <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Interactive Summits & Hands-on Labs</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Explore upcoming multi-agent panels, physical computer vision workshops, and technical events featuring industry leaders.
        </p>
      </div>

      {/* Modern Filter Controls */}
      <div className="bg-white/60 p-5 rounded-3xl border border-slate-150/80 shadow-xs flex flex-col md:flex-row gap-5 items-center justify-between text-left">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <LucideIcons.Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search events & speakers..."
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

        {/* Status Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {(['all', 'upcoming', 'past'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider font-mono cursor-pointer transition-colors ${
                statusFilter === status 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {status === 'all' ? 'All Milestones' : `${status} Events`}
            </button>
          ))}
        </div>
      </div>

      {/* List Layout with empty state */}
      {filteredEvents.length > 0 ? (
        <div className="space-y-6 text-left">
          {filteredEvents.map((evt) => {
            const isPast = new Date(evt.date) < new Date();
            return (
              <div 
                key={evt.id} 
                className="bg-white rounded-3xl border border-slate-150 shadow-xs p-6 flex flex-col md:flex-row gap-6 items-center hover:border-indigo-200 hover:shadow-md transition-all duration-300"
              >
                <img 
                  src={evt.banner} 
                  alt={evt.name} 
                  className="w-full md:w-44 h-32 object-cover rounded-2xl shrink-0 border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 text-left space-y-3">
                  <div className="flex flex-wrap gap-2.5 items-center">
                    <span className={`px-2.5 py-0.5 text-[9px] font-mono tracking-wide rounded-lg font-bold uppercase ${
                      isPast ? 'bg-slate-100 text-slate-500' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      {isPast ? 'Past Event' : 'Upcoming Summit'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-450 font-medium">{formatFriendlyDate(evt.date)} • {evt.time}</span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-800 leading-snug">{evt.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">{evt.description}</p>
                </div>
                <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => setSelectedEvent(evt)}
                    className="flex-1 px-4 py-2.5 border border-slate-200 hover:bg-slate-900 border-transparent hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    View Agenda
                  </button>
                  {!isPast && (
                    <a 
                      href={evt.registrationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl text-center transition-all shadow-sm cursor-pointer"
                    >
                      Register Pass
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center text-slate-400 bg-white border border-slate-100 rounded-3xl shadow-xs">
          <LucideIcons.SearchX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-bold text-sm text-slate-700">No events found matching current filter context.</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Try refining your keyword search, selecting another milestone filter, or creating an event via Admin controls.</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}
            className="mt-5 px-4 py-2 bg-indigo-600 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col text-left">
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
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-slate-800 transition-colors cursor-pointer"
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
                className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 text-slate-600 cursor-pointer"
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
    </div>
  );
}
