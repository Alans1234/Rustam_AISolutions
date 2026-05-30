import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';
import { PublicPages } from './components/PublicPages';
import { AdminDashboard } from './components/AdminDashboard';
import { Service, Project, Blog, BlogCategory, GalleryItem, Testimonial, EventItem, ContactInquiry } from './types';
import * as LucideIcons from 'lucide-react';
import { apiFetch } from './utils/mockFetch';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Central Dynamic Database States
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  // Loading indicator states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<string>('');

  // Routing Helpers (Browser pushState wrappers)
  const navigateToPage = (pageName: string) => {
    setCurrentPage(pageName);
    setIsAdminMode(false);
    window.history.pushState(null, '', pageName === 'home' ? '/' : `/${pageName}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToAdmin = (adminMode: boolean) => {
    setIsAdminMode(adminMode);
    if (adminMode) {
      window.history.pushState(null, '', '/admin');
    } else {
      window.history.pushState(null, '', currentPage === 'home' ? '/' : `/${currentPage}`);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Centralized Dynamic Data Fetcher
  const fetchAllData = async () => {
    setIsLoading(true);
    setLoadingError('');
    try {
      const [
        resServices,
        resProjects,
        resBlogs,
        resBlogCategories,
        resGallery,
        resTestimonials,
        resEvents,
        resInquiries
      ] = await Promise.all([
        apiFetch('/api/services'),
        apiFetch('/api/projects'),
        apiFetch('/api/blogs'),
        apiFetch('/api/blog-categories'),
        apiFetch('/api/gallery'),
        apiFetch('/api/testimonials'),
        apiFetch('/api/events'),
        apiFetch('/api/inquiries')
      ]);

      if (
        resServices.ok &&
        resProjects.ok &&
        resBlogs.ok &&
        resBlogCategories.ok &&
        resGallery.ok &&
        resTestimonials.ok &&
        resEvents.ok &&
        resInquiries.ok
      ) {
        const [
          dataServices,
          dataProjects,
          dataBlogs,
          dataBlogCategories,
          dataGallery,
          dataTestimonials,
          dataEvents,
          dataInquiries
        ] = await Promise.all([
          resServices.json(),
          resProjects.json(),
          resBlogs.json(),
          resBlogCategories.json(),
          resGallery.json(),
          resTestimonials.json(),
          resEvents.json(),
          resInquiries.json()
        ]);

        setServices(dataServices);
        setProjects(dataProjects);
        setBlogs(dataBlogs);
        setBlogCategories(dataBlogCategories);
        setGallery(dataGallery);
        setTestimonials(dataTestimonials);
        setEvents(dataEvents);
        setInquiries(dataInquiries);
      } else {
        setLoadingError('One or more dataset streams failed to transmit. Retrying database fetch.');
      }
    } catch (err) {
      console.error('Initial feed failure:', err);
      setLoadingError('Network latency anomaly when contacting server portal.');
    } finally {
      setIsLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchAllData();

    const syncRouteFromUrl = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, '');
      const hash = window.location.hash;

      if (path === 'admin' || hash === '#admin') {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
        const validPages = ['about', 'services', 'projects', 'testimonials', 'events', 'blog', 'gallery', 'contact'];
        if (validPages.includes(path)) {
          setCurrentPage(path);
        } else {
          setCurrentPage('home');
        }
      }
    };

    // Run initial sync on mount
    syncRouteFromUrl();

    window.addEventListener('popstate', syncRouteFromUrl);
    window.addEventListener('hashchange', syncRouteFromUrl);
    return () => {
      window.removeEventListener('popstate', syncRouteFromUrl);
      window.removeEventListener('hashchange', syncRouteFromUrl);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-transparent text-slate-800 antialiased font-sans">
      
      {/* Dynamic Nav link header */}
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={navigateToPage}
        isAdminMode={isAdminMode}
        setIsAdminMode={navigateToAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isLoading && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
            <LucideIcons.Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">Synching Sovereign Data Clusters...</p>
          </div>
        )}

        {!isLoading && loadingError && (
          <div className="max-w-md mx-auto my-20 p-6 bg-rose-50 border border-rose-100 rounded-2xl text-center space-y-4">
            <LucideIcons.AlertTriangle className="w-8 h-8 text-rose-600 mx-auto" />
            <h3 className="font-bold font-display text-slate-850">Database Transmission Failure</h3>
            <p className="text-xs text-slate-650 leading-relaxed font-sans">{loadingError}</p>
            <button 
              onClick={fetchAllData}
              className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-700"
            >
              Re-open Stream Sync
            </button>
          </div>
        )}

        {!isLoading && !loadingError && (
          <>
            {isAdminMode ? (
              <AdminDashboard 
                services={services}
                projects={projects}
                blogs={blogs}
                blogCategories={blogCategories}
                gallery={gallery}
                testimonials={testimonials}
                events={events}
                inquiries={inquiries}
                refreshData={fetchAllData}
              />
            ) : (
              <PublicPages 
                activeSection={currentPage}
                setActiveSection={navigateToPage}
                services={services}
                projects={projects}
                blogs={blogs}
                blogCategories={blogCategories}
                gallery={gallery}
                testimonials={testimonials}
                events={events}
                refreshData={fetchAllData}
              />
            )}
          </>
        )}
      </main>

      {/* Structured Site Footer and Chatbot Widgets */}
      {!isAdminMode && (
        <>
          <Footer 
            setCurrentPage={navigateToPage}
            setIsAdminMode={navigateToAdmin}
          />
          <ChatbotWidget />
        </>
      )}
    </div>
  );
}
