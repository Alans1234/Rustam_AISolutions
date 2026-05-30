import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Blog, BlogCategory } from '../../types';
import { apiFetch } from '../../utils/mockFetch';

interface AdminBlogsProps {
  blogs: Blog[];
  blogCategories: BlogCategory[];
  refreshData: () => void;
}

export function AdminBlogs({ blogs, blogCategories, refreshData }: AdminBlogsProps) {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [crudError, setCrudError] = useState('');
  const [crudSuccess, setCrudSuccess] = useState('');

  // Form states
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogFeaturedImage, setBlogFeaturedImage] = useState('');
  const [blogTagsStr, setBlogTagsStr] = useState('');
  const [blogCategoryId, setBlogCategoryId] = useState('');
  const [blogStatus, setBlogStatus] = useState<'draft' | 'published'>('published');
  const [blogAuthorName, setBlogAuthorName] = useState('Aria Sterling');
  const [blogAuthorRole, setBlogAuthorRole] = useState('Chief Science Officer');
  const [blogAuthorAvatar, setBlogAuthorAvatar] = useState('https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80');

  const handleCreateNewClick = () => {
    setEditingId(null);
    setBlogTitle('');
    setBlogSlug('');
    setBlogContent('');
    setBlogExcerpt('');
    setBlogFeaturedImage('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80');
    setBlogTagsStr('');
    setBlogCategoryId(blogCategories[0]?.id || 'cat1');
    setBlogStatus('published');
    setBlogAuthorName('Aria Sterling');
    setBlogAuthorRole('Chief Science Officer');
    setBlogAuthorAvatar('https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80');
    setCrudError('');
    setCrudSuccess('');
    setIsCreatingNew(true);
  };

  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setBlogSlug(slug);
  };

  const handleEditClick = (item: Blog) => {
    setCrudError('');
    setCrudSuccess('');
    setEditingId(item.id);
    setBlogTitle(item.title);
    setBlogSlug(item.slug);
    setBlogContent(item.content);
    setBlogExcerpt(item.excerpt);
    setBlogFeaturedImage(item.featuredImage);
    setBlogTagsStr(item.tags ? item.tags.join(', ') : '');
    setBlogCategoryId(item.categoryId);
    setBlogStatus(item.status);
    setBlogAuthorName(item.authorName || 'Aria Sterling');
    setBlogAuthorRole(item.authorRole || 'Chief Science Officer');
    setBlogAuthorAvatar(item.authorAvatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80');
    setIsCreatingNew(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setCrudError('');
    setCrudSuccess('');

    const payload = {
      title: blogTitle,
      slug: blogSlug || blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content: blogContent,
      excerpt: blogExcerpt,
      featuredImage: blogFeaturedImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      tags: blogTagsStr.split(',').map(x => x.trim()).filter(Boolean),
      categoryId: blogCategoryId || blogCategories[0]?.id || 'cat1',
      status: blogStatus,
      authorName: blogAuthorName,
      authorRole: blogAuthorRole,
      authorAvatar: blogAuthorAvatar,
      seoTitle: `${blogTitle} | AI Solution Research`,
      seoDescription: blogExcerpt
    };

    try {
      const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';
      const method = editingId ? 'PUT' : 'POST';
      const res = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setCrudSuccess(`Research paper entry successfully ${editingId ? 'updated' : 'recorded'} in peer catalogue.`);
        refreshData();
        setIsCreatingNew(false);
      } else {
        const data = await res.json();
        setCrudError(data.error || 'Failed to submit blog values.');
      }
    } catch (_) {
      setCrudError('Database server interface disconnected.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Proceed to remove research paper entry?')) return;
    setCrudError('');
    setCrudSuccess('');
    try {
      const res = await apiFetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCrudSuccess('Research blog entry purged successfully.');
        refreshData();
      } else {
        setCrudError('Failed to delete research paper.');
      }
    } catch (_) {
      setCrudError('Interfacing exception.');
    }
  };

  const currentCategoryLabel = (catId: string) => {
    const cat = blogCategories.find(c => c.id === catId);
    return cat ? cat.name : 'Uncategorized';
  };

  return (
    <div className="space-y-6 text-left animate-fade-in" id="admin-blogs-panel">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-150 pb-5">
        <div>
          <h2 className="text-2xl font-bold font-display text-slate-900">Research & Journals Catalogue</h2>
          <p className="text-xs text-slate-400 mt-1">Sovereign content writing workspace for expert whitepapers, reports, and team announcements.</p>
        </div>
        {!isCreatingNew && (
          <button 
            onClick={handleCreateNewClick}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            <LucideIcons.Plus className="w-4 h-4" />
            <span>Create Research Paper</span>
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

      {/* Editing or Creation Frame */}
      {isCreatingNew ? (
        <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSaveBlog} className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3 mb-2">
              <h4 className="font-bold text-sm uppercase font-mono text-indigo-700 tracking-wider">
                {editingId ? 'Modify Journal Metadata' : 'Draft Sovereign Whitepaper'}
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
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Scientific Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Implementing Heuristic RAG networks"
                  value={blogTitle}
                  onChange={(e) => {
                    setBlogTitle(e.target.value);
                    generateSlug(e.target.value);
                  }}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Slug URL Resource ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="implementing-heuristic-rag-networks"
                  value={blogSlug}
                  onChange={(e) => setBlogSlug(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 font-mono focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Knowledge Category *</label>
                <select
                  value={blogCategoryId}
                  onChange={(e) => setBlogCategoryId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  {blogCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Tags (Comma Separated)</label>
                <input 
                  type="text" 
                  placeholder="Heuristics, NLP, DeepMind"
                  value={blogTagsStr}
                  onChange={(e) => setBlogTagsStr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Status Directive *</label>
                <select
                  value={blogStatus}
                  onChange={(e) => setBlogStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="draft">📁 Saved Draft Ledger</option>
                  <option value="published">🚀 Published peer whitepaper</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Expert Author Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Dr. Aria Sterling"
                  value={blogAuthorName}
                  onChange={(e) => setBlogAuthorName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Expert Role / Class *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Chief Science Officer"
                  value={blogAuthorRole}
                  onChange={(e) => setBlogAuthorRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Author Avatar URL *</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://images.unsplash.com..."
                  value={blogAuthorAvatar}
                  onChange={(e) => setBlogAuthorAvatar(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Featured Header Image URL *</label>
              <input 
                type="url" 
                required
                placeholder="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format"
                value={blogFeaturedImage}
                onChange={(e) => setBlogFeaturedImage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Excerpt / Synthesis Summary (max 200 chars) *</label>
              <input 
                type="text" 
                required
                placeholder="A summary of convolutional and recurrent networks performance across factory automation scenarios..."
                value={blogExcerpt}
                onChange={(e) => setBlogExcerpt(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:ring-1 focus:ring-indigo-500 outline-none" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block font-bold">Research Content Body (Support rich text description) *</label>
              <textarea 
                rows={10}
                required
                placeholder="Markdown formatted text scientific research data goes here..."
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-3 text-xs text-slate-755 focus:ring-1 focus:ring-indigo-500 outline-none leading-relaxed font-mono" 
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button 
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-650 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel draftholder
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                {editingId ? 'Publish Changes' : 'Publish Whitepaper'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Journal list catalogs */
        <div className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="p-4 font-bold">Featured Image</th>
                  <th className="p-4 font-bold">Scientific Title</th>
                  <th className="p-4 font-bold">Subject field</th>
                  <th className="p-4 font-bold">Author Specialist</th>
                  <th className="p-4 font-bold">Tags</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-center">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-650">
                {blogs.length > 0 ? (
                  blogs.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4">
                        <img 
                          referrerPolicy="no-referrer"
                          src={item.featuredImage} 
                          alt={item.title} 
                          className="w-14 h-10 object-cover rounded-lg border shadow-xs" 
                        />
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{item.title}</p>
                        <p className="text-[10px] font-mono text-slate-400 truncate max-w-xs">{item.excerpt}</p>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="bg-indigo-50 border text-indigo-700 font-medium rounded-full px-2.5 py-0.5 text-[10px]">{currentCategoryLabel(item.categoryId)}</span>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-700">{item.authorName || 'CS Specialist'}</p>
                        <p className="text-[10px] text-slate-400">{item.authorRole || 'R&D Dept'}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((t, idx) => (
                            <span key={idx} className="bg-slate-50 border rounded text-[9px] font-mono text-slate-450 px-1 py-0.5 font-bold tracking-wider">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded text-[9px] uppercase font-mono font-black ${item.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' : 'bg-amber-50 text-amber-500 border border-amber-150'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button 
                            onClick={() => handleEditClick(item)}
                            className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors cursor-pointer"
                            title="Edit whitepaper metadata"
                          >
                            <LucideIcons.Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteBlog(item.id)}
                            className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer"
                            title="Purge article"
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
                      <LucideIcons.BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="font-semibold text-xs">No active whitepapers filed.</p>
                      <p className="text-[11px] text-slate-400 mt-1">Click top right button to file first research report draft.</p>
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
