import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { Db } from './server/db.ts';

const app = express();
const PORT = 3000;

// Standard body parser
app.use(express.json({ limit: '10mb' }));

// Utility logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Lazy load Gemini API
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY' && key.trim() !== '') {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// ================= PRIVATE DATA / ADMIN BACKEND API ROUTES =================

// Public lists
app.get('/api/services', (req, res) => {
  res.json(Db.getServices());
});

app.get('/api/projects', (req, res) => {
  res.json(Db.getProjects());
});

app.get('/api/blogs', (req, res) => {
  // Return published blogs, or if query isAdmin=true, return all
  const blogs = Db.getBlogs();
  if (req.query.isAdmin === 'true') {
    res.json(blogs);
  } else {
    res.json(blogs.filter(b => b.status === 'published'));
  }
});

app.get('/api/blog-categories', (req, res) => {
  res.json(Db.getBlogCategories());
});

app.get('/api/gallery', (req, res) => {
  res.json(Db.getGallery());
});

app.get('/api/testimonials', (req, res) => {
  res.json(Db.getTestimonials());
});

app.get('/api/events', (req, res) => {
  res.json(Db.getEvents());
});

app.get('/api/inquiries', (req, res) => {
  res.json(Db.getContactInquiries());
});

// Add inquiry (Public Form)
app.post('/api/inquiries', (req, res) => {
  const { fullName, emailAddress, phoneNumber, companyName, subject, message } = req.body;
  if (!fullName || !emailAddress || !subject || !message) {
    return res.status(400).json({ error: 'Missing required validation fields.' });
  }
  const newInq = Db.addContactInquiry({
    id: 'inq_' + Date.now(),
    fullName,
    emailAddress,
    phoneNumber: phoneNumber || '',
    companyName: companyName || '',
    subject,
    message,
    date: new Date().toISOString(),
    status: 'new'
  });
  res.status(201).json(newInq);
});

// Admin Authentication mockup (simple secure validation matching Aria Sterling & password)
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@aisolution.com' && password === 'admin123') {
    res.json({
      token: 'admin_tok_99182a',
      user: { id: 'u1', email: 'admin@aisolution.com', name: 'Aria Sterling', role: 'admin' }
    });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials. Use admin@aisolution.com & password admin123' });
  }
});

// CREATE / UPDATE / DELETE Services
app.post('/api/services', (req, res) => {
  const item = req.body;
  item.id = 'srv_' + Date.now();
  const created = Db.addService(item);
  res.status(201).json(created);
});
app.put('/api/services/:id', (req, res) => {
  const updated = Db.updateService(req.params.id, req.body);
  res.json(updated);
});
app.delete('/api/services/:id', (req, res) => {
  Db.deleteService(req.params.id);
  res.json({ success: true });
});

// CREATE / UPDATE / DELETE Projects
app.post('/api/projects', (req, res) => {
  const item = req.body;
  item.id = 'prj_' + Date.now();
  const created = Db.addProject(item);
  res.status(201).json(created);
});
app.put('/api/projects/:id', (req, res) => {
  const updated = Db.updateProject(req.params.id, req.body);
  res.json(updated);
});
app.delete('/api/projects/:id', (req, res) => {
  Db.deleteProject(req.params.id);
  res.json({ success: true });
});

// CREATE / UPDATE / DELETE Blogs
app.post('/api/blogs', (req, res) => {
  const item = req.body;
  item.id = 'blog_' + Date.now();
  item.publishDate = new Date().toISOString().split('T')[0];
  const created = Db.addBlog(item);
  res.status(201).json(created);
});
app.put('/api/blogs/:id', (req, res) => {
  const updated = Db.updateBlog(req.params.id, req.body);
  res.json(updated);
});
app.delete('/api/blogs/:id', (req, res) => {
  Db.deleteBlog(req.params.id);
  res.json({ success: true });
});

// CREATE / UPDATE / DELETE Gallery Items
app.post('/api/gallery', (req, res) => {
  const item = req.body;
  item.id = 'gal_' + Date.now();
  item.uploadDate = new Date().toISOString().split('T')[0];
  const created = Db.addGalleryItem(item);
  res.status(201).json(created);
});
app.put('/api/gallery/:id', (req, res) => {
  const updated = Db.updateGalleryItem(req.params.id, req.body);
  res.json(updated);
});
app.delete('/api/gallery/:id', (req, res) => {
  Db.deleteGalleryItem(req.params.id);
  res.json({ success: true });
});

// CREATE / UPDATE / DELETE Testimonials
app.post('/api/testimonials', (req, res) => {
  const item = req.body;
  item.id = 'tst_' + Date.now();
  item.date = new Date().toISOString().split('T')[0];
  const created = Db.addTestimonial(item);
  res.status(201).json(created);
});
app.put('/api/testimonials/:id', (req, res) => {
  const updated = Db.updateTestimonial(req.params.id, req.body);
  res.json(updated);
});
app.delete('/api/testimonials/:id', (req, res) => {
  Db.deleteTestimonial(req.params.id);
  res.json({ success: true });
});

// CREATE / UPDATE / DELETE Events
app.post('/api/events', (req, res) => {
  const item = req.body;
  item.id = 'evt_' + Date.now();
  const created = Db.addEvent(item);
  res.status(201).json(created);
});
app.put('/api/events/:id', (req, res) => {
  const updated = Db.updateEvent(req.params.id, req.body);
  res.json(updated);
});
app.delete('/api/events/:id', (req, res) => {
  Db.deleteEvent(req.params.id);
  res.json({ success: true });
});

// DELETE Contact Inquiries
app.delete('/api/inquiries/:id', (req, res) => {
  Db.deleteContactInquiry(req.params.id);
  res.json({ success: true });
});

// ================= CHATBOT WITH DYNAMIC PROMPT GROUNDING =================

app.post('/api/chat', async (req, res) => {
  const { messages, userContext } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages parameter is required.' });
  }

  // Gather current database contents to ground Gemini
  const services = Db.getServices();
  const projects = Db.getProjects();
  const blogs = Db.getBlogs();
  const testimonials = Db.getTestimonials();
  const events = Db.getEvents();

  // Create highly structured Knowledge Grounding payload
  const companyKnowledgeContext = `
You are the AI Solution Specialist Chatbot, representing "AI Solution"—a premium enterprise AI consultancy.
Your goal is to answer client questions strictly, professionally, and gracefully.

Here is the real-time company ground knowledge:
--- SERVICES WE OFFER ---
${services.map(s => `* [${s.name}]: ${s.shortDescription}\n  Key Features: ${s.features.join(', ')}\n  Benefits: ${s.benefits.join(', ')}`).join('\n')}

--- SUCCESS AND IMPACT PROJECTS COMPLETED ---
${projects.map(p => `* Project [${p.title}] (Category: ${p.category})\n  Summary: ${p.shortSummary}\n  Result and Impact: ${p.resultsAndImpact.join(', ')}`).join('\n')}

--- UPCOMING AND HISTORIC EVENTS ---
${events.map(e => `* Event: "${e.name}" at ${e.location} on ${e.date} (${e.time})`).join('\n')}

--- RECENT EXPERT INSIGHT BLOGS ---
${blogs.map(b => `* Blog post: "${b.title}" written by ${b.authorName} (${b.authorRole})`).join('\n')}

--- WHAT CLIENTS SAY (TESTIMONIALS) ---
${testimonials.map(t => `* "${t.reviewText}" - Review by ${t.name}, ${t.position} at ${t.companyName}`).join('\n')}

--- HOW PEOPLE CAN CONTACT US ---
* Office location: Seattle, WA
* Office hours: Monday - Friday, 09:00 AM - 06:00 PM PST
* General Inquiries Form: Active on the Contact page
* Public Hotline phone: (206) 555-0199 or email: contact@aisolution.com

GUIDELINES FOR CHATBOT BEHAVIOR:
1. Speak clearly, professionally, and reassuringly.
2. If the user wants to get in touch, or requests a pricing proposal, or asks you to register their contact info, ALWAYS invite them to provide their Full Name, Email, Phone, Company, and inquiry details directly in the chat! If they give them, respond confirmingly: "Thank you! I have successfully registered your inquiry in our central client management system."
3. Encourage them to look at specific Services and Projects. Give clear, direct references.
4. Keep answers moderately concise and elegantly structured in markdown.
`;

  // Get User Prompt
  const lastUserMessage = messages[messages.length - 1]?.content || '';

  // Check if user is logging a lead during chat (simple name/email parser indicator)
  // Or check if user literally stated contact info.
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const hasEmail = emailRegex.test(lastUserMessage);
  if (hasEmail) {
    // Collect inquiry from message text as automated Lead Generation!
    try {
      const emailMatch = lastUserMessage.match(emailRegex);
      const email = emailMatch ? emailMatch[0] : 'parsed@chat.com';
      Db.addContactInquiry({
        id: 'inq_chat_' + Date.now(),
        fullName: 'Lead from Chatbot',
        emailAddress: email,
        phoneNumber: 'Provided in Chat',
        companyName: 'Chatbot Referral',
        subject: 'Automated Lead qualification from AI Specialist',
        message: `This inquiry was auto-generated during a conversation: "${lastUserMessage}"`,
        date: new Date().toISOString(),
        status: 'new'
      });
    } catch (_) {
      // safe fallback
    }
  }

  // Attempt to call Gemini API
  const client = getGeminiClient();
  if (!client) {
    // Graceful fallback if no API key is specified yet.
    // Standard AI responses to keep testing 100% operational
    let answer = '';
    const query = lastUserMessage.toLowerCase();
    if (query.includes('service') || query.includes('offer')) {
      answer = `We offer premium AI Solutions including:\n1. **AI Development & Integration**: Sovereign generative layouts and private agents.\n2. **Machine Learning Solutions**: Advanced predictive analytics.\n3. **Intelligent Process Automation**: Intelligent cloud bots converting paperwork into structured data.\n\n*(Note: Gemini API key not yet connected. Configure it in the Secrets panel for real-time generative responses)*`;
    } else if (query.includes('project') || query.includes('work')) {
      answer = `Our flagship completed systems include:\n- **PulseAnalytics Core**: Visual prediction engine for global retail.\n- **LogiRoute-AI**: Dynamic routing genetic solver cut-down delivery logistics fuel expenditure by 18%.\n- **MediScan**: radiology imaging pre-classifier with 99.5% accuracy.\n\n*(Note: Gemini API key is currently in sandbox mode)*`;
    } else {
      answer = `Hello! Welcome to **AI Solution**. I am your premium AI Specialist Assistant. I can help answer questions about our advanced AI integrations, machine learning modules, custom workflows, or cataloged projects.\n\n*(Note: Please configure your GEMINI_API_KEY inside the Secrets panel to activate full RAG intelligence)*`;
    }
    return res.json({ text: answer });
  }

  try {
    // Map existing React-style messages into the Gemini contents array.
    const contents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Generate content using gemini-3.5-flash as specified in the guidelines
    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: companyKnowledgeContext,
        temperature: 0.7
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API call failed:', error);
    res.status(500).json({ error: 'Failed when communicating with Gemini API', details: error.message });
  }
});

// ================= VITE ASSET MIDDLEWARE FOR SPA ROUTING =================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI Solution] Full-stack Server responding live at http://0.0.0.0:${PORT}`);
  });
}

startServer();
