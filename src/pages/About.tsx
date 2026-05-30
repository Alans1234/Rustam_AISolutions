import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function About() {
  return (
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
        <div className="space-y-6 text-left">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
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
            <p className="text-xs text-slate-500 line-clamp-2 px-2">Former MIT Neural Systems lead with decades of vector-indexing expertise.</p>
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
            <p className="text-xs text-slate-500 line-clamp-2 px-2">Architect of high-availability, low-latency private GPU scaling clusters.</p>
          </div>
          <div className="bg-white border rounded-2xl p-5 text-center space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" 
              alt="Dr. Evelyn Vance"
              className="w-24 h-24 rounded-full object-cover mx-auto border"
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="font-bold text-slate-800 text-base">Dr. Evelyn Vance</h4>
              <p className="text-xs font-mono text-slate-400">Leader of NLP Development</p>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 px-2">Developer of generative multi-turn dialog engines and agent networks.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
