export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  icon: string; // lucide icon name
  shortDescription: string;
  detailedDescription: string;
  features: string[]; // string array
  benefits: string[]; // string array
  technologies: string[]; // string array
  process: string[]; // step workflows
  displayOrder: number;
  status: 'active' | 'inactive';
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'AI Solutions' | 'SaaS' | 'Enterprise Software' | 'Mobile Applications' | 'Automation Systems';
  clientName: string;
  industry: string;
  thumbnail: string;
  bannerImage: string;
  shortSummary: string;
  overview: string;
  businessProblem: string;
  solutionImplemented: string;
  technologiesUsed: string[];
  features: string[];
  resultsAndImpact: string[];
  completionDate: string;
  status: 'planning' | 'in-progress' | 'completed';
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string; // markdown or HTML
  excerpt: string;
  featuredImage: string;
  tags: string[];
  categoryId: string; // relationship to BlogCategory
  status: 'draft' | 'published';
  publishDate: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  category: 'office' | 'team' | 'ai-lab' | 'events' | 'other';
  status: 'active' | 'inactive';
  uploadDate: string;
}

export interface Testimonial {
  id: string;
  clientPhoto: string;
  name: string;
  companyName: string;
  position: string;
  rating: number; // 1-5
  reviewText: string;
  date: string;
  status: 'active' | 'inactive';
}

export interface EventItem {
  id: string;
  name: string;
  banner: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  description: string;
  registrationUrl: string;
  speakers: string[]; // names
  venueDetails?: string;
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  companyName: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

export interface ChatbotKnowledge {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}
