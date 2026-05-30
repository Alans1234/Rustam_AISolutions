import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Blog, BlogCategory } from '../types';

interface BlogPageProps {
  blogs: Blog[];
  blogCategories: BlogCategory[];
}

export default function BlogPage({ blogs, blogCategories }: BlogPageProps) {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCatFilter, setBlogCatFilter] = useState('all');

  const formatFriendlyDate = (rawDate: string) => {
    try {
      const d = new Date(rawDate);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (_) {
      return rawDate;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in" id="blog-page-root">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Expert Intelligence</span>
        <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Insights, Architecture & Whitepapers</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Read technical whitepapers on multi-agent synchronization and sovereign semantic vector search pipelines.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-150 flex flex-col md:flex-row gap-4 items-center justify-between text-left">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <LucideIcons.Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search research logs..."
            value={blogSearch}
            onChange={(e) => setBlogSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/50 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-slate-700"
          />
        </div>
        {/* Category Selects */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button 
            onClick={() => setBlogCatFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              blogCatFilter === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Papers
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setBlogCatFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                blogCatFilter === cat.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid list sorted newest publish date first */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {blogs
          .filter(b => {
            const matchesSearch = b.title.toLowerCase().includes(blogSearch.toLowerCase()) || b.content.toLowerCase().includes(blogSearch.toLowerCase());
            const matchesCategory = blogCatFilter === 'all' || b.categoryId === blogCatFilter;
            return matchesSearch && matchesCategory;
          })
          .sort((a,b) => b.publishDate.localeCompare(a.publishDate))
          .map((b) => (
            <div 
              key={b.id}
              onClick={() => setSelectedBlog(b)}
              className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row text-left hover:border-indigo-200"
            >
              <img 
                src={b.featuredImage} 
                alt={b.title} 
                className="w-full md:w-48 h-full object-cover shrink-0 min-h-[160px]"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase">
                    {blogCategories.find(cat => cat.id === b.categoryId)?.name || 'Whitepaper'}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug line-clamp-2">{b.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-2">{b.excerpt}</p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>{formatFriendlyDate(b.publishDate)}</span>
                  <span>{b.readTime}</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Blog Screen Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col text-left">
            <div className="relative h-64 shrink-0">
              <img 
                src={selectedBlog.featuredImage} 
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-8">
                <div>
                  <span className="px-2.5 py-1 bg-indigo-500 text-white text-[10px] font-mono uppercase font-bold rounded">
                    {blogCategories.find(c => c.id === selectedBlog.categoryId)?.name || 'Insight'}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-white mt-1.5 leading-snug">{selectedBlog.title}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-slate-800 transition-colors cursor-pointer"
              >
                <LucideIcons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Author Box */}
              <div className="flex items-center space-x-3.5 pb-6 border-b border-slate-100 text-left">
                <img 
                  src={selectedBlog.authorAvatar} 
                  alt={selectedBlog.authorName} 
                  className="w-11 h-11 rounded-full object-cover border"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="text-sm font-bold text-slate-800">{selectedBlog.authorName}</h5>
                  <p className="text-xs text-slate-400">{selectedBlog.authorRole} • {formatFriendlyDate(selectedBlog.publishDate)}</p>
                </div>
                <div className="ml-auto text-xs font-mono text-slate-500">
                  {selectedBlog.readTime}
                </div>
              </div>

              {/* Blog content parser */}
              <div className="text-sm text-slate-600 leading-relaxed font-sans space-y-4 text-left">
                {selectedBlog.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('## ')) {
                    return <h4 key={i} className="text-lg font-bold font-display text-slate-800 pt-4 pb-1">{para.substring(3)}</h4>;
                  }
                  if (para.startsWith('### ')) {
                    return <h5 key={i} className="text-base font-bold font-display text-slate-800 pt-2 pb-1">{para.substring(4)}</h5>;
                  }
                  if (para.startsWith('```')) {
                    const block = para.replaceAll('```', '');
                    return (
                      <pre key={i} className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl font-mono text-xs overflow-x-auto text-indigo-900 my-4">
                        <code>{block}</code>
                      </pre>
                    );
                  }
                  if (para.startsWith('* ')) {
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-1">
                        {para.split('\n').map((li, idx) => (
                          <li key={idx} className="text-xs text-slate-600">{li.substring(2)}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 text-left">
                {selectedBlog.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-50 border text-[10px] font-mono text-slate-400 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
              <span className="text-xs text-slate-400 font-mono">SEOLink: {selectedBlog.slug}</span>
              <button 
                onClick={() => setSelectedBlog(null)}
                className="px-5 py-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Close Insights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
