import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Web Development Services - MERN Stack, API Development & Cloud Solutions",
  description: "Professional web development services by Aasim Shah. Specializing in MERN Stack development, RESTful & GraphQL API development, Cloud & DevOps solutions, and complete project development. Starting from $30/hour.",
  keywords: [
    "web development services",
    "MERN stack services",
    "API development services",
    "cloud services",
    "DevOps services",
    "freelance developer",
    "hire full stack developer",
    "custom web application",
    "professional web development",
    "Aasim Shah services",
  ],
  openGraph: {
    title: "Web Development Services - MERN Stack, API Development & Cloud Solutions",
    description: "Professional web development services. MERN Stack, API development, Cloud & DevOps. Starting from $30/hour. 40+ completed projects.",
    url: "https://aasimshah.com/services",
    type: "website",
  },
  alternates: {
    canonical: "https://aasimshah.com/services",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
