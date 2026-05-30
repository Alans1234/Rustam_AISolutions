import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 animate-fade-in" id="testimonials-page-root">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Endorsements</span>
        <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Corporate Audit Endorsements</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Read verified feedback and metric reports provided by enterprise leads after integrating AI Solution platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div 
            key={t.id} 
            className="bg-white p-8 rounded-2xl border border-slate-150 shadow-sm flex flex-col justify-between space-y-6 text-left hover:shadow-md transition-shadow"
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
                  <p className="text-[10px] text-slate-400 font-mono uppercase leading-tight mt-0.5">{t.position}</p>
                  <p className="text-[10px] text-indigo-600 font-semibold leading-tight">{t.companyName}</p>
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
  );
}
