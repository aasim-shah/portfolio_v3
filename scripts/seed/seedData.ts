// Auto-seeding script for portfolio chatbot
// Seeds the database with mock data if empty

import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const DATABASE_NAME = 'portfolio_chatbot';
const COLLECTION_NAME = 'portfolio_embeddings';

// Generate a simple embedding (384 dimensions for bge-small-en-v1.5)
function generateMockEmbedding(): number[] {
  return Array.from({ length: 384 }, () => Math.random() * 2 - 1);
}

const DEFAULT_SEED_DATA = [
  {
    chunkId: 'about-1',
    content: 'Aasim Shah is a Full-Stack Developer and UI/UX Designer with expertise in building modern web applications. He specializes in Next.js, React, TypeScript, and creating beautiful user interfaces with Tailwind CSS. With a passion for clean code and intuitive design, Aasim delivers high-quality digital solutions.',
    section: 'about',
    metadata: {
      title: 'About Aasim Shah',
      source: 'portfolio',
      entities: ['Aasim Shah', 'Full-Stack Developer', 'UI/UX Designer'],
      keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'web development', 'design'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 60,
    },
  },
  {
    chunkId: 'services-1',
    content: 'Services offered include: Web Development - building modern, responsive websites and web applications using cutting-edge technologies; UI/UX Design - creating intuitive and beautiful user interfaces that enhance user experience; SEO Optimization - improving website visibility and search rankings through proven strategies; and Graphic Design - creating visual content and brand materials that stand out.',
    section: 'services',
    metadata: {
      title: 'Professional Services',
      source: 'portfolio',
      entities: ['Web Development', 'UI/UX Design', 'SEO', 'Graphic Design'],
      keywords: ['services', 'web development', 'design', 'SEO', 'responsive', 'branding'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 70,
    },
  },
  {
    chunkId: 'skills-1',
    content: 'Tech stack and skills include: Frontend - Next.js, React, TypeScript, Tailwind CSS, HTML5, CSS3; Backend - Node.js, Express, MongoDB, PostgreSQL; Design Tools - Figma, Framer, Webflow, Adobe Creative Suite; Other - Git, Docker, AWS, Vercel deployment. Experienced in building scalable applications with clean, maintainable code and modern best practices.',
    section: 'skills',
    metadata: {
      title: 'Technical Skills & Stack',
      source: 'portfolio',
      entities: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'Figma', 'Framer', 'Webflow'],
      keywords: ['tech stack', 'skills', 'technologies', 'frameworks', 'tools', 'frontend', 'backend'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 80,
    },
  },
  {
    chunkId: 'experience-1',
    content: 'Professional experience includes working with various clients on projects ranging from e-commerce platforms to portfolio websites and SaaS applications. Has delivered successful projects for companies like Pixelworks, Vortex, and Athon. Focuses on delivering high-quality, user-centric solutions that drive business results. Experience spans startup environments to enterprise-level projects.',
    section: 'experience',
    metadata: {
      title: 'Work Experience',
      source: 'portfolio',
      entities: ['Pixelworks', 'Vortex', 'Athon'],
      keywords: ['experience', 'projects', 'clients', 'e-commerce', 'portfolio', 'SaaS', 'startup'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 65,
    },
  },
  {
    chunkId: 'contact-1',
    content: 'Contact Aasim for project inquiries, collaborations, or consultations. Available for freelance work and full-time opportunities. Open to discussing web development projects, UI/UX design work, and technical consulting. You can reach out through the contact form on the website or connect on social media platforms including LinkedIn, Twitter, and GitHub.',
    section: 'contact',
    metadata: {
      title: 'Get in Touch',
      source: 'portfolio',
      entities: ['Aasim Shah'],
      keywords: ['contact', 'inquiries', 'collaboration', 'freelance', 'hire', 'consulting'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 55,
    },
  },
  {
    chunkId: 'projects-1',
    content: 'Portfolio includes diverse projects: E-commerce platforms with payment integration and inventory management; Portfolio websites for creative professionals and agencies; SaaS applications with subscription management; Landing pages with conversion optimization; Custom web applications with complex business logic. Each project demonstrates expertise in modern web technologies and user-centered design principles.',
    section: 'projects',
    metadata: {
      title: 'Project Portfolio',
      source: 'portfolio',
      entities: ['E-commerce', 'SaaS', 'Portfolio'],
      keywords: ['projects', 'portfolio', 'e-commerce', 'SaaS', 'landing pages', 'web apps'],
      isPartial: false,
      totalChunks: 1,
      chunkIndex: 0,
      tokenCount: 70,
    },
  },
];

export async function seedDatabase(customData?: any[]): Promise<boolean> {
  let client: MongoClient | null = null;
  
  try {
    console.log('🌱 Checking if database seeding is needed...');
    
    client = new MongoClient(MONGODB_URI!);
    await client.connect();
    
    const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
    
    // Check if data already exists
    const count = await collection.countDocuments();
    
    if (count > 0) {
      console.log(`✅ Database already has ${count} documents, skipping seed`);
      return false;
    }
    
    console.log('📦 Seeding database with mock portfolio data...');
    
    // Use custom data if provided, otherwise use default
    const seedData = customData || DEFAULT_SEED_DATA;
    
    // Add embeddings to seed data
    const documentsToInsert = seedData.map(doc => ({
      ...doc,
      embedding: doc.embedding || generateMockEmbedding(),
      createdAt: new Date(),
      updatedAt: new Date(),
      version: Date.now(),
    }));
    
    // Insert seed data
    await collection.insertMany(documentsToInsert);
    
    console.log(`✅ Successfully seeded ${documentsToInsert.length} documents`);
    return true;
    
  } catch (error) {
    console.error('❌ Seeding error:', error);
    return false;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}
