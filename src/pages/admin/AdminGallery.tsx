import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { GalleryItem } from '../../types';
import { apiFetch } from '../../utils/mockFetch';

interface AdminGalleryProps {
  gallery: GalleryItem[];
  refreshData: () => void;
}

export function AdminGallery({ gallery, refreshData }: AdminGalleryProps) {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [crudError, setCrudError] = useState('');
  const [crudSuccess, setCrudSuccess] = useState('');

  // Form states
  const [galImageUrl, setGalImageUrl] = useState('');
  const [galCaption, setGalCaption] = useState('');
  const [galCategory, setGalCategory] = useState<'office' | 'team' | 'ai-lab' | 'events' | 'other'>('ai-lab');
  const [galStatus, setGalStatus] = useState<'active' | 'inactive'>('active');

  const handleCreateNewClick = () => {
    setEditingId(null);
    setGalImageUrl('');
    setGalCaption('');
    setGalCategory('ai-lab');
    setGalStatus('active');
    setCrudError('');
    setCrudSuccess('');
    setIsCreatingNew(true);
  };

  const handleEditClick = (item: GalleryItem) => {
    setCrudError('');
    setCrudSuccess('');
    setEditingId(item.id);
    setGalImageUrl(item.imageUrl);
    setGalCaption(item.caption);
    setGalCategory(item.category);
    setGalStatus(item.status);
    setIsCreatingNew(true);
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setCrudError('');
    setCrudSuccess('');

    const payload = {
      imageUrl: galImageUrl,
      caption: galCaption,
      category: galCategory,
      status: galStatus
    };

    try {
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';
      const method = editingId ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setCrudSuccess(`Laboratory visual asset successfully ${editingId ? 'updated' : 'recorded'} in media facility list.`);
        refreshData();
        setIsCreatingNew(false);
      } else {
        const data = await res.json();
        setCrudError(data.error || 'Failed to register gallery media.');
      }
    } catch (_) {
      setCrudError('Visual assets database pipeline offline.');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Proceed to remove visual facility asset from index?')) return;
    setCrudError('');
    setCrudSuccess('');
    try {
      const res = await apiFetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCrudSuccess('Visual asset de-indexed successfully.');
        refreshData();
      } else {
        setCrudError('Failed to delete visual media.');
      }
    } catch (_) {
      setCrudError('Network transport blocker.');
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in" id="admin-gallery-panel">
      {/* Title bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-150 pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Laboratory Facility Gallery</h2>
          <p className="text-xs text-slate-400 mt-1">Configure active facility and lab showcase pictures, team workshop captures, operations, and caption summaries.</p>
        </div>
        {!isCreatingNew && (
          <button 
            onClick={handleCreateNewClick}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            <LucideIcons.Plus className="w-4 h-4" />
            <span>Add Facility Visual</span>
          </button>
        )}
      </div>

      {/* Feedback notifications */}
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

      {/* Add or edit visuals */}
      {isCreatingNew ? (
        <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSaveGallery} className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3 mb-2">
              <h4 className="font-bold text-sm uppercase font-mono text-indigo-700 tracking-wider">
                {editingId ? 'Modify Visual Asset Reference' : 'Index Laboratory visual Asset'}
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
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Asset Showcase Category *</label>
                <select
                  value={galCategory}
                  onChange={(e) => setGalCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="ai-lab">🧪 Deep Tech & AI Research Lab</option>
                  <option value="team">👥 Team Workshops & Synergy</option>
                  <option value="office">🏢 Facilities & Headquarters</option>
                  <option value="events">🎉 Summits & Industry Panels</option>
                  <option value="other">📦 General Assets</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">System Status Flag *</label>
                <select
                  value={galStatus}
                  onChange={(e) => setGalStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="active">Active Showcase</option>
                  <option value="inactive">Sandbox De-activated</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Asset Image URL *</label>
              <input 
                type="url" 
                required
                placeholder="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fit=crop"
                value={galImageUrl}
                onChange={(e) => setGalImageUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Aesthetic Caption Description *</label>
              <input 
                type="text" 
                required
                placeholder="Heuristic simulation workspace running neural convolution loops on multi-GPU server core..."
                value={galCaption}
                onChange={(e) => setGalCaption(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button 
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel showcase
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                {editingId ? 'Push Changes' : 'Index Visual Asset'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Visual Assets Showcase Grid workspace layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {gallery.length > 0 ? (
            gallery.map((item) => (
              <div key={item.id} className="bg-white border rounded-3xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow relative">
                {/* Visual frame */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden group">
                  <img 
                    referrerPolicy="no-referrer"
                    src={item.imageUrl} 
                    alt={item.caption} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-102" 
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {item.category}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${item.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Content info and controls actions */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 font-medium italic select-none">"{item.caption}"</p>
                  <div className="flex items-center justify-between border-t pt-3 mt-auto">
                    <span className="text-[10px] font-mono text-slate-350 uppercase select-none">id: {item.id}</span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEditClick(item)}
                        className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors cursor-pointer"
                        title="Edit visual meta"
                      >
                        <LucideIcons.Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteGallery(item.id)}
                        className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer"
                        title="Purge asset"
                      >
                        <LucideIcons.Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-16 text-center text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-xs">
              <LucideIcons.Image className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-xs">No visual gallery assets registered.</p>
              <p className="text-[11px] text-slate-400 mt-1">Use the button in the header to register facility laboratory pictures.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
