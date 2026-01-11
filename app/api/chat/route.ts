// Chat API Route - Handles chat requests with streaming responses
// Uses LOCAL embeddings for retrieval and Gemini AI for response generation

import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateEmbedding } from '@/lib/embedding';
import { runSafetyChecks, evaluateSearchResults, getFallbackResponse } from '@/lib/safety';
import { VectorSearchService } from '@/scripts/ingest/store';
import { seedDatabase } from '@/scripts/seed/seedData';
import { SectionType } from '@/types';
import { SYSTEM_PROMPT, USER_QUERY_TEMPLATE, CONTEXT_FORMATTER } from '@/lib/prompts';

// Auto-seed flag
let hasAttemptedSeed = false;

// Vector search configuration
const VECTOR_CONFIG = {
  minScore: 0.70,
  maxResults: 5,
};

// Mock portfolio data for when database is empty
const MOCK_PORTFOLIO_DATA = [
  // ============ GREETING & INTRODUCTION ============
  {
    content: `Hi! I'm Aasim Shah , a Senior MERN Stack Developer and Full-Stack Engineer based in Pakistan. I specialize in building scalable web applications, RESTful and GraphQL APIs, and cloud-based solutions. With over 5 years of experience in the industry, I've successfully delivered 40+ projects for clients worldwide. I'm passionate about creating high-performance, user-centric applications using modern technologies like Next.js, React, Node.js, TypeScript, MongoDB, PostgreSQL, and AWS. I'm currently available for freelance projects and full-time opportunities.`,
    score: 0.98,
    section: SectionType.ABOUT,
    metadata: {
      title: 'Introduction & Greeting',
      source: 'portfolio',
      entities: ['Aasim Shah', 'Syed Aasim Shah', 'Senior MERN Stack Developer', 'Full-Stack Engineer', 'Pakistan'],
      keywords: ['hello', 'hi', 'hey', 'greetings', 'who', 'about', 'aasim', 'shah', 'introduction', 'yourself', 'name', 'developer', 'engineer', 'background', 'bio', 'profile'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 120,
    }
  },
  
  // ============ DETAILED ABOUT ============
  {
    content: `Aasim Shah is a highly skilled Full-Stack Developer with expertise in the MERN stack (MongoDB, Express.js, React, Node.js) and modern web technologies. He has 5+ years of professional experience and has completed over 40 successful projects for clients across the globe. His technical expertise includes Next.js, TypeScript, Fastify, Docker, GraphQL, CI/CD pipelines, and cloud services (AWS). Aasim is known for writing clean, maintainable code and building scalable applications that solve real business problems. He has worked with companies like Dcodax PVT LTD, ItecExperts, and 47apps, developing everything from SaaS platforms to e-commerce solutions and mobile applications.`,
    score: 0.96,
    section: SectionType.ABOUT,
    metadata: {
      title: 'Professional Background',
      source: 'portfolio',
      entities: ['Aasim Shah', 'MERN Stack', 'Full-Stack Developer', 'Dcodax', 'ItecExperts', '47apps'],
      keywords: ['about', 'who', 'background', 'experience', 'expertise', 'professional', 'developer', 'engineer', 'specialist', 'skilled'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 110,
    }
  },

  // ============ CONTACT INFORMATION ============
  {
    content: `Contact Aasim Shah:
• Email: contact@aasimshah.com (Primary contact - response within 24-48 hours)
• Location: Pakistan (Available for remote work globally)
• Time Zone: PKT (UTC+5)
• Availability: Currently available for new projects and opportunities

For project inquiries, collaborations, consultations, or any questions, please email contact@aasimshah.com. Aasim responds to all professional inquiries within 24-48 hours. Available for both freelance projects and full-time remote positions.`,
    score: 0.98,
    section: SectionType.CONTACT,
    metadata: {
      title: 'Contact Information',
      source: 'portfolio',
      entities: ['Aasim Shah', 'contact@aasimshah.com', 'Pakistan'],
      keywords: ['contact', 'email', 'reach', 'get in touch', 'inquiries', 'collaboration', 'hire', 'message', 'connect', 'reach out', 'address', 'how', 'where', 'location', 'available'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 90,
    }
  },

  // ============ CURRENT AVAILABILITY & STATUS ============
  {
    content: `Current Availability Status:
• Status: AVAILABLE for new projects and opportunities
• Work Type: Freelance projects, contract work, and full-time remote positions
• Capacity: Accepting new clients and projects
• Response Time: 24-48 hours for inquiries
• Start Date: Can start immediately or as per project schedule
• Work Hours: Flexible, adapts to client time zones
• Location: Based in Pakistan, working remotely with clients worldwide

Aasim is currently open to taking on new projects including MERN stack development, API development, backend optimization, cloud deployment, and complete full-stack solutions. For project discussions, please contact via email at contact@aasimshah.com.`,
    score: 0.97,
    section: SectionType.CONTACT,
    metadata: {
      title: 'Current Availability',
      source: 'portfolio',
      entities: ['Aasim Shah', 'Pakistan'],
      keywords: ['availability', 'available', 'status', 'free', 'hire', 'open', 'accepting', 'work', 'freelance', 'remote', 'position', 'job', 'currently', 'now', 'start', 'when'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 100,
    }
  },

  // ============ SOCIAL LINKS & PROFILES ============
  {
    content: `Social Media & Professional Profiles:

Professional Platforms:
• Fiverr: https://www.fiverr.com/users/aaasimmshah (Verified freelancer)
• Upwork: https://www.upwork.com/freelancers/aasimshah (Top-rated)
• GitHub: https://www.github.com/aasim-shah (Open source contributions and projects)
• LinkedIn: https://www.linkedin.com/ (2.5K followers)

Social Media:
• Twitter/X: 2.1K followers
• Instagram: 1.3K followers
• Discord: Available for tech community discussions
• Dribbble: Design portfolio showcase

Connect with Aasim on these platforms to see his work, reviews, and professional network. For direct project inquiries, email is the preferred method: contact@aasimshah.com`,
    score: 0.95,
    section: SectionType.CONTACT,
    metadata: {
      title: 'Social Links & Profiles',
      source: 'portfolio',
      entities: ['Aasim Shah', 'Fiverr', 'Upwork', 'GitHub', 'LinkedIn', 'Twitter', 'Instagram'],
      keywords: ['social', 'links', 'profiles', 'fiverr', 'upwork', 'github', 'linkedin', 'twitter', 'instagram', 'discord', 'dribbble', 'follow', 'connect', 'network', 'portfolio'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 130,
    }
  },

  // ============ SERVICES OFFERED ============
  {
    content: `Services Offered by Aasim Shah:

1. MERN Stack Development ($30/hour)
   - Building scalable web applications using MongoDB, Express, React, and Node.js
   - 50+ completed projects, 5+ years experience, 1500+ hours worked
   
2. API Development ($40+/hour)
   - RESTful and GraphQL API design and development
   - Third-party API integrations, authentication, and security
   - 40+ completed projects, 5+ years experience, 1200+ hours worked

3. Cloud & DevOps ($80+/hour)
   - AWS deployment and management
   - Docker containerization, CI/CD pipelines, server optimization
   - 25+ completed projects, 2+ years experience, 900+ hours worked

4. Complete Full-Stack Development ($30+/hour)
   - End-to-end project development (website + admin dashboard + mobile app)
   - Cross-platform mobile apps using Flutter
   - Database design, backend APIs, frontend development, deployment
   - 20+ completed projects, 5+ years experience, 2000+ hours worked

All services include responsive design, performance optimization, security best practices, and post-launch support. Contact at contact@aasimshah.com for custom quotes.`,
    score: 0.96,
    section: SectionType.SERVICES,
    metadata: {
      title: 'Services & Offerings',
      source: 'portfolio',
      entities: ['MERN Stack', 'API Development', 'Cloud', 'DevOps', 'AWS', 'Flutter'],
      keywords: ['services', 'what', 'offer', 'do', 'provide', 'development', 'mern', 'api', 'cloud', 'devops', 'full-stack', 'website', 'app', 'rates', 'pricing', 'cost', 'price'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 200,
    }
  },

  // ============ SKILLS & TECH STACK ============
  {
    content: `Technical Skills & Tech Stack:

Frontend Technologies:
• Next.js - Full-Stack React Framework
• React.js - UI Development
• TypeScript - Strongly typed JavaScript
• Tailwind CSS - Utility-first CSS framework
• HTML5, CSS3, JavaScript (ES6+)

Backend Technologies:
• Node.js - JavaScript Runtime
• Express.js - Fast Node.js Framework
• Fastify - High-performance backend framework
• RESTful APIs & GraphQL
• Authentication & Authorization (JWT, OAuth)

Databases:
• MongoDB - NoSQL Database
• PostgreSQL - Relational Database
• Redis - Caching & Session Management
• Mongoose & Prisma ORMs

DevOps & Cloud:
• Docker - Containerization
• AWS - Cloud Services (EC2, S3, Lambda, RDS)
• CI/CD Pipelines (GitHub Actions, GitLab CI)
• Nginx - Web Server & Reverse Proxy
• Linux Server Management

Mobile Development:
• Flutter - Cross-platform mobile apps
• React Native basics

Tools & Others:
• Git & GitHub - Version Control
• Figma - UI/UX Design
• Postman - API Testing
• VS Code, WebStorm
• Agile/Scrum methodologies

Aasim continuously learns new technologies and stays updated with industry best practices.`,
    score: 0.95,
    section: SectionType.SKILLS,
    metadata: {
      title: 'Skills & Technologies',
      source: 'portfolio',
      entities: ['Next.js', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Flutter'],
      keywords: ['skills', 'tech stack', 'technologies', 'tools', 'frameworks', 'what', 'use', 'know', 'expertise', 'proficient', 'languages', 'frontend', 'backend', 'database', 'cloud'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 230,
    }
  },

  // ============ WORK EXPERIENCE ============
  {
    content: `Professional Work Experience:

1. Senior MERN Stack Developer at Dcodax PVT LTD (2024 - Present)
   - Software Company
   - Developing scalable APIs for a multi-vendor hotel management system
   - Integrating third-party services (payment gateways, booking engines)
   - Performance optimization and code quality improvements
   - Website: http://dcodax.com

2. MERN Stack Developer (Backend) at ItecExperts (2022 - 2024)
   - Software House
   - Built and optimized backend systems for multiple web and cross-platform applications
   - Ensured high performance, security, and scalability
   - Worked on various client projects with diverse requirements
   - Website: https://itecexperts.com

3. Backend Developer at 47apps (2020 - 2022)
   - Software House
   - Developed and maintained backend systems for web applications
   - E-commerce platforms and content management systems
   - Database design and API development

Career Highlights:
• 5+ years of professional experience
• 40+ completed projects
• 45+ happy clients
• Worked with clients from USA, UK, Australia, Spain, and more
• Specialized in scalable, high-performance solutions`,
    score: 0.94,
    section: SectionType.EXPERIENCE,
    metadata: {
      title: 'Work Experience',
      source: 'portfolio',
      entities: ['Dcodax', 'ItecExperts', '47apps', 'Senior MERN Stack Developer', 'Backend Developer'],
      keywords: ['experience', 'work', 'employment', 'job', 'career', 'history', 'worked', 'companies', 'positions', 'roles', 'previous', 'current', 'dcodax', 'itecexperts'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 200,
    }
  },

  // ============ PROJECTS & PORTFOLIO ============
  {
    content: `Featured Projects & Portfolio:

1. HOHEAL - Multi-Vendor Hotel Management SaaS
   - Type: SaaS Platform
   - Features: Admin panel, hotel management, staff management, booking system
   - Technologies: MERN Stack, MongoDB, Express, React, Node.js
   - Pages: 30+ pages
   - Link: http://172.86.108.103:4000/en

2. PIKUP POS - E-Commerce Platform
   - Type: Full-featured E-Commerce
   - Features: Custom admin panel, order management, payment gateway integration
   - Technologies: Next.js, TypeScript, MongoDB, Stripe
   - Pages: 80+ pages
   - Link: https://pikuppos.hostdonor.com/

3. Premier Vehicles - Vehicle Marketplace
   - Type: Mobile App + Admin Dashboard
   - Features: User vehicle listings, payment integration, seller management
   - Technologies: Flutter (Mobile), Next.js (Admin), Node.js (Backend)
   - Pages: 20+ pages
   - Link: github.com/aasim-shah/premier_dashboard

4. Cloud-Based API Services
   - Type: Backend/API Solution
   - Features: RESTful & GraphQL APIs, authentication, AWS deployment
   - Technologies: Node.js, Express, PostgreSQL, AWS, Docker
   - Pages: 10+ API endpoints

Other Notable Work:
• 50+ MERN Stack projects completed
• 40+ API development projects
• 25+ Cloud deployment projects
• Multiple e-commerce, SaaS, and marketplace solutions

All projects showcase modern development practices, clean code, and scalable architecture.`,
    score: 0.94,
    section: SectionType.PROJECTS,
    metadata: {
      title: 'Projects & Portfolio',
      source: 'portfolio',
      entities: ['HOHEAL', 'PIKUP POS', 'Premier Vehicles', 'SaaS', 'E-Commerce'],
      keywords: ['projects', 'portfolio', 'work', 'showcase', 'examples', 'built', 'created', 'developed', 'hoheal', 'pikup', 'premier', 'what', 'made'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 240,
    }
  },

  // ============ CLIENT TESTIMONIALS ============
  {
    content: `Client Testimonials & Reviews:

Sarah Thompson (New York City, USA):
"The MERN stack web application Syed built for my business is top-notch! It's fast, scalable, and has completely streamlined our operations."

John Anderson (Sydney, Australia):
"Syed's API development skills are outstanding! He designed a seamless and efficient RESTful API for our mobile and web apps, making integrations smooth."

Mark Davis (London, UK):
"From backend optimization to cloud deployment, Syed handled our entire project flawlessly. Our platform is now running with excellent performance on AWS."

Laura Adams (Madrid, Spain):
"Syed delivered a full-stack solution, including a responsive website, an admin dashboard, and a cross-platform Flutter app. The end-to-end development was executed perfectly!"

Client Statistics:
• 45+ Happy Clients
• 5.0★ Average Rating on Fiverr & Upwork
• 100% Project Completion Rate
• Clients from 15+ Countries

Aasim is known for professionalism, timely delivery, excellent communication, and high-quality code that exceeds client expectations.`,
    score: 0.93,
    section: SectionType.TESTIMONIALS,
    metadata: {
      title: 'Client Testimonials',
      source: 'portfolio',
      entities: ['Sarah Thompson', 'John Anderson', 'Mark Davis', 'Laura Adams'],
      keywords: ['testimonials', 'reviews', 'clients', 'feedback', 'ratings', 'satisfaction', 'what clients say', 'opinions', 'recommendations'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 180,
    }
  },

  // ============ FAQ & COMMON QUESTIONS ============
  {
    content: `Frequently Asked Questions (FAQ):

Q: Can you work with clients remotely?
A: Absolutely! I have extensive experience working with clients worldwide. I use email, video calls, and project management tools for seamless collaboration regardless of location.

Q: Will my website be mobile-friendly?
A: Yes, mobile responsiveness is a top priority. All websites I develop are fully responsive and work perfectly on desktops, tablets, and smartphones.

Q: How long does a project take?
A: Timeline varies based on project scope and complexity. Simple websites: 2-4 weeks, Complex applications: 2-3 months. I provide realistic timelines after discussing requirements.

Q: Can you integrate third-party tools?
A: Yes! I have experience integrating payment gateways (Stripe, PayPal), social media, email marketing services, analytics, CRMs, and various APIs.

Q: Do you offer website maintenance?
A: Yes, I offer ongoing maintenance services including updates, security patches, new features, performance optimization, and technical support.

Q: How do you handle revisions?
A: I value client feedback throughout development. I include revision rounds in projects and work collaboratively to ensure the final product matches your vision.

Q: Can you optimize my website for search engines?
A: Yes! I incorporate SEO best practices including proper meta tags, semantic HTML, fast loading speeds, mobile optimization, and search-engine-friendly URLs.

Q: What are your payment terms?
A: Payment terms vary by project. Generally, I require 50% upfront and 50% upon completion. For long-term projects, milestone-based payments are available.

For more questions, contact at contact@aasimshah.com`,
    score: 0.92,
    section: SectionType.FAQ,
    metadata: {
      title: 'FAQ',
      source: 'portfolio',
      entities: ['Aasim Shah'],
      keywords: ['faq', 'questions', 'answers', 'how', 'what', 'can', 'do', 'work', 'remote', 'mobile', 'responsive', 'payment', 'maintenance', 'seo', 'timeline', 'revisions'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 250,
    }
  },

  // ============ ACHIEVEMENTS & STATISTICS ============
  {
    content: `Achievements & Career Statistics:

Professional Metrics:
• 5+ Years of Experience in software development
• 40+ Completed Projects successfully delivered
• 45+ Happy Clients worldwide
• 1500+ Hours of MERN Stack development
• 1200+ Hours of API development
• 900+ Hours of Cloud & DevOps work
• 2000+ Hours of Full-Stack development

Platform Ratings:
• Fiverr: Top-rated seller with verified reviews
• Upwork: 100% job success score, highly recommended
• GitHub: Active contributor with multiple repositories

Geographic Reach:
• Clients from USA, UK, Australia, Spain, and 10+ other countries
• Remote work experience with different time zones
• International team collaboration

Social Media Following:
• LinkedIn: 2.5K+ professional followers
• Twitter/X: 2.1K+ followers
• Instagram: 1.3K+ followers

Technical Contributions:
• Open-source projects on GitHub
• Technical blog posts and tutorials
• Active in developer communities

Recognition:
• Known for clean, maintainable code
• Fast turnaround times
• Excellent communication skills
• Problem-solving abilities`,
    score: 0.91,
    section: SectionType.ABOUT,
    metadata: {
      title: 'Achievements & Stats',
      source: 'portfolio',
      entities: ['Aasim Shah', 'Fiverr', 'Upwork', 'GitHub'],
      keywords: ['achievements', 'statistics', 'stats', 'numbers', 'metrics', 'experience', 'years', 'projects', 'clients', 'success', 'ratings', 'awards'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 200,
    }
  },
];

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] || 
         request.headers.get('x-real-ip') || 
         'unknown';
}

// Improved keyword matching for mock data
function getMockResults(query: string) {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 2);
  
  // Score each mock data entry based on relevance
  const scoredResults = MOCK_PORTFOLIO_DATA.map(data => {
    let matchScore = 0;
    
    // Check content match
    queryWords.forEach(word => {
      if (data.content.toLowerCase().includes(word)) {
        matchScore += 0.3;
      }
    });
    
    // Check keyword match (stronger signal)
    data.metadata.keywords.forEach(keyword => {
      queryWords.forEach(word => {
        if (keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase())) {
          matchScore += 0.5;
        }
      });
    });
    
    // Check entity match (strongest signal)
    data.metadata.entities.forEach(entity => {
      if (lowerQuery.includes(entity.toLowerCase())) {
        matchScore += 1.0;
      }
    });
    
    return { ...data, score: Math.min(matchScore, 0.95) };
  });
  
  // Return top matches with score > 0
  return scoredResults
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

// Smart template-based response generation (optimized for natural output)
function generateSmartTemplateResponse(context: string, query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Extract clean content sections
  const sections = context.split('\n---\n').map(section => {
    const lines = section.split('\n');
    return lines
      .filter(line => !line.startsWith('###') && !line.startsWith('**') && line.trim().length > 0)
      .join(' ')
      .trim();
  }).filter(s => s.length > 30);

  // Smart routing based on query intent
  if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('do')) {
    // Services question
    const serviceInfo = sections.find(s => s.toLowerCase().includes('mern') || s.toLowerCase().includes('development'));
    if (serviceInfo) {
      const services = [];
      if (serviceInfo.includes('MERN')) services.push('**MERN Stack Development** ($30/hour) for scalable web applications');
      if (serviceInfo.includes('API')) services.push('**API Development** ($40+/hour) for RESTful and GraphQL APIs');
      if (serviceInfo.includes('Cloud')) services.push('**Cloud & DevOps** ($80+/hour) for AWS deployment');
      if (serviceInfo.includes('Full-Stack')) services.push('**Full-Stack Development** for end-to-end solutions');
      
      if (services.length > 0) {
        return `Aasim offers several professional services:\n\n${services.join('\n')}\n\nAll services include responsive design, performance optimization, security best practices, and post-launch support. Contact **contact@aasimshah.com** for custom quotes.`;
      }
    }
  }

  if (lowerQuery.includes('skill') || lowerQuery.includes('tech') || lowerQuery.includes('technology') || lowerQuery.includes('know')) {
    // Skills question
    const skillInfo = sections.find(s => s.toLowerCase().includes('next.js') || s.toLowerCase().includes('react') || s.toLowerCase().includes('node'));
    if (skillInfo) {
      return `Aasim is proficient in:\n\n**Frontend:** Next.js, React.js, TypeScript, Tailwind CSS\n**Backend:** Node.js, Express.js, Fastify, GraphQL\n**Databases:** MongoDB, PostgreSQL, Redis\n**DevOps:** Docker, AWS, CI/CD pipelines\n**Mobile:** Flutter\n\nHe continuously stays updated with modern best practices and industry standards.`;
    }
  }

  if (lowerQuery.includes('project') || lowerQuery.includes('portfolio') || lowerQuery.includes('work') || lowerQuery.includes('built')) {
    // Projects question
    const projectInfo = sections.find(s => s.toLowerCase().includes('hoheal') || s.toLowerCase().includes('pikup') || s.toLowerCase().includes('premier'));
    if (projectInfo) {
      return `Aasim has completed **40+ successful projects** including:\n\n• **HOHEAL** - Multi-vendor hotel management SaaS platform\n• **PIKUP POS** - Full-featured e-commerce platform with 80+ pages\n• **Premier Vehicles** - Vehicle marketplace with Flutter mobile app\n• **Cloud-based API services** with AWS deployment\n\nAll projects showcase modern development practices, clean code, and scalable architecture.`;
    }
  }

  if (lowerQuery.includes('experience') || lowerQuery.includes('background') || lowerQuery.includes('hire') || lowerQuery.includes('career')) {
    // Experience question
    const expInfo = sections.find(s => s.toLowerCase().includes('dcodax') || s.toLowerCase().includes('senior') || s.toLowerCase().includes('years'));
    if (expInfo) {
      return `Aasim brings **5+ years of professional experience** as a Full-Stack Developer:\n\n• **Senior MERN Stack Developer** at Dcodax PVT LTD (2024-Present)\n• **MERN Stack Developer** at ItecExperts (2022-2024)\n• **Backend Developer** at 47apps (2020-2022)\n\nHe's worked with **45+ happy clients** from USA, UK, Australia, Spain, and more. Known for professionalism, timely delivery, and excellent communication.`;
    }
  }

  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach') || lowerQuery.includes('hire') || lowerQuery.includes('available')) {
    // Contact question
    const contactInfo = sections.find(s => s.toLowerCase().includes('contact@aasimshah.com') || s.toLowerCase().includes('available'));
    if (contactInfo) {
      return `**Get in touch with Aasim:**\n\n📧 **Email:** contact@aasimshah.com (response within 24-48 hours)\n📍 **Location:** Pakistan (available for remote work globally)\n🕒 **Timezone:** PKT (UTC+5)\n\n✅ **Currently Available** for:\n• Freelance projects\n• Full-time remote positions\n• Contract work\n\nYou can also connect via **Fiverr** (Top-rated) or **Upwork** (100% success score).`;
    }
  }

  if (lowerQuery.includes('about') || lowerQuery.includes('who') || lowerQuery.includes('yourself') || lowerQuery.includes('introduce')) {
    // About question
    const aboutInfo = sections.find(s => s.toLowerCase().includes('aasim') && (s.toLowerCase().includes('senior') || s.toLowerCase().includes('developer')));
    if (aboutInfo) {
      return `**About Aasim Shah:**\n\nAasim is a **Senior MERN Stack Developer** and Full-Stack Engineer based in Pakistan, specializing in building scalable web applications, APIs, and cloud solutions.\n\n**Key Highlights:**\n• 5+ years of professional experience\n• 40+ completed projects for global clients\n• 45+ happy clients with 5.0★ ratings\n• Expertise in modern tech: Next.js, React, Node.js, TypeScript, MongoDB, PostgreSQL, AWS\n\nHe's passionate about creating high-performance, user-centric applications and is currently available for new opportunities.`;
    }
  }

  if (lowerQuery.includes('testimonial') || lowerQuery.includes('review') || lowerQuery.includes('client') || lowerQuery.includes('feedback')) {
    // Testimonials question
    const testimonialInfo = sections.find(s => s.toLowerCase().includes('sarah') || s.toLowerCase().includes('john') || s.toLowerCase().includes('mark'));
    if (testimonialInfo) {
      return `**Client Testimonials:**\n\n⭐ **Sarah Thompson (NYC, USA):** "The MERN stack web application is top-notch! It's fast, scalable, and completely streamlined our operations."\n\n⭐ **John Anderson (Sydney, Australia):** "Aasim's API development skills are outstanding! Seamless integrations across all our platforms."\n\n⭐ **Mark Davis (London, UK):** "From backend optimization to AWS deployment, everything was handled flawlessly. Excellent performance."\n\n**Stats:** 45+ Happy Clients | 5.0★ Average Rating | 100% Project Completion Rate | Clients from 15+ Countries`;
    }
  }

  // Fallback: return first 3 relevant sentences
  const sentences = sections
    .flatMap(s => s.split(/[.!?]+/).map(sent => sent.trim()))
    .filter(s => s.length > 20);
  
  return sentences.slice(0, 3).join('. ') + '.';
}

// Smart response generation with Gemini AI (or fallback)
async function generateSmartResponse(context: string, query: string): Promise<ReadableStream> {
  const encoder = new TextEncoder();
  
  // Try Gemini first if API key exists
  if (process.env.GOOGLE_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
      
      // Try different model names that might work with free tier
      const modelNames = ['gemini-1.5-flash', 'gemini-pro', 'models/gemini-pro', 'models/gemini-1.5-flash'];
      
      for (const modelName of modelNames) {
        try {
          const model = genAI.getGenerativeModel({ 
            model: modelName,
            generationConfig: {
              temperature: 0.7,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          });

          // Clean up the context
          const cleanContext = context
            .split('\n---\n')
            .map(section => {
              const lines = section.split('\n');
              return lines
                .filter(line => !line.startsWith('###') && !line.startsWith('**Title:**') && !line.startsWith('**Source:**'))
                .join('\n')
                .trim();
            })
            .filter(s => s.length > 0)
            .join('\n\n');

          const fullPrompt = `You are a professional assistant for Aasim Shah's portfolio. Answer the user's question based ONLY on the provided information. Be conversational, helpful, and natural.

Portfolio Information:
${cleanContext}

User Question: ${query}

Instructions:
- Answer based only on the provided portfolio information
- Be natural and conversational
- Keep response concise but informative
- Format with markdown when appropriate`;

          const result = await model.generateContentStream(fullPrompt);

          return new ReadableStream({
            async start(controller) {
              try {
                for await (const chunk of result.stream) {
                  const text = chunk.text();
                  if (text) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk: text })}\n\n`));
                  }
                }
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                controller.close();
              } catch (error) {
                console.error('Gemini streaming error:', error);
                throw error;
              }
            },
          });
        } catch (modelError) {
          console.warn(`Model ${modelName} failed, trying next...`);
          continue;
        }
      }
    } catch (geminiError) {
      console.warn('⚠️ All Gemini models failed, using smart template fallback');
    }
  }

  // Fallback: Use smart template response
  const response = generateSmartTemplateResponse(context, query);
  
  return new ReadableStream({
    async start(controller) {
      try {
        // Stream the response word by word for natural feel
        const words = response.split(' ');
        for (let i = 0; i < words.length; i++) {
          const chunk = i === 0 ? words[i] : ' ' + words[i];
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`));
          // Small delay for streaming effect
          await new Promise(resolve => setTimeout(resolve, 20));
        }
        
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        console.error('Fallback response streaming error:', error);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: 'Response generation failed' })}\n\n`)
        );
        controller.close();
      }
    },
  });
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  
  try {
    // Parse request body
    const body = await request.json();

    console.log('🗨️ New chat request received:', { clientIp, body });
    
    // Run safety checks
    const safetyCheck = await runSafetyChecks(body, clientIp);
    
    if (!safetyCheck.passed) {
      return new Response(
        JSON.stringify({ 
          error: true, 
          message: safetyCheck.fallbackResponse 
        }), 
        { 
          status: safetyCheck.fallbackType === 'RATE_LIMITED' ? 429 : 400,
          headers: {
            'Content-Type': 'application/json',
            ...safetyCheck.headers,
          },
        }
      );
    }
    
    const { message } = safetyCheck.input!;
    
    // Generate embedding for the query using local model
    const queryEmbedding = await generateEmbedding(message);
    
    // Search vector database
    const vectorSearch = new VectorSearchService(process.env.MONGODB_URI!);
    await vectorSearch.connect();

    // Auto-seed database if empty
    if (!hasAttemptedSeed) {
      hasAttemptedSeed = true;
      const isSeeded = await vectorSearch.isSeeded();
      if (!isSeeded) {
        console.log('⚠️  Database is empty. Seeding mock data...');
        await seedDatabase(MOCK_PORTFOLIO_DATA);
      }
    }
    
    let searchResults = await vectorSearch.search({
      embedding: queryEmbedding,
      maxResults: VECTOR_CONFIG.maxResults,
      minScore: VECTOR_CONFIG.minScore,
    });
    
    await vectorSearch.close();
    
    // If no results from database, use mock data
    if (searchResults.length === 0) {
      console.log('⚠️  No data in database, using mock portfolio data');
      searchResults = getMockResults(message);
    }

    console.log({ searchResults: searchResults.map(r => ({ section: r.section, score: r.score })) });
    
    // Evaluate search results
    const confidenceCheck = evaluateSearchResults(searchResults);
    
    console.log({ confidenceCheck: { passed: confidenceCheck.passed, reason: confidenceCheck.confidenceResult?.reason } }); 
    
    if (!confidenceCheck.passed) {
      return new Response(
        JSON.stringify({ 
          error: false, 
          message: confidenceCheck.fallbackResponse,
          confidence: confidenceCheck.confidenceResult?.highestScore || 0,
        }), 
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...safetyCheck.headers,
          },
        }
      );
    }
    
    // Format context with metadata for better AI understanding
    const formattedContext = CONTEXT_FORMATTER(confidenceCheck.confidenceResult!.validResults);
    
    // Generate smart response using Gemini AI
    const stream = await generateSmartResponse(formattedContext, message);
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        ...safetyCheck.headers,
      },
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Check if it's a Gemini API error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isApiKeyError = errorMessage.includes('API key') || errorMessage.includes('GOOGLE_API_KEY');
    
    return new Response(
      JSON.stringify({ 
        error: true, 
        message: isApiKeyError 
          ? 'Gemini API is not configured. Please add GOOGLE_API_KEY to your .env.local file.'
          : getFallbackResponse('ERROR')
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
