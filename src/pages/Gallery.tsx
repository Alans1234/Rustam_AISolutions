import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryProps {
  gallery: GalleryItem[];
}

export default function GalleryPage({ gallery }: GalleryProps) {
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'office' | 'team' | 'ai-lab' | 'events'>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in" id="gallery-page-root">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono tracking-widest text-indigo-600 uppercase font-bold">Laboratory Media</span>
        <h1 className="text-4xl font-bold font-display tracking-tight text-slate-800">Laboratory & Sovereign Facility Media</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Take a visual tour inside our Computer Vision Sandbox, flagship Seattle server nodes, and team workspaces.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {(['all', 'office', 'team', 'ai-lab', 'events'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setGalleryFilter(filter)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase font-mono tracking-wider cursor-pointer ${
              galleryFilter === filter 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100'
            }`}
          >
            {filter === 'all' ? 'All Areas' : filter.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Masonry-equivalent Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
        {gallery
          .filter(item => galleryFilter === 'all' || item.category === galleryFilter)
          .map((item) => (
            <div 
              key={item.id} 
              onClick={() => setLightboxImage(item)}
              className="bg-white border rounded-2xl overflow-hidden p-2.5 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="overflow-hidden rounded-xl h-52">
                <img 
                  src={item.imageUrl} 
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="pt-3 px-2 text-left space-y-1">
                <span className="text-[9px] font-mono bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase">{item.category}</span>
                <p className="text-[11px] text-slate-600 font-medium leading-normal line-clamp-2 mt-1">{item.caption}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Gallery Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-3 bg-white/10 rounded-full hover:bg-white text-white hover:text-slate-900 transition-colors cursor-pointer"
            >
              <LucideIcons.X className="w-5 h-5" />
            </button>
            <img 
              src={lightboxImage.imageUrl} 
              alt={lightboxImage.caption}
              className="max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center text-white px-6 max-w-xl">
              <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase font-semibold">
                Category: {lightboxImage.category}
              </span>
              <p className="text-sm font-medium mt-1 leading-relaxed text-slate-300">{lightboxImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
