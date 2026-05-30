import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { EventItem } from '../types';

interface EventsProps {
  events: EventItem[];
}

export default function Events({ events }: EventsProps) {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 animate-fade-in" id="events-page-root">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Summits & Labs</span>
        <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Interactive Summits & Hands-on Labs</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Explore upcoming multi-agent panels, physical computer vision workshops, and technical events featuring industry leaders.
        </p>
      </div>

      <div className="space-y-6 text-left">
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
                  className="flex-1 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
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
