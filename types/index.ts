import { StaticImageData } from "next/image";

export interface pagesListsType {
  id: number;
  title: string;
  href: string;
  icon: React.ReactNode;
}

export interface socialListsTypes {
  id: number;
  title: string;
  icon: React.ReactNode;
  link: string;
}

export interface socialBrandsTypes {
  id: number;
  name: string;
  icon: string;
  link: string;
}

export interface counterListsType {
  id: number;
  title: string;
  value: number;
}

export interface myExperienceTypes {
  id: number;
  year: string;
  title: string;
  company: string;
  label: string;
  description: string;
  link: string;
  logo: string | StaticImageData;
}

export interface myStackTypes {
  id: number;
  title: string;
  description: string;
  logo: string;
  link: string;
}

export interface myServicesTypes {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}
export interface myShowCasesTypes {
  id: number;
  title: string;
  description: string;
  link: string;
  type: string;
  theme: string;
  pages: number;
  image: StaticImageData | string;
}

export interface testimonialsTypes {
  id: number;
  name: string;
  description: string;
  location: string;
  avatar: StaticImageData | string;
}

export interface myServicesPlansTypes {
  id: number;
  service: string;
  price: string;
  description: string;
  completedWorks: string;
  experience: string;
  totalHoursWorked: string;
  icon: string;
  link: string;
}

export type FAQ = {
  question: string;
  answer: string;
};

export interface FollowerData {
  platform: string;
  followers: string;
  url: string;
  icon: string;
}

// ==================== CHATBOT TYPES ====================

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

// Chat API Types
export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatErrorResponse {
  error: string;
  code: ErrorCode;
  retryAfter?: number;
}

export type ErrorCode =
  | 'INVALID_INPUT'
  | 'RATE_LIMITED'
  | 'NO_RESULTS'
  | 'LOW_CONFIDENCE'
  | 'SERVER_ERROR'
  | 'OUT_OF_SCOPE'
  | 'QUOTA_EXCEEDED'
  | 'EMBEDDING_ERROR';

// Data Ingestion Types
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

// Vector Search Types
export interface SearchResult {
  content: string;
  score: number;
  section: SectionType;
  metadata: {
    title: string;
    source: string;
    entities: string[];
    keywords: string[];
  };
}

export interface SearchOptions {
  embedding: number[];
  sectionFilter?: SectionType;
  maxResults: number;
  minScore: number;
}

// MCP Tool Types
export interface ToolResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError?: boolean;
}

export interface SearchToolArgs {
  query: string;
  section_filter?: SectionType;
  max_results?: number;
}

export interface SectionToolArgs {
  section: SectionType;
}

// Safety Types
export interface ChatInput {
  message: string;
  history: ChatMessage[];
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export interface ConfidenceCheckResult {
  passed: boolean;
  highestScore: number;
  threshold: number;
}

export interface SafetyCheckResult {
  passed: boolean;
  input?: ChatInput;
  rateLimitResult?: RateLimitResult;
  confidenceResult?: ConfidenceCheckResult;
  fallbackResponse?: string;
  fallbackType?: FallbackType;
  headers?: Record<string, string>;
}

export type FallbackType = 
  | 'NO_RESULTS'
  | 'LOW_CONFIDENCE'
  | 'RATE_LIMITED'
  | 'INVALID_INPUT'
  | 'OUT_OF_SCOPE';
