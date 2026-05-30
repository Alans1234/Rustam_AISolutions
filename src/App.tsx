import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Testimonials from './pages/Testimonials';
import Events from './pages/Events';
import BlogPage from './pages/Blog';
import GalleryPage from './pages/Gallery';
import Contact from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { Service, Project, Blog, BlogCategory, GalleryItem, Testimonial, EventItem, ContactInquiry } from './types';
import * as LucideIcons from 'lucide-react';
import { apiFetch } from './utils/mockFetch';

interface AppContentProps {
  isLoading: boolean;
  loadingError: string;
  fetchAllData: () => Promise<void>;
  services: Service[];
  projects: Project[];
  blogs: Blog[];
  blogCategories: BlogCategory[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  events: EventItem[];
  inquiries: ContactInquiry[];
}

function AppContent({
  isLoading,
  loadingError,
  fetchAllData,
  services,
  projects,
  blogs,
  blogCategories,
  gallery,
  testimonials,
  events,
  inquiries
}: AppContentProps) {
  const location = useLocation();

  // Scroll to top automatically whenever path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAdminMode = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col justify-between bg-transparent text-slate-800 antialiased font-sans">
      
      {/* Dynamic Nav link header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {isLoading && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
            <LucideIcons.Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">Syncing Sovereign Data Clusters...</p>
          </div>
        )}

        {!isLoading && loadingError && (
          <div className="max-w-md mx-auto my-20 p-6 bg-rose-50 border border-rose-100 rounded-2xl text-center space-y-4">
            <LucideIcons.AlertTriangle className="w-8 h-8 text-rose-600 mx-auto" />
            <h3 className="font-bold font-display text-slate-850">Database Transmission Failure</h3>
            <p className="text-xs text-slate-650 leading-relaxed font-sans">{loadingError}</p>
            <button 
              onClick={fetchAllData}
              className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-700 cursor-pointer"
            >
              Re-open Stream Sync
            </button>
          </div>
        )}

        {!isLoading && !loadingError && (
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  services={services} 
                  projects={projects} 
                  testimonials={testimonials} 
                  events={events} 
                />
              } 
            />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services services={services} />} />
            <Route path="/projects" element={<Projects projects={projects} />} />
            <Route path="/testimonials" element={<Testimonials testimonials={testimonials} />} />
            <Route path="/events" element={<Events events={events} />} />
            <Route 
              path="/blog" 
              element={
                <BlogPage 
                  blogs={blogs} 
                  blogCategories={blogCategories} 
                />
              } 
            />
            <Route path="/gallery" element={<GalleryPage gallery={gallery} />} />
            <Route path="/contact" element={<Contact refreshData={fetchAllData} />} />
            <Route 
              path="/admin" 
              element={
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
              } 
            />
            {/* Catch-all sends back to Home */}
            <Route 
              path="*" 
              element={
                <Home 
                  services={services} 
                  projects={projects} 
                  testimonials={testimonials} 
                  events={events} 
                />
              } 
            />
          </Routes>
        )}
      </main>

      {/* Structured Site Footer and Chatbot Widgets */}
      {!isAdminMode && (
        <>
          <Footer />
          <ChatbotWidget />
        </>
      )}
    </div>
  );
}

export default function App() {
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
  }, []);

  return (
    <BrowserRouter>
      <AppContent 
        isLoading={isLoading}
        loadingError={loadingError}
        fetchAllData={fetchAllData}
        services={services}
        projects={projects}
        blogs={blogs}
        blogCategories={blogCategories}
        gallery={gallery}
        testimonials={testimonials}
        events={events}
        inquiries={inquiries}
      />
    </BrowserRouter>
  );
}
