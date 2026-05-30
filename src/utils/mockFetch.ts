import { Service, Project, Blog, BlogCategory, GalleryItem, Testimonial, EventItem, ContactInquiry } from '../types';

export const SEED_DATA = {
  blogCategories: [
    { id: 'cat1', name: 'Artificial Intelligence', slug: 'artificial-intelligence' },
    { id: 'cat2', name: 'Machine Learning', slug: 'machine-learning' },
    { id: 'cat3', name: 'Business Automation', slug: 'business-automation' },
    { id: 'cat4', name: 'Cloud & Infrastructure', slug: 'cloud-infrastructure' }
  ] as BlogCategory[],
  services: [
    {
      id: 'srv1',
      name: 'AI Development & Integration',
      slug: 'ai-development',
      icon: 'Cpu',
      shortDescription: 'Catered generative models and autonomous agents custom-tailored for your proprietary enterprise data and platforms.',
      detailedDescription: 'We build sovereign generative AI applications and agentic systems utilizing proprietary data backends. Our solutions range from tailored private LLM deployments to multi-agent orchestrations that securely automate complex cross-departmental operations.',
      features: [
        'Custom Fine-Tuning & Prompt Engineering',
        'Sovereign Private LLM Deployment',
        'Agentic Workflow Orchestration',
        'Secure Retrieval-Augmented Generation (RAG)',
        'Cognitive Process Search Protocols'
      ],
      benefits: [
        '100% data compliance and protection within virtual private clouds',
        'Automated document search with zero hallucination probability',
        'Up to 80% reduction in knowledge-retrieval latency'
      ],
      technologies: ['Gemini Pro API', 'PyTorch', 'LangChain', 'Pinecone', 'Docker', 'Kubernetes'],
      process: [
        'Information audit and system compatibility review',
        'Model selection and embedding architecture setup',
        'Private beta deployment and RLHF refinement',
        'Full production system migration and continuous audit'
      ],
      displayOrder: 1,
      status: 'active'
    },
    {
      id: 'srv2',
      name: 'Machine Learning Solutions',
      slug: 'machine-learning-solutions',
      icon: 'TrendingUp',
      shortDescription: 'Predictive modeling, custom recommendation engines, and high-frequency deep learning system architecture.',
      detailedDescription: 'Turn historic database logs into self-correcting business superpowers. We construct hyper-custom statistical networks, predictive analytics panels, and automated segmentation engines capable of forecasting churn, dynamic pricing anomalies, and market trends.',
      features: [
        'Predictive Customer Lifetime Value (CLV)',
        'Fraud & Anomaly Detection Networks',
        'Dynamic Algorithmic Pricing Engines',
        'Hyper-personalized Sentiment Recs',
        'Time Series Demand Forecasting'
      ],
      benefits: [
        'Proactive mitigation of client churn through behavioral modeling',
        '98.7% accuracy rates in supply-chain demand planning',
        'Fully automated fraud scoring operating under 50ms latency'
      ],
      technologies: ['TensorFlow', 'Scikit-Learn', 'Pandas', 'XGBoost', 'AWS SageMaker'],
      process: [
        'Historical data extraction and vectorization',
        'Model training, balancing, and cross-validation',
        'Performance metric optimization and bias profiling',
        'API endpoint nesting with secure authentication'
      ],
      displayOrder: 2,
      status: 'active'
    },
    {
      id: 'srv3',
      name: 'Intelligent Process Automation',
      slug: 'business-automation',
      icon: 'Zap',
      shortDescription: 'End-to-end cloud robotic process automation and digital thread integrations to eliminate repetitive labor.',
      detailedDescription: 'Convert legacy bottleneck procedures into self-piloting execution flows. By combining premium visual character recognition (OCR) with LLM routing, we build visual workflows that process enterprise documentation, compile spreadsheets, and execute multi-system transactions.',
      features: [
        'Intelligent OCR Invoice Parsing',
        'API-Driven System Threading',
        'Auto-escalating Decision Trees',
        'Unattended Cloud RPA Bots',
        'Continuous Audit Logging'
      ],
      benefits: [
        'Complete removal of human error in payroll and invoices',
        '14x turnaround improvement on transaction approval loops',
        '90% drop in manual backend entry fatigue'
      ],
      technologies: ['NodeJS', 'Python', 'UiPath', 'Google Cloud Workflows', 'Selenium'],
      process: [
        'Time-motion analysis of existing business paths',
        'RPA blueprint drafting and edge-case map development',
        'Silent background shadow run monitoring',
        'Active orchestration switch with automated alerts'
      ],
      displayOrder: 3,
      status: 'active'
    },
    {
      id: 'srv4',
      name: 'Intelligent Agent Chatbots',
      slug: 'chatbot-development',
      icon: 'MessageSquare',
      shortDescription: 'State-of-the-art conversational experiences backed by deep company intelligence and instant service capabilities.',
      detailedDescription: 'Our chatbot setups transition classical, keyword-restricted chatbots into context-aware executive coordinators. Integrated with Gemini API and real-time grounding, these bots resolve support tickets, drive pipeline qualification, and log active client queries instantly.',
      features: [
        'Retrieval-Augmented Multi-Turn Dialogue',
        'Omnichannel Integration (Web, Slack, WhatsApp)',
        'Automatic Multi-Language Swaps',
        'Hot-transfer Support Escalation Router',
        'Strict Boundary Guardrails'
      ],
      benefits: [
        'Self-directed 24/7 client onboarding and triage',
        'Immediate resolution of up to 75% of incoming support load',
        'Automatic qualification of top enterprise inbound leads'
      ],
      technologies: ['Gemini 3.5 Flash', 'FastAPI', 'React', 'TailwindCSS', 'WebSockets'],
      process: [
        'Knowledge base digestion and FAQ structure review',
        'Conversational tone design and safety guard writing',
        'Context grounding and API integration setup',
        'Widget placement, monitoring, and live optimization feedback'
      ],
      displayOrder: 4,
      status: 'active'
    },
    {
      id: 'srv5',
      name: 'Computer Vision Systems',
      slug: 'computer-vision',
      icon: 'Eye',
      shortDescription: 'Real-time video tracking, medical radiography matching, visual quality checks, and OCR processing.',
      detailedDescription: 'Provide computers the visual intelligence of senior auditors. We engineer specialized sensory pipelines for visual product checking in manufacturing lines, clinical medical image matching, thermal diagnostics, and real-time transport navigation analysis.',
      features: [
        'Defect Isolation in Assembly Lines',
        'Medical Image Classification Filters',
        'Optical Character Reading pipelines',
        'Dynamic Motion & Spatial Safety Feeds',
        'Custom Segmentation Arrays'
      ],
      benefits: [
        '99.9% product compliance on assembly conveyors',
        'Instantaneous extraction of unstructured hand-written texts',
        'Automated real-time safety shut-off systems'
      ],
      technologies: ['OpenCV', 'YOLOv8', 'PyTorch', 'TensorFlow Lite', 'NVIDIA CUDA'],
      process: [
        'Camera, lens, and lighting configuration testing',
        'Dataset image gathering, annotating, and normalization',
        'Deep Convolutional Network training and visual validation',
        'Local edge deployment or low-latency cloud processing'
      ],
      displayOrder: 5,
      status: 'active'
    },
    {
      id: 'srv6',
      name: 'Advanced Enterprise Analytics',
      slug: 'data-analytics',
      icon: 'BarChart2',
      shortDescription: 'Interactive BI reporting, D3 visualizations, predictive data hubs, and modern data-lake management.',
      detailedDescription: 'Cleanse unstructured database pools into highly actionable, decision-maker grade dashboards. We design robust pipelines that intake real-time telemetry, synthesize analytical logs, and stream them into custom, high-fidelity responsive charts.',
      features: [
        'Automated Data Cleansing pipelines',
        'Interactive D3 & Recharts dashboards',
        'High-density Real-time charts',
        'Predictive business modeling reports',
        'Consolidated data warehousing'
      ],
      benefits: [
        'One-stop executive insight panels replacing static spreadsheets',
        'Immediate warning systems for core performance drops',
        'A single source of truth across product, finance, and support'
      ],
      technologies: ['D3.js', 'Recharts', 'PostgreSQL', 'Snowflake', 'Apache Spark'],
      process: [
        'Audit of current database nodes and layout logs',
        'Warehouse optimization and database indexing setup',
        'Custom visualization building with interactive states',
        'Continuous performance and latency tuning'
      ],
      displayOrder: 6,
      status: 'active'
    }
  ] as Service[],
  projects: [
    {
      id: 'prj1',
      title: 'PulseAnalytics Core',
      slug: 'pulseanalytics-core',
      category: 'AI Solutions',
      clientName: 'RetaiLogix International',
      industry: 'Retail & Consumer Goods',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      shortSummary: 'Integrated predictive customer modeling dashboard processing over 12 million global checkout events daily.',
      overview: 'RetaiLogix needed a way to consolidate sales history and inventory tracking across 400 stores to anticipate demand patterns. We built PulseAnalytics Core, which analyzes geographical purchase telemetry to auto-adjust warehouse supply chains.',
      businessProblem: 'Inventory overhead bloated by $8.4M annually due to delayed reactions to customer trend shifts. Forecasting errors hovered near 22%, causing out-of-stock events on high-margin items during seasonal peaks.',
      solutionImplemented: 'Created a central data processing hub feeding local prediction modules. Integrated deep learning time-series neural nets with a modern, fast React client dashboard featuring custom Recharts heatmaps and responsive filtering.',
      technologiesUsed: ['React', 'XGBoost', 'Python', 'Snowflake', 'Recharts', 'FastAPI'],
      features: [
        'Real-time checkout event processing',
        'Dynamic regional purchase heatmaps',
        'Auto-alert warehouse order queue launcher',
        'Interactive financial scenario simulator'
      ],
      resultsAndImpact: [
        '31% reduction in retail warehouse over-stock cycles',
        '97.8% confidence interval for next-quarter demand forecasts',
        'Recouped $5.2M in annual logistics margins within the first 6 months'
      ],
      completionDate: '2025-11-14',
      status: 'completed'
    },
    {
      id: 'prj2',
      title: 'LogiRoute-AI Infrastructure',
      slug: 'logiroute-ai-infrastructure',
      category: 'Automation Systems',
      clientName: 'Vanguard Freight',
      industry: 'Transport & Logistics',
      thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
      shortSummary: 'Real-time flight, vessel, and truck dispatch routing engine utilizing advanced spatial genetic programming.',
      overview: 'Vanguard Freight required an on-the-fly itinerary rebuild routine that recalculates thousands of package paths instantly whenever weather, traffic disruptions, or mechanical incidents occur.',
      businessProblem: 'Stiff, pre-determined routing schedules resulted in trucks driving empty on return journeys, and flights carrying suboptimal weight balances, resulting in heavy fuel expenditure.',
      solutionImplemented: 'Designed custom multi-agent routing modules using genetic solvers. Built complex client controls for coordinators to monitor freight positions live and inspect automated alternate pathways in a high-contrast map interface.',
      technologiesUsed: ['Go', 'TypeScript', 'OpenStreetMap', 'Python Solvers', 'Docker', 'Redis'],
      features: [
        'Live shipment spatial telemetry streaming',
        'Automatic route optimization triggers',
        'Carbon footprint reduction analytics',
        'Seamless integration with legacy hardware GPS systems'
      ],
      resultsAndImpact: [
        'Fuel expenditure cut down by 18.2% across global fleets',
        'Automated dispatch actions cut manual routing intervention down to under 3%',
        'Average package transfer delay rates dropped to an all-time low'
      ],
      completionDate: '2026-03-02',
      status: 'completed'
    },
    {
      id: 'prj3',
      title: 'MediScan Diagnostic Pipeline',
      slug: 'mediscan-diagnostic-pipeline',
      category: 'Enterprise Software',
      clientName: 'Sovereign Health Allied',
      industry: 'Healthcare & Life Sciences',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
      shortSummary: 'Computer vision pre-sorting assistant helping clinicians flag microscopic anomalies with clinical accuracy levels.',
      overview: 'Sovereign Health partnered with our engineers to build a visual pre-triage module that processes X-ray, MRI, and CT uploads. It identifies anomaly points, measuring their dimensions and highlighting them for prioritised radiological inspection.',
      businessProblem: 'Clinicians were overwhelmed with raw scanning volumes, leading to patient report wait times of over 72 hours for critical primary assessments.',
      solutionImplemented: 'Constructed an isolated, secure image categorization neural network running private models. Tailored an elegant clinical file system allowing clinicians to browse patient histories and view animated comparative scans.',
      technologiesUsed: ['PyTorch', 'OpenCV', 'NextJS', 'PostgreSQL', 'Secure VPC Hosting'],
      features: [
        'Clinical-grade scan contouring and labeling',
        'Interactive comparison of historical health imaging',
        'DICOM file format parser integration',
        'High-security patient identity masking'
      ],
      resultsAndImpact: [
        '99.5% accuracy matches on major biological benchmarks',
        'Clinic document review delay rates slashed from 3 days to under 4 hours',
        'Over 120,000 scans analyzed with zero regulatory breaches'
      ],
      completionDate: '2026-01-18',
      status: 'completed'
    }
  ] as Project[],
  blogs: [
    {
      id: 'blog1',
      title: 'Delivering Autonomy: A Guide to Deploying Multi-Agent AI Systems',
      slug: 'delivering-autonomy-multi-agent-ai',
      excerpt: 'How leading software engineering teams transition static prompts into cooperative, self-correcting agent chains built for industrial workloads.',
      content: `## The Evolution of Prompt Operations\n\nIn the early stages of generative AI, business solutions relied primarily on single-turn request protocols. An employee submitted a request, a model processed it, and a response was returned. While impressive, this approach breaks down when applied to complex operational workflows that require active verification, iterative revisions, and multi-system alignment.\n\nEnter **Multi-Agent Orchestrations**. Rather than querying an isolated model, modern enterprise systems employ specialized, modular agent nodes that collaborate to solve complex, multi-step problems.\n\n### Understanding the Multi-Agent Framework\n\nA multi-agent system consists of independent AI processes assigned distinct roles, tools, and permissions. For example, a procurement workflow might include:\n\n1. **The Parsing Agent**: Extracts invoice content using visual OCR.\n2. **The Compliance Auditor**: Compares transaction criteria against regional shipping law matrices.\n3. **The Ledger Writer**: Resolves and formats database entries, flagging exceptions.\n\n\`\`\`typescript\ninterface AgentNode {\n  name: string;\n  role: 'validator' | 'writer' | 'supervisor';\n  allowedTools: string[];\n}\n\`\`\`\n\n### Resolving State Drift across Chains\n\nA primary technical challenge in agent operations is state drift. As informational context passes from one agent node to the next, cumulative distortion can compromise accuracy.\n\nTo mitigate this, teams must implement:\n* **Structured JSON Schemas**: Restrict agent communications to strict JSON schemas rather than free-form text.\n* **A Sovereign State Ledger**: Maintain a central, read-only session ledger where other agents write updates, allowing supervisors to easily rollback drifted states.\n* **Real-Time Human Gatekeepers**: Configure automated transfers to human operators whenever validation scores fall beneath a 93% threshold.\n\nImplementing these guardrails ensures that multi-agent pipelines deliver consistent, auditable, and resilient results in high-stakes enterprise environments.`,
      featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      tags: ['Agentic AI', 'Software Architecture', 'Enterprise AI'],
      categoryId: 'cat1',
      status: 'published',
      publishDate: '2026-05-28',
      readTime: '6 min read',
      authorName: 'Dr. Evelyn Vance',
      authorRole: 'Principal AI Architect',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      seoTitle: 'Deploying Multi-Agent AI Systems in Production | AI Solution',
      seoDescription: 'A technical deep-dive into multi-agent systems, orchestration frameworks, and state synchronization tactics for high-stakes enterprise AI.'
    },
    {
      id: 'blog2',
      title: 'Why Hybrid Retrieval is Essential for Sovereign Enterprise RAG',
      slug: 'hybrid-retrieval-sovereign-rag',
      excerpt: 'An architectural review comparing vector-based text search with classical keyword matching to solve corporate hallucination problems.',
      content: `## The Modern Enterprise Information Challenge\n\nMany organizations seeking to implement conversational AI start with Retrieval-Augmented Generation (RAG). By embedding corporate documents into a vector database, teams can query contextual data to generate highly relevant, accurate responses.\n\nHowever, relying solely on vector embeddings often introduces unexpected challenges in production.\n\n### The Limits of Pure Semantic Matching\n\nVector similarity excel at capturing general conceptual themes. However, they frequently struggle with:\n* **Specific alphanumeric identifiers** (e.g., product numbers like "H-3200-X3").\n* **Precise database column titles** or variable declarations.\n* **Exact historical date queries**.\n\nFor instance, a vector database might struggle to distinguish between "H-3200-X3 documentation" and "H-3200-XT documentation" because their semantic contexts are virtually identical.\n\n### The Hybrid Solution\n\nTo solve this, modern enterprise search pipelines employ **Hybrid Retrieval**. This architecture combines:\n\n1. **Semantic Vector Search (Dense Retrieval)**: Leverages dense embedding models to retrieve contextually similar documents and comprehend general queries.\n2. **Keyword Text Search (Sparse Retrieval)**: Utilizes BM25 or tf-idf scoring to match precise strings, SKU codes, and numeric values.\n\nBoth search streams query the repository concurrently, and their results are combined using Reciprocal Rank Fusion (RRF) algorithms before being sent to the LLM.\n\n### Results and Impact\n\nBy transitioning from basic semantic search to a hybrid retrieval pipeline, enterprise systems achieve significant performance improvements:\n* **Retrieval precision increases by up to 41%** for highly specific system queries.\n* **Hallucinations drop to near-zero** when asking about precise product inventories or alphanumeric codes.\n* **User confidence scores climb dramatically**, unlocking RAG utility for customer-facing channels.\n\nAdopting hybrid retrieval is a crucial step for enterprise engineering teams looking to build robust, trustworthy conversational search experiences over complex corporate data.`,
      featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      tags: ['Retrieval RAG', 'Knowledge Bases', 'Search Optimization'],
      categoryId: 'cat1',
      status: 'published',
      publishDate: '2026-05-15',
      readTime: '4 min read',
      authorName: 'Aria Sterling',
      authorRole: 'SVP of Product Engineering',
      authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      seoTitle: 'Why Hybrid Retrieval is Essential for Enterprise RAG | AI Solution',
      seoDescription: 'An architectural breakdown of Hybrid Retrieval pipelines combining BM25 and vector search to eliminate LLM hallucinations.'
    },
    {
      id: 'blog3',
      title: 'Scaling Distributed Machine Learning Inference pipelines on Hybrid Clouds',
      slug: 'scaling-distributed-ml-inference-hybrid',
      excerpt: 'Operational rules to minimize GPU cost allocations while sustaining sub-second latency bounds across global load servers.',
      content: `## The High Cost of Inference\n\nAs deep learning models transition from training labs to active user applications, the financial focus shifts. While model training is an expensive, one-off project, production inference is a continuous, scaling cost that can quickly become unsustainable.\n\nIf left unoptimized, a popular app running full model executions can easily generate crushing cloud platform bills.\n\n### Crucial Scaling Principles\n\nTo minimize GPU costs while sustaining sub-second latency, global infrastructure teams should implement the following architectural patterns:\n\n#### 1. Dynamic Quantization\nMany state-of-the-art models are trained in FP32 format. Quantizing calculations down to INT8 or FP16 formats significantly reduces memory footprints and doubles throughput on standard hardware, with virtually no impact on baseline accuracy.\n\n#### 2. Specialized Inference Servers\nAvoid deploying models directly inside standard web servers (e.g., standard Flask setups). Instead, leverage dedicated model-serving tools like **Triton Inference Server** or **vLLM**. These specialized platforms provide:\n* **Dynamic Request Batching**: Aggregates separate incoming user calls into a single matrix calculation, optimizing GPU utilization.\n* **Concurrent Model Execution**: Hosts multiple model instances on a single GPU card to handle high-concurrency spikes.\n\n#### 3. Intelligent Edge/Cloud Orchestration\nImplement a dual-tier request router. Run basic telemetry processing and lightweight text formatting on low-cost edge nodes. Route only the most complex, reasoning-intensive tasks to high-performance GPU clusters in the cloud.\n\nAdopting a specialized, multi-tiered inference architecture allows engineering teams to scale user bases indefinitely while keeping hardware costs tightly controlled and predictable.`,
      featuredImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80',
      tags: ['Cloud Devops', 'Inference Optimization', 'Model Serving'],
      categoryId: 'cat4',
      status: 'published',
      publishDate: '2026-04-20',
      readTime: '8 min read',
      authorName: 'Liam Vance',
      authorRole: 'Infrastructure Director',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      seoTitle: 'Scaling Distributed ML Inference on Hybrid Clouds | AI Solution',
      seoDescription: 'An infrastructure blueprint detailing model quantization, dynamic request batching, and load balancing strategies for low-cost ML operations.'
    }
  ] as Blog[],
  gallery: [
    {
      id: 'gal1',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      caption: 'The AI Solution Hub flagship research facility located in Seattle, Washington.',
      category: 'office',
      status: 'active',
      uploadDate: '2026-01-10'
    },
    {
      id: 'gal2',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      caption: 'Our global core infrastructure team iterating on model clustering systems during a collaborative sync.',
      category: 'team',
      status: 'active',
      uploadDate: '2026-02-14'
    },
    {
      id: 'gal3',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      caption: 'Specialized optical scanner system hardware evaluation session inside our state-of-the-art Computer Vision Lab.',
      category: 'ai-lab',
      status: 'active',
      uploadDate: '2026-03-11'
    },
    {
      id: 'gal4',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
      caption: 'Highlight from our annual enterprise event, the AI Solution Innovation Summit, attended by tech and business leaders.',
      category: 'events',
      status: 'active',
      uploadDate: '2026-05-18'
    }
  ] as GalleryItem[],
  testimonials: [
    {
      id: 'tst1',
      clientPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      name: 'Sarah Jenkins',
      companyName: 'FintechCorp Ltd',
      position: 'Chief Technology Officer',
      rating: 5,
      reviewText: 'AI Solution completely modernized our transaction workflows. The automated financial screening RAG system cut patient diagnostic triage errors from 11% to absolute zero. Their professionalism and technical integration depth exceed all standards.',
      date: '2026-04-12',
      status: 'active'
    },
    {
      id: 'tst2',
      clientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      name: 'Marcus Chen',
      companyName: 'GlobalLogistics Chain',
      position: 'VP of Transportation Operations',
      rating: 5,
      reviewText: 'Our fleet routing efficiency improved by a massive 18.2% after integration. The spatial neural predictions run seamlessly during unpredictable peak seasons. Absolute lifesavers for high-volume networks.',
      date: '2026-05-02',
      status: 'active'
    },
    {
      id: 'tst3',
      clientPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      name: 'Elena Rostova',
      companyName: 'MedAlliance Systems',
      position: 'Clinic Informatics Lead',
      rating: 5,
      reviewText: 'The computer vision triage assistant allows our radiological team to analyze scanning contours with complete peace of mind. Patient file wait times dropped below 4 hours. Tremendous product design and technical support.',
      date: '2026-05-20',
      status: 'active'
    }
  ] as Testimonial[],
  events: [
    {
      id: 'evt1',
      name: 'AI Solution Summit 2026: The Next Era of Agentic Workflows',
      banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
      date: '2026-06-15',
      time: '09:00 AM - 05:00 PM',
      location: 'Sovereign Grand Auditorium, Seattle, WA & Virtual Stream',
      description: 'Join leading enterprise AI developers and software architects as we explore the future of multi-agent collaboration, sovereign hybrid RAG pipelines, and high-frequency predictive modeling systems. This event will feature live technical panels and hands-on workshops.',
      registrationUrl: 'https://aisolution2026.eventbrite.com',
      speakers: ['Dr. Evelyn Vance (AI Solution)', 'Sarah Jenkins (CTO, FintechCorp)', 'Liam Vance (Infrastructure Director)'],
      venueDetails: 'Sovereign Grand Auditorium, 1200 Pine Street, Seattle, WA.'
    },
    {
      id: 'evt2',
      name: 'Computer Vision Lab & Visual Pipeline Workshop',
      banner: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80',
      date: '2026-05-10',
      time: '02:00 PM - 05:30 PM',
      location: 'Seattle Tech Incubator, Lab Room 402',
      description: 'An immersive workshop focused on building real-time visual inspection systems. Developers will explore YOLOv8 optimizations, neural segmentation networks, and OpenCV deployment pipelines for manufacturing automation.',
      registrationUrl: 'https://cvworkshop.eventbrite.com',
      speakers: ['Liam Vance', 'Elena Rostova'],
      venueDetails: 'Seattle Tech Incubator, Block B, Room 402, Seattle, WA.'
    }
  ] as EventItem[],
  inquiries: [
    {
      id: 'inq1',
      fullName: 'Raymond K. Fowler',
      emailAddress: 'raymond.fowler@hightechventures.com',
      phoneNumber: '206-555-0143',
      companyName: 'HighTech Ventures LLC',
      subject: 'Inquiry regarding Enterprise Sovereign RAG integration',
      message: 'Hello AI Solution team, we have been reviewing your hybrid BM25 + dense embedding architecture. We would love to discuss integrating a private, compliant LLM setup styled to catalog our extensive library of active client intellectual assets. Please let us know when we can align next week.',
      date: '2026-05-29T14:32:00Z',
      status: 'new'
    },
    {
      id: 'inq2',
      fullName: 'Clara S. Sterling',
      emailAddress: 'clara@sterlingretail.co',
      phoneNumber: '415-555-0982',
      companyName: 'Sterling Retail Outlets',
      subject: 'Predictive Demand Modeling Sync Request',
      message: 'Hi, we are very excited about the inventory cost reduction statistics of RetaiLogix. We have 85 physical stores on the West Coast and want to connect our PostgreSQL database to evaluate dynamic predictive demand metrics. Looking forward to hearing from you.',
      date: '2026-05-28T09:15:00Z',
      status: 'read'
    },
    {
      id: 'inq3',
      fullName: 'Benjamin Hayes',
      emailAddress: 'b.hayes@aurorashipping.org',
      phoneNumber: '312-555-0121',
      companyName: 'Aurora Shipping Group',
      subject: 'RPA & Invoice Parsing Quote Request',
      message: 'Dear Support, our accounts payable desk processes upwards of 1,200 foreign cargo invoicing receipts each week. We need a robust AI Solution bot utilizing OCR and confidence validation to auto-route payments. Can you provide a breakdown of pricing?',
      date: '2026-05-26T18:04:00Z',
      status: 'replied'
    }
  ] as ContactInquiry[]
};

const DB_KEY = 'aisolution_db_store_v1';

// Get database state
function getDbState() {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    localStorage.setItem(DB_KEY, JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }
  try {
    return JSON.parse(data);
  } catch (_) {
    return SEED_DATA;
  }
}

// Set database state
function setDbState(state: any) {
  localStorage.setItem(DB_KEY, JSON.stringify(state));
}

// Safe mock fetch helper
export function setupMockFetch() {
  // Safe no-op to prevent environment window.fetch setter errors
}

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const urlString = typeof input === 'string' ? input : (input instanceof URL ? input.href : input.url);

  const state = getDbState();
  const method = init?.method?.toUpperCase() || 'GET';
  const bodyStr = init?.body ? String(init.body) : '';
  let body: any = {};
  if (bodyStr) {
    try {
      body = JSON.parse(bodyStr);
    } catch (_) {}
  }

  // Resolve pathways
  const pathname = urlString.replace(/^https?:\/\/[^/]+/, '').split('?')[0];

  // Helper functions for response headers
  const jsonResponse = (data: any, status = 200) => {
    return Promise.resolve(new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' }
    }));
  };

    // Chatbot router
    if (pathname === '/api/chat' && method === 'POST') {
      const messages = body.messages || [];
      const userMsg = messages[messages.length - 1]?.content || '';
      const textLower = userMsg.toLowerCase();

      let botResponse = "I have scanned our dynamic cognitive indexing nodes but did not find an direct context match. Can you please restate or connect with our support directors directly at contact@aisolution.com?";
      
      if (textLower.includes('hi') || textLower.includes('hello') || textLower.includes('hey')) {
        botResponse = "Hello! Welcome to the AI Solution Sovereign Information Deck. How can I assist you with autonomous agent pipelines, deep analytics dashboards, or corporate ML diagnostics today?";
      } else if (textLower.includes('service') || textLower.includes('capabilities') || textLower.includes('competencies')) {
        botResponse = "Our core competencies include custom General-Purpose Agent Orchestrations, predictive financial ML pipelines, robotic process automations, computer vision checking arrays, and immersive analytical BI D3 dashboards. Is there a specific domain you would like to explore?";
      } else if (textLower.includes('project') || textLower.includes('case estudio') || textLower.includes('case study') || textLower.includes('deliverables')) {
        botResponse = "We have completed several high-prestige deliverables, including PulseAnalytics Core (retail logistics saving $5.2M), LogiRoute-AI (cutting fleet fuel usage by 18%), and MediScan (radiology pre-diagnosis at 99.5% accuracy). Would you like me to connect you with an onboarding director?";
      } else if (textLower.includes('price') || textLower.includes('pricing') || textLower.includes('cost') || textLower.includes('quote') || textLower.includes('fee')) {
        botResponse = "Our consulting engagements are highly focused on tailored ROI. Please map out your scope details in the 'Contact Us' panel. Our Seattle architectural hub will review your query and formulate a bespoke feasibility projection with approximate pricing within 24 hours.";
      } else if (textLower.includes('contact') || textLower.includes('phone') || textLower.includes('email') || textLower.includes('address') || textLower.includes('seattle')) {
        botResponse = "You can interact with us directly! Reach out via email at contact@aisolution.com or dial our hotline at (206) 555-0199. Our headquarters is located at 1200 Pine Street, Seattle, WA 98101.";
      } else if (textLower.includes('admin') || textLower.includes('login') || textLower.includes('password')) {
        botResponse = "To access the hidden Administrative Deck, navigate to the dashboard by adding the hash '#admin' to your browser URL. Use the secure demo accounts: Username 'admin', Password 'admin'. Feel free to test CRUD edits!";
      } else {
        // Construct standard AI agent speech response
        botResponse = `Regarding your query ("${userMsg.slice(0, 50)}${userMsg.length > 50 ? '...' : ''}"), our team specialized in multi-agent environments and advanced ML solutions can develop custom software matching this scope. I recommend filing a detailed brief in our Contact Tab so an expert can draft an implementation audit for you.`;
      }

      return jsonResponse({ text: botResponse });
    }

    // Admin login router
    if (pathname === '/api/admin/login' && method === 'POST') {
      const email = body.email || body.username || '';
      const password = body.password || '';

      const isEmailOk = (email === 'admin@aisolution.com' || email === 'admin');
      const isPasswordOk = (password === 'admin123' || password === 'admin');

      if (isEmailOk && isPasswordOk) {
        return jsonResponse({
          success: true,
          user: { id: 'u1', email: 'admin@aisolution.com', name: 'Aria Sterling', role: 'admin' }
        });
      } else {
        return jsonResponse({ error: 'Identity credentials validation failed. Invalid username or password.' }, 401);
      }
    }

    // -- GET Requests --
    if (method === 'GET') {
      if (pathname === '/api/services') return jsonResponse(state.services);
      if (pathname === '/api/projects') return jsonResponse(state.projects);
      if (pathname === '/api/blogs') return jsonResponse(state.blogs);
      if (pathname === '/api/blog-categories') return jsonResponse(state.blogCategories);
      if (pathname === '/api/gallery') return jsonResponse(state.gallery);
      if (pathname === '/api/testimonials') return jsonResponse(state.testimonials);
      if (pathname === '/api/events') return jsonResponse(state.events);
      if (pathname === '/api/inquiries') return jsonResponse(state.inquiries);
    }

    // -- POST Requests --
    if (method === 'POST') {
      const newId = `item-${Date.now()}`;
      
      if (pathname === '/api/services') {
        const item = { id: newId, ...body };
        state.services.push(item);
        setDbState(state);
        return jsonResponse(item);
      }
      if (pathname === '/api/projects') {
        const item = { id: newId, ...body };
        state.projects.push(item);
        setDbState(state);
        return jsonResponse(item);
      }
      if (pathname === '/api/blogs') {
        const item = { id: newId, publishDate: new Date().toISOString().split('T')[0], readTime: '5 min read', ...body };
        state.blogs.push(item);
        setDbState(state);
        return jsonResponse(item);
      }
      if (pathname === '/api/gallery') {
        const item = { id: newId, uploadDate: new Date().toISOString().split('T')[0], ...body };
        state.gallery.push(item);
        setDbState(state);
        return jsonResponse(item);
      }
      if (pathname === '/api/testimonials') {
        const item = { id: newId, date: new Date().toISOString().split('T')[0], ...body };
        state.testimonials.push(item);
        setDbState(state);
        return jsonResponse(item);
      }
      if (pathname === '/api/events') {
        const item = { id: newId, ...body };
        state.events.push(item);
        setDbState(state);
        return jsonResponse(item);
      }
      if (pathname === '/api/inquiries') {
        const item = { id: newId, date: new Date().toISOString(), status: 'new', ...body };
        state.inquiries = [item, ...state.inquiries];
        setDbState(state);
        return jsonResponse(item);
      }
    }

    // -- PUT Requests --
    if (method === 'PUT') {
      // e.g., /api/services/srv1
      const parts = pathname.split('/');
      const collection = parts[2];
      const id = parts[3];

      if (collection && id && (state as any)[collection]) {
        const list = (state as any)[collection] as any[];
        const idx = list.findIndex(x => x.id === id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...body, id }; // retain original ID
          setDbState(state);
          return jsonResponse(list[idx]);
        }
      }
    }

    // -- DELETE Requests --
    if (method === 'DELETE') {
      // e.g., /api/services/srv1
      const parts = pathname.split('/');
      const collection = parts[2];
      const id = parts[3];

      if (collection && id && (state as any)[collection]) {
        const originalList = (state as any)[collection] as any[];
        (state as any)[collection] = originalList.filter(x => x.id !== id);
        setDbState(state);
        return jsonResponse({ success: true });
      }
    }

    // Default 404 response
    return jsonResponse({ error: `Not Found / Mock Route Mismatch: ${method} ${pathname}` }, 404);
}
