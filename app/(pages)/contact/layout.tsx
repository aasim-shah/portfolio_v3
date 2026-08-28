import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact - Hire Aasim Shah for Web Development Projects",
  description: "Get in touch with Aasim Shah for your web development needs. Available for MERN Stack projects, API development, and cloud solutions. Let's create something amazing together!",
  openGraph: {
    title: "Contact Aasim Shah - Full Stack Developer",
    description: "Get in touch for web development projects. MERN Stack, API development, and cloud solutions.",
    url: "https://aasimshah.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://aasimshah.com/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
