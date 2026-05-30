import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Service } from '../../types';
import { apiFetch } from '../../utils/mockFetch';

interface AdminServicesProps {
  services: Service[];
  refreshData: () => void;
}

export function AdminServices({ services, refreshData }: AdminServicesProps) {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [crudError, setCrudError] = useState('');
  const [crudSuccess, setCrudSuccess] = useState('');

  // Form states
  const [srvName, setSrvName] = useState('');
  const [srvSlug, setSrvSlug] = useState('');
  const [srvIcon, setSrvIcon] = useState('Cpu');
  const [srvShortDesc, setSrvShortDesc] = useState('');
  const [srvDetailedDesc, setSrvDetailedDesc] = useState('');
  const [srvFeaturesStr, setSrvFeaturesStr] = useState('');
  const [srvBenefitsStr, setSrvBenefitsStr] = useState('');
  const [srvTechsStr, setSrvTechsStr] = useState('');
  const [srvProcessStr, setSrvProcessStr] = useState('');
  const [srvDisplayOrder, setSrvDisplayOrder] = useState(1);
  const [srvStatus, setSrvStatus] = useState<'active' | 'inactive'>('active');

  const handleCreateNewClick = () => {
    setEditingId(null);
    setSrvName('');
    setSrvSlug('');
    setSrvIcon('Cpu');
    setSrvShortDesc('');
    setSrvDetailedDesc('');
    setSrvFeaturesStr('');
    setSrvBenefitsStr('');
    setSrvTechsStr('');
    setSrvProcessStr('');
    setSrvDisplayOrder(services.length + 1);
    setSrvStatus('active');
    setCrudError('');
    setCrudSuccess('');
    setIsCreatingNew(true);
  };

  const generateSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setSrvSlug(slug);
  };

  const handleEditClick = (item: Service) => {
    setCrudError('');
    setCrudSuccess('');
    setEditingId(item.id);
    setSrvName(item.name);
    setSrvSlug(item.slug);
    setSrvIcon(item.icon);
    setSrvShortDesc(item.shortDescription);
    setSrvDetailedDesc(item.detailedDescription);
    setSrvFeaturesStr(item.features ? item.features.join('\n') : '');
    setSrvBenefitsStr(item.benefits ? item.benefits.join('\n') : '');
    setSrvTechsStr(item.technologies ? item.technologies.join(', ') : '');
    setSrvProcessStr(item.process ? item.process.join('\n') : '');
    setSrvDisplayOrder(item.displayOrder);
    setSrvStatus(item.status);
    setIsCreatingNew(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setCrudError('');
    setCrudSuccess('');

    const payload = {
      name: srvName,
      slug: srvSlug || srvName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      icon: srvIcon,
      shortDescription: srvShortDesc,
      detailedDescription: srvDetailedDesc,
      features: srvFeaturesStr.split('\n').map(x => x.trim()).filter(Boolean),
      benefits: srvBenefitsStr.split('\n').map(x => x.trim()).filter(Boolean),
      technologies: srvTechsStr.split(',').map(x => x.trim()).filter(Boolean),
      process: srvProcessStr.split('\n').map(x => x.trim()).filter(Boolean),
      displayOrder: Number(srvDisplayOrder),
      status: srvStatus
    };

    try {
      const url = editingId ? `/api/services/${editingId}` : '/api/services';
      const method = editingId ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setCrudSuccess(`Service successfully ${editingId ? 'updated' : 'created'} in core index.`);
        refreshData();
        setIsCreatingNew(false);
      } else {
        const data = await res.json();
        setCrudError(data.error || 'Failed to submit service node parameters.');
      }
    } catch (_) {
      setCrudError('Connection pipeline broke during transaction.');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you absolutely sure you want to delete this service? This action is irreversible.')) return;
    setCrudError('');
    setCrudSuccess('');
    try {
      const res = await apiFetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCrudSuccess('Service catalog entry successfully deleted.');
        refreshData();
      } else {
        setCrudError('Failed to delete service entry.');
      }
    } catch (_) {
      setCrudError('Network routing exception.');
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in" id="admin-services-panel">
      {/* Directory Title bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-150 pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Services Configuration Core</h2>
          <p className="text-xs text-slate-400 mt-1">Configure service detail blueprints, descriptions, active icons, & display indices.</p>
        </div>
        {!isCreatingNew && (
          <button 
            onClick={handleCreateNewClick}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            <LucideIcons.Plus className="w-4 h-4" />
            <span>Create Core Service Node</span>
          </button>
        )}
      </div>

      {/* Notifications block */}
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

      {/* Dynamic Workspace Container */}
      {isCreatingNew ? (
        <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSaveService} className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3 mb-2">
              <h4 className="font-bold text-sm uppercase font-mono text-indigo-700 tracking-wider">
                {editingId ? 'Modify Service Blueprint' : 'Register New Core Service'}
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
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Service Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Predictive Maintenance Engines"
                  value={srvName}
                  onChange={(e) => {
                    setSrvName(e.target.value);
                    generateSlug(e.target.value);
                  }}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Slug URL Handle (Auto-generated)</label>
                <input 
                  type="text" 
                  required
                  placeholder="predictive-maintenance-engines"
                  value={srvSlug}
                  onChange={(e) => setSrvSlug(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 font-mono focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Lucide Icon Selection *</label>
                <select
                  value={srvIcon}
                  onChange={(e) => setSrvIcon(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="Cpu">Cpu (Standard Processor)</option>
                  <option value="TrendingUp">TrendingUp (Predictive Analytics)</option>
                  <option value="Zap">Zap (Process Automation)</option>
                  <option value="MessageSquare">MessageSquare (Autonomous Agent)</option>
                  <option value="Eye">Eye (Computer Vision Deep Lab)</option>
                  <option value="BarChart2">BarChart2 (Enterprise Business BI)</option>
                  <option value="HardDrive">HardDrive (Edge Solutions)</option>
                  <option value="Network">Network (RAG Knowledge Net)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">SLA Display Order *</label>
                <input 
                  type="number" 
                  required
                  value={srvDisplayOrder}
                  onChange={(e) => setSrvDisplayOrder(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Active Status Directive *</label>
                <select
                  value={srvStatus}
                  onChange={(e) => setSrvStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="active">Active catalogue</option>
                  <option value="inactive">Sandbox De-activated</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Short Description Summary (Frontpage Previews - Max 150 chars) *</label>
              <input 
                type="text" 
                required
                placeholder="Compact overview of service utility features shown on portfolio widgets..."
                value={srvShortDesc}
                onChange={(e) => setSrvShortDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Detailed Service Description *</label>
              <textarea 
                rows={4}
                required
                placeholder="Explain the detailed scope of technology, system workflows, custom models utilized, and delivery process..."
                value={srvDetailedDesc}
                onChange={(e) => setSrvDetailedDesc(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none leading-relaxed" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Key Architectural Modules (One per line) *</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Defect Isolation Core&#10;YOLO Edge Capture&#10;Alert logs pipelines"
                  value={srvFeaturesStr}
                  onChange={(e) => setSrvFeaturesStr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Client Value Propositions (One per line) *</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="98.5% defect isolation rate achieved&#10;Reduction in hardware fatigue logging"
                  value={srvBenefitsStr}
                  onChange={(e) => setSrvBenefitsStr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Systems Execution Process Pipeline (One phase per line) *</label>
              <textarea 
                rows={3}
                required
                placeholder="Phase 1: Factory layout capture and camera metrics&#10;Phase 2: Custom convolution weights mapping&#10;Phase 3: Production line RAG deployment"
                value={srvProcessStr}
                onChange={(e) => setSrvProcessStr(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Technologies Utilized (Comma separated values) *</label>
              <input 
                type="text" 
                required
                placeholder="Python, PyTorch, OpenCV, TensorRT, YOLOv8"
                value={srvTechsStr}
                onChange={(e) => setSrvTechsStr(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
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
                {editingId ? 'Push Changes' : 'Register Service'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* List Catalog table showing active nodes */
        <div className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="p-4 font-bold">Active Icon</th>
                  <th className="p-4 font-bold">Service Details</th>
                  <th className="p-4 font-bold">Short Summary</th>
                  <th className="p-4 font-bold">Tech Deck</th>
                  <th className="p-4 font-bold">Index Row</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-650">
                {services.length > 0 ? (
                  [...services]
                    .sort((a,b) => a.displayOrder - b.displayOrder)
                    .map((item) => {
                      const LucideComp = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50/75 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm">
                              <LucideComp className="w-5 h-5" />
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-slate-800">{item.name}</p>
                            <p className="text-[10px] font-mono text-slate-400">slug: {item.slug}</p>
                          </td>
                          <td className="p-4 max-w-xs truncate" title={item.shortDescription}>{item.shortDescription}</td>
                          <td className="p-4 whitespace-normal">
                            <div className="flex flex-wrap gap-1">
                              {item.technologies.slice(0, 3).map((t, idx) => (
                                <span key={idx} className="bg-slate-50 text-slate-500 font-mono border border-slate-200/50 rounded px-1 text-[9px] uppercase font-bold">{t}</span>
                              ))}
                              {item.technologies.length > 3 && <span className="text-[9px] text-slate-400 font-bold">+{item.technologies.length - 3}</span>}
                            </div>
                          </td>
                          <td className="p-4 font-mono font-bold text-indigo-600 text-center">{item.displayOrder}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded text-[9px] uppercase font-mono font-black ${item.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' : 'bg-slate-50 text-slate-400'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center space-x-1.5">
                              <button 
                                onClick={() => handleEditClick(item)}
                                className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors cursor-pointer"
                                title="Edit Blueprint"
                              >
                                <LucideIcons.Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteService(item.id)}
                                className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer"
                                title="Remove blueprint"
                              >
                                <LucideIcons.Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400">
                      <LucideIcons.Cpu className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="font-semibold text-xs">No active service nodes configured.</p>
                      <p className="text-[11px] text-slate-400 mt-1">Click top right button to create first node catalog registry.</p>
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
