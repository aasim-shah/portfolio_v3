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
  suffix: string;
}

export interface myExperienceTypes {
  id: number;
  year: string;
  title: string;
  focus?: string;
  company: string;
  label: string;
  description: string;
  highlights?: string[];
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
  status: string;
  technologies: string;
  image: StaticImageData | string;
}

export interface testimonialsTypes {
  id: number;
  /** Full name of a real, attributable client. Do not use placeholder names. */
  name: string;
  /** The quote itself. */
  description: string;
  location: string;
  /** Optional role/title, e.g. "Founder". */
  role?: string;
  /** Optional company name. */
  company?: string;
  /** Optional short label of the work delivered, e.g. "MERN application". */
  projectType?: string;
  avatar?: StaticImageData | string;
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

export interface blogPostType {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  /** Human-readable publish date, e.g. "March 12, 2025" (display only). */
  publishedAt: string;
  /** ISO 8601 publish date, e.g. "2025-03-12" (schema + sitemap). */
  date: string;
  /** ISO 8601 last-modified date. Falls back to `date` when absent. */
  updated?: string;
  readTime: string;
  slug: string;
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
