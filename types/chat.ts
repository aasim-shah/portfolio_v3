// Chat Types for Portfolio Chatbot

export enum SectionType {
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  SERVICES = 'services',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact',
  FAQ = 'faq',
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface SearchResult {
  content: string;
  score: number;
  section: SectionType;
  metadata: {
    title: string;
    source: string;
    entities?: string[];
    keywords?: string[];
  };
}

export interface SearchOptions {
  embedding: number[];
  sectionFilter?: SectionType;
  maxResults: number;
  minScore: number;
}

export interface ExtractedContent {
  id: string;
  section: SectionType;
  title: string;
  content: string;
  metadata: {
    source: string;
    entities: string[];
    keywords: string[];
  };
}

export interface ContentChunk {
  id: string;
  chunkIndex: number;
  content: string;
  tokenCount: number;
  section: SectionType;
  metadata: {
    title: string;
    source: string;
    entities: string[];
    keywords: string[];
    isPartial: boolean;
    totalChunks: number;
  };
}

export interface EmbeddedChunk extends ContentChunk {
  embedding: number[];
}

export interface StoredChunk {
  _id?: string;
  chunkId: string;
  content: string;
  embedding: number[];
  section: string;
  metadata: {
    title: string;
    source: string;
    entities: string[];
    keywords: string[];
    isPartial: boolean;
    totalChunks: number;
    chunkIndex: number;
    tokenCount: number;
  };
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number;
  retryAfter?: number;
}

export interface ConfidenceCheckResult {
  passed: boolean;
  reason: 'sufficient' | 'no_results' | 'low_confidence' | 'below_threshold';
  validResults: SearchResult[];
  highestScore: number;
  message?: string;
}

export interface ChatInput {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  sources?: SearchResult[];
  confidence?: number;
}
