import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Project } from '../../types';
import { apiFetch } from '../../utils/mockFetch';

interface AdminProjectsProps {
  projects: Project[];
  refreshData: () => void;
}

export function AdminProjects({ projects, refreshData }: AdminProjectsProps) {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [crudError, setCrudError] = useState('');
  const [crudSuccess, setCrudSuccess] = useState('');

  // Form states
  const [prjTitle, setPrjTitle] = useState('');
  const [prjSlug, setPrjSlug] = useState('');
  const [prjCategory, setPrjCategory] = useState<'AI Solutions' | 'SaaS' | 'Enterprise Software' | 'Mobile Applications' | 'Automation Systems'>('AI Solutions');
  const [prjClientName, setPrjClientName] = useState('');
  const [prjIndustry, setPrjIndustry] = useState('');
  const [prjThumbnail, setPrjThumbnail] = useState('');
  const [prjBanner, setPrjBanner] = useState('');
  const [prjShortSum, setPrjShortSum] = useState('');
  const [prjOverview, setPrjOverview] = useState('');
  const [prjProblem, setPrjProblem] = useState('');
  const [prjSolution, setPrjSolution] = useState('');
  const [prjTechsStr, setPrjTechsStr] = useState('');
  const [prjFeaturesStr, setPrjFeaturesStr] = useState('');
  const [prjResultsStr, setPrjResultsStr] = useState('');
  const [prjCompletionDate, setPrjCompletionDate] = useState('2026-05-30');
  const [prjStatus, setPrjStatus] = useState<'planning' | 'in-progress' | 'completed'>('completed');

  const handleCreateNewClick = () => {
    setEditingId(null);
    setPrjTitle('');
    setPrjSlug('');
    setPrjCategory('AI Solutions');
    setPrjClientName('');
    setPrjIndustry('');
    setPrjThumbnail('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80');
    setPrjBanner('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80');
    setPrjShortSum('');
    setPrjOverview('');
    setPrjProblem('');
    setPrjSolution('');
    setPrjTechsStr('');
    setPrjFeaturesStr('');
    setPrjResultsStr('');
    setPrjCompletionDate(new Date().toISOString().split('T')[0]);
    setPrjStatus('completed');
    setCrudError('');
    setCrudSuccess('');
    setIsCreatingNew(true);
  };

  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setPrjSlug(slug);
  };

  const handleEditClick = (item: Project) => {
    setCrudError('');
    setCrudSuccess('');
    setEditingId(item.id);
    setPrjTitle(item.title);
    setPrjSlug(item.slug);
    setPrjCategory(item.category);
    setPrjClientName(item.clientName);
    setPrjIndustry(item.industry);
    setPrjThumbnail(item.thumbnail);
    setPrjBanner(item.bannerImage);
    setPrjShortSum(item.shortSummary);
    setPrjOverview(item.overview);
    setPrjProblem(item.businessProblem);
    setPrjSolution(item.solutionImplemented);
    setPrjTechsStr(item.technologiesUsed ? item.technologiesUsed.join(', ') : '');
    setPrjFeaturesStr(item.features ? item.features.join('\n') : '');
    setPrjResultsStr(item.resultsAndImpact ? item.resultsAndImpact.join('\n') : '');
    setPrjCompletionDate(item.completionDate);
    setPrjStatus(item.status);
    setIsCreatingNew(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setCrudError('');
    setCrudSuccess('');

    const payload = {
      title: prjTitle,
      slug: prjSlug || prjTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: prjCategory,
      clientName: prjClientName,
      industry: prjIndustry,
      thumbnail: prjThumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      bannerImage: prjBanner || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      shortSummary: prjShortSum,
      overview: prjOverview,
      businessProblem: prjProblem,
      solutionImplemented: prjSolution,
      technologiesUsed: prjTechsStr.split(',').map(x => x.trim()).filter(Boolean),
      features: prjFeaturesStr.split('\n').map(x => x.trim()).filter(Boolean),
      resultsAndImpact: prjResultsStr.split('\n').map(x => x.trim()).filter(Boolean),
      completionDate: prjCompletionDate,
      status: prjStatus
    };

    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setCrudSuccess(`Project Case successfully ${editingId ? 'updated' : 'recorded'} in directory index.`);
        refreshData();
        setIsCreatingNew(false);
      } else {
        const data = await res.json();
        setCrudError(data.error || 'Failed to apply project details changes.');
      }
    } catch (_) {
      setCrudError('Server interface connection issue.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Purge case metadata record from database? This is permanent.')) return;
    setCrudError('');
    setCrudSuccess('');
    try {
      const res = await apiFetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCrudSuccess('Project record removed from catalog.');
        refreshData();
      } else {
        setCrudError('Failed to remove project.');
      }
    } catch (_) {
      setCrudError('Database block during removal.');
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in" id="admin-projects-panel">
      {/* Title bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-150 pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Portfolio Cases Control</h2>
          <p className="text-xs text-slate-400 mt-1">Manage project case books, business challenges, client reviews, tech stacks, and results.</p>
        </div>
        {!isCreatingNew && (
          <button 
            onClick={handleCreateNewClick}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            <LucideIcons.Plus className="w-4 h-4" />
            <span>Register Case Deliverable</span>
          </button>
        )}
      </div>

      {/* Notifications */}
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

      {/* Form editing page or view */}
      {isCreatingNew ? (
        <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSaveProject} className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3 mb-2">
              <h4 className="font-bold text-sm uppercase font-mono text-indigo-700 tracking-wider">
                {editingId ? 'Modify Project Case Ledger' : 'Record Case Deliverable'}
              </h4>
              <button 
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
              >
                <LucideIcons.X className="w-0.5" />
                <span>Cancel form</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Project Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., LogiRoute Genetic Optimizer"
                  value={prjTitle}
                  onChange={(e) => {
                    setPrjTitle(e.target.value);
                    generateSlug(e.target.value);
                  }}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Sovereign Slug Handle</label>
                <input 
                  type="text" 
                  required
                  placeholder="logiroute-genetic-optimizer"
                  value={prjSlug}
                  onChange={(e) => setPrjSlug(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 font-mono focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Category Link *</label>
                <select
                  value={prjCategory}
                  onChange={(e) => setPrjCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="AI Solutions">AI Solutions</option>
                  <option value="SaaS">SaaS Platform</option>
                  <option value="Enterprise Software">Enterprise Software Systems</option>
                  <option value="Mobile Applications">Mobile Embedded Apps</option>
                  <option value="Automation Systems">Industrial Automation Systems</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Client / Vertical *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Logistics / Vanguard Corp"
                  value={prjClientName}
                  onChange={(e) => setPrjClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Target Industry Sector *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Supply Chain Automation"
                  value={prjIndustry}
                  onChange={(e) => setPrjIndustry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Thumbnail Image URL *</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                  value={prjThumbnail}
                  onChange={(e) => setPrjThumbnail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Billboard Banner Image URL *</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                  value={prjBanner}
                  onChange={(e) => setPrjBanner(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Compact Executive Summary (SEO Preview) *</label>
              <input 
                type="text" 
                required
                placeholder="RAG-optimized logistics engine achieved 18.5% savings over legacy solvers..."
                value={prjShortSum}
                onChange={(e) => setPrjShortSum(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Detailed Case Overview Scope *</label>
              <textarea 
                rows={3}
                required
                placeholder="Detail high-level operational workflows, stakeholder requirements, deployment context..."
                value={prjOverview}
                onChange={(e) => setPrjOverview(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">The Bottleneck Problem Case *</label>
                <textarea 
                  rows={3}
                  required
                  value={prjProblem}
                  onChange={(e) => setPrjProblem(e.target.value)}
                  placeholder="Existing legacy solvers experienced computational lag bottlenecks and didn't support warm start algorithms..."
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Implemented Solver Solution *</label>
                <textarea 
                  rows={3}
                  required
                  value={prjSolution}
                  onChange={(e) => setPrjSolution(e.target.value)}
                  placeholder="Deployed distributed convolutional heuristic algorithms coupled with auto-scaled route nodes..."
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Specialized System Features (one per line)</label>
                <textarea 
                  rows={3}
                  value={prjFeaturesStr}
                  onChange={(e) => setPrjFeaturesStr(e.target.value)}
                  placeholder="Self-healing routing topologies&#10;Cold-start telemetry tracking"
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Key Quantifiable Value Impacts (one per line)</label>
                <textarea 
                  rows={3}
                  value={prjResultsStr}
                  onChange={(e) => setPrjResultsStr(e.target.value)}
                  placeholder="18% reduction in fossil fuel burn log&#10;99.9% routing SLA match achieved"
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Completion Date *</label>
                <input 
                  type="date"
                  required
                  value={prjCompletionDate}
                  onChange={(e) => setPrjCompletionDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Execution Project Status *</label>
                <select
                  value={prjStatus}
                  onChange={(e) => setPrjStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="planning">📋 Planning Board</option>
                  <option value="in-progress">⚙️ In-Progress Active Dev</option>
                  <option value="completed">✅ Finalized & Deployed</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">System Stacks (Comma separated)</label>
                <input 
                  type="text" 
                  value={prjTechsStr}
                  onChange={(e) => setPrjTechsStr(e.target.value)}
                  placeholder="Kotlin, AWS ElastiCache, Scikit-learn"
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button 
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                {editingId ? 'Push Changes' : 'Record Case'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Projects List */
        <div className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead className="bg-slate-50 border-b text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="p-4 font-bold">Preview</th>
                  <th className="p-4 font-bold">Case Info</th>
                  <th className="p-4 font-bold">Classification</th>
                  <th className="p-4 font-bold">Client Partner</th>
                  <th className="p-4 font-bold">Completion Date</th>
                  <th className="p-4 font-bold">Dev Status</th>
                  <th className="p-4 font-bold text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-650">
                {projects.length > 0 ? (
                  projects.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4">
                        <img 
                          referrerPolicy="no-referrer"
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-14 h-10 object-cover rounded-lg border shadow-sm shrink-0" 
                        />
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{item.title}</p>
                        <p className="text-[10px] font-mono text-slate-400 truncate max-w-xs">{item.shortSummary}</p>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="bg-indigo-50/70 border border-indigo-100/50 text-indigo-700 font-medium rounded-full px-2.5 py-0.5 text-[10px]">{item.category}</span>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-700">{item.clientName}</p>
                        <p className="text-[10px] text-slate-450">{item.industry}</p>
                      </td>
                      <td className="p-4 whitespace-nowrap font-mono">{item.completionDate}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono font-black ${
                          item.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' : 
                          item.status === 'in-progress' ? 'bg-amber-50 text-amber-700 border border-amber-150' :
                          'bg-indigo-50 text-indigo-700 border border-indigo-150'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button 
                            onClick={() => handleEditClick(item)}
                            className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors cursor-pointer"
                            title="Edit metadata"
                          >
                            <LucideIcons.Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(item.id)}
                            className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer"
                            title="Purge case"
                          >
                            <LucideIcons.Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400">
                      <LucideIcons.Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="font-semibold text-xs">No active deliverables registered.</p>
                      <p className="text-[11px] text-slate-400 mt-1">Register delivery node using top right header.</p>
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
