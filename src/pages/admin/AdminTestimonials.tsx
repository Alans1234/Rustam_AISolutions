import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Testimonial } from '../../types';
import { apiFetch } from '../../utils/mockFetch';

interface AdminTestimonialsProps {
  testimonials: Testimonial[];
  refreshData: () => void;
}

export function AdminTestimonials({ testimonials, refreshData }: AdminTestimonialsProps) {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [crudError, setCrudError] = useState('');
  const [crudSuccess, setCrudSuccess] = useState('');

  // Form states
  const [tstName, setTstName] = useState('');
  const [tstCompanyName, setTstCompanyName] = useState('');
  const [tstPosition, setTstPosition] = useState('');
  const [tstPhoto, setTstPhoto] = useState('');
  const [tstRating, setTstRating] = useState(5);
  const [tstReviewText, setTstReviewText] = useState('');
  const [tstStatus, setTstStatus] = useState<'active' | 'inactive'>('active');

  const handleCreateNewClick = () => {
    setEditingId(null);
    setTstName('');
    setTstCompanyName('');
    setTstPosition('');
    setTstPhoto('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80');
    setTstRating(5);
    setTstReviewText('');
    setTstStatus('active');
    setCrudError('');
    setCrudSuccess('');
    setIsCreatingNew(true);
  };

  const handleEditClick = (item: Testimonial) => {
    setCrudError('');
    setCrudSuccess('');
    setEditingId(item.id);
    setTstName(item.name);
    setTstCompanyName(item.companyName);
    setTstPosition(item.position);
    setTstPhoto(item.photo);
    setTstRating(item.rating);
    setTstReviewText(item.reviewText);
    setTstStatus(item.status);
    setIsCreatingNew(true);
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setCrudError('');
    setCrudSuccess('');

    const payload = {
      name: tstName,
      companyName: tstCompanyName,
      position: tstPosition,
      photo: tstPhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      rating: Number(tstRating),
      reviewText: tstReviewText,
      status: tstStatus
    };

    try {
      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';
      const method = editingId ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setCrudSuccess(`Endorsement safely ${editingId ? 'updated' : 'recorded'} in client review log.`);
        refreshData();
        setIsCreatingNew(false);
      } else {
        const data = await res.json();
        setCrudError(data.error || 'Failed to submit feedback.');
      }
    } catch (_) {
      setCrudError('Database server interface disconnected.');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to permanently purge this testimonial? This action is irreversible.')) return;
    setCrudError('');
    setCrudSuccess('');
    try {
      const res = await apiFetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCrudSuccess('Endorsement review record removed from feed.');
        refreshData();
      } else {
        setCrudError('Failed to delete feed review.');
      }
    } catch (_) {
      setCrudError('Interfacing exception.');
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in" id="admin-testimonials-panel">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-150 pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Client Reviews & Testimonials</h2>
          <p className="text-xs text-slate-400 mt-1">Review validation scores, edit user endorsements, positions, star ratings, and approvals.</p>
        </div>
        {!isCreatingNew && (
          <button 
            onClick={handleCreateNewClick}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            <LucideIcons.Plus className="w-4 h-4" />
            <span>Record Client Feedback</span>
          </button>
        )}
      </div>

      {/* Alert states */}
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

      {/* Testimonial Forms */}
      {isCreatingNew ? (
        <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSaveTestimonial} className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3 mb-2">
              <h4 className="font-bold text-sm uppercase font-mono text-indigo-700 tracking-wider">
                {editingId ? 'Modify Feedback Details' : 'Record Client Endorsement'}
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5 font-sans">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Contact Person Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Raymond Fowler"
                  value={tstName}
                  onChange={(e) => setTstName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5 font-sans">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Company / Enterprise Corp *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Vanguard Heuristics Corp"
                  value={tstCompanyName}
                  onChange={(e) => setTstCompanyName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5 font-sans">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Corporate Role / Position *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Chief Logistics Analyst"
                  value={tstPosition}
                  onChange={(e) => setTstPosition(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">System Star Rating *</label>
                <select
                  value={tstRating}
                  onChange={(e) => setTstRating(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value={5}>⭐️⭐️⭐️⭐️⭐️ (5 Star Maximum)</option>
                  <option value={4}>⭐️⭐️⭐️⭐️ (4 Star Professional)</option>
                  <option value={3}>⭐️⭐️⭐️ (3 Star Operational)</option>
                  <option value={2}>⭐️⭐️ (2 Star Weak)</option>
                  <option value={1}>⭐️ (1 Star Critical Exception)</option>
                </select>
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Photo/Avatar URL *</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={tstPhoto}
                  onChange={(e) => setTstPhoto(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Testimonial Review Text *</label>
              <textarea 
                rows={4}
                required
                placeholder="We integrated their convolution networks, boosting delivery yields. The team worked with stellar SLA support..."
                value={tstReviewText}
                onChange={(e) => setTstReviewText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none leading-relaxed" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Active Approval Status Directive *</label>
              <select
                value={tstStatus}
                onChange={(e) => setTstStatus(e.target.value as any)}
                className="w-full bg-slate-50 border border-[#FAF4EB] rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
              >
                <option value="active">Approved for Portfolio Carousel</option>
                <option value="inactive">Sandbox De-activated</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button 
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel Review
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                {editingId ? 'Push Changes' : 'Record Feedback'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Testimonials catalogs list */
        <div className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="p-4 font-bold">Client Avatar</th>
                  <th className="p-4 font-bold">Sender Name</th>
                  <th className="p-4 font-bold">Company / Context</th>
                  <th className="p-4 font-bold">Rating Score</th>
                  <th className="p-4 font-bold">Review Quote</th>
                  <th className="p-4 font-bold">Display SLA</th>
                  <th className="p-4 font-bold text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-650">
                {testimonials.length > 0 ? (
                  testimonials.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4">
                        <img 
                          referrerPolicy="no-referrer"
                          src={item.photo} 
                          alt={item.name} 
                          className="w-10 h-10 object-cover rounded-full border shadow-xs" 
                        />
                      </td>
                      <td className="p-4 font-bold text-slate-800">{item.name}</td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-700">{item.companyName}</p>
                        <p className="text-[10px] font-mono text-slate-400">{item.position}</p>
                      </td>
                      <td className="p-4 whitespace-nowrap font-mono text-amber-500 font-bold">
                        {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                      </td>
                      <td className="p-4 max-w-sm">
                        <p className="line-clamp-2 italic" title={item.reviewText}>"{item.reviewText}"</p>
                      </td>
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
                            title="Edit Review"
                          >
                            <LucideIcons.Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteTestimonial(item.id)}
                            className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer"
                            title="Purge review"
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
                      <LucideIcons.Star className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="font-semibold text-xs">No customer reviews filed.</p>
                      <p className="text-[11px] text-slate-400 mt-1">Use the header button to log the first validated customer review feedback.</p>
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
